import * as React from "react"
import { JSX, Ref } from "react"

const Button = (props: {
    className: string,
    onClick: React.MouseEventHandler,
    children: string | JSX.Element | JSX.Element[]
    ref: Ref<HTMLButtonElement>
}) => {
    return (
        <button
            className={props.className}
            onClick={props.onClick}
            ref={props.ref}
        >
            {props.children}
        </button>
    )
}

export default Button