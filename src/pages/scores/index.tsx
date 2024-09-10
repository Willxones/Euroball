import LeaguePicker from "./LeaguePicker";
import ReactGA from "react-ga4";
import ScoresModal from "./ScoresModal";
import { useState } from "react";
import { Game } from "./WeekPicker";

export default function Scores() {
  ReactGA.send({
    hitType: "pageview",
    page: `/scores`,
    title: `Scores`,
  });

  const [openModal, setOpenModal] = useState<boolean>(false); // Controls modal visibility
  const [selectedGame, setSelectedGame] = useState<Game | null>(null); // Stores the selected game

  // Function to open modal with the provided game
  const handleOpenModal = (game: Game | null) => {
    setSelectedGame(game);
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
      />
    </>
  );
}
