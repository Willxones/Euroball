import { useQuery } from "@apollo/client";
import ScoreCard from "./ScoreCard";
import { Game, Week } from "./WeekPicker";
import { GET_GAMES_BY_WEEK } from "../../queries";

interface ScoresTableProps {
    selectedWeek: Week | null;
}

interface GetGamesByWeekResponse {
    gameCollection: GameCollection;
}

interface GameCollection {
    items: Game[];
    total: number;
}

export default function ScoresTable({ selectedWeek }: ScoresTableProps) {
    const weekId = selectedWeek?.sys.id;
    const limit = 100;

    const { data: gamesData, loading: gamesLoading, error: gamesError } = useQuery<GetGamesByWeekResponse>(
        GET_GAMES_BY_WEEK,
        {
            variables: {
                limit: limit,
                weekId: weekId,
            },
            skip: !weekId
        }
    );

    if (!weekId) {
        return <div>Please select a week to view the scores.</div>;
    }

    if (gamesLoading) return <div>Loading...</div>;
    if (gamesError) return <div>Error loading games</div>;

    // Get the games and create a new array for sorting
    const games: Game[] = gamesData?.gameCollection?.items || [];
    
    // Create a new array to avoid modifying the original array
    const sortedGames = [...games].sort((a, b) => {
        const dateA = new Date(a.dateAndTime);
        const dateB = new Date(b.dateAndTime);
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <div className="flex w-full flex-row flex-wrap justify-evenly gap-2">
            {sortedGames.map(game => (
                <ScoreCard key={game.sys.id} game={game} />
            ))}
        </div>
    );
}
