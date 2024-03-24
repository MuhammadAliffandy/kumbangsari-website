'use client'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AppTextField from '@/app/components/appTextField/appTextField'
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox'
import AppDropDown from '@/app/components/appDropDown/appDropDown'
import AppButton from '@/app/components/appButton/appButton'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'

import { useState } from 'react';
import { listDropLanguageStyle, listDropPlatform } from '../../../../../utils/model';

const  AppModalGenerateAI = (props ) => {

    const [contentTitle , setContentTitle] = useState('')
    const [product , setProduct] = useState('')
    const [platform , setPlatform] = useState('')
    const [languageStyle , setLanguageStyle] = useState('')
    const [isCaptionName , setIsCaptionName] = useState(false)
    const [contentType , setContentType] = useState([])

    const listItem = [
        {value : 1 , text : 'Satu'},
        {value : 2 , text : 'Dua'},
        {value : 3 , text : 'Tiga'},
    ]
    
    const arrPop = (array, valueToDelete) => {
        let index = array.indexOf(valueToDelete.toLowerCase());
        if (index !== -1) {
            array.splice(index, 1);
        }
        return array
    }
    

    const handleChangeProduct = (event) => {
        setProduct(event.target.value)
    }

    const handleChangePlatform = (event) => {
        setPlatform(event.target.value)
    }

    const handleLanguageStyle = (event) => {
        setLanguageStyle(event.target.value)
    }

    const onGenerate = () => {
    
        const data = {
            contentTitle : contentTitle,
            isCaptionName: isCaptionName,
            product : product,
            platform: platform,
            contentType : contentType,
            languageStyle: languageStyle,
        }

        console.log(data)
    }


    const handleCheckBox = (value ,label)=>{
        if(value === ''){
            setContentType(arrPop(contentType ,label))
        }else{
            contentType.push(value);
        }

    }


    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <Box className = 'w-[60%] h-[82%] rounded-[20px] bg-white p-[20px] flex flex-col gap-[25px]'>
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
                                    listItem = {listItem}
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
                                handleCheckBox(value,label)
                            }}
                            />
                            <AppCheckBox
                                value= 'hashtag'
                                label = 'Hashtag'
                                onChange= {(value , label)=>{
                                    handleCheckBox(value,label)
                                }}
                            />
                            <AppCheckBox
                                value= 'gambar'
                                label = 'Gambar'
                                onChange= {(value , label)=>{
                                    handleCheckBox(value,label)
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