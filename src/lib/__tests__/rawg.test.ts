import { getGames, searchGames, getGameBasic, getGenres } from '@/lib/rawg'

const fetchMock = jest.spyOn(global, 'fetch')

function mockResponse(body: unknown, ok = true) {
  return { ok, json: async () => body } as Response
}

describe('getGames', () => {
  it('builds the URL with the API key and params', async () => {
    fetchMock.mockResolvedValueOnce(mockResponse({ results: [] }))

    await getGames({ search: 'zelda', page: 2 })

    const url = new URL(fetchMock.mock.calls[0][0] as string)
    expect(url.pathname).toBe('/api/games')
    expect(url.searchParams.get('key')).toBe('test-key')
    expect(url.searchParams.get('search')).toBe('zelda')
    expect(url.searchParams.get('page')).toBe('2')
  })

  it('throws when the API responds with an error', async () => {
    fetchMock.mockResolvedValueOnce(mockResponse({}, false))
    await expect(getGames()).rejects.toThrow('Falha ao buscar jogos')
  })
})
// Caso 1 — verifica a URL que a função montou
describe('searchGames', () => {
  it('requests 10 results for the search term', async () => {
    fetchMock.mockResolvedValueOnce(mockResponse({ results: [] }))   // Arrange

    await searchGames('mario')                                        // Act

    const url = new URL(fetchMock.mock.calls[0][0] as string)         // Assert
    expect(url.searchParams.get('search')).toBe('mario')
    expect(url.searchParams.get('page_size')).toBe('10')
  })
})

// Caso 2 — verifica o que NÃO deve estar na URL
describe('getGames without params', () => {
  it('only sends the API key', async () => {
    fetchMock.mockResolvedValueOnce(mockResponse({ results: [] }))

    await getGames()

    const url = new URL(fetchMock.mock.calls[0][0] as string)
    expect(url.searchParams.has('search')).toBe(false)
    expect(url.searchParams.has('genres')).toBe(false)
    expect(url.searchParams.has('page')).toBe(false)
  })
})

// Caso 3 — verifica o valor de retorno (e não a URL)
describe('getGameBasic', () => {
  it('returns a fallback instead of throwing when the API fails', async () => {
    fetchMock.mockResolvedValueOnce(mockResponse({}, false))  // simula erro da API

    const result = await getGameBasic(42)

    expect(result).toEqual({ name: 'Jogo #42', background_image: null })
  })
})

// Caso 4 — verifica as opções passadas ao fetch (o 2º argumento)
describe('getGenres', () => {
  it('caches genres for 24 hours', async () => {
    fetchMock.mockResolvedValueOnce(mockResponse({ results: [] }))

    await getGenres()

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),                                    // a URL, qualquer uma
      expect.objectContaining({ next: { revalidate: 86400 } })
    )
  })
})