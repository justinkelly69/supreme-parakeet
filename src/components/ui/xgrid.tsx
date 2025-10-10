import { StyleContext } from "@/app/protected/countries/page"
import * as React from "react"
import { useContext } from "react"

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

export const GridContainer = (props: {
    cols: string,
    rows: string,
    flex?: string,
    justifyItems?: string,
    alignItems?: string,
    justifyContent?: string,
    gap?: string,
    className?: string,
    children: React.JSX.Element | React.JSX.Element[] | null
}) => {
    return (
        <div
            className={props.className}
            style={{
                display: 'grid',
                flex: props.flex,
                gridTemplateColumns: props.cols,
                gridTemplateRows: props.rows,
                justifyItems: props.justifyItems,
                alignItems: props.alignItems,
                justifyContent: props.justifyContent,
                gap: props.gap || 0,
            }}>
            {props.children}
        </div>
    )
}

export const GridArea = (props: {
    gridRowStart: number,
    gridRowEnd: number,
    gridColumnStart: number,
    gridColumnEnd: number,
    className?: string,
    children: React.JSX.Element | React.JSX.Element[] | string | null
}) => {
    return (
        <div
            className={props.className}
            style={{
                gridRowStart: props.gridRowStart,
                gridRowEnd: props.gridRowEnd,
                gridColumnStart: props.gridColumnStart,
                gridColumnEnd: props.gridColumnEnd,
            }}>
            {props.children}
        </div>
    )
}

