import LeaguePicker from "./LeaguePicker";
import ReactGA from "react-ga4";
import ScoresModal from "./ScoresModal";
import { useState } from "react";
import { Game } from "./WeekPicker";
import { Team } from "./ScoreCard";

export default function Scores() {
  ReactGA.send({
    hitType: "pageview",
    page: `/scores`,
    title: `Scores`,
  });

  const [openModal, setOpenModal] = useState<boolean>(false); // Controls modal visibility
  const [selectedGame, setSelectedGame] = useState<Game | null>(null); // Stores the selected game
  const [selectedHomeTeam, setSelectedHomeTeam] = useState<Team | undefined>(undefined);
const [selectedAwayTeam, setSelectedAwayTeam] = useState<Team | undefined>(undefined);

  // Function to open modal with the provided game
  const handleOpenModal = (game: Game | null, homeTeam: Team | undefined, awayTeam: Team | undefined) => {
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
      <LeaguePicker openModal={handleOpenModal} />
      <ScoresModal
        isModalOpen={openModal}
        selectedGame={selectedGame}
        onCloseModal={handleCloseModal} // Pass the close function to the modal
        homeTeam={selectedHomeTeam}
    awayTeam={selectedAwayTeam}
      />
    </>
  );
}
