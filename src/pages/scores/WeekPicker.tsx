import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_WEEKS_BY_LEAGUE, GET_GAMES_BY_WEEKS } from "../../queries";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { League } from "./LeaguePicker";

export type Week = {
    sys: {
        id: string;
    }
    weekName: string;
    isPlayoffWeek: boolean;
}

export type Game = {
    sys: {
        id: string;
    }
    dateAndTime: string;
    week: {
        sys: {
            id: string;
        }
        weekName: string;
    };
    homeScore: number | null;
    awayScore: number | null;
}

interface WeekPickerProps {
    selectedLeague: League | null;
    onWeekChange: (week: Week | null) => void;
}
interface WeekCollection {
    items: Week[];
    total: number;
}

interface GameCollection {
    items: Game[];
    total: number;
}

interface GetWeeksResponse {
    weekCollection: WeekCollection;
}

interface GetGamesResponse {
    gameCollection: GameCollection;
}

export default function WeekPicker({ selectedLeague, onWeekChange }: WeekPickerProps) {
    const limit = 60;
    const { data: weeksData, loading: weeksLoading, error: weeksError } = useQuery<GetWeeksResponse>(
        GET_WEEKS_BY_LEAGUE,
        {
            variables: { limit, leagueName: selectedLeague?.name },
            skip: !selectedLeague,
        }
    );

    const weekIds = weeksData?.weekCollection.items.map(week => week.sys.id) || [];
    const { data: gamesData, loading: gamesLoading, error: gamesError } = useQuery<GetGamesResponse>(
        GET_GAMES_BY_WEEKS,
        {
            variables: { limit, weekIds },
            skip: weekIds.length === 0,
        }
    );

    const [selected, setSelected] = useState<Week | null>(null);
    const [currentWeekId, setCurrentWeekId] = useState<string | null>(null);
    useEffect(() => {
        onWeekChange(selected);
    }, [onWeekChange, selected]);

    useEffect(() => {
        if (weeksData && gamesData) {
            const playedGames = gamesData.gameCollection.items.filter(game => game.homeScore !== null || game.awayScore !== null);
            const mostRecentGame = playedGames.reduce((latest, game) => {
                return new Date(game.dateAndTime) > new Date(latest.dateAndTime) ? game : latest;
            }, playedGames[0]);

            if (mostRecentGame) {
                const mostRecentWeek = weeksData.weekCollection.items.find(week => week.sys.id === mostRecentGame.week.sys.id);
                setSelected(mostRecentWeek || null);
                setCurrentWeekId(mostRecentWeek?.sys.id || null);
            } else if (weeksData.weekCollection.items.length > 0) {
                setSelected(weeksData.weekCollection.items[0]);
                setCurrentWeekId(null);
            } else {
                setSelected(null);
                setCurrentWeekId(null);
            }
        } else if (weeksData && weeksData.weekCollection.items.length === 0) {
            setSelected(null);
            setCurrentWeekId(null);
        }
    }, [weeksData, gamesData]);

    useEffect(() => {
        if (!selectedLeague) {
            setSelected(null);
            setCurrentWeekId(null);
        }
    }, [selectedLeague]);

    if (weeksLoading || gamesLoading) return <div>Loading...</div>;
    if (weeksError) return <div>Error loading weeks</div>;
    if (gamesError) return <div>Error loading games</div>;

    const weeks: Week[] = weeksData?.weekCollection?.items || [];
    const isDisabled = weeks.length === 0;

    return (
        <>
            <Listbox value={selected} onChange={setSelected} disabled={isDisabled}>
                <div className="relative my-2">
                    <ListboxButton className={`relative w-full cursor-pointer rounded-md border py-1 pl-3 pr-10 text-left sm:text-sm sm:leading-6 
                        ${isDisabled ? 'cursor-not-allowed bg-gray-200 text-gray-400 dark:border-gray-600 dark:bg-gray-600' : 'bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white'}`}>
                        <span className="flex items-center">
                            <span className="block truncate">{selected ? `${selected.weekName}${selected.sys.id === currentWeekId ? ' (current week)' : ''}` : 'No scores available'}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon aria-hidden="true" className="size-5 text-gray-400" />
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
                                            {week.weekName} {week.sys.id === currentWeekId ? '(current week)' : ''}
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

