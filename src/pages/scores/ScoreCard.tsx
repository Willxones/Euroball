import { useQuery } from "@apollo/client";
import { Game } from "./WeekPicker";
import { GET_TEAM_BY_ID } from "../../queries";
import { formatDateTime } from "./formatDateTime";

interface ScoreCardProps {
    game: Game;
}

interface Team {
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

export default function ScoreCard({ game }: ScoreCardProps) {
    const { data: homeTeamData, loading: homeTeamLoading, error: homeTeamError } = useQuery<GetTeamResponse>(
        GET_TEAM_BY_ID,
        {
            variables: {
                id: game.homeTeam.sys.id,
            },
        }
    );

    const { data: awayTeamData, loading: awayTeamLoading, error: awayTeamError } = useQuery<GetTeamResponse>(
        GET_TEAM_BY_ID,
        {
            variables: {
                id: game.awayTeam.sys.id,
            },
        }
    );

    if (homeTeamLoading || awayTeamLoading) return <div>Loading...</div>;
    if (homeTeamError || awayTeamError) return <div>Error loading team data</div>;

    const homeTeam = homeTeamData?.team;
    const awayTeam = awayTeamData?.team;

    // Handle null or undefined scores
    const homeScore = game.homeScore ?? '-';
    const awayScore = game.awayScore ?? '-';

    // Determine the status text
    const statusText = homeScore === '-' || awayScore === '-' ? 'TBD' : 'Final';

    // Determine which score is higher
    const isHomeScoreHighest = homeScore !== '-' && awayScore !== '-' && homeScore > awayScore;
    const isAwayScoreHighest = awayScore !== '-' && homeScore !== '-' && awayScore > homeScore;

    return (
        <div className="h-28 w-[294px] overflow-hidden rounded-md border px-4 py-2 text-gray-700 shadow-md dark:border-gray-700 dark:text-white">
            <div className="flex flex-col gap-2">
                <div className="flex">
                    <p>{formatDateTime(game.dateAndTime)}</p>
                    <p className="mx-auto mr-0">{statusText}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className={`flex items-center ${isHomeScoreHighest ? 'font-bold' : ''}`}>
                        <img alt={homeTeam?.teamName + " logo"} src={homeTeam?.logo.url} className="mr-2 size-6 rounded-sm bg-gray-800 object-contain" />
                        <p className="truncate">{homeTeam?.locationName} {homeTeam?.teamName}</p>
                        <p className="ml-auto mr-0">{homeScore}</p>
                    </div>
                    <div className={`flex items-center ${isAwayScoreHighest ? 'font-bold' : ''}`}>
                        <img alt={awayTeam?.teamName + " logo"} src={awayTeam?.logo.url} className="mr-2 size-6 rounded-sm bg-gray-800 object-contain" />
                        <p className="truncate">{awayTeam?.locationName} {awayTeam?.teamName}</p>
                        <p className="ml-auto mr-0">{awayScore}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
