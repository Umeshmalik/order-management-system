import { FC, useEffect, useRef } from "react";
import { Input, Dropdown } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { startCase } from "lodash";

import { tableProps as tablePropsAtom } from "../../recoil";
import { ListApiProps } from "../../types";

const searchOptions: Array<string> = ["orderId", "vendorName", "date", "status"];

const Search: FC = () => {
    const [tableProps, setTableProps] = useRecoilState<ListApiProps>(tablePropsAtom)
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.addEventListener(("keypress"), (e) => {
            const key = e.key;
            if(key === "Enter"){
                setTableProps((prev) => ({...prev, value: inputRef.current?.value as string}))
            }
        })
        return () => {
            inputRef.current?.removeEventListener(("keypress"), (e) => {
                const key = e.key;
                if(key === "Enter"){
                    setTableProps((prev) => ({...prev, value: inputRef.current?.value as string}))
                }
            })
        }
    })

    return <section className="m-3 flex w-full justify-end">
        <Dropdown>
            <Dropdown.Button>{startCase(tableProps.key)}</Dropdown.Button>
            <Dropdown.Menu onAction={(opt) => setTableProps((prev) => ({...prev, key: opt as string}))}>
                {searchOptions.map((option) => <Dropdown.Item textValue={option.toString()} key={option}>{startCase(option)}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
        <Input ref={inputRef} name="search" aria-label="search" placeholder="start typing..." defaultValue={tableProps.value} />
    </section>
}

export default Search;