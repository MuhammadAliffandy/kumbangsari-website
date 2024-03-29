import Box from '@mui/material/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from "react-responsive";

const AppProfileButton = (props) => {
    
    const sm = useMediaQuery({ maxWidth: 640 });

    return(
        <Box onClick = {props.onClick} className={`cursor-pointer flex items-center bg-TEXT-5 shadow-CUSTOM-2 gap-[15px] py-[5px] ${sm ? ' px-[5px]  rounded-full' : ' px-[15px]  rounded-[18px]'}`}>
        {

            sm ? 
                null
            :

                <>
                    <FontAwesomeIcon className='text-TEXT-3' icon={faChevronDown} />
                    <Box>
                        <p className='text-TEXT-1 text-[14px] font-medium'>{props.name || 'Chaewon' }</p>
                        <p className='text-TEXT-3 text-[12px]'>{props.countProduct || '2 Produk '}</p>
                    </Box>
                </>
        }
            <Box>
                <img className='w-[40px] h-[40px] rounded-[100%]' src={props.image}/>
            </Box>
        </Box>
    )
}

export default AppProfileButton;