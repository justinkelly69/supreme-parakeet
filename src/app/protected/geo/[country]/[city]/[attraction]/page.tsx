"use client"

import React, { use } from "react";

const MyCountry = ({
    params,
}: {
    params: Promise<{ country_id: string, city_id: string, attraction_id: string }>
}): React.JSX.Element | "Loading..." | null => {


    const { country_id, city_id, attraction_id } = use(params)



    return (

        <h1>Welcome to {attraction_id} in {city_id} in {country_id}</h1>

    )
}

export default MyCountry