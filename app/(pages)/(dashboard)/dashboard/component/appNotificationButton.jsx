import Box from '@mui/material/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const AppNotificationButton = (props) => {
    return(
        <Box>
            <FontAwesomeIcon className='text-TEXT-1 text-[22px]' icon={faBell}/>
        </Box>
    )
}

export default AppNotificationButton;