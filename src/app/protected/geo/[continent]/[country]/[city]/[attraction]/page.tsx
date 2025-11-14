"use client"
import React from "react"

export default async function Page({
    params,
}: {
    params: { continent: string, country: string, city: string }
}): Promise<React.JSX.Element> {

    return (
        <div>
             Attraction Under Construction
        </div>
    )
}