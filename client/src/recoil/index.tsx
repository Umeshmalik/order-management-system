import { atom } from "recoil";

export const tableProps = atom({
    key: "tableProps",
    default: {
        page: 1,
        sort: "createdAt",
        limit: 10,
        key: "orderId",
        value: ""
    }
})