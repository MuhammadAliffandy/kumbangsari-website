import React, { useState } from 'react';
import Select from 'react-dropdown-select';


const AppCustomDropdown = (props) => {

    const [selectedOption, setSelectedOption] = useState([]);


    const handleChange = selectedValues => {
        setSelectedOption(selectedValues);
        props.onChange(selectedValues);
    };


    return (
        <div>
        <Select
            options={props.options}
            values={selectedOption}
            onChange={handleChange}
            placeholder=""
            searchable={false}
            dropdownPosition="bottom"
            dropdownGap={0}
            style={props.style}
            dropdownHandleRenderer={props.dropdownHandle}
            itemRenderer={props.itemRenderer}
        />
        </div>
    );
};

export default AppCustomDropdown;
