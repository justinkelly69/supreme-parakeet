"use client"

import React, { use } from "react";
import { StyleContext } from "@/app/protected/geo/page";

const Page = ({
    params,
}: {
    params: Promise<{ country: string, city: string, attraction: string }>
}): React.JSX.Element | "Loading..." | null => {


    const { country: country, city: city, attraction: attraction } = use(params)



    return (

        <h1>Welcome to {attraction} in {city} in {country}</h1>

    )
}

export default Page