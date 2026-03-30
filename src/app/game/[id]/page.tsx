export default function GamePage({ params }: { params: { id: string } }) {
  return <h1 className="text-2xl font-semibold">Game {params.id}</h1>;
}