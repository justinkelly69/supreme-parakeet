import React, { JSX, ReactElement } from "react"

export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse"

export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse"

export type AlignItems = "stretch" | "flex-start" | "flex-end" | "start" | "end" |
    "center" | "baseline" | "last-baseline"

export type JustifyContent = "start" | "end" | "left" | "right" | "normal" | "flex-start" |
    "flex-end" | "center" | "space-around" | "space-between" | "space-evenly" | "stretch"

export type Overflow = "visible" | "hidden" | "clip" | "scroll" | "auto"



export const FlexBox = (props: {
    flexDirection?: FlexDirection,
    flexWrap?: FlexWrap,
    alignItems?: AlignItems,
    justifyContent?: JustifyContent,
    className?: string,
    height?: string | number,
    overflowX?: Overflow,
    overflowY?: Overflow,
    children?: ReactElement[] | ReactElement,
}) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: props.alignItems,
            flexDirection: props.flexDirection,
            flexWrap: props.flexWrap,
            justifyContent: props.justifyContent,
            height: props.height,
            overflowX: props.overflowX,
            overflowY: props.overflowY,
        }}>
            {props.children}
        </div>
    )
}


export const FlexCell = (props: {
    flex: string,
    overflowX: Overflow,
    overflowY: Overflow,
    className?: string,
    tagName?: string,
    children: ReactElement[] | ReactElement,
}) => {
    const tagName = (props.tagName || 'div') as keyof JSX.IntrinsicElements
    return React.createElement(
        tagName,
        {
            className: props.className,
            style: {
                flex: props.flex,
                overflowX: props.overflowX,
                overflowY: props.overflowY,
            },
        },
        props.children
    )
}


