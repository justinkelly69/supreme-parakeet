import { Field } from "@/lib/types";
import { FlexBox, FlexCell } from "../ui/xflex"
import style from '@/app/world/page.module.css';

const Table = (props: {
    fields: string[][],
    widths: number[],
}) => {
    return (
        <FlexBox
            flexDirection={"column"}
            flexWrap="nowrap"
            alignItems={"stretch"}
            justifyContent={"flex-start"}
            className={style["city-container"]}
            height={"1.6em"}
        >
            {props.fields.map((field, index) => {
                return (
                    <FlexCell
                        key={index}
                        flex="1 0 1em"
                        overflowX="hidden"
                        overflowY="hidden"
                        className={style["table-value-cell"]}
                    >
                        <TableRow
                            field={field}
                            widths={props.widths}
                        />
                    </FlexCell>
                )
            })}
        </FlexBox>
    )
}

const TableRow = (props: {
    field: string[],
    widths: number[],
}) => {
    return (
        <FlexBox
            flexDirection={"row"}
            flexWrap="nowrap"
            alignItems={"stretch"}
            justifyContent={"flex-start"}
            className={style["city-container"]}
            height={"auto"}
        >
            <FlexCell
                flex={`${props.widths[0]} 0 1em`}
                overflowX="hidden"
                overflowY="hidden"
                className={style["table-value-cell"]}
            >
                <span>{props.field[0]}</span>
            </FlexCell>
            <FlexCell
                flex={`${props.widths[1]} 0 1em`}
                overflowX="hidden"
                overflowY="hidden"
                className={style["table-value-cell"]}
            >
                <span>{props.field[1]}</span>
            </FlexCell>
        </FlexBox>
    )
}

export default Table