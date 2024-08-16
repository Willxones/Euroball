import { useQuery } from "@apollo/client";
import ScoreCard from "./ScoreCard";
import { Game, Week } from "./WeekPicker";
import { GET_GAMES_BY_WEEK } from "../../queries";

interface ScoresTableProps {
    selectedWeek: Week | null;
}

interface GetGamesByWeeksResponse {
    gameCollection: GameCollection;
}

interface GameCollection {
    items: Game[];
    total: number;
}

export default function ScoresTable({ selectedWeek }: ScoresTableProps) {
    const weekId = selectedWeek?.sys.id;
    const limit = 100;
    const { data: gamesData, loading: gamesLoading, error: gamesError } = useQuery<GetGamesByWeeksResponse>(
        GET_GAMES_BY_WEEK,
        {
            variables: {
                limit: limit,
                weekId: weekId,
            },
        }
    );

    if (gamesLoading) return <div>Loading...</div>;
    if (gamesError) return <div>Error loading games</div>;

    const games: Game[] = gamesData?.gameCollection?.items || [];

    return (
        <>
            <div>
                {games.map(game => (
                    <ScoreCard key={game.sys.id} game={game} />
                ))}
            </div>
        </>
    );
}
