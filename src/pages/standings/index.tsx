import { useState } from "react";
import DivisionSection, { Division } from "./DivisionSection";
import LeaguePicker, { League } from "./LeaguePicker";
import { useQuery } from "@apollo/client";
import { GET_DIVISIONS_BY_LEAGUE } from "../../queries";
import ReactGA from "react-ga4"

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
            {loadingDivisions && <p>Loading divisions...</p>}
            {errorDivisions && <p>Error: {errorDivisions.message}</p>}
            {selectedLeague && !loadingDivisions && !errorDivisions && dataDivisions && dataDivisions.divisionCollection.items.length === 0 && (
                <p>No standings available</p>
            )}
            {dataDivisions && dataDivisions.divisionCollection.items.length > 0 && dataDivisions.divisionCollection.items.map((division: Division | null) => (
                <DivisionSection key={division?.sys.id} division={division} />
            ))}
        </>
    );
}

