import { useQuery } from "@apollo/client";
import { League } from "./LeaguePicker"
import { Table } from "flowbite-react";
import { GET_TEAMS_BY_DIVISION } from "../../queries";
import TeamRow from "./TeamRow";

interface DivisionProps {
    division: Division | null
}

export interface Division {
    sys: {
        id: string
    }
    name: string
    league: League
}

export interface Team {
    sys: {
        id: string
    }
    position: number
    locationName: string
    teamName: string
    logo: {
        url: string
    }
    wins: number
    draws: number
    losses: number
    pointsFor: number
    pointsAgainst: number
    division: Division
}

export default function DivisionSection({division}: DivisionProps) {
    const { loading: loadingTeams, error: errorTeams, data: dataTeams } = useQuery(GET_TEAMS_BY_DIVISION, {
        variables: { divisionId: division?.sys.id },
    });

    if (loadingTeams) return <p>Loading teams...</p>;
    if (errorTeams) return <p>Error: {errorTeams.message}</p>;

    const teams: Team[] = dataTeams?.teamCollection?.items || [];

    return (
        <>
            <div className="dark:text-white">
                <div>
                    <h2 className="py-2 text-2xl">{division?.name}</h2>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Team</Table.HeadCell>
                            <Table.HeadCell>Wins</Table.HeadCell>
                            <Table.HeadCell>Draws</Table.HeadCell>
                            <Table.HeadCell>Losses</Table.HeadCell>
                            <Table.HeadCell>PF</Table.HeadCell>
                            <Table.HeadCell>PA</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                teams.map(team => (
                                    <TeamRow key={team.sys.id} team={team} />
                                ))
                            }
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    )
}
