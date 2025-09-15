import * as React from "react"
import { JSX } from "react"

const Button = (props: {
    className: string,
    onClick: React.MouseEventHandler,
    children: string | JSX.Element | JSX.Element[]
}) => {
    return (
        <button
            className={props.className}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button