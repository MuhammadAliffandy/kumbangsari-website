import Box from '@mui/material/Box'
import AppButton from "@/app/components/appButton/appButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const AppContentFilter = (props) => {
    return(
        <Box className=' flex px-[20px] py-[10px] items-center justify-between bg-TEXT-5 rounded-[20px] shadow-CUSTOM-2'>
            <Box className= 'flex gap-[10px] items-center '>
                <img className='w-[40px] h-[40px] rounded-[100%]' src={props.iconImage}/>
                <Box className='flex flex-col gap-[2px]'>
                    <p className='text-TEXT-4 text-[12px]'>{ props.subtitle || 'Bakso aci mantap'}</p>
                    <p className='text-TEXT-1 text-[16px] font-semibold'>{ props.title || 'Khasiat Bakso Aci' }</p>
                    <p className='text-TEXT-4 text-[12px]'>{ props.contentTypes || 'Gambar, caption, hasgtag'  }</p>
                </Box>
            </Box>
            <button type={'button'} onClick={props.onClick} className={`bg-transparent`}>
                <img className='w-[22px] h-[22px] ' src={'/images/icon/trash.png'}/>
                
            </button>
        </Box>
    )
}

export default AppContentFilter;