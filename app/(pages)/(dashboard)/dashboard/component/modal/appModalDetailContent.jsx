'use client'

import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import AppButton from '@/app/components/appButton/appButton';
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import AppCustomButton from '@/app/components/appButton/appCustomButton';
import { listPlatform } from '@/app/utils/model';
import { useMediaQuery } from "react-responsive";
import { twitterPost , twitterFindId} from '@/app/api/repository/twitterRepository';
import { toast } from 'react-toastify';

const AppModalDetailContent = (props) => {

    const sm = useMediaQuery({ maxWidth: 640 });
    const md = useMediaQuery({ maxWidth: 768 });
    const lg = useMediaQuery({ maxWidth: 1024 });
    const xl = useMediaQuery({ maxWidth: 1280 });
    

    const fetchPostContent = async () => {
        try {

            if(props.platform == 'twitter'){
                const resTwitterId = await twitterFindId({idProduct:props.idProduct})

                if(resTwitterId.status == 'OK'){
                    const data = {
                        twitterIds:[resTwitterId.data.twitterId],
                        idContent: props.idContent,
                        tweetText:`${props.caption ||'' }\n\n${props.hashtag || ''}`,
                        imageUrls:[
                            props.image,
                        ]
                    }

                    const res = await twitterPost(data)
            
                    if(res.status == 'OK'){
                        toast.success('Posting Konten Berhasil')
                    }else{
                        toast.error('Posting Konten Gagal')
            
                    }
                }else{
                    toast.error('Gagal Menemukan Id Twitter')
                }
            }

        } catch (error) {
            toast.error('Ada Kesalahan Server (500)')
        }
    }
    

    return (
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className = {`${ xl ? 'w-[80%] xl:w-[60%]' :  props.caption == null && props.hashtag == null ?  'w-[25%]' : props.image ? 'w-[40%]' :  'w-[25%]'} h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] `}>
                {/* headline */}
                <Box className = 'flex justify-between'>
                    <p className = 'text-[18px] font-bold text-black' >Detail Konten</p>
                    <Box className='flex items-center gap-[15px]'>
                        
                    {   props.postedId != null ? null :
                        props.isDashboard ? null : 
                            <AppCustomButton className=' bg-white ' onClick={props.onEditButton}>
                                <img className='w-[18px] h-[18px] ' src={'/images/icon/edit.png'}/>
                            </AppCustomButton>
                        
                        }
                        <AppCloseButton
                            onClick = {()=>{
                                props.onCloseButton(false)
                            }}
                        />
                    </Box>
                </Box>
                {/* content  */}
                <Box className={`flex flex-col gap-[20px] w-[100%] h-[100%]`}>
                    <Box className={`${props.caption == null && props.hashtag == null ? 'flex flex-col gap-[8px] ' : 'flex flex-col xl:flex-row lg:flex-row  gap-[20px]  ' }`}>
                        {
                            props.image != null ? 
                            <Box className={`flex flex-col gap-[20px] justify-start h-auto ${ props.caption == null && props.hashtag == null ? 'w-[100%]' : 'w-[100%] xl:w-[50%] lg:w-[50%]  ' }`}>
                                <img className='w-[100%] h-[300px] rounded-[15px] object-cover' src={props.image}/>
                            </Box>: null
                        }
                        <Box className ={`flex flex-col gap-[8px] ${ props.caption == null && props.hashtag == null ? 'w-[100%]' :  props.image != null  ? 'w-[100%] xl:w-[50%] lg:w-[50%]' : 'w-[100%]'}`}> 
                            { props.caption ? <p className='text-[14px] text-TEXT-1 font-semibold'>{props.caption}</p> : null}
                            {  props.hashtag ? <p className='text-[14px] text-PRIMARY-400'>{props.hashtag}</p> : null }
                            <Box className = 'flex gap-[10px] items-center'>
                                <img className='w-[20px] h-[20px] rounded-[100%]' src={ props.platform == 'facebook'? listPlatform.facebook : props.platform == 'instagram'? listPlatform.instagram : props.platform == 'twitter'? listPlatform.twitter : null  }/>
                                <p className='text-TEXT-3 text-[13px] font-medium'>{ props.productName || 'Bakso aci mantap'}</p>
                            </Box>
                        </Box>
                    </Box>
                    {
                        props.postedId != null ? null :
                        props.withButton != null  ? null :
                        <Box className={` ${ props.caption == null && props.hashtag == null ? 'w-[100%]' :  props.image != null  ? ' w-[100%] xl:w-[50%] lg:w-[50%]' : 'w-[100%]'}`}>
                            <AppButton 
                                    text ={'Unggah Sekarang'}
                                    type={'submit'}
                                    onClick={()=>{
                                        fetchPostContent()
                                        props.onClick()
                                        console.log('update status')
                                    }}
                                />
                        </Box>
                    }
                </Box>
            </motion.div>
        </Modal>
    )
}

export default AppModalDetailContent;