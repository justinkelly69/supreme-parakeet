import { Country } from "@/lib/types";

const CountryDetail = (props: { country: Country }) => {
    console.log("Country", JSON.stringify(props.country, null, 4))

    return (
        <div>Country Detail for {props.country.name}</div>
    )
}

export default CountryDetail;