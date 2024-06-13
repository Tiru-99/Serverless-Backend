
interface LabelType {
    label : string, 
    placeholder : string , 
    type : string , 
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
//Input component for smooth handlings of Input
export const Input = ({label , placeholder , type , onChange} : LabelType) =>{
    return (
        <>
            <div className="mt-2">
            <label className="block text-l font-semibold text-gray-700">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                
            />
            </div>
        </>
    )
}