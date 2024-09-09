import { Team } from "./DivisionSection"
import { Table } from "flowbite-react"

interface TeamRowProps {
    team: Team
}

export default function TeamRow({team}: TeamRowProps) {
    return(
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="flex whitespace-nowrap font-medium text-gray-900 dark:text-white ">
                <img className="mr-2 size-7 rounded-md bg-gray-200 object-cover p-1 dark:bg-transparent" src={team.logo.url} alt={`${team.locationName} ${team.teamName} logo`} /> <div className="my-auto">{team.locationName} {team.teamName}</div>
            </Table.Cell>
            <Table.Cell>{team.wins}</Table.Cell>
            <Table.Cell>{team.draws}</Table.Cell>
            <Table.Cell>{team.losses}</Table.Cell>
            <Table.Cell>{team.pointsFor}</Table.Cell>
            <Table.Cell>{team.pointsAgainst}</Table.Cell>
        </Table.Row>
    )
}
