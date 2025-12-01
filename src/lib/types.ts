export type StyleContextType = {
    [key: string]: string;
}

export type SortBy = "name" | "population"
export type SortOrder = "asc" | "desc"
export type EnabledDisabled = "ENABLED" | "DISABLED"

export type Field = {
    name: string,
    value: string,
}

export type Continent = {
    id: string,
    name: string,
    description: string,
    longitude: number,
    latitude: number,
    zoom: number,
}

export type ContinentCountries = {
    continent_id: string;
    id: string,
    name: string,
}

export type ContinentWithCountries = {
    id: string,
    name: string,
    description: string,
    longitude: number,
    latitude: number,
    zoom: number,
    countries: ContinentCountry[],
}

export type ContinentCountryCity = {
    id: string,
    name: string,
    name_ascii?: string,
    population?: number,
    flag?: string,
    is_enabled?: boolean,
    capital?: string,
}

export type ContinentCountry = {
    id: string,
    name: string,
    population: number,
    flag: string,
    is_enabled: boolean,
}

export type Country = {
    id: string,
    continent_id: string,
    continent_name: string,
    name: string,
    flag: string,
    tld: string,
    prefix: string,
    is_eu: boolean,
    is_enabled: boolean,
    was_enabled: boolean,
    description: string,
    latitude: number,
    longitude: number,
    zoom: number,
    iso2: string,
    demonym: string,
    population: number,
    density: number,
    area: number,
    gdp: number,
    median_age: number,
    website: string,
    driving_side: string,
    un_member: boolean,
    religion: string,
    cities: CountryCities[],
};

export type CountryCities = {
    id: string,
    name: string,
    name_ascii: string,
    population: number,
    is_enabled: boolean,
    capital: string,
}

export type EnabledItem = {
    id: string,
    is_enabled: boolean,
}

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
    attractions: Attraction[]
}

export type CityHeader = {
    id: string,
    name_ascii: string,
    capital: string,
    population: string,
}

export type CityAttraction = {
    id: number,
    cityId: string,
    title: string,
    subtitle: string,
    latitude: number,
    longitude: number,
    imageUrl: string,
}

type OpeningHour = {
    "day": string,
    "hours": string
}

type AdditionalInfo = {
    [name: string]: AdditionalInfoItem[]
}

type AdditionalInfoItem = {
    [name: string]: boolean
}

export type Attraction = {
    id: number,
    cityId: string,
    title: string,
    subtitle: string,
    description: string,
    price: number,
    category: string,
    address: string,
    neighborhood: string,
    street: string,
    postcode: string,
    state: string,
    city: string,
    country: string,
    website: string,
    phone: string,
    phoneUnformatted: string,
    claimThisBusiness: boolean,
    latitude: number,
    longitude: number,
    locatedIn: string,
    totalScore: number,
    permanentlyClosed: boolean,
    temporarilyClosed: boolean,
    placeId: string,
    categories: string[],
    scrapedAt: string,
    openingHours: OpeningHour[],
    additionalInfo: AdditionalInfo[],
    imageUrl: string,
}

