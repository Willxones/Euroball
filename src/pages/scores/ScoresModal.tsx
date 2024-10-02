"use client";

import { Modal, Spinner } from "flowbite-react";
import { Game } from "./WeekPicker";
import { formatDateTime } from "./formatDateTime";
import { Team } from "../scores/ScoreCard";
import { NewsTableArticle } from "../news/NewsTableArticle";
import {
  GET_ARTICLE_BY_ID,
  GET_LEAGUE_BY_ID,
  GET_WEEK_BY_ID,
} from "../../queries";
import { useQuery } from "@apollo/client";
import { Article } from "../news/NewsTable";
import { CalendarIcon } from "@heroicons/react/20/solid";

interface ScoresModalProps {
  isModalOpen: boolean;
  selectedGame: Game | null;
  homeTeam: Team | undefined;
  awayTeam: Team | undefined;
  onCloseModal: () => void;
}

export default function ScoresModal({
  isModalOpen,
  selectedGame,
  homeTeam,
  awayTeam,
  onCloseModal,
}: ScoresModalProps) {
  const weekId = selectedGame?.week?.sys.id;

  // Fetch week data only if weekId is defined and valid
  const {
    data: weekData,
    loading: weekLoading,
    error: weekError,
  } = useQuery(GET_WEEK_BY_ID, {
    variables: { weekId },
    skip: !weekId || typeof weekId !== "string", // Skip query if weekId is undefined or not a valid string
  });

  const leagueId = weekData?.week?.league?.sys?.id;

  // Fetch league data conditionally
  const {
    data: leagueData,
    loading: leagueLoading,
    error: leagueError,
  } = useQuery(GET_LEAGUE_BY_ID, {
    variables: { leagueId },
    skip: !leagueId, // Skip if no league ID
  });

  // Fetch article data based on relatedArticle ID from selectedGame
  const {
    data: articleData,
    loading: articleLoading,
    error: articleError,
  } = useQuery<{ article: Article }>(GET_ARTICLE_BY_ID, {
    variables: {
      id: selectedGame?.relatedArticle?.sys?.id || "",
    },
    skip: !selectedGame?.relatedArticle?.sys?.id, // Skip if no article ID
  });

  // Handling loading and error states for article, week, and league
  if (articleError) return <div>Error loading article</div>;

  if (weekError) return <p>Error fetching week: {weekError.message}</p>;
  if (leagueError) return <p>Error fetching league: {leagueError.message}</p>;

  const week = weekData?.week;
  const league = leagueData?.league;
  const article = articleData?.article;

  // Determine the score comparison
  let isHomeScoreHighest = false;
  let isAwayScoreHighest = false;
  if (selectedGame?.homeScore && selectedGame.awayScore) {
    isHomeScoreHighest = selectedGame.homeScore > selectedGame.awayScore;
    isAwayScoreHighest = selectedGame.homeScore < selectedGame.awayScore;
  }

  // Render replay section
  const replaySection = () => {
    if (selectedGame?.gameReplay) {
      return (
        <div className="h-44 w-full sm:h-60">
          <iframe
            src={selectedGame.gameReplay}
            className="mx-auto size-full rounded-lg lg:max-w-sm"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      );
    } else {
      return (
        <div>
          <p className="text-center">This game has no highlights or replay</p>
        </div>
      );
    }
  };

  // Render article section
  const articleSection = () => {
    if (selectedGame?.relatedArticle) {
      return (
        <div className="flex justify-center">
          <NewsTableArticle article={article} />
        </div>
      );
    } else {
      return (
        <div>
          <p className="text-center">This game has no related news</p>
        </div>
      );
    }
  };

  if (articleLoading || weekLoading || leagueLoading) {
    return (
      <Modal>
        <div className="py-12 text-center">
          <Spinner aria-label="Default status example" size="xl" />
        </div>
      </Modal>
    );
  }
  function removeContentInParentheses(weekName: string): string {
    // Regular expression to match text within parentheses, including the parentheses
    const regex = /\(.*?\)/g;
    // Replace the matched content with an empty string
    return weekName.replace(regex, "").trim();
  }
  return (
    <>
      <Modal
        show={isModalOpen}
        size="lg"
        onClose={onCloseModal}
        dismissible={true}
      >
        <Modal.Header>
          {selectedGame
            ? formatDateTime(selectedGame.dateAndTime)
            : "Game Details"}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4 dark:text-white">
            {/* Show week and league data if available */}
            <div className="flex flex-col gap-2 sm:flex-row">
              {league && (
                <div className="flex flex-1 gap-2">
                  <img
                    className="size-6 rounded-md object-cover"
                    src={league.logo.url}
                  />
                  <p className="text-base sm:text-lg">{league.name}</p>
                </div>
              )}
              {week && (
                <p className="flex text-base sm:text-lg">
                  {<CalendarIcon className="mr-2 size-6" />}{" "}
                  {removeContentInParentheses(week.weekName)}
                </p>
              )}
            </div>

            <h2 className="font-bold">Game Scores</h2>
            <div className="flex">
              <div
                className={`flex flex-1 gap-2 ${isHomeScoreHighest ? "font-bold" : ""}`}
              >
                <img
                  src={homeTeam?.logo.url}
                  alt={`${homeTeam?.locationName} ${homeTeam?.teamName} Logo`}
                  className="size-6 rounded-md bg-gray-200 object-contain dark:bg-transparent"
                />
                <p>
                  {homeTeam?.locationName} {homeTeam?.teamName}
                </p>
              </div>
              <div className={`${isHomeScoreHighest ? "font-bold" : ""}`}>
                {selectedGame?.homeScore || "-"}
              </div>
            </div>
            <div className="flex">
              <div
                className={`flex flex-1 gap-2 ${isAwayScoreHighest ? "font-bold" : ""}`}
              >
                <img
                  src={awayTeam?.logo.url}
                  alt={`${awayTeam?.locationName} ${awayTeam?.teamName} Logo`}
                  className="size-6 rounded-md bg-gray-200 object-contain dark:bg-transparent"
                />
                <p>
                  {awayTeam?.locationName} {awayTeam?.teamName}
                </p>
              </div>
              <div className={`${isAwayScoreHighest ? "font-bold" : ""}`}>
                {selectedGame?.awayScore || "-"}
              </div>
            </div>

            <h2 className="font-bold">Highlights / Game Replay</h2>
            {replaySection()}

            <h2 className="font-bold">Related News</h2>
            {articleSection()}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
