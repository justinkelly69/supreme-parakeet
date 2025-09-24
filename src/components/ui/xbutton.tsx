import * as React from "react"
import { JSX, Ref } from "react"

export const Button = (props: {
    type?: "submit" | "reset" | "button" | undefined,
    className?: string,
    onClick?: React.MouseEventHandler,
    children: string | JSX.Element | JSX.Element[]
    disabled?: boolean,
    ref?: Ref<HTMLButtonElement>
}) => {
    return (
        <button
            type={props.type}
            className={props.className}
            onClick={props.onClick}
            ref={props.ref}
        >
            {props.children}
        </button>
    )
}

