import {Radio} from 'antd';
import {ContentType} from "@/utils/RequestMethod"
import VanillaJSONEditor from "@/components/VanillaJSONEditor";
import {useState, forwardRef, useImperativeHandle, useRef, Ref} from "react"
import DataTable from "@/pages/Api/Definition/TabItem/DataTable";
import type {IRef} from "./type"

const Body = (props: any, ref: any) => {
    const [radioValue, setRadioValue] = useState('none')
    const bodyJsonRef = useRef<IRef>(null)
    const [jsonValue, setJsonValue] = useState<any>();
    const onChange = (e: any) => {

        setRadioValue(e.target.value)
    }
    const changeJson = (record: any) => {
        if (record) {
            setJsonValue(JSON.stringify(record))
        } else {
            setJsonValue(null)
        }

    }

    useImperativeHandle(ref, () => ({
        getInfo: () => JSON.parse(jsonValue || '{}')
    }))
    return (
        <div className="-mt-1">
            <Radio.Group onChange={onChange} value={radioValue}>
                {
                    ContentType.map(item => {
                        return (
                            <Radio value={item.value}>{item.name}</Radio>
                        )
                    })
                }
            </Radio.Group>
            <div className="mt-6">
                {
                    radioValue === 'none' &&
                    <div
                        className="w-full h-full flex items-center justify-center text-[#999] mb-4">该请求没有Body体</div>
                }
                {
                    radioValue === 'json' &&
                    <div className="h-60 overflow-hidden">
                        <VanillaJSONEditor ref={bodyJsonRef} value={jsonValue} changeValue={changeJson}/>
                    </div>
                }
                {
                    (radioValue === 'form-data' || radioValue === 'x-www-form-urlencoded') && <DataTable/>
                }
            </div>
        </div>
    )
}
export default forwardRef<IRef>(Body)