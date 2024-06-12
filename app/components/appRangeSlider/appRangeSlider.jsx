import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const AppRangeSlider = (props) => {
    const [value, setValue] = React.useState([20, 37]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.onChange(newValue)
    };

    return (
        <Box className={`${props.className || 'w-auto'}` } >
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={ props.value ? props.value : value}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
        </Box>
    );
}

export default AppRangeSlider;