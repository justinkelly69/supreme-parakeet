import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Attraction, City, ContinentCountry, ContinentWithCountries, Country, CountryCities, EnabledDisabled, EnabledItem, SortBy, SortOrder } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const em = (values: number[]) => valueSequence(values, "em")
export const fr = (values: number[]) => valueSequence(values, "fr")

const valueSequence = (values: number[], type: string) => {
    const out = []
    for (const w of values) {
        out.push(`${w}${type}`)
    }
    return out.join(' ')
}

export const emTotal = (values: number[]) => valueTotal(values, "em")
export const frTotal = (values: number[]) => valueTotal(values, "fr")

const valueTotal = (values: number[], type: string) => {
    let out: number = 0
    for (let w = 0; w < values.length; w++) {
        out += values[w]
    }
    return `${out}${type}`
}


export const getSelectedItems = (items: EnabledItem[]): string[] => {
	const out: string[] = []

	for (const item of items) {
		if (item.is_enabled) {
			out.push(item.id)
		}
	}
	return out
}

export const sortEnabledDisabled = ({
	items, sortBy, sortOrder, showEnabled
}: {
	items: ContinentCountry[] | CountryCities[],
	sortBy: SortBy,
	sortOrder: SortOrder,
	showEnabled: string[]
}) => {
	return items.sort(sortNamePopulation({ sortBy, sortOrder })).filter((c) => {
		return showEnabled.includes("ENABLED") && c.is_enabled === true ||
			showEnabled.includes("DISABLED") && c.is_enabled === false
	})
}

export const sortNamePopulation = ({
	sortBy, sortOrder
}: {
	sortBy: SortBy,
	sortOrder: SortOrder,
}): ((a: { name: string }, b: { name: string }) => number) |
	((a: { population: number }, b: { population: number }) => number) => {

	if (sortBy === "name") {
		return (a: { name: string }, b: { name: string }) => {
			if (sortOrder === "asc") {
				return a.name.localeCompare(b.name);
			} else {
				return b.name.localeCompare(a.name);
			}
		}
	}

	else {
		return (a: { population: number }, b: { population: number }) => {
			if (sortOrder === "asc") {
				return a.population - b.population;
			} else {
				return b.population - a.population;
			}
		}
	}
}

// export const getCategoriesFromAttractions = (attractions: Attraction[]):string[] => {
// 	const categoriesSet: Set<string> = new Set()

// 	for (const attraction of attractions) {
// 		categoriesSet.add(attraction.category_name)

// 		for (const category of attraction.categories) {
// 			categoriesSet.add(category)
// 		}
// 	}

// 	return Array.from(categoriesSet)
// }