'use client'

import { useState} from 'react';
import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import AppButton from '@/app/components/appButton/appButton';
import AppCustomModal from '@/app/components/appModal/AppCustomModal'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import AppCustomButton from '@/app/components/appButton/appCustomButton';
import { listPlatform } from '@/app/utils/model';
import { useMediaQuery } from "react-responsive";
import { twitterPost , twitterFindId} from '@/app/api/repository/twitterRepository';
import { facebookPost} from '@/app/api/repository/facebookRepository';
import { instagramPost} from '@/app/api/repository/instagramRepository';
import { createContentAIManual, deleteContent, editContentAIManual, updateContentStatus } from '@/app/api/repository/contentRepository';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import AppToastPending from '@/app/components/AppToastPending/appToastPending'

const AppModalDetailContent = (props) => {

    const { push } = useRouter()
    const xl = useMediaQuery({ maxWidth: 1280 });
    
    const [ modalDeleteContent , setModalDeleteContent ] = useState(false)

    const fetchEditContent = async () => {
        const data = props.data
        const formData = new FormData();
        formData.append('contentTitle', data.productName);
        formData.append('idProduct', props.idProduct);
        formData.append('platform', data.platform);
        formData.append('caption', data.caption);
        formData.append('style', data.style);
        formData.append('hashtag', props.hashtag);
        formData.append('postedAt', new Date().toISOString());
        formData.append('historyHashtag', JSON.stringify([]));
        // formData.append('historyImage', JSON.stringify([]));
        formData.append('historyCaption', JSON.stringify([]));

        formData.append('image', data.image);
        formData.set('files', '');
    

        await editContentAIManual(data.idContent , formData)
    }

    const fetchUpdateContentStatus = async (idContent) => {
        try {
            const res = await updateContentStatus({
                idContent : idContent,
                status : props.caption != '' && props.hashtag != '' && props.image != null ? 'COMPLETED' : 'INCOMPLETED'
            })

            if(res.status == 'OK'){
                return
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server (500)')
        }
    }

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
                        imageUrls:  props.image ? [
                            props.image,
                        ] : []
                    }

                    const res = await twitterPost(data)
            
                    if(res.status == 'OK'){
                        toast.success('Posting Konten Twitter Berhasil')
                        props.onCloseButton(false)
                        
                    }
                    
                }else{
                    toast.error('Gagal Menemukan Id Twitter')
                }
            }

            if(props.platform == 'instagram'){

                try {
                    const data = {
                        idContent: props.idContent,
                        caption:`${props.caption ||'' }\n\n${props.hashtag || ''}`,
                        imageUrl:props.image,
                    }
    
                    const res = await instagramPost(data)
    
                    if(res.status == 'OK'){
                        toast.success('Posting Konten Instagram Berhasil')
                        props.onCloseButton(false)
                        
                    }
                } catch (error) {
                    if(error.status == 400){
                        toast.warn('Cek Konektivitas Akun Instagram Anda !!')
                        return false
                    }
                }
            }

            if(props.platform == 'facebook'){

                try {
                    const data = {
                        idContent: props.idContent,
                        caption:`${props.caption ||'' }\n\n${props.hashtag || ''}`,
                        imageUrl:props.image,
                    }
    
                    const res = await facebookPost(data)
    
                    if(res.status == 'OK'){
                        toast.success('Posting Konten Facebook Berhasil')
                        props.onCloseButton(false)
                        
                    }
                } catch (error) {
                    if(error.status == 400){
                        toast.warn('Cek Konektivitas Akun Facebook Anda !!')
                        return false
                    }
                }
            }

            if(props.isGenerate){
                fetchEditContent()
            }
            push('/dashboard/calendar')
            props.onDone()

        } catch (error) {

            if(error.status == 403){
                toast.error('Jumlah Post Sudah Limit')}
            else if(error.status == 403){
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

            formData.append('image', data.imageUrlPost);
            formData.set('files', '');
        

            const res = await createContentAIManual(formData)

            if(res.status === 'OK'){
                fetchUpdateContentStatus(res.data.idContent)
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

    const handleAddContentAI = async () => {
        try {

            const formData = new FormData();
            formData.append('contentTitle', props.contentTitle);
            formData.append('idProduct', props.idProduct);
            formData.append('platform', props.platform);
            formData.append('caption', props.caption);
            formData.append('style', props.style);
            formData.append('hashtag', props.hashtag);

            if(props.image != null && props.image != ''){
                formData.append('image', props.image);    
            }

            const res = await createContentAIManual(formData)

            if(res.status === 'OK'){
                fetchUpdateContentStatus(res.data.idContent)
                toast.success('Tambah Content AI Berhasil')
                props.onCloseButton(false)
                push('/dashboard/calendar')

            }
        } catch (error) {
            if(error.status == 404 ){
                toast.error('Tambah Content AI Gagal')
            }else{
                toast.error('Ada Kesalahan Sever (500)')
            }
        }
    }

    const handleDeleteContent = async () => {
        try {
            const res = await deleteContent(props.idContent);
            if(res.status == 'OK'){
                toast.success('Content Berhasil Dihapus',)
                props.onDeleteDone()
                props.onCloseButton(false)
                setModalDeleteContent(false)
            }else{
                toast.error('Content Gagal Dihapus')
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server (500)')
        }
    }

    // 

    const notifyFetchPostContent = () => {
        AppToastPending(fetchPostContent)
    }

    const notifyHandleAddContent = () => {
        AppToastPending(handleAddContent)
    }

    const notifyHandleAddContentAI = () => {
        AppToastPending(handleAddContentAI)
    }

    const notifyHandleDeleteContent = () => {
        AppToastPending(handleDeleteContent)
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
            className = {`${ xl ? 'w-[80%] md:w-[40%] lg:w-[40%] xl:w-[60%]' :  props.caption == null && props.hashtag == null ?  'w-[25%]' : props.image ? 'w-[40%]' :  'w-[25%]'} h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] `}>
                 {/* modal delete */}
                <AppCustomModal
                    open={modalDeleteContent}
                    withClose={true}
                    width={'w-[80vw]  md:w-[30vw]  lg:w-[30vw]  xl:w-[30vw]'}
                    modalType='modal-common'
                    title={'Hapus Konten?'}
                    onCloseButton={(value)=> setModalDeleteContent(value) }
                    children={
                    <>
                        <Box className='flex flex-col justify-start w-[100%]'>
                            <p className="text-TEXT-1 text-[14px] font-medium">Apakah Anda yakin ingin menghapus konten dari kalender?</p>
                        </Box>
                        <Box className=' flex gap-[10px] w-[100%]'>
                            <AppButton
                                className='w-[100%] py-[10px] bg-NEUTRAL-500 hover:bg-NEUTRAL-600 shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Tidak'} 
                                type = {'button'}
                                onClick={()=>{
                                    setModalDeleteContent(false)
                                }}
                            />
                            <AppButton
                                className='w-[100%] py-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Ya'} 
                                type = {'button'}
                                onClick={()=>{
                                    notifyHandleDeleteContent()
                                }}
                            />
                        </Box>
                    </>
                }
                />
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
                        {
                            props.postedId != null ? null :
                            props.deleteButton != null ? null :
                            <AppCustomButton className=' bg-white ' onClick={() => setModalDeleteContent(true)}>
                                <img className='w-[18px] h-[18px] ' src={'/images/icon/trash.png'}/>
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
                            props.image == 'null' ? null :
                            props.image == null ? null :
                            props.image == ""? null :
                            <Box className={`flex flex-col gap-[20px] justify-start h-auto ${ props.caption == null && props.hashtag == null ? 'w-[100%]' : 'w-[100%]' }`}>
                                <img className='w-[100%] h-[300px] rounded-[15px] object-cover' src={props.image}/>
                            </Box>
                        }
                        <Box className ={` flex flex-col gap-[8px] ${ props.image == null && props.caption != null || props.hashtag != null ? 'w-[100%]'  :  props.caption == null && props.hashtag == null ? 'w-[100%]' :  props.image != null  ? 'w-[100%] xl:w-[50%] lg:w-[50%]' : 'w-[100%]'} text-wrap`}> 
                            { props.caption ? <p className='text-[14px] text-TEXT-1 font-semibold break-words'>{props.caption}</p> : null}
                            {  props.hashtag ? <p className='text-[14px] text-PRIMARY-400'>{props.hashtag}</p> : null }
                            <Box className = 'flex gap-[10px] items-center'>
                                <img className='w-[20px] h-[20px] rounded-[100%]' src={ props.platform == 'facebook'? listPlatform.facebook : props.platform == 'instagram'? listPlatform.instagram : props.platform == 'twitter'? listPlatform.twitter : null  }/>
                                <p className='text-TEXT-3 text-[13px] font-medium'>{ props.productName || 'Bakso aci mantap'}</p>
                            </Box>
                        </Box>
                    </Box>
                    {
                        props.postedId != null && props.data?.contentUrl != null  ? 
                        <Box className={`w-[100%]`}>
                            <AppButton 
                                className='w-[100%] p-[15px] text-[14px] bg-PRIMARY-500 hover:bg-PRIMARY-600 text-TEXT-5 font-poppins rounded-[6px]'
                                text ={'Kunjungi Konten'}
                                type={'button'}
                                onClick={()=>{
                                    window.open(props.data?.contentUrl, '_blank');
                                }}
                            /> 
                        </Box>    
                        :

                        props.postedId != null && props.isGenerate ? 
                        <Box className={` ${ props.caption == null && props.hashtag == null ? 'w-[100%]' :  props.image != null  ? ' w-[100%] xl:w-[50%] lg:w-[50%]' : 'w-[100%]'}`}>
                            <AppButton 
                            text ={'Tambahkan Sekarang'}
                            type={'submit'}
                            onClick={()=>{
                                notifyHandleAddContentAI()
                            }}
                        />
                        </Box> 
                        :
                        props.postedId != null ? null :
                        props.withButton != null  ? null :
                        <Box className={` ${ props.caption != null && props.hashtag == null && props.image == null ? 'w-[100%]' : props.caption == null && props.hashtag == null ? 'w-[100%]' :  props.image != null  ? ' w-[100%] ' : 'w-[100%]'}`}>
                            {
                                props.withAddButton ?
                                
                                <AppButton 
                                    text ={'Tambahkan Sekarang'}
                                    type={'submit'}
                                    onClick={()=>{
                                        notifyHandleAddContent()
                                    }}
                                />
                                :
                                <AppButton 
                                    text ={'Unggah Sekarang'}
                                    type={'submit'} 
                                    onClick={()=>{
                                        notifyFetchPostContent()
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