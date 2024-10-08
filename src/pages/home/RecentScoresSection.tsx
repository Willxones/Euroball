import { useQuery } from "@apollo/client";
import ScoreCard from "../scores/ScoreCard";
import { GET_ALL_GAMES } from "../../queries";
import { Game } from "../scores/WeekPicker";
import { Modal, Spinner } from "flowbite-react";
import { Team } from "../scores/ScoreCard";

interface GetAllGamesResponse {
  gameCollection: GameCollection;
}

interface GameCollection {
  items: Game[];
  total: number;
}

interface RecentScoresSectionProps {
  openModal: (
    game: Game | null,
    homeTeam: Team | undefined,
    awayTeam: Team | undefined,
  ) => void;
}

export default function RecentScoresSection({
  openModal,
}: RecentScoresSectionProps) {
  const {
    data: gamesData,
    loading: gamesLoading,
    error: gamesError,
  } = useQuery<GetAllGamesResponse>(GET_ALL_GAMES, {
    variables: {
      limit: 8,
      skip: 0,
      homeScoreExists: true,
      awayScoreExists: true,
    },
  });

  if (gamesLoading)
    return (
      <Modal>
        <div className="py-12 text-center">
          <Spinner aria-label="Default status example" size="xl" />
        </div>
      </Modal>
    );
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
    <>
      <h2 className="mt-4 text-lg font-bold dark:text-white">
        Recent Scores 🏈
      </h2>
      <div className="mt-2 flex w-full flex-row flex-wrap justify-evenly gap-2">
        {sortedGames.map((game) => (
          <ScoreCard key={game.sys.id} game={game} openModal={openModal} />
        ))}
      </div>
    </>
  );
}
