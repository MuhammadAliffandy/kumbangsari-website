'use client'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import AppButton from '@/app/components/appButton/appButton';
import AppCustomButton from '@/app/components/appButton/appCustomButton';
import { listPlatform } from '@/app/utils/model';

const AppModalDetailContent = (props) => {


    return (
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <Box className = {`${props.caption == null && props.hashtag == null ?  'w-[25%]' : props.image ? 'w-[40%]' :  'w-[25%]'} h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] border-[2px]`}>
                {/* headline */}
                <Box className = 'flex justify-between'>
                    <p className = 'text-[18px] font-bold text-black' >Detail Konten</p>
                    <Box className='flex items-center gap-[15px]'>
                        <AppCustomButton className=' bg-white ' onClick={props.onEditButton}>
                            <img className='w-[18px] h-[18px] ' src={'/images/icon/edit.png'}/>
                        </AppCustomButton>
                        <AppCloseButton
                            onClick = {()=>{
                                props.onCloseButton(false)
                            }}
                        />
                    </Box>
                </Box>
                {/* content  */}
                <Box className={`flex flex-col gap-[20px] w-[100%] h-[100%]`}>
                    <Box className={`${props.caption == null && props.hashtag == null ? 'flex flex-col gap-[8px] ' : 'flex gap-[20px] ' }`}>
                        {
                            props.image != null ? 
                            <Box className={`flex flex-col gap-[20px] justify-center ${ props.caption == null && props.hashtag == null ? 'w-[100%]' : 'w-[50%] ' }`}>
                                <img className='w-[100%] h-[100%] rounded-[15px] object-cover' src={props.image}/>
                            </Box>: null
                        }
                        <Box className ={`flex flex-col gap-[8px] ${ props.caption == null && props.hashtag == null ? 'w-[100%]' :  props.image != null  ? ' w-[50%]' : 'w-[100%]'}`}> 
                            { props.caption ? <p className='text-[14px] text-TEXT-1 font-semibold'>{props.caption}</p> : null}
                            {  props.hashtag ? <p className='text-[14px] text-PRIMARY-400'>{props.hashtag}</p> : null }
                            <Box className = 'flex gap-[10px] items-center'>
                                <img className='w-[20px] h-[20px] rounded-[100%]' src={ props.platform == 'facebook'? listPlatform.facebook : props.platform == 'instagram'? listPlatform.instagram : props.platform == 'twitter'? listPlatform.twitter : null  }/>
                                <p className='text-TEXT-3 text-[13px] font-medium'>{ props.productName || 'Bakso aci mantap'}</p>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={` ${ props.caption == null && props.hashtag == null ? 'w-[100%]' :  props.image != null  ? ' w-[50%]' : 'w-[100%]'}`}>
                        <AppButton 
                                text ={'Unggah Sekarang'}
                                type={'submit'}
                                onClick={props.onClick}
                            />
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default AppModalDetailContent;