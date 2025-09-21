import * as React from "react"
import { ChangeEventHandler, Ref } from "react"
import styled from 'styled-components';

const Input = styled.input<{ 
    $inputColor?: string,
    $backgroundColor?: string,
 }>`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.$inputColor || "#140653ff"};
  background: ${props => props.$backgroundColor || "#f7eca3ff"};;
  border: none;
  border-radius: 3px;
`;


export const Text = (props: {
    id: string,
    name: string,
    value: string,
    placeholder?: string,
    size?: number,
    maxlength?: number,
    pattern?: string,
    className?: string,
    onChange:ChangeEventHandler<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
}) => {
    return (
        <Input type="text"
            id={props.id}
            name={props.name}
            value={props.value}
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
            defaultValue={props.value}
            placeholder={props.placeholder}
            rows={props.rows}
            cols={props.cols}
            className={props.className}
            ref={props.ref}
        />
    )
}
