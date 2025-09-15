import * as React from "react"
import { Ref } from "react"

export const Text = (props: {
    id: string,
    name: string,
    value: string,
    placeholder?: string,
    size?: number,
    maxlength?: number,
    pattern?: string,
    className?: string,
    ref: Ref<HTMLInputElement>
}) => {
    return (
        <input type="text"
            id={props.id}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            size={props.size}
            maxLength={props.maxlength}
            pattern={props.pattern}
            className={props.className}
            ref={props.ref}
        />
    )
}

export const Password = (props: {
    id: string,
    name: string,
    value: string,
    placeholder?: string,
    size?: number,
    maxlength?: number,
    className?: string,
    ref: Ref<HTMLInputElement>
}) => {
    return (
        <input type="password"
            id={props.id}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            size={props.size}
            maxLength={props.maxlength}
            className={props.className}
            ref={props.ref}
        />
    )
}

export const TextArea = (props: {
    id: string,
    name: string,
    value: string,
    placeholder?: string,
    rows?: number,
    cols?: number,
    className?: string,
    ref: Ref<HTMLTextAreaElement>
}) => {
    return (
        <textarea
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            rows={props.rows}
            cols={props.cols}
            className={props.className}
            ref={props.ref}
        >
            {props.value}
        </textarea>
    )
}
