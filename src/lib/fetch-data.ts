import { createClient } from '@/utils/supabase/client'
import { Continent } from './types';
import { ApifyClient } from 'apify-client';

const supabase = createClient()

export const fetchAttractionsReal = async ({
    locationQuery,
    searchStringArray,
}: {
    locationQuery: string,
    searchStringArray: string[],
}) => {

    const client = new ApifyClient({
        token: process.env.NEXT_PUBLIC_APIFY_TOKEN,
    })

    const actorRun = await client.actor('compass/crawler-google-places').call({
        queries: {
            "allPlacesNoSearchAction": "all_places_no_search_ocr",
            "includeWebResults": false,
            "language": "en",
            "locationQuery": locationQuery,
            "maxCrawledPlacesPerSearch": 100,
            "maxImages": 0,
            "maximumLeadsEnrichmentRecords": 0,
            "scrapeContacts": false,
            "scrapeDirectories": false,
            "scrapeImageAuthors": false,
            "scrapePlaceDetailPage": false,
            "scrapeReviewsPersonalData": true,
            "scrapeTableReservationProvider": false,
            "searchStringsArray": searchStringArray,
            "skipClosedPlaces": false
        }
    })

    const { items } = await client.dataset(actorRun.defaultDatasetId).listItems();
    console.log(JSON.stringify(items, null, 4))

    return items
}

export const fetchWorld = async () => {
    // const { data, error } = await supabase
    //     .schema('public')
    //     .from('continent_details')
    //     .select('id, name, description, longitude, latitude, zoom')
    //     .order('name', { ascending: true })

    const { data, error } = await supabase.rpc('get_world_continents')

    if (error) {
        console.error('Error fetching continents:', error)
        return
    }
    return (data ?? []).map((continent: Continent) => ({ ...continent }))
}

export const fetchContinent = async (
    continent: string,
) => {
    const { data, error } = await supabase.rpc(
        'get_continent_with_countries', { 'continent_id': continent }
    )
    if (error) {
        console.error('Error fetching continent:', error)
        return
    }
    return { ...data }
}

export const fetchCountry = async (
    id: string,
) => {
    const { data, error } = await supabase.rpc(
        'get_country_with_cities', { 'country_id': id }
    )
    if (error) {
        console.error('Error fetching countries:', error)
        return
    }
    return { ...data, id }
}

export const fetchCity = async (
    id: string
) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .schema('public')
        .from('city_details')
        .select(`
            id,         name,       name_ascii,     country,    country_id,
            iso2,       iso3,       admin_name,     capital,    population,
            is_enabled, latitude,   longitude,      zoom,       description
        `)
        .eq('id', id)

    if (error || data.length === 0) {
        console.error('Error fetching city:', error)
        return
    }
    return { ...data[0] }
}

export const setEnabledCountries = async (countryIds: string[]) => {
    try {
        await supabase.rpc('set_enabled_countries', {
            enabled_countries: countryIds
        })
    }
    catch (err) {
        console.error('Failed to set enabled countries:', err)
    }
}

export const setEnabledCities = async (cityIds: string[]) => {
    try {
        await supabase.rpc('set_enabled_cities', {
            enabled_cities: cityIds
        })
    }
    catch (err) {
        console.error('Failed to set enabled cities:', err)
    }
}
