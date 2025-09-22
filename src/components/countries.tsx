'use client'

import React, { useState } from "react";
import {
    Continent, Country, filterSelectedCountries, selectCountry,
    setContinentData, updateSelectedCountries
} from "@/lib/countries";
import Button from "./ui/xbutton";
import Select from "./ui/xselect";
import { Checkbox, CheckBoxData, CheckboxGroup } from "./ui/xcheckboxes";
import { GridContainer, GridItem, em } from "./ui/xgrid";

export const CountriesPage = (props: {
    countries: Country[],
    setCountries: Function,
    continents: Continent[],
    setContinents: Function,
}) => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
    const [selectedContinents, setSelectedContinents] = useState([])
    const [showEnabled, setShowEnabled] = useState('BOTH')

    return (
        <>
            <CountriesHeader
                countries={props.countries}
                setShowEnabled={setShowEnabled}
                showEnabled={showEnabled}
                continentData={setContinentData(props.continents)}
                selectedContinents={selectedContinents}
                setSelectedContinents={setSelectedContinents}
            />
            <CountriesTable
                countries={props.countries}
                setCountries={props.setCountries}
                setSelectedCountry={setSelectedCountry}
                selectedCountry={selectedCountry}
                setShowEnabled={setShowEnabled}
                showEnabled={showEnabled}
                selectedContinents={selectedContinents}
                children={[]} />
        </>
    )
}

const CountriesHeader = (props: {
    countries: Country[],
    setShowEnabled: Function,
    showEnabled: string,
    continentData: CheckBoxData[],
    selectedContinents: string[],
    setSelectedContinents: Function,
}) => {

    return (
        <header className="top-panel">
            <div className="top-panel-items">
                <div className="top-panel-item top-panel-1">
                    {props.showEnabled === 'BOTH' && (
                        <Button
                            className="save-countries-button"
                            onClick={() => updateSelectedCountries(props.countries)}
                            ref={null}
                        >
                            Save
                        </Button>
                    )}
                </div>
                <div className="top-panel-item top-panel-2">
                    <Select className="show-enabled-dropdown"
                        value={props.showEnabled}
                        onChange={(e) => props.setShowEnabled(e.target.value)}
                        options={[
                            { value: "BOTH", label: "Both" },
                            { value: "ENABLED", label: "Enabled" },
                            { value: "DISABLED", label: "Disabled" },
                        ]}
                        ref={null}
                    />
                </div>
                <div className="top-panel-item top-panel-3">
                    <CheckboxGroup
                        label="Select Continents"
                        className="continent-list"
                        labelClass="continent-list-item"
                        boxClass="continent-list-box"
                        checkedValues={props.selectedContinents}
                        setCheckedValues={props.setSelectedContinents}
                        checkboxData={props.continentData}
                        ref={null}
                    />
                </div>
            </div>
        </header>
    )
}

const CountriesTable = (props: {
    children: any[];
    countries: Country[],
    setCountries: Function,
    setSelectedCountry: Function,
    selectedCountry: Country | null,
    setShowEnabled: Function,
    showEnabled: string,
    selectedContinents: string[],
}) => {

    const colWidths = props.showEnabled === 'BOTH' ?
        em([2, 8, 18, 2, 2, 2, 3]) :
        em([2, 8, 18, 2, 2, 3])

    const selectedCountries = filterSelectedCountries(
        props.selectedContinents,
        props.countries,
        props.showEnabled,
    )

    return (
        <main className="main">
            <GridContainer
                cols={colWidths}
                rows={`repeat(${selectedCountries.length}, 1fr)`}
                justifyContent="center"
                gap="1px"
                className="countries"
            >
                {selectedCountries.map((country) => {
                    return (
                        <CountryRow
                            key={country.id}
                            className="country-cell"
                            setSelectedCountry={props.setSelectedCountry}
                            country={country}
                            selectedCountries={selectedCountries}
                            setCountries={props.setCountries}
                            showEnabled={props.showEnabled}
                            selectedContinents={props.selectedContinents}
                        />
                    )
                })}
            </GridContainer>
        </main >
    );
}

const CountryRow = (props: {
    setSelectedCountry: Function,
    country: Country,
    className: string,
    selectedCountries: Country[],
    setCountries: Function,
    showEnabled: string,
    selectedContinents: string[]
}) => {

    return (
        <>
            <GridItem
                className={props.className}
                selected={props.country.is_enabled}
            >
                {props.country.id}
            </GridItem>

            <GridItem
                className={props.className}
                selected={props.country.is_enabled}
            >
                {props.country.continent_name}
            </GridItem>

            <GridItem
                className={props.className}
                selected={props.country.is_enabled}
            >
                {props.country.name}
            </GridItem>

            <GridItem
                className={props.className}
                selected={props.country.is_enabled}
            >
                {props.country.flag}
            </GridItem>

            <GridItem
                className={props.className}
                selected={props.country.is_enabled}
            >
                {props.country.is_eu ? 'Yes' : 'No'}
            </GridItem>

            {props.showEnabled === 'BOTH' && (
                <GridItem
                    className={props.className}
                    selected={props.country.is_enabled}
                >
                    <Checkbox
                        label=""
                        name={props.country.id}
                        checked={props.country.is_enabled}
                        boxClass="checkbox"
                        labelClass="checkbox_label"
                        onChange={(e) => {
                            props.setCountries(
                                selectCountry(
                                    props.selectedCountries,
                                    props.country,
                                    e.target.checked
                                )
                            )
                        }}
                        ref={null}
                    />
                </GridItem>
            )}

            <GridItem
                className={props.className}
                selected={props.country.is_enabled}
            >
                <Button
                    onClick={e => {
                        props.setSelectedCountry(props.country)
                    }}
                    className={""}
                    children={"View"}
                    ref={null}
                />
            </GridItem>
        </>
    )
}

