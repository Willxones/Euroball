import { useState } from "react";
import DivisionSection, { Division } from "./DivisionSection";
import LeaguePicker, { League } from "./LeaguePicker";
import { useQuery } from "@apollo/client";
import { GET_DIVISIONS_BY_LEAGUE } from "../../queries";
import ReactGA from "react-ga4"
import { Spinner } from "flowbite-react";

export default function Standings() {
    ReactGA.send({
        hitType: "pageview",
        page: `/standings`,
        title: `Standings`
      })
    const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

    const { loading: loadingDivisions, error: errorDivisions, data: dataDivisions } = useQuery(GET_DIVISIONS_BY_LEAGUE, {
        variables: { leagueName: selectedLeague?.name },
        skip: !selectedLeague, // Skip the query if selectedLeague is null
    });

    return (
        <>
            <LeaguePicker onLeagueChange={setSelectedLeague} />
            {loadingDivisions && <div className="py-12 text-center"><Spinner aria-label="Default status example" size="xl" /></div>}
            {errorDivisions && <p>Error: {errorDivisions.message}</p>}
            {selectedLeague && !loadingDivisions && !errorDivisions && dataDivisions && dataDivisions.divisionCollection.items.length === 0 && (
                <div className="py-12 text-center text-gray-800 dark:text-white">Sorry, there are no standings available for this league</div>
            )}
            {dataDivisions && dataDivisions.divisionCollection.items.length > 0 && dataDivisions.divisionCollection.items.map((division: Division | null) => (
                <DivisionSection key={division?.sys.id} division={division} />
            ))}
        </>
    );
}

