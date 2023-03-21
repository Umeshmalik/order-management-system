import { z } from "zod";
import { Method } from "axios";

export interface UserInfo {
    name?: string,
    email?: string,
    token?: string
}

export interface Field {
    label: string,
    name: "name" | "email" | "password" | "confirmPassword",
    type: "text" | "password",
    ref: any,
    validation: z.ZodString,
    helperText?: string,
    helperColor?: string
}

export interface SignInField extends Field {
    name : "email" | "password"
}

export type SignInFields = Array<SignInField>

export type SignUpFields = Array<Field>

export interface NextInputProps {
    type: "text" | "password", 
    props: {
        helperText?: string
    }
}

export interface ApiProps {
    url: string, 
    method: Method, 
    body?: object, 
}

export interface ListApiProps {
    page: number,
    limit: number,
    sort: string,
    key: string,
    value: string,
}

export interface OrdersList {
    sNo: number,
    orderId: string
    vendorName: string,
    pickupDate: string,
    status: "shipped" | "cancelled" | "pending"
}

export interface ListResponse {
    docs: Array<OrdersList>,
    hasNextPage?: boolean,
    hasPrevPage?: boolean,
    limit?: number,
    nextPage?: number,
    page?: number,
    pagingCounter?: number,
    prevPage?: number,
    totalDocs?: number,
    totalPages?: number
}