import { Game } from "./WeekPicker"

interface ScoreCardProps{
    game: Game
}

export default function ScoreCard({game}: ScoreCardProps) {
    return (
        <>
            {game.awayScore}
        </>
    )
}