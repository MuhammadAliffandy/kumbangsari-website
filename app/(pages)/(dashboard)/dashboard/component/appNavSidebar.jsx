'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const AppNavSidebar = (props) => {
    return (
        <Box onClick={props.onClick}  className={`  w-[100%] flex items-center gap-[20px] justify-left px-[20%] ${ props.onlyButton ? 'text-TEXT-1 ' : props.active == true ? 'bg-gradient-to-br from-PRIMARY-500 to-PRIMARY-300 text-TEXT-5 ' : ' text-TEXT-1 hover:bg-gradient-to-br from-PRIMARY-500 to-PRIMARY-300 hover:text-TEXT-5 '}`}>
            <FontAwesomeIcon icon={ props.icon || faSearch} />
            <p className='py-[12px] font-poppins font-medium'>
                {props.text}
            </p>
        </Box> 
    )
}

export default AppNavSidebar