import * as React from "react";
import { StyleContext } from "@/components/geo/template";
import { useContext } from "react";

interface CardHeaderProps {
    title: string;
    description?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = (props: CardHeaderProps) => {
    const style = useContext(StyleContext)
    return (
        <header className={`${style["card-header"]}`} >
            <CardTitle>{props.title}</CardTitle>
            {props.description &&
                <CardDescription>{props.description}</CardDescription>
            }
        </header>
    )
}

export const CardTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    ...props
}) => {
    const style = useContext(StyleContext)
    return (
        <div
            className={`${style["card-title"]}`}
            {...props}
        >
            {props.children}
        </div>
    )
}

export const CardDescription: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    ...props
}) => {
    const style = useContext(StyleContext)
    return (
        <div
            className={`${style["card-description"]}`}
            {...props}
        >
            {props.children}
        </div>
    )
}