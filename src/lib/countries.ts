import { createClient } from '@/utils/supabase/client'

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

export type EnabledCountry = {
    id: string,
    is_enabled: boolean,
}

const supabase = createClient()

export const updateSelectedCountries = async (countries: Country[]) => {
    try {
        await supabase.rpc('update_selected_countries', { 
            selected_countries: getSelectedCountries(countries) 
        })
    }
    catch (err) {
        console.error('Failed to update countries:', err)
    }
}

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

export const getSelectedCountries = (countries: Country[]): EnabledCountry[] => {
    const out: EnabledCountry[] = []

    for (let i = 0; i < countries.length; i++) {
        const c = countries[i]
        if (c.is_enabled !== c.is_changed) {
            out.push({
                id: c.id,
                is_enabled: c.is_changed
            })
        }
    }
    return out
}

export const selectCountry = (countries: Country[], index: number, checked: boolean): Country[] => {
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