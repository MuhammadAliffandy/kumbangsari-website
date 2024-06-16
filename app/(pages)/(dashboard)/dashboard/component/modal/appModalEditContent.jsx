'use client'

import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import AppButton from '@/app/components/appButton/appButton';
import AppTextField from '@/app/components/appTextField/appTextField'
import AppTextFieldImage from '@/app/components/appTextField/appTextFieldImage'
import AppDropDown from '@/app/components/appDropDown/appDropDown'
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox'
import AppMultiSelection from '@/app/components/appMultiSelection/appMultiSelection';
import AppPopupCaption from '../popup/appPopupCaption';
import AppPopupImage from '../popup/appPopupImage';
import AppDefaultText from '@/app/components/appText/appDefaultText';
import { toast } from 'react-toastify'
import { updateGenerateAI } from '@/app/redux/slices/generateAISlice'
import { listDropPlatform } from '@/app/utils/model';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { editContentAIManual, generateAI, refreshAI, updateContentStatus } from '@/app/api/repository/contentRepository';
import {formatDateTime, getCurrentDateTime} from '@/app/utils/helper'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import AppToastPending from '@/app/components/AppToastPending/appToastPending';
import AppPostContent from '@/app/components/appPostContent/appPostContent'

const AppModalEditContent = (props) => {

    const dispatch = useDispatch();
    const { push } = useRouter()
    const contentAI = useSelector(state => state.generateAIByOne.value) 
    const [contentTitle , setContentTitle] = useState('')
    const [image , setImage] = useState(null)
    const [productImage , setProductImage] = useState(null)
    const [product , setProduct] = useState('')
    const [platform , setPlatform] = useState('')
    const [caption , setCaption] = useState('')
    const [hashtagString , setHashtagString] = useState('')
    const [hashtag , setHashtag] = useState([])
    const [hashtagAI , setHashtagAI] = useState([])
    const [dateUp , setDateUp] = useState('')
    const [timeUp , setTimeUp] = useState('')
    const [upNow , setUpNow] = useState(false)
    const [ captionRecommendation , setCaptionRecommendation ] = useState([])
    const [ imageRecommendation , setImageRecommendation ] = useState([])
    const [ hashtagRecommendation , setHashtagRecommendation ] = useState([])
    
    
    const handleChangePlatform = (event) => {
        setPlatform(event.target.value)
    }
    const handleChangeImage = (value) => {
        setImage(value)
        if (value) {
            const reader = new FileReader();
            reader.onload = () => {
                setProductImage(reader.result);
            };
            reader.readAsDataURL(value);
        }
    }
    
    const convertHashtagStringToJson = (item) => {
        const arr = item.split(' ')

        const hashtagValue = arr.map(data => {
            return  { label: data , value: data,  }
        })

        const uniqueHashtagValue = [];
        hashtagValue.forEach(item => {
            if (!uniqueHashtagValue.some(element => element.value === item.value)) {
                uniqueHashtagValue.push(item);
            }
        });

        return uniqueHashtagValue;
    }
    const convertHashtagString = (item) => {
        const arr = [];

        if(item != null ){
            item.map(data => arr.push(data.value))
            setHashtagString(arr.join(' ')) 
        }
    }
    const convertResRecommendationAI = (data) => {
        if(data != []){
            const arr =  data.map(item => { return item.content })
            return arr;
        }else{
            return []
        }
    }

    const getRecommendationAI = async () => {
        if (props.open){
            const dataCaption = {
                idContent : contentAI.idContent,
                nameProduct :true,
                image: false, 
                caption : true,
                hashtag: false,
                isOne:true,
            }
            const dataImage = {
                idContent : contentAI.idContent,
                nameProduct :true,
                image: true, 
                caption : false,
                hashtag: false,
                isOne:true,
            }
            const dataHashtag = {
                idContent : contentAI.idContent,
                nameProduct :true,
                image: false, 
                caption : false,
                hashtag: true,
                isOne:true,
            }
            const resCaption = await refreshAI(dataCaption)
            const resImage = await refreshAI(dataImage)
            const resHashtag = await refreshAI(dataHashtag)

            if(resCaption.status == 'OK') setCaptionRecommendation(convertResRecommendationAI(resCaption.data.data))
            if(resImage.status == 'OK') setImageRecommendation(resImage.data.data)
            if(resHashtag.status == 'OK') {
                setHashtagAI(convertHashtagStringToJson(convertResRecommendationAI(resHashtag.data.data).join(' ')))
                setHashtagRecommendation(convertHashtagStringToJson(convertResRecommendationAI(resHashtag.data.data).join(' ')))
            }

        }else{

        }
    }

    const getContentUser = () => {
        if (props.open){
            
            setContentTitle(contentAI.contentTitle)
            setProduct(contentAI.productName)
            setImage(contentAI.image)
            setProductImage(contentAI.image)
            setPlatform(contentAI.platform)
            setCaption(contentAI.caption || '')
            if(contentAI.hashtag != null){
                setHashtag(convertHashtagStringToJson(contentAI.hashtag))
                localStorage.setItem('hashtag',JSON.stringify(convertHashtagStringToJson(contentAI.hashtag)))
                convertHashtagString(convertHashtagStringToJson(contentAI.hashtag))
            }else{
                localStorage.setItem('hashtag','')
            }
        }
    }

    const handleChangeMultiSelection = (value) => {
        setHashtag(value)
        localStorage.setItem('hashtag',JSON.stringify(value))
        convertHashtagString(value)

        const generalHashtagAI = hashtagRecommendation.filter(item => {
            if(value.indexOf(item) === -1 ){
                return item
            }
        });
        setHashtagAI(generalHashtagAI)
    }

    const handleAddMultiSelection = (data) => {
        setHashtag(prevHashtag => [...prevHashtag , data] )
        const popData = hashtagAI.filter(item => {
            return item !== data;
        })
        setHashtagAI(popData)

        // 

        const hashtagKeep = JSON.parse(localStorage.getItem('hashtag') || '[]')  

        const filteredDataArr = hashtagAI.filter(value => !popData.includes(value));

        const matchHashtag = [...hashtagKeep,...filteredDataArr]
    
        localStorage.setItem('hashtag',JSON.stringify(matchHashtag))

        // to created hashtag string at ui 
        convertHashtagString(matchHashtag)
    }

    const fetchUpdateContentStatus = async () => {
        try {
            const res = await updateContentStatus({
                idContent : contentAI.idContent,
                status : caption != '' && hashtagString != '' && productImage != null ? 'COMPLETED' : 'INCOMPLETED'
            })

            if(res.status == 'OK'){
                props.onCloseButton(false)
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const handleEditContent = async () => {
        try {
            convertHashtagString(hashtag);

            if(platform == 'instagram'){
                if(image == null || image == ''){
                    toast.warn('Gambar wajib diisi khusus instagram')
                    return false
                }
            }

            if(caption == ''){
                toast.warning('Caption Wajib Diisi')
                return false
            }

            if(caption == '' && hashtagString  == '' && productImage == null){
                toast.warning('Mohon isi Salah Satu Caption / Hastag / Gambar')
                return false
            }

            if(dateUp == ''  && timeUp == ''){
                toast.warning('Mohon isi Tanggal dan Waktunya')
                return false
            }
            
            if(platform == '' ){
                toast.warning('Mohon isi platformnya')
                return false
            }
            
            
            const formData = new FormData();
            formData.append('contentTitle', contentTitle);
            formData.append('platform', platform);
            formData.append('caption', caption);
            formData.append('hashtag', hashtagString);
            
            if(!upNow){
                formData.append('postedAt', formatDateTime(dateUp,timeUp));
            }

            if(image != null){
                if(image?.type){
                    formData.append('image', '');
                    formData.set('files',image, image.name );
                }else{
                    formData.append('image', image);
                    formData.set('files', '');
                }
            }

            const res = await editContentAIManual(contentAI.idContent ,formData)

            if(res.status == 'OK'){
                
                if(upNow){

                    const dataPost = {
                        caption: res.data.captionPost != ''? res.data.captionPost : '',
                        hashtag:res.data.hashtagPost != '' ? res.data.hashtagPost : '',
                        image: res.data.imageUrlPost != '' ? res.data.imageUrlPost[0] : '' ,
                        idProduct : res.data.idProduct,
                        idContent: res.data.idContent,
                        platform: res.data.platform,
                        }
                    
                        AppToastPending(AppPostContent(dataPost , push , res.data.idContent , props.onDone))

                    }else{
                        fetchUpdateContentStatus(res.data.idContent)
                        push('/dashboard/calendar')
                        toast.success('Edit Content AI Berhasil')
                    }
                    
            }
            props.onCloseButton(false)
        } catch (error) {
            if(error.status == 404){
                toast.error('Edit Content Gagal')
            }else{
                toast.error(error.data.message)
            }
        }

    }

    const notifyHandleEditContent = () => {
        AppToastPending(handleEditContent)
    }

    useEffect(()=>{
        getContentUser()
        getRecommendationAI()
        localStorage.setItem('hashtag','[]')
    },[props.open])


    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className = 'w-[90%]  md:w-[90%]  lg:w-[90%] xl:w-[90%]  h-[90vh] xl:h-[80vh]  rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] '>
                {/* headline */}
                <Box className = 'flex justify-between'>
                    <p className = 'text-[18px] font-bold text-black' >Edit Konten</p>
                    <Box className='flex items-center gap-[15px]'>
                        <AppCloseButton
                            onClick = {()=>{
                                props.onCloseButton(false)
                            }}
                        />
                    </Box>
                </Box>
                {/* content  */}
                <Box className='flex flex-col xl:flex-row gap-[20px] w-[100%] h-[80%]'>
                    {/* form */}
                    <Box className='w-[100%] xl:w-[60%] h-[100%] pr-[10px] flex flex-col gap-[10px] overflow-y-scroll pb-[10px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        {/* content title */}
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Judul  Konten</label>
                            <AppTextField
                                id="contentTitle"
                                value = {contentTitle}
                                type='text'
                                placeholder='Masukkkan nama Judul konten di sini'
                                onChange={(event)=>{
                                    const value = event.target.value
                                    setContentTitle(value)
                                }}
                            />
                        </Box>
                        {/*  */}
                        <Box>
                            <Box className='flex flex-row items-center gap-[10px]' >  
                            {/* product */}
                                <Box className='w-[50%]  md:w-[100%] lg:w-[100%] xl:w-[100%] flex flex-col gap-[10px]'>
                                    <label className='text-black font-semibold'>Produk</label>
                                    <AppTextField
                                        id="product"
                                        value = {product}
                                        type='text'
                                        disabled={true}
                                        placeholder='Masukkkan nama Product konten di sini'
                                        onChange={(event)=>{
                                            const value = event.target.value
                                            setProduct(value)
                                        }}
                                    />
                                </Box>
                                <Box className='w-[50%]  md:w-[100%] lg:w-[100%] xl:w-[100%] flex flex-col gap-[10px]'>
                                    {/* platform */}
                                    <label className='text-black font-semibold'>Platform</label>
                                    <AppDropDown
                                            value={platform}
                                            placeholder={'Pilih Nama Platform'}
                                            listItem = {listDropPlatform}
                                            onChange={handleChangePlatform}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        {/*  */}

                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Gambar</label>
                            <AppTextFieldImage
                                value = {image != null ?  image?.type ? null : image : null}
                                onClick={handleChangeImage}
                            />
                            <AppPopupImage
                                images={imageRecommendation}
                                onClick ={(value)=>{
                                    setProductImage(value)
                                    setImage(value)
                                }}
                            /> 
                        </Box>

                        {/*  */}
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Caption</label>
                            <AppTextField
                                id="caption"
                                value = {caption}
                                type='text'
                                placeholder='Masukkkan nama Caption di sini'
                                onChange={(event)=>{
                                    const value = event.target.value
                                    setCaption(value)
                                }}
                            />

                            <AppPopupCaption
                                captions={captionRecommendation}
                                onClick ={(value)=>{
                                    setCaption(value)
                                }}
                            />
                        </Box>
                        {/*  */}
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Hashtag</label>
                            <AppMultiSelection
                                value = {hashtag}
                                options = { [ ...hashtagString , ...hashtagAI ] }
                                onChange = {value => {handleChangeMultiSelection(value)}}
                            />
                            <Grid container spacing={1}>
                            {
                                hashtagAI.map((data,index) => {
                                    return ( 
                                        <Grid key = {index} item xs={4} md={3} lg={2} xl={2} >
                                            <Box key={index} onClick={() => {handleAddMultiSelection(data)}}  className ='cursor-pointer px-[10px] py-[8px] border-[2px] border-PRIMARY-500 text-PRIMARY-500 text-[12px] rounded-[20px] truncate'>
                                                {data.value}
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }
                            </Grid>
                        </Box>
                        {/*  */}
                        <Box>
                            <p className='text-black font-semibold text-left py-[10px]'>Waktu Unggah</p>
                            <Box className='flex flex-col-reverse md:flex-row lg:flex-row  xl:flex-row items-start gap-[10px]' >  
                                <Box className='w-[100%]  md:w-[100%] lg:w-[100%] xl:w-[100%] flex flex-col gap-[10px]'>
                                    <AppTextField
                                        id="date"
                                        value = { dateUp }
                                        type='date'
                                        placeholder='Pilih Tanggal Unggah'
                                        disabled={upNow}
                                        onChange={(event)=>{
                                            const value = event.target.value
                                            setDateUp(value)
                                        }}
                                    />
                                    <AppCheckBox
                                        value= 'true'
                                        label = 'Unggah Sekarang'
                                        onChange= {(value , label)=>{
                                            if(value == 'true'){
                                                setUpNow(true)
                                                const { date , time } = getCurrentDateTime()
                                                setTimeUp(time)
                                                setDateUp(date)
                                            }else{
                                                setUpNow(false)
                                                setTimeUp('')
                                                setDateUp('')
                                            }
                                        }}
                                    />
                                </Box>
                                <Box className='w-[100%]  md:w-[100%] lg:w-[100%] xl:w-[100%] flex flex-col gap-[10px] justify-center'>
                                    <AppTextField
                                        id="time"
                                        value = { timeUp }
                                        type='time'
                                        placeholder='Pilih Jam Unggah'
                                        disabled={upNow}
                                        onChange={(event)=>{
                                            const value = event.target.value
                                            setTimeUp(value)
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box >
                    <Box className='hidden xl:flex w-[100%] xl:w-[2px] h-[2px] xl:[100%] bg-black bg-opacity-[10%]'></Box>
                    {/* preview */}
                    <Box className = ' hidden w-[100%] xl:w-[40%] h-[100%] xl:flex flex-col items-center justify-start gap-[20px] pr-[10px] overflow-y-scroll pb-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                                <label className='text-black font-semibold' >Preview Konten</label>
                        </Box>
                        {
                            productImage == null && caption == '' && hashtagString == [] ?

                            <AppDefaultText 
                                text = 'Masukkan data terlebih dahulu untuk menampilkan preview!'
                            />  :

                            <>
                                {productImage ? <img className='w-[70%] h-[50%] rounded-[15px] object-cover' src={productImage}/> : 
                                    <AppDefaultText 
                                        text = 'Masukkan image terlebih dahulu untuk menampilkan preview!'
                                    />  
                                
                                }
                                <Box className = 'flex flex-col gap-[8px] p-[10px] rounded-[15px] border-[1px] border-TEXT-1 '>
                                    <p className='text-[14px] w-[100%] text-TEXT-1 font-semibold break-all whitespace-normal'>{ caption || '( Caption Kosong )'}</p>
                                    <p className='text-[14px] text-PRIMARY-400'>{hashtagString || '( Hashtag Kosong )'}</p>
                                </Box>
                            </> 
                        }
                    </Box>
                </Box>
                {/*  */}
                <Box className = 'flex justify-end'>
                    <Box className='flex justify-end gap-[15px] w-[100%]'>
                        <Box className='w-[35%] md:w-[15%] lg:w-[15%] xl:w-[15%]'>
                            <AppButton
                                className='w-[100%] py-[10px] bg-NEUTRAL-500 hover:bg-NEUTRAL-600 shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Keluar'} 
                                type = {'button'}
                                onClick={()=>{
                                    props.onCloseButton(false)
                                }}
                            />
                        </Box>
                        <Box className='w-[35%] md:w-[15%] lg:w-[15%] xl:w-[15%]'>
                            <AppButton
                                className='w-[100%] py-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
                                text={ upNow ? 'Unggah' : 'Simpan'} 
                                type = {'button'}
                                onClick={()=>{

                                    notifyHandleEditContent()
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </motion.div>
        </Modal>
    )

}

export default AppModalEditContent;