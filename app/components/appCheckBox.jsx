import React from 'react';

const  AppCheckBox = (props) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="flex items-center">
            <input
            type="checkbox"
            className="h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded-[20px]"
            checked={checked}
            onChange={handleChange}
            />
            <label className="ml-2 text-sm text-gray-700 font-poppins text-[10px] font-bold">{props.label}</label>
        </div>
    );
}

export default AppCheckBox;
