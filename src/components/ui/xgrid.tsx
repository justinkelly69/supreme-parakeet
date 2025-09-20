import * as React from "react"


export const em = (widths: number[]) => {
    const out = []
    for (const w of widths) {
        out.push(`${w}em`)
    }
    return out.join(' ')
}

export const fr = (widths: number[]) => {
    const out = []
    for (const w of widths) {
        out.push(`${w}fr`)
    }
    return out.join(' ')
}

export const GridContainer = (props: {
    cols: string,
    rows: string,
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

export const GridItem = (props: {
    selected?: boolean,
    className: string,
    children: React.JSX.Element | React.JSX.Element[] | string | null
}) => {
    const className: string = props.selected ?
        `${props.className} ${props.className}-selected` :
        `${props.className}`

    return (
        <div className={className}>
            <div className={`${props.className}-data`}>
                {props.children}
            </div>
        </div>
    )
}