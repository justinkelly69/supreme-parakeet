import * as React from "react"
import { ChangeEventHandler, Ref } from "react"
import styled from 'styled-components';

export const Input = (props: {
    id: string,
    type: string,
    name: string,
    value?: string,
    required?:boolean,
    placeholder?: string,
    size?: number,
    maxlength?: number,
    pattern?: string,
    className?: string,
    onChange:ChangeEventHandler<HTMLInputElement>,
    ref?: Ref<HTMLInputElement>
}) => {
    return (
        <input
            id={props.id}
            type={props.type}
            name={props.name}
            value={props.value}
            required={props.required}
            placeholder={props.placeholder}
            size={props.size}
            maxLength={props.maxlength}
            pattern={props.pattern}
            className={props.className}
            onChange={props.onChange}
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
            defaultValue={props.value}
            placeholder={props.placeholder}
            rows={props.rows}
            cols={props.cols}
            className={props.className}
            ref={props.ref}
        />
    )
}
