import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LEAGUES } from '../../queries';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import NewsTable from './NewsTable'; // Import the NewsTable component
import debounce from 'lodash.debounce'; // Import debounce
import { TextInput } from 'flowbite-react';

export type League = {
  name: string;
  logo: {
    url: string;
  };
};

const ALL_LEAGUES_OPTION = { name: 'All Leagues', logo: { url: 'https://cdn-icons-png.flaticon.com/512/272/272611.png' } };

export default function LeaguePicker() {
  const { data, loading, error } = useQuery(GET_LEAGUES);
  const [selected, setSelected] = useState<League | null>(ALL_LEAGUES_OPTION);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (data && !selected) {
      setSelected(data.leagueCollection.items[0] || ALL_LEAGUES_OPTION);
    }
  }, [data, selected]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading leagues</div>;

  const leagues: League[] = [ALL_LEAGUES_OPTION, ...(data?.leagueCollection?.items || [])];

  // Debounced search handler
  const handleSearch = debounce((query: string) => {
    setSearchQuery(query);
  }, 300); // Debounce for 300ms

  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative my-2">
          <ListboxButton className="relative w-full cursor-pointer rounded-md border bg-white py-1 pl-3 pr-10 text-left text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm sm:leading-6">
            <span className="flex items-center">
              {selected && selected.logo.url && <img alt="" src={selected.logo.url} className="size-5 shrink-0 object-cover" />}
              <span className="ml-3 block truncate">{selected?.name}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon aria-hidden="true" className="size-5 text-gray-400" />
            </span>
          </ListboxButton>
          <ListboxOptions
            transition
            // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base text-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            {leagues.map((league) => (
              <ListboxOption
                key={league.name}
                value={league}
                className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-gray-700 data-[focus]:text-white dark:text-white dark:data-[focus]:bg-white dark:data-[focus]:text-gray-900"
              >
                <div className="flex items-center">
                  {league.logo.url && <img alt="" src={league.logo.url} className="size-5 shrink-0 object-cover" />}
                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                    {league.name}
                  </span>
                </div>
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-900 group-data-[focus]:text-white dark:text-white dark:group-data-[focus]:text-gray-700 [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      {/* Search input */}
      
      <TextInput id="small" type="text" sizing="sm" onChange={(e) => handleSearch(e.target.value)} placeholder='Search Articles'/>

      <NewsTable selectedLeague={selected} searchQuery={searchQuery} />
    </>
  );
}