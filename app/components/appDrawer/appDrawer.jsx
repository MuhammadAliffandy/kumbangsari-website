import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const AppDrawer = (props) => {

    const [open , setOpen ] = useState(false)

    return(
        <Box>
            <FontAwesomeIcon onClick={()=>{setOpen(!open)}} icon={ props.icon || faBars} color='black' className='text-[28px] cursor-pointer' />
            <Drawer
                anchor={'left'}
                open={open}
                onClose={()=>{setOpen(!open)}}
            >
            {props.children}
            </Drawer>
        </Box>
    )
}

export default AppDrawer;