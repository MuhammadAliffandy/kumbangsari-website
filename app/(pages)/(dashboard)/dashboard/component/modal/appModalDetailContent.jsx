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
import { createContentAIManual } from '@/app/api/repository/contentRepository';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AppModalDetailContent = (props) => {

    const { push } = useRouter()
    const sm = useMediaQuery({ maxWidth: 640 });
    const md = useMediaQuery({ maxWidth: 768 });
    const lg = useMediaQuery({ maxWidth: 1024 });
    const xl = useMediaQuery({ maxWidth: 1280 });
    

    const fetchPostContent = async () => {
        try {
            if(props.platform == 'twitter'){
                const resTwitterId = await twitterFindId({idProduct:props.idProduct})

                if(resTwitterId.status == 'OK'){

                    if(resTwitterId.data.twitterId == null){
                        toast.warn('Cek Konektivitas Akun Twitter Anda !!')
                        return false
                    }

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
                        props.onCloseButton(false)
                        
                    }
                    
                }else{
                    toast.error('Gagal Menemukan Id Twitter')
                }
            }

        } catch (error) {
            if(error.status == 403){
                toast.error('Jumlah Post Sudah Limit')
            }else if(error.status == 404){
                toast.error('Posting Konten Gagal')
            }else{
                toast.error('Ada Kesalahan Server (500)')
            }
        }
    }
    
    const handleAddContent = async () => {
        const data = props.data
        console.log(data)
        try {

            if(data.platform == 'twitter'){
                if(caption.length >= 280){
                    toast.warn('Caption Lebih dari 280 Karakter')
                    return false;
                }
            }

            const formData = new FormData();
            formData.append('contentTitle', data.contentTitle);
            formData.append('idProduct', props.idProduct);
            formData.append('platform', data.platform);
            formData.append('caption', data.captionPost);
            formData.append('style', data.style);
            formData.append('hashtag', props.hashtag);
            formData.append('postedAt', new Date().toISOString());
            formData.append('historyHashtag', JSON.stringify([]));
            // formData.append('historyImage', JSON.stringify([]));
            formData.append('historyCaption', JSON.stringify([]));

            formData.append('image', data.imageUrlPost);
            formData.set('files', '');
        

            const res = await createContentAIManual(formData)

            if(res.status === 'OK'){
                toast.success('Tambah Content Berhasil')
                props.onCloseButton(false)
                push('/dashboard/calendar')

            }
        } catch (error) {
            if(error.status == 404 ){
                toast.error('Tambah Content Gagal')
            }else{
                toast.error('Ada Kesalahan Sever (500)')
            }
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
                        <Box className ={` flex flex-col gap-[8px] ${ props.caption == null && props.hashtag == null ? 'w-[100%]' :  props.image != null  ? 'w-[100%] xl:w-[50%] lg:w-[50%]' : 'w-[100%]'} text-wrap`}> 
                            { props.caption ? <p className='text-[14px] text-TEXT-1 font-semibold break-words'>{props.caption}</p> : null}
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
                            {
                                props.withAddButton ?

                                <AppButton 
                                    text ={'Tambahkan Sekarang'}
                                    type={'submit'}
                                    onClick={()=>{
                                        fetchPostContent()
                                        handleAddContent()
                                
                                    }}
                                />
                                :
                                <AppButton 
                                    text ={'Unggah Sekarang'}
                                    type={'submit'}
                                    onClick={()=>{
                                        fetchPostContent()
                                        props.onClick()
                                
                                    }}
                                />
                            }
                        </Box>
                    }
                </Box>
            </motion.div>
        </Modal>
    )
}

export default AppModalDetailContent;