import {ApartmentOutlined, ThunderboltOutlined} from "@ant-design/icons"

interface propsType {
    onChange: (e: any) => void
}

const AddPage = ({onChange}: propsType) => {
    const handleOptionAdd = (action: string) => {
        onChange(action)
    }
    return (
        <div className="h-full w-full flex items-center justify-center">
            <div
                onClick={() => handleOptionAdd('interface')}
                className="flex flex-col w-48 h-72 bg-[#fcfcfd] rounded-md cursor-pointer border-[1px] border-[#E8E8E8] hover:shadow-xl">
                <div className="text-[#f279ce] text-[55px] flex-1 flex justify-center items-center">
                    <ApartmentOutlined/>
                </div>
                <div className="bg-[#f9fafb] py-4 flex justify-center">新建接口</div>
            </div>
            <div
                onClick={() => handleOptionAdd('quick')}
                className="ml-10 flex flex-col w-48 h-72 bg-[#fcfcfd] rounded-md cursor-pointer border-[1px] border-[#E8E8E8] hover:shadow-xl">
                <div className="text-[#68aefa] text-[55px] flex-1 flex justify-center items-center">
                    <ThunderboltOutlined/>
                </div>
                <div className="bg-[#f9fafb] py-4 flex justify-center">快捷请求</div>
            </div>
        </div>
    )

}
export default AddPage