import { Card } from "flowbite-react";

export default function ScoreCard(game: {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  league: string;
}) {
  return (
    <Card
      href="#"
      className="h-20 min-w-60 overflow-hidden text-gray-900 dark:text-white lg:w-60"
      key={game.id}
    >
      <div className="flex h-1 text-sm">
        <p>{game.league}</p>
        <p className="mx-auto mr-0">{game.date}</p>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <div className="h-5 w-28">
            <p className="truncate ">{game.homeTeam}</p>
          </div>
          <div className="h-5 w-28">
            <p className="truncate">{game.awayTeam}</p>
          </div>
        </div>
        <div className="mx-auto mr-0 flex flex-col">
          <div className="h-5">
            <p>{game.homeScore}</p>
          </div>
          <div className="h-5 font-bold">
            <p>{game.awayScore}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
