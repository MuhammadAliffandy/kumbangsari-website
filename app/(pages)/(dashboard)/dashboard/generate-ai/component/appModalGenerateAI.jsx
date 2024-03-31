'use client'

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


const  AppModalGenerateAI = (props ) => {

    const dispatch = useDispatch()
    const generateFieldHistory = useSelector(state =>  state.generateAIHistory.value )
    const [contentTitle , setContentTitle] = useState('')
    const [product , setProduct] = useState('')
    const [productList , setProductList] = useState([])
    const [platform , setPlatform] = useState('')
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
        if(res.status = 'OK'){
        
            const productList = res.data.map(item => {
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
        const res = await generateAI(data);
        
        if(res.status == 'OK'){
            dispatch( setGenerateHistory(data) )

            if(getCookie('generateContentHistory') != null ){
                dispatch( updateContentHistory({ ...data ,  productName : productList[data.idProduct - 1].text , idContent : res.data.idContent }))
            }else{
                dispatch( createContentHistory({ ...data ,  productName : productList[data.idProduct - 1].text , idContent : res.data.idContent }))
            }

            const mapping = await mappingGenerateAIValue(res.data);
            console.log('GENERATE OK')
            props.onLoad(load = false)
            props.onClick(mapping)
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

    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <Box className = 'w-[60%] h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[25px]'>
                <Box className = 'flex justify-between'>
                    <p className = 'text-[24px] font-bold text-black' >Generate Ai</p>
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
                                    value={product}
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
                                    value={platform}
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
                        <Box className ='flex gap-[100px]'>
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
                            value={languageStyle}
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
            </Box>
        </Modal>
    )
}

export default AppModalGenerateAI;