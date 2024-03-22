import Box from '@mui/material/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const AppProfileButton = (props) => {
    return(
        <Box className='flex items-center bg-PRIMARY-500 gap-[20px] py-[5px] px-[15px] rounded-[18px]'>
            <FontAwesomeIcon icon={faChevronDown} />
            <Box>
                <p className='text-NEUTRAL-100 text-[16px] font-medium'>{props.name || 'Robert' }</p>
                <p className='text-TEXT-05 text-[14px]'>{props.countProduct || '2 Produk '}</p>
            </Box>
            <Box>
                <img className='w-[40px] h-[40px] rounded-[100%]' src={props.image}/>
            </Box>
        </Box>
    )
}

export default AppProfileButton;