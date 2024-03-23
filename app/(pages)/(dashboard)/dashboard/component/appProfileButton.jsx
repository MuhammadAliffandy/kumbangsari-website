import Box from '@mui/material/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const AppProfileButton = (props) => {
    return(
        <Box onClick = {props.onClick} className='cursor-pointer flex items-center bg-TEXT-5 shadow-CUSTOM-2 gap-[15px] py-[5px] px-[15px] rounded-[18px]'>
            <FontAwesomeIcon className='text-TEXT-3' icon={faChevronDown} />
            <Box>
                <p className='text-TEXT-1 text-[14px] font-medium'>{props.name || 'Chaewon' }</p>
                <p className='text-TEXT-3 text-[12px]'>{props.countProduct || '2 Produk '}</p>
            </Box>
            <Box>
                <img className='w-[40px] h-[40px] rounded-[100%]' src={props.image}/>
            </Box>
        </Box>
    )
}

export default AppProfileButton;