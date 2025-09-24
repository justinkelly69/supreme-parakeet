import * as React from "react"
import { JSX, Ref } from "react"
import styled from 'styled-components';

export const Label = (props: {
    htmlFor: string,
    className?: string,
    children: string | JSX.Element | JSX.Element[]
    ref?: Ref<HTMLLabelElement> | null
}) => {
    return (
        <label
            htmlFor={props.htmlFor}
            className={props.className}
            ref={props.ref}
        >
            {props.children}
        </label>
    )
}
