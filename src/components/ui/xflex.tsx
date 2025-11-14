import { ReactElement } from "react"

export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse"
export type AlignItems = "stretch" | "flex-start" | "flex-end" | "start" | "end" |
    "center" | "baseline" | "last-baseline"
export type JustifyContent = "start" | "end" | "left" | "right" | "normal" | "flex-start" |
    "flex-end" | "center" | "space-around" | "space-between" | "space-evenly" | "stretch"
export type Overflow = "visible" | "hidden" | "clip" | "scroll" | "auto"

export const FlexBox = (props: {
    flexDirection: FlexDirection,
    alignItems: AlignItems,
    justifyContent: JustifyContent,
    height: string,
    children: ReactElement[] | ReactElement,
}) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: props.alignItems,
            flexDirection: props.flexDirection,
            justifyContent: props.justifyContent,
            height: props.height,
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
    children: ReactElement[] | ReactElement,
}) => {
    return (
        <div
            className={props.className}
            style={{
                flex: props.flex,
                overflowX: props.overflowX,
                overflowY: props.overflowY,
            }}>
            {props.children}
        </div>
    )
}


