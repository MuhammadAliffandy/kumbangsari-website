import Box from '@mui/material/Box'
import AppButton from '../appButton/appButton'
import AppCustomButton from '../appButton/appCustomButton'
import AppAnimationContent from '../appAnimation/appAnimationContent'
import { listPlatform } from '@/app/utils/model'


const AppContent = (props) => {
    return(
        <AppAnimationContent className>
            <Box className={` ${  
                props.image != null && props.caption == null && props.hashtag == null ? 'flex flex-col items-center' : 
                'flex  items-center' } p-[12px] gap-[12px] rounded-[15px] shadow-CUSTOM-2 bg-white w-[100%]`} >
                {
                    props.image != null && props.caption == null && props.hashtag == null ?   
                    <Box className='flex-none '> <img src={props.image} className='rounded-[15px] w-[160px] h-[140px] object-fill' />  </Box>
                    : props.image != null ? 
                    <Box className='flex-none'> <img src={props.image} className='rounded-[15px] w-[160px] h-[120px] object-fill' /> </Box> 
                    : null
                }
                <Box className = {`grow flex flex-col gap-[8px] w-full ${props.image != null && props.caption == null && props.hashtag == null ? 'items-center' : '' }`}> 
                    {
                        props.caption ? <Box className = 'h-[34px] overflow-hidden  max-w-[90%]'>
                        <p className='text-[12px] text-TEXT-1 font-semibold break-words'>{props.caption}</p>
                        </Box> : null
                    }
                    {
                        props.hashtag ? 
                        <Box className = 'h-[18px] overflow-hidden max-w-[80%]'>
                                <p className='text-[10px] text-PRIMARY-400 break-words'>{props.hashtag}</p>
                        </Box> : null
                    }
                    {
                        props.platform ? 
                        <Box className = 'flex gap-[6px] items-center'>
                            <img className='w-[18px] h-[18px] rounded-[100%]' src={ props.platform == 'facebook'? listPlatform.facebook : props.platform == 'instagram'? listPlatform.instagram : props.platform == 'twitter'? listPlatform.twitter : null  }/>
                            <p className='text-TEXT-3 text-[10px] font-medium'>{ props.productName || 'Bakso aci mantap'}</p>
                        </Box>: null
                    }
                    <Box>
                    {
                        props.isDashboard ? 
                            <AppCustomButton className={`flex gap-[10px] items-center bg-white rounded-[20px] px-[15px] py-[5px] border-[1px] border-TEXT-4  ${props.image != null && props.caption == null && props.hashtag == null ? 'w-[100%]' : "" }`}
                            onClick={props.onClick}>
                                    { props.isDashboard ? null : <img className='w-[18px] h-[18px] ' src={'/images/icon/sparkling-black.svg'}/> }
                                    {props.isResponsive ? null : <p className="text-TEXT-1 font-bold text-[12px]">Lihat Detail</p>} 
                            </AppCustomButton>
                        :  <AppButton
                                text='Lihat Detail'
                                onClick={props.onClick}
                                className={`py-[8px] px-[14px] text-[12px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[20px] ${props.image != null && props.caption == null && props.hashtag == null ? 'w-[100%]' : "" }`}
                            />
                    }
                    </Box>
                </Box>
            </Box>
        </AppAnimationContent>
    )
}

export default AppContent;