import ScoreCard from "./ScoreCard";

const games = [
    {
        "id": 1,
        "homeTeam": "Eagles kjdnksn mnsdkj",
        "awayTeam": "Cowboys dsfln,dskkjnskjd",
        "homeScore": 3,
        "awayScore": 10,
        "date": "10 Jun",
        "league": "ELF"
    },
    {
        "id": 2,
        "homeTeam": "Eagles",
        "awayTeam": "Cowboys",
        "homeScore": 3,
        "awayScore": 10,
        "date": "10 Jun",
        "league": "ELF"
    },
    {
        "id": 3,
        "homeTeam": "Patriots",
        "awayTeam": "Packers",
        "homeScore": 3,
        "awayScore": 10,
        "date": "10 Jun",
        "league": "ELF"
    },
    {
        "id": 4,
        "homeTeam": "Eagles",
        "awayTeam": "Cowboys",
        "homeScore": 3,
        "awayScore": 10,
        "date": "10 Jun",
        "league": "ELF"
    },
    {
        "id": 5,
        "homeTeam": "Eagles",
        "awayTeam": "Cowboys",
        "homeScore": 3,
        "awayScore": 10,
        "date": "10 Jun",
        "league": "ELF"
    },
    {
        "id": 6,
        "homeTeam": "Eagles",
        "awayTeam": "Cowboys",
        "homeScore": 3,
        "awayScore": 10,
        "date": "10 Jun",
        "league": "ELF"
    }
]

export default function ScoreTable(){
    return (
        <section className="pb-3">
            <div className="flex gap-6 overflow-x-scroll scrollbar-none">
                {games.map((game) => ScoreCard(game))}
            </div>
        </section>
    )
}