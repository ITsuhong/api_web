import {data} from "autoprefixer";

const ResponseHead = (props: {
    data: { key: string, value: string } []
}) => {
    return (
        <>
            {
                props.data.length ? <div className="border-[1px] w-full rounded-md border-b-0 select-text">
                    <div className="flex items-center border-b-[1px]">
                        <div className=" flex-[2] border-r-[1px] py-2 pl-3">名称</div>
                        <div className=" flex-[6] py-1 pl-3">值</div>
                    </div>
                    {
                        props?.data?.map(item => {
                            return <div className="flex items-center border-b-[1px] hover:bg-[#f6f6f7]" key={item.key}>
                                <div className="flex-[2] border-r-[1px] py-2 pl-3">{item.key}</div>
                                <div className=" flex-[6] py-1 pl-3 break-all whitespace-normal">{item.value}</div>
                            </div>
                        })
                    }
                </div> : <div className="text-textSecondary">暂无数据</div>
            }
        </>

    )
}

export default ResponseHead