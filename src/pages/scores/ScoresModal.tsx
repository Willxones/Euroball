"use client";

import { Modal } from "flowbite-react";
import { Game } from "./WeekPicker";

interface ScoresModalProps {
  isModalOpen: boolean;
  selectedGame: Game | null;
  onCloseModal: () => void; // Add the onCloseModal prop
}

export default function ScoresModal({ isModalOpen, selectedGame, onCloseModal }: ScoresModalProps) {
  return (
    <>
      <Modal show={isModalOpen} size="md" onClose={onCloseModal}>
        <Modal.Header>Score: {selectedGame?.homeScore ?? "No score available"}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Game Details: {selectedGame?.homeScore} vs {selectedGame?.awayScore}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
