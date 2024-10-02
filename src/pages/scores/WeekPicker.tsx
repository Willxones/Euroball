import { useQuery } from "@apollo/client";
import { useEffect, useState, useMemo } from "react";
import { GET_WEEKS_BY_LEAGUE, GET_GAMES_BY_WEEKS } from "../../queries";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { League } from "./LeaguePicker";
import { Spinner } from "flowbite-react";

export type Week = {
  sys: {
    id: string;
  };
  weekName: string;
  isPlayoffWeek: boolean;
  league: {
    sys: {
      id: string;
    };
  };
};

export type Game = {
  sys: {
    id: string;
  };
  dateAndTime: string;
  week: {
    sys: {
      id: string;
    };
    weekName: string;
  };
  homeTeam: {
    sys: {
      id: string;
    };
  };
  awayTeam: {
    sys: {
      id: string;
    };
  };
  homeScore: number | null;
  awayScore: number | null;
  relatedArticle: {
    sys: {
      id: string;
    };
  };
  gameReplay: string;
};

interface WeekPickerProps {
  selectedLeague: League | null;
  onWeekChange: (week: Week | null) => void;
}

export default function WeekPicker({
  selectedLeague,
  onWeekChange,
}: WeekPickerProps) {
  const limit = 60;
  const {
    data: weeksData,
    loading: weeksLoading,
    error: weeksError,
  } = useQuery(GET_WEEKS_BY_LEAGUE, {
    variables: { limit, leagueId: selectedLeague?.sys.id },
    skip: !selectedLeague,
  });
  const weeks: Week[] = useMemo(() => {
    return weeksData?.leagueCollection.items[0]?.weeksCollection.items || [];
  }, [weeksData]);
  const weekIds = weeks.map((week) => week.sys.id);
  const {
    data: gamesData,
    loading: gamesLoading,
    error: gamesError,
  } = useQuery(GET_GAMES_BY_WEEKS, {
    variables: { limit, weekIds },
    skip: weekIds.length === 0,
  });

  const [selected, setSelected] = useState<Week | null>(null);
  const [currentWeekId, setCurrentWeekId] = useState<string | null>(null);
  useEffect(() => {
    onWeekChange(selected);
  }, [onWeekChange, selected]);

  useEffect(() => {
    if (weeksData && gamesData) {
      const playedGames = gamesData.gameCollection.items.filter(
        (game: Game) => game.homeScore !== null || game.awayScore !== null,
      );
      const mostRecentGame = playedGames.reduce((latest: Game, game: Game) => {
        return new Date(game.dateAndTime) > new Date(latest.dateAndTime)
          ? game
          : latest;
      }, playedGames[0]);

      if (mostRecentGame) {
        const mostRecentWeek = weeks.find(
          (week: Week) => week.sys.id === mostRecentGame.week.sys.id,
        );
        setSelected(mostRecentWeek || null);
        setCurrentWeekId(mostRecentWeek?.sys.id || null);
      } else if (weeks.length > 0) {
        setSelected(weeks[0]);
        setCurrentWeekId(null);
      } else {
        setSelected(null);
        setCurrentWeekId(null);
      }
    } else if (weeksData && weeks.length === 0) {
      setSelected(null);
      setCurrentWeekId(null);
    }
  }, [weeksData, gamesData, weeks]);

  useEffect(() => {
    if (!selectedLeague) {
      setSelected(null);
      setCurrentWeekId(null);
    }
  }, [selectedLeague]);

  if (weeksLoading || gamesLoading)
    return (
      <div className="py-12 text-center">
        <Spinner aria-label="Default status example" size="xl" />
      </div>
    );
  if (weeksError) return <div>Error loading weeks</div>;
  if (gamesError) return <div>Error loading games</div>;

  const isDisabled = weeks.length === 0;

  function removeContentInParentheses(weekName: string): string {
    // Regular expression to match text within parentheses, including the parentheses
    const regex = /\(.*?\)/g;
    // Replace the matched content with an empty string
    return weekName.replace(regex, "").trim();
  }

  return (
    <>
      <Listbox value={selected} onChange={setSelected} disabled={isDisabled}>
        <div className="relative mb-2">
          <ListboxButton
            className={`relative w-full cursor-pointer rounded-md border py-1 pl-3 pr-10 text-left sm:text-sm sm:leading-6 
                        ${isDisabled ? "cursor-not-allowed bg-gray-200 text-gray-400 dark:border-gray-600 dark:bg-gray-600" : "bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"}`}
          >
            <span className="flex items-center">
              <span className="block truncate">
                {selected
                  ? `${removeContentInParentheses(selected.weekName)}${selected.sys.id === currentWeekId ? " (current week)" : ""}`
                  : "No scores available"}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon
                aria-hidden="true"
                className="size-5 text-gray-400"
              />
            </span>
          </ListboxButton>
          {weeks.length > 0 && (
            <ListboxOptions
              transition
              // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base text-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              {weeks.map((week) => (
                <ListboxOption
                  key={week.sys.id}
                  value={week}
                  className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-gray-700 data-[focus]:text-white dark:text-white dark:data-[focus]:bg-white dark:data-[focus]:text-gray-900"
                >
                  <div className="flex items-center">
                    <span className="block truncate font-normal group-data-[selected]:font-semibold">
                      {removeContentInParentheses(week.weekName)}{" "}
                      {week.sys.id === currentWeekId ? "(current week)" : ""}
                    </span>
                  </div>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-900 group-data-[focus]:text-white dark:text-white dark:group-data-[focus]:text-gray-700 [.group:not([data-selected])_&]:hidden">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          )}
        </div>
      </Listbox>
    </>
  );
}
