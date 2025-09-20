import React, { useState } from "react";
import { Continent, Country, selectCountry, setContinentData, updateSelectedCountries } from "@/lib/countries";
import Button from "./ui/xbutton";
import Select from "./ui/xselect";
import { Checkbox, CheckBoxData, CheckboxGroup } from "./ui/xcheckboxes";
import { RadioButtons, clearRadioButtons } from "./ui/xradiobuttons";
import { Text } from "./ui/xtexts";
import { GridContainer, GridItem, em, fr } from "./ui/xgrid";


export const CountriesPage = (props: {
    countries: Country[],
    setCountries: Function,
    continents: Continent[],
    setContinents: Function,
}) => {
    const [countryIndex, setCountryIndex] = useState(-1)
    const [selectedContinents, setSelectedContinents] = useState([])
    const [showEnabled, setShowEnabled] = useState('ENABLED')

    return countryIndex < 0 ?
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
                setCountryIndex={setCountryIndex}
                setShowEnabled={setShowEnabled}
                showEnabled={showEnabled}
                selectedContinents={selectedContinents}
                children={[]} />
        </>
        :
        <CountryDetail
            country={props.countries[countryIndex]}
            setCountryIndex={setCountryIndex}
        />
}

const CountriesHeader = (props: {
    countries: Country[],
    setShowEnabled: Function,
    showEnabled: string,
    continentData: CheckBoxData[],
    selectedContinents: string[],
    setSelectedContinents: Function,
}) => {
    const [stooge, setStooge] = useState('larry')
    const [text, setText] = useState('')

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
    setCountryIndex: Function,
    setShowEnabled: Function,
    showEnabled: string,
    selectedContinents: string[],
}) => {

    const colWidths = props.showEnabled === 'BOTH' ?
        em([2, 8, 18, 2, 2, 2, 3]) :
        em([2, 8, 18, 2, 2, 3])

    let selectedCountries: Country[] = []

    for (const c of props.selectedContinents) {
        const countries = props.countries.filter((e => e.continent_id === c))

        for (const co of countries) {
            selectedCountries.push(co)
        }

        if (props.showEnabled === 'ENABLED') {
            selectedCountries = selectedCountries.filter((e => e.is_enabled === true))
        }

        else if (props.showEnabled === 'DISABLED') {
            selectedCountries = selectedCountries.filter((e => e.is_enabled === false))
        }
    }
    console.log(JSON.stringify(props.selectedContinents, null, 4))
    console.log(JSON.stringify(selectedCountries, null, 4))

    const numRows = selectedCountries.length

    return (
        <main className="main">
            <GridContainer
                cols={colWidths}
                rows={`repeat(${numRows}, 1fr)`}
                justifyContent="center"
                //alignItems="center"
                gap="1px"
                className="countries-bg"
            >
                {selectedCountries.map((country, index) =>
                    <CountryRow
                        key={country.id}
                        index={index}
                        setCountryIndex={props.setCountryIndex}
                        countries={selectedCountries}
                        setCountries={props.setCountries}
                        showEnabled={props.showEnabled}
                        selectedContinents={props.selectedContinents}
                    />
                )}
            </GridContainer>
        </main >
    );
}

const CountryRow = (props: {
    index: number,
    setCountryIndex: Function,
    countries: Country[],
    setCountries: Function,
    showEnabled: string,
    selectedContinents: string[]
}) => {
    const country = props.countries[props.index]
    const className = country.is_enabled ? "country-cell country-cell-selected" : "country-cell"

    return (
        <>
            <GridItem className={className} data={false}>{country.id}</GridItem>
            <GridItem className={className} data={false}>{country.continent_name}</GridItem>
            <GridItem className={className} data={false}>{country.name}</GridItem>
            <GridItem className={className}>{country.flag}</GridItem>
            <GridItem className={className} data={false}>{country.is_eu ? 'Yes' : 'No'}</GridItem>
            {props.showEnabled === 'BOTH' && (
                <GridItem className={className} data={false}>
                    <Checkbox
                        label=""
                        name={country.id}
                        checked={country.is_enabled}
                        boxClass="checkbox"
                        labelClass="checkbox_label"
                        onChange={(e) => {
                            props.setCountries(
                                selectCountry(
                                    props.countries,
                                    props.index,
                                    e.target.checked
                                )
                            )
                        }}
                        ref={null}
                    />
                </GridItem>
            )}
            <GridItem className={className} data={false}>
                <button onClick={e =>
                    props.setCountryIndex(props.index)
                }>View</button>
            </GridItem>
        </>
    )
}

const CountryDetail = (props: {
    country: Country,
    setCountryIndex: Function,
}) => {
    return (
        <div>
            <h2>{props.country.name} Details</h2>
            <p>Continent: {props.country.continent_name}</p>
            <p>Flag: {props.country.flag}</p>
            <p>TLD: {props.country.tld}</p>
            <p>Dial Prefix: {props.country.prefix}</p>
            <p>EU Member: {props.country.is_eu ? 'Yes' : 'No'}</p>
            <p>Enabled: {props.country.is_enabled ? 'Yes' : 'No'}</p>
            <button onClick={e => props.setCountryIndex(-1)}>Back to list</button>
        </div>
    );
}

