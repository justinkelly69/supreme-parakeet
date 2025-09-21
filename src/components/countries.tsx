import React, { useState } from "react";
import { Continent, Country, selectCountry, setContinentData, updateSelectedCountries } from "@/lib/countries";
import Button from "./ui/xbutton";
import Select from "./ui/xselect";
import { Checkbox, CheckBoxData, CheckboxGroup } from "./ui/xcheckboxes";
import { RadioButtons, clearRadioButtons } from "./ui/xradiobuttons";
import { Text, TextArea } from "./ui/xtexts";
import { GridContainer, GridItem, em, fr } from "./ui/xgrid";


export const CountriesPage = (props: {
    countries: Country[],
    setCountries: Function,
    continents: Continent[],
    setContinents: Function,
}) => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
    const [selectedContinents, setSelectedContinents] = useState([])
    const [showEnabled, setShowEnabled] = useState('ENABLED')

    return selectedCountry === null ?
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
                setCountryIndex={setSelectedCountry}
                setShowEnabled={setShowEnabled}
                showEnabled={showEnabled}
                selectedContinents={selectedContinents}
                children={[]} />
        </>
        :
        <CountryDetail
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
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

    const numRows = selectedCountries.length

    return (
        <main className="main">
            <GridContainer
                cols={colWidths}
                rows={`repeat(${numRows}, 1fr)`}
                justifyContent="center"
                gap="1px"
                className="countries"
            >
                {selectedCountries.map((country, index) => {
                    return (
                        <CountryRow
                            key={country.id}
                            index={index}
                            className="country-cell"
                            setSelectedCountry={props.setCountryIndex}
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
    index: number,
    setSelectedCountry: Function,
    className: string,
    selectedCountries: Country[],
    setCountries: Function,
    showEnabled: string,
    selectedContinents: string[]
}) => {
    const country = props.selectedCountries[props.index]
    const isEnabled = country.is_enabled

    return (
        <>
            <GridItem className={props.className} selected={isEnabled}>{country.id}</GridItem>
            <GridItem className={props.className} selected={isEnabled}>{country.continent_name}</GridItem>
            <GridItem className={props.className} selected={isEnabled}>{country.name}</GridItem>
            <GridItem className={props.className} selected={isEnabled}>{country.flag}</GridItem>
            <GridItem className={props.className} selected={isEnabled}>{country.is_eu ? 'Yes' : 'No'}</GridItem>
            {props.showEnabled === 'BOTH' && (
                <GridItem className={props.className} selected={isEnabled}>
                    <Checkbox
                        label=""
                        name={country.id}
                        checked={country.is_enabled}
                        boxClass="checkbox"
                        labelClass="checkbox_label"
                        onChange={(e) => {
                            props.setCountries(
                                selectCountry(
                                    props.selectedCountries,
                                    props.index,
                                    e.target.checked
                                )
                            )
                        }}
                        ref={null}
                    />
                </GridItem>
            )}
            <GridItem className={props.className} selected={isEnabled}>
                <button onClick={e => {
                    props.setSelectedCountry(
                        props.selectedCountries.find(e => e.id === country.id)
                    )
                }
                }>View</button>
            </GridItem>
        </>
    )
}

const CountryDetail = (props: {
    selectedCountry: Country | null,
    setSelectedCountry: Function,
}) => {

    const colWidths: string = em([30, 10])
    const rowWidths: string = em([2, 4, 20, 20])

    return (
        <main className="main">
            <GridContainer
                cols={colWidths}
                rows={rowWidths}
                justifyContent="center"
                alignItems="center"
                gap="1px"
                className="country"
            >
                <GridItem className="country-back">
                    <Button
                        onClick={e => props.setSelectedCountry(null)}
                        className={""}
                        children={"Back to List"}
                        ref={null}
                    />
                </GridItem>
                <GridItem className="country-save">
                    <>
                        <Button
                            onClick={e => e}
                            className={""}
                            children={"Save"}
                            ref={null}
                        />
                        <Button
                            onClick={e => e}
                            className={""}
                            children={"Cancel"}
                            ref={null}
                        />
                    </>
                </GridItem>
                <GridItem className="country-heading">
                    {` ${props.selectedCountry?.continent_name} > ${props.selectedCountry?.name}`}
                </GridItem>
                <GridItem className="country-flag">
                    {`${props.selectedCountry?.flag}`}
                </GridItem>
                <GridItem className="country-map">
                    <TextArea
                        id="country_map"
                        name="country_map"
                        value="Map"
                        placeholder="Map"
                        rows={10}
                        cols={30}
                        className="country-map"
                        ref={null}
                    />
                </GridItem>
                <GridItem className="country-details">
                    {"Map Settings"}
                </GridItem>
                <GridItem className="country-description">
                    <TextArea
                        id="country_description"
                        name="country_description"
                        value="Description"
                        placeholder="Description"
                        rows={10}
                        cols={30}
                        className="country-description"
                        ref={null}
                    />
                </GridItem>
                <GridItem className="country-details">
                    <table className="country-detils-table">
                        <tbody>
                            <tr>
                                <th>TLD:</th>
                                <td>{props.selectedCountry?.tld}</td>
                            </tr>
                            <tr>
                                <th>Dialling Code:</th>
                                <td>{props.selectedCountry?.prefix}</td>
                            </tr>
                            <tr>
                                <th>EU Member: </th>
                                <td>{props.selectedCountry?.is_eu ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <th>Enabled:</th>
                                <td>{props.selectedCountry?.is_enabled ? 'Yes' : 'No'}</td>
                            </tr>
                        </tbody>
                    </table>
                </GridItem>
            </GridContainer>
        </main>
    );
}

