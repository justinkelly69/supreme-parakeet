import React, { useState } from "react";
import { Continent, Country, selectCountry, setContinentData, updateSelectedCountries } from "@/lib/countries";
import Button from "./ui/xbutton";
import Select from "./ui/xselect";
import { Checkbox, CheckBoxData, CheckboxGroup } from "./ui/xcheckboxes";
import { RadioButtons, clearRadioButtons } from "./ui/xradiobuttons";
import { Text } from "./ui/xtexts";


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
            />
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
                {/* <li>
                    <Button className="save-countries"
                        onClick={() => {
                            console.log(JSON.stringify(props.selectedContinents))
                        }}
                        ref={null}
                    >
                        Selected Continents
                    </Button>
                </li> */}
                {/* <li>
                    <RadioButtons
                        label='buttons'
                        name='stooges'
                        className='buttonz'
                        labelClass='buttonz-labelz'
                        radioButtonsData={[
                            { 'label': 'Larry', 'value': 'larry' },
                            { 'label': 'Curly', 'value': 'curly' },
                            { 'label': 'Moe', 'value': 'moe' },
                        ]}
                        checkedValue={stooge}
                        setCheckedValue={setStooge}
                        ref={null}
                    />
                    <Button className="clear-buttonz"
                        onClick={e => clearRadioButtons('stooges')}
                        ref={null}
                    >
                        Clear Stooges
                    </Button>
                </li> */}
                {/* <li>
                    <Text
                        id='txt'
                        name='txt'
                        value={text}
                        placeholder='Place Holder'
                        size={20}
                        maxlength={30}
                        className='klass'
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setText(e.target.value)}
                        ref={null}
                    /><br/>
                    <div>{text}</div>
                </li> */}
            </div>
        </header>
    )
}

const CountriesTable = (props: {
    countries: Country[],
    setCountries: Function,
    setCountryIndex: Function,
    setShowEnabled: Function,
    showEnabled: string,
    selectedContinents: string[],
}) => {

    return (
        <main>
            <table className="countries_table">
                <thead>
                    <tr>
                        <th className="id_col">ID</th>
                        <th className="continent_col">Continent</th>
                        <th className="name_col">Name</th>
                        <th className="flag_col">Flag</th>
                        <th className="eu_col">EU Member</th>
                        {props.showEnabled === 'BOTH' && (
                            <th className="enabled_col">Enabled</th>
                        )}
                        <th className="details_col">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {props.countries.map((country, index) =>
                        <CountryRow
                            key={country.id}
                            index={index}
                            setCountryIndex={props.setCountryIndex}
                            countries={props.countries}
                            setCountries={props.setCountries}
                            showEnabled={props.showEnabled}
                            selectedContinents={props.selectedContinents}
                        />
                    )}
                </tbody>
            </table>
        </main>
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

    return (
        (props.showEnabled === 'BOTH' ||
            (country.is_enabled === true && props.showEnabled === 'ENABLED') ||
            (country.is_enabled === false && props.showEnabled === 'DISABLED')))
        && props.selectedContinents.includes(country.continent_id) ?

        <tr>
            <td className="id_col">{country.id}</td>
            <td className="continent_col">{country.continent_name}</td>
            <td className="name_col">{country.name}</td>
            <td className="flag_col">{country.flag}</td>
            <td className="eu_col">{country.is_eu ? 'Yes' : 'No'}</td>
            {props.showEnabled === 'BOTH' && (
                <td className="details_col">
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
                </td>
            )}
            <td>
                <button onClick={e =>
                    props.setCountryIndex(props.index)
                }>View</button>
            </td>
        </tr> :
        null

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

