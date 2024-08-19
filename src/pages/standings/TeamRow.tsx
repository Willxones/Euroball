import { Team } from "./DivisionSection"
import { Table } from "flowbite-react"

interface TeamRowProps {
    team: Team
}

export default function TeamRow({team}: TeamRowProps) {
    return(
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="flex whitespace-nowrap font-medium text-gray-900 dark:text-white ">
                <img className="mr-2 size-5 object-cover" src={team.logo.url} alt={`${team.locationName} ${team.teamName} logo`} /> {team.locationName} {team.teamName}
            </Table.Cell>
            <Table.Cell>{team.wins}</Table.Cell>
            <Table.Cell>{team.draws}</Table.Cell>
            <Table.Cell>{team.losses}</Table.Cell>
            <Table.Cell>{team.pointsFor}</Table.Cell>
            <Table.Cell>{team.pointsAgainst}</Table.Cell>
        </Table.Row>
    )
}
