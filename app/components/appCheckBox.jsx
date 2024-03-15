import React, { useEffect } from 'react';

const  AppCheckBox = (props) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        const status = event.target.checked;
        setChecked(status);
        props.onChange( status ? props.value : '' ,props.label)
    };


    console.log(props.status)

    React.useEffect(()=>{
        if(props.status === 'reset'){
            setChecked(false)
        }
    },[props.status])

    return (
        <div className="flex items-center">
            <input
                value = {props.value || ''}
                type="checkbox"
                className="h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded-[20px]"
                checked={checked}
                onChange={(event)=>{
                    handleChange(event)
                }}
            />
            <label className="ml-2 text-sm text-gray-700 font-poppins text-[10px] font-medium">{props.label}</label>
        </div>
    );
}

export default AppCheckBox;