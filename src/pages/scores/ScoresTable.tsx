import { League } from "./LeaguePicker";

interface ScoresTableProps {
    selectedLeague: League | null;
  }

export default function ScoresTable({ selectedLeague }: ScoresTableProps) {
    return (
        <>
        {selectedLeague?.name}
        
        </>
    )
}