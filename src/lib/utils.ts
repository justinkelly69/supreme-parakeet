import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const sortNamePopulation = ({
	sortBy, sortOrder: ascDesc
}: {
	sortBy: "name" | "population",
	sortOrder: "asc" | "desc"
}): ((a: { name: string }, b: { name: string }) => number) |
	((a: { population: number }, b: { population: number }) => number) => {

	if (sortBy === "name") {
		return (a: { name: string }, b: { name: string }) => {
			if (ascDesc === "asc") {
				return a.name.localeCompare(b.name);
			} else {
				return b.name.localeCompare(a.name);
			}
		}
	} 
	
	else {
		return (a: { population: number }, b: { population: number }) => {
			if (ascDesc === "asc") {
				return a.population - b.population;
			} else {
				return b.population - a.population;
			}
		}
	}
}

