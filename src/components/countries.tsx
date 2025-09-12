import React, { useState } from "react";
import { createClient } from '@/utils/supabase/client'
const supabase = createClient()

export type Country = {
    index: number,
    id: string,
    continent_id: string,
    continent_name: string,
    name: string,
    flag: string,
    tld: string,
    prefix: string,
    is_eu: boolean,
    is_enabled: boolean,
    is_changed: boolean,
};

export const getCountries = async (setCountries: Function) => {
    try {
        const { data, error } = await supabase.from('country_details').select(
            'id, continent_id, continent_name, name, flag, tld, prefix, is_eu, is_enabled')
        if (error) {
            console.error('Error fetching countries:', error)
            return
        }

        setCountries(
            (data ?? []).map((item: any, index: number) => ({
                index: index,
                id: item.id,
                continent_id: item.continent_id,
                continent_name: item.continent_name,
                name: item.name,
                flag: item.flag,
                tld: item.tld,
                prefix: item.prefix,
                is_eu: item.is_eu,
                is_enabled: item.is_enabled,
                is_changed: item.is_enabled,
            }))
        )
    } catch (err) {
        console.error('Failed to fetch countries:', err)
    }
}

export const CountriesPage = (props: {
    countries: Country[],
    setCountries: Function,
}) => {

    //const [countryId, setCountryId] = useState<string>('');
    const [countryIndex, setCountryIndex] = useState(-1)

    //console.log('countries 0', props.countries)

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
    console.clear()
    console.log('countries', JSON.stringify(props.countries, null, 4))

    return (
        <main>
            <ul className="top-panel">
                <li>
                    <button onClick={async () => {
                        const enabledCountries = sendCountries(props.countries)
                        console.log('enabledCountries', JSON.stringify(enabledCountries, null, 4))
                        const { data, error } = await supabase.rpc('update_selected_countries', { enabled_countries: [enabledCountries] })
                    }}>Save</button>
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
                    onChange={(e) => {
                        props.setCountries(
                            checkCountry(
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
                }>Select</button>
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

const sendCountries = (countries: Country[]): string => {
    const out: [string, boolean][] = []

    for (let i = 0; i < countries.length; i++) {
        const c = countries[i]

        if (c.is_enabled !== c.is_changed) {
            out.push([c.id, c.is_changed])
        }
    }
    return JSON.stringify(out)
}

const checkCountry = (countries: Country[], index: number, checked: boolean): Country[] => {
    const co: Country[] = []

    for (let i = 0; i < countries.length; i++) {
        const c = countries[i]
        let isChecked = c.is_changed

        if (index === i) {
            isChecked = checked
        }

        co.push({
            index: index,
            id: c.id,
            continent_id: c.continent_id,
            continent_name: c.continent_name,
            name: c.name,
            flag: c.flag,
            tld: c.tld,
            prefix: c.prefix,
            is_eu: c.is_eu,
            is_enabled: c.is_enabled,
            is_changed: isChecked
        })
    }
    return co
}