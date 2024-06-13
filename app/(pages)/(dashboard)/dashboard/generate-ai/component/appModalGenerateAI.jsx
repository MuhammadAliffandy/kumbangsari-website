'use client'

import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AppTextField from '@/app/components/appTextField/appTextField'
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox'
import AppDropDown from '@/app/components/appDropDown/appDropDown'
import AppButton from '@/app/components/appButton/appButton'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import { useEffect, useState } from 'react';
import { listDropLanguageStyle, listDropPlatform } from '../../../../../utils/model';
import { generateAI } from '../../../../../api/repository/contentRepository';
import { getProductByUser } from '../../../../../api/repository/productRepository';
import { useDispatch , useSelector} from 'react-redux';
import { setGenerateAIList} from '@/app/redux/slices/generateAISlice';
import { setGenerateHistory }  from '@/app/redux/slices/generateAIHistorySlice';
import { createContentHistory, updateContentHistory } from '@/app/redux/slices/generateAIContentHistorySlice';
import { getCookie } from '@/app/utils/helper';
import { toast } from 'react-toastify';


const  AppModalGenerateAI = (props ) => {

    const dispatch = useDispatch()
    const generateFieldHistory = useSelector(state =>  state.generateAIHistory.value )
    const userSubscription  = useSelector(state =>  state.userSubscription.value )
    const [contentTitle , setContentTitle] = useState('')
    const [product , setProduct] = useState('')
    const [platform , setPlatform] = useState('')
    const [productList , setProductList] = useState([])
    const [languageStyle , setLanguageStyle] = useState('')
    const [isCaptionName , setIsCaptionName] = useState(false)
    const [image , setImage] = useState(false)
    const [hashtag , setHashtag] = useState(false)
    const [caption , setCaption] = useState(false)


    const handleChangeProduct = (event) => {
        setProduct(event.target.value)
    }

    const handleChangePlatform = (event) => {
        setPlatform(event.target.value)
    }

    const handleLanguageStyle = (event) => {
        setLanguageStyle(event.target.value)
    }

    const getUserProduct = async () => {
        const res = await getProductByUser();
        if(res.status == 'OK'){
            const currentData = res.data.filter((data , index) => {
                if(userSubscription <= 2){
                    return index === 0
                }else{
                    return data
                }
            })    
            const productList = currentData.map(item => {
                return {value: item.idProduct , text : item.nameProduct}
            })

            setProductList(productList)
        }
    }

    const mappingGenerateAIValue = (data) => {
        const currentData = data;

        const generateValue = { 
            caption : data.caption ,
            hashtag : data.hashtag,
            image : data.imageUrl, 
        }

        const lengthData = generateValue.caption || generateValue.hashtag || generateValue.image

        const mappingArray = lengthData.map((data,index)=>{

            return { 
                image : !generateValue.image ? null : generateValue.image[index] , 
                caption :!generateValue.caption ? null : generateValue.caption[index].content ,
                hashtag : !generateValue.hashtag ? null : generateValue.hashtag[index].content,
                productName : productList[currentData.idProduct - 1].text,
                platform : currentData.platform,
                contentTitle : currentData.contentTitle,
                idContent : currentData.idContent,
            }
        }) 

        dispatch(setGenerateAIList(mappingArray))
        return mappingArray;
    }

    const onGenerate = async () => {
    
        try {

            if(contentTitle == '' || contentTitle == null){
                toast.warn('Judul Konten Harus diisi')
                return false
            }

            if(product == ''){
                toast.warn('Produk belum dipilih !!')
                return false;
            }

            if( !caption && !hashtag && !image ){
                toast.warn('Pilih Salah Satu Jenis Konten')
                return false
            }

            if( languageStyle == ''){
                toast.warn('Gaya Bahasa belum dipilih')
                return false
            }


            let load = true ;
            props.onLoad(load)
            const data = {
                contentTitle : contentTitle,
                idProduct : product,
                nameProduct:isCaptionName,
                platform: platform,
                style: languageStyle,
                image: image,
                caption : caption ,
                hashtag: hashtag,
            }

            console.log(data)

            const res = await generateAI(data);
            
            if(res.status == 'OK'){
                // dispatch( setGenerateHistory(data) )

                // if(getCookie('generateContentHistory') != null ){
                //     dispatch( updateContentHistory({ ...data ,  productName : productList[data.idProduct - 1].text , idContent : res.data.idContent }))
                // }else{
                //     dispatch( createContentHistory({ ...data ,  productName : productList[data.idProduct - 1].text , idContent : res.data.idContent }))
                // }

                const mapping = await mappingGenerateAIValue(res.data);
                toast.success('Generate Content AI Berhasil')
  
                props.onLoad(load = false)
                props.onClick(mapping)
            }
        } catch (error) {
            if(error.status == 403){
                toast.error('AI Generate Sudah Limit')
            }else if(error.status == 404){
                toast.error('Generate Content AI Gagal')
            }else{
                toast.error('Ada Kesalahan Server')
            }

        }
    }


    const handleGenerateHistory = () => {

        if(generateFieldHistory != null){
            setContentTitle(generateFieldHistory.contentTitle)
            setProduct(generateFieldHistory.idProduct)
            setPlatform(generateFieldHistory.platform)
            setLanguageStyle(generateFieldHistory.style)
        }   
    }

    useEffect(()=>{
        handleGenerateHistory()
    },[])

    useEffect(()=>{
        getUserProduct() 
    },[])

    useEffect(()=>{
        setCaption(false)
        setHashtag(false)
        setImage(false)
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
            className = 'w-[90%] xl:w-[60%] h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[25px]'>
                <Box className = 'flex justify-between'>
                    <p className = 'text-[24px] font-bold text-black' >Generate AI</p>
                    <AppCloseButton
                        onClick = {()=>{
                            props.onCloseButton(false)
                        }}
                    />
                </Box>
                
                {/*  */}
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
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold'>Produk</label>
                            <AppDropDown
                                    value={product ? product : ''}
                                    placeholder={'Pilih Nama Produk'}
                                    listItem = {productList}
                                    onChange={handleChangeProduct}
                                />
                            <AppCheckBox
                                value= 'true'
                                label = 'Sertakan nama produk ke caption'
                                onChange= {(value , label)=>{
                                    value == 'true' ? setIsCaptionName(true) : setIsCaptionName(false)
                                }}
                            />
                        </Box>
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold'>Platform</label>
                            <AppDropDown
                                    value={platform ? platform : ''}
                                    placeholder={'Pilih Nama Platform'}
                                    listItem = {listDropPlatform}
                                    onChange={handleChangePlatform}
                            />
                        </Box>
                    </Stack>
                </Box>
                {/*  */}
                <Box className='flex flex-col gap-[10px]'>
                        <label className='text-black font-semibold'>Jenis Konten</label>
                        <Box className ='flex flex-col md:flex-row lg:flex-row xl:flex-row gap-[10px] xl:gap-[100px]'>
                            <AppCheckBox
                                value= 'caption'
                                label = 'Caption'
                                onChange= {(value , label)=>{
                                    value == '' ? setCaption(false)  : setCaption(true)
                                }}
                            />
                            <AppCheckBox
                                value= 'hashtag'
                                label = 'Hashtag'
                                onChange= {(value , label)=>{
                                    value == '' ? setHashtag(false)  : setHashtag(true)
                                }}
                            />
                            <AppCheckBox
                                value= 'gambar'
                                label = 'Gambar'
                                onChange= {(value , label)=>{
                                    value == '' ? setImage(false)  : setImage(true)
                                }}
                            />
                        </Box>
                </Box>
                {/*  */}
                <Box className='flex flex-col gap-[10px]'>
                    <label className='text-black font-semibold'>Gaya Bahasa</label>
                    <AppDropDown
                            value={languageStyle ? languageStyle : ''}
                            placeholder={'Pilih Gaya Bahasa'}
                            listItem = {listDropLanguageStyle}
                            onChange={handleLanguageStyle}
                        />
                </Box>
                <Box className='w-[100%] flex justify-end'>
                        <Box className='w-[30%]'>
                            <AppButton
                                text={'Generate'} 
                                type = {'button'}
                                fontSize = {'12px'}
                                onClick = {onGenerate}
                            />
                        </Box>
                </Box>
            </motion.div>
        </Modal>
    )
}

export default AppModalGenerateAI;