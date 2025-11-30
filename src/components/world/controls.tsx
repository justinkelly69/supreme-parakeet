import { fetchWorld } from "@/lib/fetch-data"
import { Continent } from "@/lib/types"
import Link from "next/link"



export const WorldButtons = (props: {
    continents: Continent[]
}) => {

    return (
        <ul>
            {props.continents.map((continent) => (
                <li key={continent.id}>
                    <Link href={`/world/${continent.id}`}>
                        <a>{continent.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
