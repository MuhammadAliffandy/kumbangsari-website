import Box from '@mui/material/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown , faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from "react-responsive";


const AppProfileButton = (props) => {
    
    const sm = useMediaQuery({ maxWidth: 640 });

    return(
        <Box key={props.key} onClick = {props.onClick} className={`cursor-pointer flex items-center justify-end  bg-TEXT-5 ${props.isItemDropDown ? '' : 'shadow-CUSTOM-2'} gap-[15px] py-[5px] ${sm ? ' px-[5px]  rounded-full w-auto' : ' px-[15px]  rounded-[18px] '}`}>
        {
            sm ? null:
                <>
                    {props.dropDownIcon ?  <FontAwesomeIcon className='text-TEXT-3' icon={ props.dropDownType ?  faChevronDown : faChevronUp } /> : null}
                    <Box className='text-right'>
                        <p className='text-TEXT-1 text-[14px] font-medium'>{props.name.split(' ')[0] || 'Username' }</p>
                        <p className='text-TEXT-3 text-[12px]'>{props.countProduct || '0 Produk '}</p>
                    </Box>
                </>
        }
            <Box>
                <img className='w-[40px] h-[40px] rounded-[100%]' src={props.image || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" }/>
            </Box>
        </Box>
    )
}

export default AppProfileButton;

