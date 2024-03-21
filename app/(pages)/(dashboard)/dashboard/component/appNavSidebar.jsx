'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const AppNavSidebar = (props) => {
    return (
        <Box onClick={props.onClick}  className='bg-CUSTOM-GREY-LIGHT w-[100%] rounded-[10px]'>
            <Typography className='p-[10px]'>
                {props.text}
            </Typography>
        </Box> 
    )
}

export default AppNavSidebar