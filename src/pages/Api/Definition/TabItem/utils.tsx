import FormTable from "@/components/FormTable";

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
export const HeaderTable = ({onChange}: {
    onChange: (e: any) => void
}) => {
    console.log("雄安的")

    return (
        <div>
            <FormTable columns={headerColumns} onChangeValue={(e) => {
                console.log(e, '11')

                onChange(e)
            }}/>
        </div>
    )
}