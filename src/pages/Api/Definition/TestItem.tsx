import FormTable from "@/components/FormTable";
import {useState} from "react"

const headerColumns = [
    {
        name: "参数名",
        value: "name",

    },
    {
        name: "参数值",
        value: "value",

    },
    // {
    //   name: "类型",
    //   value: "type",
    // },
    {
        name: "说明",
        value: "desc",

    }
]
const TestItem = ({onChange}:{

    onChange:(e:any)=>void
}) => {

    const [value, setValue] = useState()
    return (
        <div>
            <FormTable columns={headerColumns} onChangeValue={(e) => {
                console.log(e,'11')
                // setValue(e)
                onChange(e)
            }}/>
        </div>
    )
}
export default TestItem