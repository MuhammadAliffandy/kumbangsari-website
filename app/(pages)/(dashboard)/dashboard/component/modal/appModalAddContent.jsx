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
import { isImageFile , formatDateTime , getCurrentDateTime} from '@/app/utils/helper'
import { updateGenerateAI } from '@/app/redux/slices/generateAISlice'
import { listDropPlatform } from '@/app/utils/model';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createContentAIManual, generateAIManual } from '@/app/api/repository/contentRepository';
import { getProductByUser } from '@/app/api/repository/productRepository';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const AppModalAddContent = (props) => {

    const userSubscription = useSelector(state =>  state.userSubscription.value)
    const { push } = useRouter()
    const [contentTitle , setContentTitle] = useState('')
    const [image , setImage] = useState(null)
    const [productImage , setProductImage] = useState(null)
    const [product , setProduct] = useState('')
    const [platform , setPlatform] = useState('')
    const [caption , setCaption] = useState('')
    const [style , setStyle ] = useState('formal')
    const [hashtagString , setHashtagString] = useState('')
    const [hashtag , setHashtag] = useState([])
    const [hashtagAI , setHashtagAI] = useState([])
    const [dateUp , setDateUp] = useState('')
    const [timeUp , setTimeUp] = useState('')
    const [upNow , setUpNow] = useState(false)
    const [productList , setProductList] = useState([])
    const [ captionRecommendation , setCaptionRecommendation ] = useState([])
    const [ imageRecommendation , setImageRecommendation ] = useState([])
    const [ hashtagRecommendation , setHashtagRecommendation ] = useState([])
    
    const [ captionAIHistory , setCaptionAIHistory ] = useState([])
    const [ imageAIHistory , setImageAIHistory ] = useState([])
    const [ hashtagAIHistory , setHashtagAIHistory ] = useState([])
    
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

    const handleChangeProduct = (event) => {
        setProduct(event.target.value)
    }

    const convertHashtagStringToJson = (item) => {
        const arr = item.split(' ')

        const hashtagValue = arr.map(data => {
            return  { value: data, label: data }
        })

        return hashtagValue;
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
            return data.map(item => { return item.content })
        }else{
            return []
        }
    }

    const getUserProduct = async () => {
        const res = await getProductByUser();
        if(res.status = 'OK'){

            const currentData = res.data.filter(data => {
                if(userSubscription <= 2){
                    return data.idProduct == 1
                }else{
                    return data
                }
            })
    
            const productList = currentData.map(item => {
                return {value: item.idProduct , text : item.nameProduct}
            })
            setProductList(productList)
            setProduct(productList[0].value)
        }
    }

    const getRecommendationAI = async () => {
        if (props.open){

            const dataHashtag = {
                idProduct : product,
                option : 'hashtag',
                style :'santai'
            }

            const resHashtag = await generateAIManual(dataHashtag)

            if(resHashtag.status == 'OK') {
                setHashtagAI(convertHashtagStringToJson(convertResRecommendationAI(resHashtag.data).join(' ')))
                setHashtagRecommendation(convertHashtagStringToJson(convertResRecommendationAI(resHashtag.data).join(' ')))
                setHashtagAIHistory(resHashtag.data)
            }else{
            toast.error('Generate AI Hashtag gagal')
            }
        }
    }

    const generateRecommendationCaption = async () => {

        const dataCaption = {
            idProduct : product,
            option : 'caption',
            style :'santai'
        }
        const resCaption = await generateAIManual(dataCaption)

        if(resCaption.status == 'OK') {
            setCaptionRecommendation(convertResRecommendationAI(resCaption.data))
            setCaptionAIHistory(resCaption.data)
        }else{
            toast.error('Generate AI Caption gagal')
        }
    }

    const generateRecommendationImage = async () => {
        const dataImage = {
            idProduct : product,
            option : 'image',
            style :'santai'
        }

        const resImage = await generateAIManual(dataImage)

        if(resImage.status == 'OK') {
            setImageRecommendation(resImage.data)
            setImageAIHistory(resImage.data)
        }else{
            toast.error('Generate AI Image gagal')
        }
    }

    const handleAddContent = async () => {
        try {
            convertHashtagString(hashtag);

            if(platform == 'twitter'){
                if(caption.length >= 280){
                    toast.warn('Caption Lebih dari 280 Karakter')
                    return false;
                }
            }

            const formData = new FormData();
            formData.append('contentTitle', contentTitle);
            formData.append('idProduct', product);
            formData.append('platform', platform);
            formData.append('caption', caption);
            formData.append('style', style);
            formData.append('hashtag', hashtagString);
            formData.append('postedAt', formatDateTime(dateUp,timeUp));
            formData.append('historyHashtag', JSON.stringify(hashtagAIHistory));
            formData.append('historyImage', JSON.stringify(imageAIHistory));
            formData.append('historyCaption', JSON.stringify(captionAIHistory));

            if(image?.type){
                formData.append('image', '');
                formData.set('files',image , image.name );
            }else{
                formData.append('image', image);
                formData.set('files', '');
            }
            

            const res = await createContentAIManual(formData)

            if(res.status === 'OK'){
                toast.success('Tambah Content Berhasil')
                props.onCloseButton(false)
                props.onDone()
                push('/dashboard/calendar')

            }else{
                toast.error('Tambah Content Gagal')
            }
        } catch (error) {
            toast.error('Ada Kesalahan Sever (500)')
        }


    }

    useEffect(()=>{
        getUserProduct()
        getRecommendationAI()
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
                className = 'w-[90%] h-[90vh] xl:h-[80vh] rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] '>
                {/* headline */}
                <Box className = 'flex justify-between'>
                    <p className = 'text-[18px] font-bold text-black' >Tambah Konten</p>
                    <Box className='flex items-center gap-[15px]'>
                        <AppCloseButton
                            onClick = {()=>{
                                props.onCloseButton(false)
                            }}
                        />
                    </Box>
                </Box>
                {/* content  */}
                <Box className='flex flex-col xl:flex-row  gap-[20px] w-[100%] h-[80%]'>
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
                            <Stack direction="row" spacing={2}>   
                            {/* product */}
                                <Box className='w-[100%] flex flex-col gap-[10px]'>
                                    <label className='text-black font-semibold'>Produk</label>
                                    <AppDropDown
                                            value={product}
                                            placeholder={'Pilih Nama Produk'}
                                            listItem = {productList}
                                            onChange={handleChangeProduct}
                                        />
                                </Box>
                                <Box className='w-[100%] flex flex-col gap-[10px]'>
                                    {/* platform */}
                                    <label className='text-black font-semibold'>Platform</label>
                                    <AppDropDown
                                            value={platform}
                                            placeholder={'Pilih Nama Platform'}
                                            listItem = {listDropPlatform}
                                            onChange={handleChangePlatform}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                        {/*  */}

                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Gambar</label>
                            <AppTextFieldImage
                                onClick={handleChangeImage}
                            />
                            <AppPopupImage
                                isDashboard={true}
                                images={imageRecommendation}
                                onClick ={(value)=>{
                                    setProductImage(value)
                                    setImage(value)
                                }}
                                onGenerate={()=>{
                                    generateRecommendationImage()
                                    console.log(imageRecommendation)
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
                                placeholder='Masukkkan caption di sini'
                                onChange={(event)=>{
                                    const value = event.target.value
                                    setCaption(value)
                                }}
                            />

                            <AppPopupCaption
                                isDashboard={true}
                                captions={captionRecommendation}
                                onClick ={(value)=>{
                                    setCaption(value)
                                }}
                                onGenerate={()=>{
                                    generateRecommendationCaption()
                                    console.log(captionRecommendation)
                                }}
                                onDropdown={(value)=>{setStyle(value)} }
                                />
                        </Box>
                        {/*  */}
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Hashtag</label>
                            <AppMultiSelection
                                value = {hashtag}
                                options = { [ ...hashtagString , ...hashtagAI ] }
                                onChange = {(value)=>{
                                    setHashtag(value)
                                    localStorage.setItem('hashtag',JSON.stringify(value))
                                    convertHashtagString(value)
                            
                                    const generalHashtagAI = hashtagRecommendation.filter(item => {
                                        if(value.indexOf(item) === -1 ){
                                            return item
                                        }
                                    });
                                    setHashtagAI(generalHashtagAI)
                                }}
                            />
                            <Grid container spacing={1}>
                            {
                                hashtagAI.map((data,index) => {
                                    return ( 
                                        <Grid key = {index} item xs={2}>
                                            <Box  onClick={()=>{
                                                setHashtag(prevHashtag => [...prevHashtag , data] )
                                                const popData = hashtagAI.filter(item => {
                                                    return item !== data;
                                                })
                                                setHashtagAI(popData)
                                        
                                                // 
                                        
                                                const hashtagKeep = JSON.parse(localStorage.getItem('hashtag'))  
                                        
                                                const filteredDataArr = hashtagAI.filter(value => !popData.includes(value));
                                        
                                                const matchHashtag = [...hashtagKeep,...filteredDataArr]
                                            
                                                localStorage.setItem('hashtag',JSON.stringify(matchHashtag))
                                        
                                                // to created hashtag string at ui 
                                                convertHashtagString(matchHashtag)
                                                
                                            }}  className ='cursor-pointer px-[10px] py-[8px] border-[2px] border-PRIMARY-500 text-PRIMARY-500 text-[12px] rounded-[20px] truncate'>
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
                            <Stack direction="row" spacing={2}>   
                                <Box className='w-[100%] flex flex-col gap-[10px]'>
                                    <label className='text-black font-semibold'>Waktu Unggah</label>
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
                                                console.log('ANJAY')
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
                                <Box className='w-[100%] flex flex-col gap-[10px] justify-center'>
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
                            </Stack>
                        </Box>
                    </Box >
                    <Box className='w-[100%] xl:w-[2px] h-[2px] xl:[100%] bg-black bg-opacity-[10%]'></Box>
                    {/* preview */}
                    <Box className = 'w-[100%] xl:w-[40%] h-[100%]  flex flex-col items-center justify-start gap-[20px] pr-[10px] overflow-y-scroll pb-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
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
                                    <p className='text-[14px] w-[100%] text-TEXT-1 font-semibold break-all whitespace-normal'>{ caption || '. . .' }</p>
                                    <p className='text-[14px] text-PRIMARY-400'>{hashtagString || '. . .'}</p>
                                </Box>
                            </> 
                        }
                    </Box>
                </Box>
                {/*  */}
                <Box className = 'flex justify-end'>
                    <Box className='flex justify-end gap-[15px] w-[100%]'>
                        <Box className='w-[15%]'>
                            <AppButton
                                className='w-[100%] py-[10px] bg-NEUTRAL-500 shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Keluar'} 
                                type = {'button'}
                                onClick={()=>{
                                    props.onCloseButton(false)
                                }}
                            />
                        </Box>
                        <Box className='w-[15%]'>
                            <AppButton
                                className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Simpan'} 
                                type = {'button'}
                                onClick={()=>{

                                    handleAddContent()
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </motion.div>
        </Modal>
    )

}

export default AppModalAddContent;