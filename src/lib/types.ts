export type StyleContextType = {
    [key: string]: string;
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
    id: string,
    name: string,
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
    cities: [{
        id: string,
        name: string,
        capital: string,
    }]
};

export type CountryCities = {
    id: string,
    name: string,
    capital: string,
}

export type EnabledCountry = {
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
}

export type CityHeader = {
    id: string,
    name_ascii: string,
    capital: string,
    population: string,
}