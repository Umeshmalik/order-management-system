import { useEffect, useMemo, useState } from 'react';
import { Table } from '@nextui-org/react';
import moment from "moment";
import { useRecoilValue } from 'recoil';

import api from '../../lib/api';
import { ListApiProps, OrdersList, ListResponse } from '../../types';
import { StyledBadge } from '../../lib/StyledStatus';
import Search from './Search';
import Pagination from "./Pagination";
import { tableProps as tablePropsAtom } from "../../recoil"

const columns = ["S.No", "Order Id", "Vendor Name", "Pickup Date", "Status"]

const getOrders = async ({ page, limit, sort, key, value }: ListApiProps) => await api({ url: `/api/orders/list?page=${page}&limit=${limit}&sort=${sort}&key=${key}&value=${value}`, method: "GET" })

const Orders = () => {

    const tableProps = useRecoilValue<ListApiProps>(tablePropsAtom)
    const [isLoading, setIsLoading] = useState<"loading" | "idle">("loading");
    const [response, setResponse] = useState<ListResponse>({
        docs: []
    });


    useEffect(() => {
        isLoading !== "loading" && setIsLoading("loading");
        getOrders(tableProps).then((res) => setResponse(res.data)).finally(() => setIsLoading("idle"))
    }, [tableProps.limit, tableProps.page, tableProps.value])

    const list = useMemo(() => response.docs.map((doc, idx) => ({ ...doc, sNo: idx + ((tableProps?.page - 1) * tableProps?.limit) + 1 })), [response?.docs])

    return (
        <section className='flex flex-col justify-center items-center w-full p-5'>
            <Search />
            <Table
                bordered
                lined
                shadow={false}
                color="secondary"
                aria-label="Orders pagination  table"
                css={{
                    height: "auto",
                }}
                containerCss= {{
                    width: "100%"
                }}
            >
                <Table.Header>
                    {columns.map((col, key) => <Table.Column key={key}>{col}</Table.Column>)}
                </Table.Header>
                <Table.Body
                    loadingState={isLoading}
                >
                    {list.map((dt: OrdersList) => (<Table.Row key={dt.orderId}>
                        <Table.Cell>{dt.sNo}</Table.Cell>
                        <Table.Cell>{dt.orderId}</Table.Cell>
                        <Table.Cell>{dt.vendorName}</Table.Cell>
                        <Table.Cell>{moment(dt.pickupDate).format("MMM DD YYYY").toLocaleString()}</Table.Cell>
                        <Table.Cell><StyledBadge type={dt?.status}>{dt.status}</StyledBadge></Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Pagination
                totalPages={response.totalPages as number}
            />
        </section>
    );
}

export default Orders;