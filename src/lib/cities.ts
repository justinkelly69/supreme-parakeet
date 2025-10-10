import { createClient } from '@/utils/supabase/client'

export type City = {
    id: string,
    name: string,
    name_ascii: string,
    country: string,
    country_id: string,
    iso2: string,
    iso3: string,
    admin_name: string,
    capital: string,
    population: number,
    is_enabled: boolean,
    latitude: number,
    longitude: number,
    zoom: number,
    description: string,
}

export type CityHeader = {
    id: string,
    name_ascii: string,
    capital: string,
    population: string,
}


export const fetchCities = async (
    setCities: Function,
    setIsLoading: Function,
    country_id: string
) => {
    setIsLoading(true)

    const supabase = createClient()

    //console.log('country_id', country_id)

    const { data, error } = await supabase
        .schema('public')
        .from('city_details')
        .select(`
            id,
            name,
            name_ascii,
            country,
            country_id,
            iso2,
            iso3,
            admin_name,
            capital,
            population,
            is_enabled,
            latitude,
            longitude,
            zoom,
            description
        `)
        .eq('country_id', country_id)

    if (error) {
        console.error('Error fetching cities:', error)
        return
    }
    else {
        //console.log("no error", JSON.stringify(data, null, 4))
    }

    //setCities(data)
    setCities((data ?? []).map((item: any) => ({
        id: item.id,
        name: item.name,
        name_ascii: item.name_ascii,
        country: item.country,
        country_id: item.country_id,
        iso2: item.iso2,
        iso3: item.iso3,
        admin_name: item.admin_name,
        capital: item.capital,
        population: item.population,
        is_enabled: item.is_enabled,
        latitude: item.latitude,
        longitude: item.longitude,
        zoom: item.zoom,
        description: item.description,
    })))

    //setCities((data ?? []).map((item: any) => ({item})))

    setIsLoading(false)
}

export const fetchCity = async (
    setCity: Function,
    setIsLoading: Function,
    id: string
) => {
    setIsLoading(true)

    const supabase = createClient()

    //console.log('country_id', country_id)

    const { data, error } = await supabase
        .schema('public')
        .from('city_details')
        .select(`
            id,
            name,
            name_ascii,
            country,
            country_id,
            iso2,
            iso3,
            admin_name,
            capital,
            population,
            is_enabled,
            latitude,
            longitude,
            zoom,
            description
        `)
        .eq('id', id)

    if (error) {
        console.error('Error fetching city:', error)
        return
    }
    else {
        //console.log("no error", JSON.stringify(data, null, 4))
        setCity(data)
    }

    //setCities(data)
    /* setCity({
        id: data.id,
        name: data.name,
        name_ascii: data.name_ascii,
        country: data.country,
        country_id: data.country_id,
        iso2: data.iso2,
        iso3: data.iso3,
        admin_name: data.admin_name,
        capital: data.capital,
        population: data.population,
        is_enabled: data.is_enabled,
        latitude: data.latitude,
        longitude: data.longitude,
        zoom: data.zoom,
        description: data.description,
    }) */

    //setCities((data ?? []).map((item: any) => ({item})))

    setIsLoading(false)
}