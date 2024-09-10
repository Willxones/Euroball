import { useQuery } from "@apollo/client";
import ScoreCard from "./ScoreCard";
import { Game, Week } from "./WeekPicker";
import { GET_GAMES_BY_WEEK } from "../../queries";
import { Spinner } from "flowbite-react";

interface ScoresTableProps {
    selectedWeek: Week | null;
    openModal: (game: Game | null) => void;
}

interface GetGamesByWeekResponse {
    gameCollection: GameCollection;
}

interface GameCollection {
    items: Game[];
    total: number;
}

export default function ScoresTable({ selectedWeek, openModal }: ScoresTableProps) {
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
        return <div></div>;
    }

    if (gamesLoading) return <div className="py-12 text-center"><Spinner aria-label="Default status example" size="xl" /></div>;
    if (gamesError) return <div className="py-4 text-center text-white">Error loading games</div>;

    // Get the games and create a new array for sorting
    const games: Game[] = gamesData?.gameCollection?.items || [];
    
    // Create a new array to avoid modifying the original array
    const sortedGames = [...games].sort((a, b) => {
        const dateA = new Date(a.dateAndTime);
        const dateB = new Date(b.dateAndTime);
        return dateA.getTime() - dateB.getTime();
    });    

    return (
        <div className="flex w-full flex-row flex-wrap justify-evenly gap-2">
            {sortedGames.map(game => (
                <ScoreCard key={game.sys.id} game={game} openModal={openModal} />
            ))}
        </div>
    );
}
