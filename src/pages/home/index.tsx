import ReactGA from "react-ga4";
import FeaturedNewsSection from "./FeaturedNewsSection";
import RecentScoresSection from "./RecentScoresSection";
import RecentNewsSection from "./RecentNewsSection";
import Standings from "../standings";
import { useState } from "react";
import { Game } from "../scores/WeekPicker";
import ScoresModal from "../scores/ScoresModal";
import { Team } from "../scores/ScoreCard";

export default function Home() {
  ReactGA.send({
    hitType: "pageview",
    page: `/`,
    title: `Home`,
  });
  const [openModal, setOpenModal] = useState<boolean>(false); // Controls modal visibility
  const [selectedGame, setSelectedGame] = useState<Game | null>(null); // Stores the selected game
  const [selectedHomeTeam, setSelectedHomeTeam] = useState<Team | undefined>(
    undefined,
  );
  const [selectedAwayTeam, setSelectedAwayTeam] = useState<Team | undefined>(
    undefined,
  );
  // Function to open modal with the provided game
  const handleOpenModal = (
    game: Game | null,
    homeTeam: Team | undefined,
    awayTeam: Team | undefined,
  ) => {
    setSelectedGame(game);
    setSelectedHomeTeam(homeTeam);
    setSelectedAwayTeam(awayTeam);
    setOpenModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <FeaturedNewsSection />
      <RecentScoresSection openModal={handleOpenModal} />
      <RecentNewsSection isSidebar={false} currentArticleId={undefined} />
      <div className="my-4">
        <h2 className="text-lg font-bold dark:text-white">Standings ⚔️</h2>
        <Standings />
        <ScoresModal
          isModalOpen={openModal}
          selectedGame={selectedGame}
          homeTeam={selectedHomeTeam}
          awayTeam={selectedAwayTeam}
          onCloseModal={handleCloseModal}
        />
      </div>
    </>
  );
}
