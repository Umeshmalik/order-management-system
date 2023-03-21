import { Pagination, Dropdown } from '@nextui-org/react';
import { useRecoilState } from 'recoil';

import { tableProps as tablePropsAtom } from "../../recoil"
import { ListApiProps } from '../../types';

const limits = [10, 50, 100, 200];

const Page = ({ totalPages }: { totalPages: number }) => {

    const [tableProps, setTableProps] = useRecoilState<ListApiProps>(tablePropsAtom)

    return <section className='flex items-center mt-5'>
        <Pagination total={totalPages} initialPage={tableProps.page} onChange={(n) => setTableProps((prev) => ({ ...prev, page: n }))} />
        <Dropdown>
            <Dropdown.Button>{tableProps.limit}</Dropdown.Button>
            <Dropdown.Menu onAction={(n) => setTableProps((prev) => ({ ...prev, limit: n as number }))}>
                {limits.map((limit) => <Dropdown.Item textValue={limit.toString()} key={limit}>{limit}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    </section>
}

export default Page;