import React, { useState } from "react";
import { Country, selectCountry, updateSelectedCountries } from "@/lib/countries";


export const CountriesPage = (props: {
    countries: Country[],
    setCountries: Function,
}) => {
    const [countryIndex, setCountryIndex] = useState(-1)

    return countryIndex < 0 ?
        <CountriesTable
            countries={props.countries}
            setCountries={props.setCountries}
            setCountryIndex={setCountryIndex}
        />
        :
        <CountryDetail
            country={props.countries[countryIndex]}
            setCountryIndex={setCountryIndex}
        />
}

const CountriesTable = (props: {
    countries: Country[],
    setCountries: Function,
    setCountryIndex: Function,
}) => {

    return (
        <main>
            <ul className="top-panel">
                <li>
                    <button onClick={() =>
                        updateSelectedCountries(props.countries)
                    }>Save</button>
                </li>
            </ul>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Continent</th>
                        <th>Name</th>
                        <th>Flag</th>
                        <th>EU Member</th>
                        <th>Enabled</th>
                        <th>Details</th>
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
}) => {
    const country = props.countries[props.index]

    return (
        <tr>
            <td>{country.id}</td>
            <td>{country.continent_name}</td>
            <td>{country.name}</td>
            <td>{country.flag}</td>
            <td>{country.is_eu ? 'Yes' : 'No'}</td>
            <td>
                <input type="checkbox"
                    id={country.id}
                    name={country.id}
                    defaultChecked={country.is_enabled}
                    onChange={(e) => {
                        props.setCountries(
                            selectCountry(
                                props.countries,
                                props.index,
                                e.target.checked
                            )
                        )
                    }}
                />
            </td>
            <td>
                <button onClick={e =>
                    props.setCountryIndex(props.index)
                }>View</button>
            </td>
        </tr>
    );
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

