import ReactGA from "react-ga4"
import FeaturedNewsSection from "./FeaturedNewsSection"
import RecentScoresSection from "./RecentScoresSection"
import RecentNewsSection from "./RecentNewsSection"
import Standings from "../standings"
import { useState } from "react"
import { Game } from "../scores/WeekPicker"
import ScoresModal from "../scores/ScoresModal"

export default function Home() {
    ReactGA.send({
        hitType: "pageview",
        page: `/`,
        title: `Home`
      })
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
        <FeaturedNewsSection/>
        <RecentScoresSection openModal={handleOpenModal}/>
        <RecentNewsSection isSidebar={false} currentArticleId={undefined}/>
        <div className="my-4">
        <h2 className="text-lg font-bold dark:text-white">Standings ⚔️</h2>
        <Standings/>
        <ScoresModal isModalOpen={openModal}
        selectedGame={selectedGame}
        onCloseModal={handleCloseModal} />
        </div>
        </>
    )
}