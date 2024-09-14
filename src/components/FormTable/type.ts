export interface ITable {
    name: string;
    value: string;
    width?: number;
    modal?: boolean;
    variable?: boolean;
}

export interface IPropsType {
    columns: ITable[];
    onChangeValue?: (e: any) => void
    dataSource?: any
}

export type IStateType = {
    value: string,
    name: string,
    type: "variable" | "text"
}

export type IRefType = {
    id: number
} & Record<any, IStateType>

