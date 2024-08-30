import React, {useState, forwardRef, useImperativeHandle} from 'react';
import Editor from "@monaco-editor/react";
import type {IRef} from "@/pages/Api/Definition/TabItem/type"

const VanillaJSONEditor = ({value, changeValue}: {
    value: any,
    changeValue: (value: any) => void
}, ref) => {

    const [error, setError] = useState<any>(null);
    const [json, setJson] = useState(value);
    const handleEditorChange = (value: any, event: any) => {
        try {
            // JSON.parse(value);
            setJson(JSON.parse(value));
            changeValue(JSON.parse(value));
            setError(null);
        } catch (e) {
            if (!value) {

                changeValue(null)
            }
            setError('非法json, 请检查并修正');
        }
    };
    useImperativeHandle(ref, () => ({
        getInfo: () => json
    }))
    return (
        <>
            <div className="h-full">
                {error && <div>{error}</div>}
                <div className="h-full">
                    <Editor
                        defaultValue={value}
                        height="100%"
                        defaultLanguage="json"

                        onChange={handleEditorChange}
                    />
                </div>
            </div>
        </>

    );
}
export default forwardRef<IRef>(VanillaJSONEditor);