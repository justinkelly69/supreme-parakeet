import * as React from "react"
import { Ref } from "react"

export const Checkbox = (props: {
    name: string,
    checkedValues: string[],
    setCheckedValues: (names: string[]) => void,
    className?: string,
    ref: Ref<HTMLInputElement>
}) => {
    return (
        <input type="checkbox"
            name={props.name}
            className={props.className}
            defaultChecked={props.checkedValues.includes(props.name)}
            onChange={e => {
                if (e.target.checked === true) {
                    props.setCheckedValues([...props.checkedValues, props.name])
                }
                else {
                    props.setCheckedValues(props.checkedValues.filter(e => e !== props.name))
                }
            }}
            ref={props.ref}
        />
    )
}
