import { createClient } from '@/lib/supabase/client'
import { addUserGame, getUserGames, removeUserGame, updateUserGame } from '@/lib/user-games'

// Substitui o módulo real por um falso, sem carregar o Supabase de verdade
jest.mock('@/lib/supabase/client', () => ({ createClient: jest.fn() }))

type QueryResult = { data?: unknown; error?: unknown }

// Query falsa: cada método devolve a própria query (permite encadear),
// e o "then" faz o await devolver o resultado que a gente definir
function createQueryMock(result: QueryResult) {
  const query = {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    eq: jest.fn(),
    order: jest.fn(),
    single: jest.fn(),
    then: (resolve: (value: QueryResult) => unknown) => Promise.resolve(resolve(result)),
  }
  Object.values(query).forEach((fn) => {
    if (jest.isMockFunction(fn)) fn.mockReturnValue(query)
  })
  return query
}

// Monta o cliente falso: from() devolve a query, auth.getUser() devolve o usuário
function mockSupabase(result: QueryResult, user: { id: string } | null = { id: 'user-1' }) {
  const query = createQueryMock(result)
  const supabase = {
    from: jest.fn(() => query),
    auth: { getUser: jest.fn().mockResolvedValue({ data: { user } }) },
  }
  jest.mocked(createClient).mockReturnValue(
    supabase as unknown as ReturnType<typeof createClient>
  )
  return { supabase, query }
}

describe('addUserGame', () => {
  it('inserts the game linked to the logged-in user', async () => {
    const { query } = mockSupabase({ data: { id: 'ug-1' }, error: null })

    const result = await addUserGame(42, 'playing')

    expect(query.insert).toHaveBeenCalledWith({
      game_id: 42,
      status: 'playing',
      user_id: 'user-1',
    })
    expect(result).toEqual({ id: 'ug-1' })
  })

  it('throws and never touches the database when no user is logged in', async () => {
    const { supabase } = mockSupabase({}, null)

    await expect(addUserGame(42, 'playing')).rejects.toThrow('Usuário não autenticado')
    expect(supabase.from).not.toHaveBeenCalled()
  })
})

describe('getUserGames', () => {
  it('returns an empty list when there is no data', async () => {
    mockSupabase({ data: null, error: null })

    const result = await getUserGames()

    expect(result).toEqual([])
  })

  it('orders games from newest to oldest', async () => {
    const { query } = mockSupabase({ data: [], error: null })

    await getUserGames()

    expect(query.order).toHaveBeenCalledWith('created_at', { ascending: false })
  })
})

describe('removeUserGame', () => {
  it('throws when the database returns an error', async () => {
    mockSupabase({ error: new Error('db down') })

    await expect(removeUserGame('ug-1')).rejects.toThrow('db down')
  })
})

describe('updateUserGame', () => {
  it('updates the status of the right game', async () => {
    const { query } = mockSupabase({ data: { id: 'ug-1' }, error: null })

    await updateUserGame('ug-1', 'completed')

    expect(query.update).toHaveBeenCalledWith({ status: 'completed' })
    expect(query.eq).toHaveBeenCalledWith('id', 'ug-1')
  })
})