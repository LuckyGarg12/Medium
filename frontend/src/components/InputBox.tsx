interface InputBoxInit  {
    inId:string,
    label:string,
    placeholder:string,
    type?:string,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}


export const InputBox = ({inId, label, placeholder, onChange, type }:InputBoxInit) => {
    return (
        <div>
            <div className="test-sm font-semibold text-left py-2 pt-4">
                {label}
            </div>
            <input id={inId} onChange={onChange} placeholder={placeholder} type={type} className="w-full shadow-sm border-0 rounded h-10 px-2 focus:outline-slate-300" />
        </div>
    )
}