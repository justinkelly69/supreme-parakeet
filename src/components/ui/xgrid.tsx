import * as React from "react"


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

