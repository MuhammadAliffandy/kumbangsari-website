import React, { useState } from 'react';
import Select from 'react-select';

const options = [
    { value: '#makanan', label: '#makanan' },
    { value: '#music', label: '#music' },
    { value: '#baksomantap', label: '#baksomantap' },
    { value: '#olahraga', label: '#olahraga' },
    { value: '#minuman', label: '#minuman' },
    { value: '#yummy', label: '#yummy' },
    { value: '#surabaya', label: '#surabaya' },
    { value: '#snack', label: '#snack' },
];

function MySelect() {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    const handleButtonClick = () => {
        // Menambah opsi pertama ke dalam opsi yang sudah dipilih
        setSelectedOptions(prevSelectedOptions => [options[0], ...prevSelectedOptions]);
    };

    return (
        <div>
            <Select
                value={selectedOptions}
                onChange={handleChange}
                options={options}
                isMulti
            />
            <button onClick={handleButtonClick}>Tambah Nilai</button>
        </div>
    );
}

export default MySelect;
