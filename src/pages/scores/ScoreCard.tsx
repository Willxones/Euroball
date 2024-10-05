import { useQuery } from "@apollo/client";
import { Game } from "./WeekPicker";
import { GET_TEAM_BY_ID } from "../../queries";
import { formatDateTime } from "./formatDateTime";

interface ScoreCardProps {
  game: Game;
  openModal: (
    game: Game | null,
    homeTeam: Team | undefined,
    awayTeam: Team | undefined,
  ) => void;
}

export interface Team {
  sys: {
    id: string;
  };
  teamName: string;
  locationName: string;
  shortenedName: string;
  logo: {
    url: string;
  };
}

interface GetTeamResponse {
  team: Team;
}

export default function ScoreCard({ game, openModal }: ScoreCardProps) {
  const {
    data: homeTeamData,
    loading: homeTeamLoading,
    error: homeTeamError,
  } = useQuery<GetTeamResponse>(GET_TEAM_BY_ID, {
    variables: {
      id: game.homeTeam.sys.id,
    },
  });

  const {
    data: awayTeamData,
    loading: awayTeamLoading,
    error: awayTeamError,
  } = useQuery<GetTeamResponse>(GET_TEAM_BY_ID, {
    variables: {
      id: game.awayTeam.sys.id,
    },
  });
  if (homeTeamLoading || awayTeamLoading)
    return (
      <div className="h-28 w-full animate-pulse overflow-hidden rounded-md border bg-gray-200 px-4 py-2 text-gray-700 shadow-md dark:border-gray-700 dark:bg-gray-700 dark:text-white sm:w-[294px]">
      </div>
    );
  if (homeTeamError || awayTeamError) return <div></div>;

  const homeTeam = homeTeamData?.team;
  const awayTeam = awayTeamData?.team;

  const handleClick = () => {
    openModal(game, homeTeam, awayTeam!); // Pass the teams along with the game
  };

  // Handle null or undefined scores
  const homeScore = game.homeScore ?? "-";
  const awayScore = game.awayScore ?? "-";

  // Determine the status text
  const statusText = homeScore === "-" || awayScore === "-" ? "TBD" : "Final";

  // Determine which score is higher
  const isHomeScoreHighest =
    homeScore !== "-" && awayScore !== "-" && homeScore > awayScore;
  const isAwayScoreHighest =
    awayScore !== "-" && homeScore !== "-" && awayScore > homeScore;

  return (
    <a
      onClick={handleClick}
      className="h-28 w-full cursor-pointer overflow-hidden rounded-md hover:shadow-md sm:w-[294px]"
    >
      <div className="h-28 w-full overflow-hidden rounded-md border px-4 py-2 text-gray-700 shadow-md dark:border-gray-700 dark:text-white sm:w-[294px]">
        <div className="flex flex-col gap-2">
          <div className="flex">
            <p>{formatDateTime(game.dateAndTime)}</p>
            <p className="mx-auto mr-0">{statusText}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div
              className={`flex items-center ${isHomeScoreHighest ? "font-bold" : ""}`}
            >
              <img
                alt={homeTeam?.teamName + " logo"}
                src={homeTeam?.logo.url}
                className="mr-2 size-6 rounded-md bg-gray-200 object-contain dark:bg-transparent"
              />
              <p className="truncate">
                {homeTeam?.locationName} {homeTeam?.teamName}
              </p>
              <p className="ml-auto mr-0">{homeScore}</p>
            </div>
            <div
              className={`flex items-center ${isAwayScoreHighest ? "font-bold" : ""}`}
            >
              <img
                alt={awayTeam?.teamName + " logo"}
                src={awayTeam?.logo.url}
                className="mr-2 size-6 rounded-md bg-gray-200 object-contain dark:bg-transparent"
              />
              <p className="truncate">
                {awayTeam?.locationName} {awayTeam?.teamName}
              </p>
              <p className="ml-auto mr-0">{awayScore}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
