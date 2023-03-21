import { Input } from "@nextui-org/react";
import { NextInputProps } from "../types";

const NextInput = ({type, props}: NextInputProps) => type === "password" ? <Input.Password css={{marginBottom: props?.helperText ? "$10" : "$1"}} placeholder="start typing..." clearable {...props} type={type} /> : <Input css={{marginBottom: props?.helperText ? "$10" : "$1"}} placeholder="start typing..." clearable {...props} type={type}/>

export {
    NextInput
}