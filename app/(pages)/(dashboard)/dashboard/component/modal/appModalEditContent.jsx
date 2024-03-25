'use client'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import AppButton from '@/app/components/appButton/appButton';
import AppTextField from '@/app/components/appTextField/appTextField'
import AppTextFieldImage from '@/app/components/appTextField/appTextFieldImage'
import AppDropDown from '@/app/components/appDropDown/appDropDown'
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox'
import { listDropPlatform } from '@/app/utils/model';
import { useState } from 'react';

const AppModalEditContent = (props) => {

    const [contentTitle , setContentTitle] = useState('')
    const [productImage , setProductImage] = useState('')
    const [product , setProduct] = useState('')
    const [platform , setPlatform] = useState('')
    const [caption , setCaption] = useState('')
    const [hashtag , setHashtag] = useState('')
    const [dateUp , setDateUp] = useState('')
    const [timeUp , setTimeUp] = useState('')
    const [UpNow , setUpNow] = useState(false)

    const handleChangePlatform = (event) => {
        setPlatform(event.target.value)
    }


    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <Box className = 'w-[90%] h-[80vh] rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] border-[2px]'>
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
                <Box className='flex  gap-[20px] w-[100%] h-[80%]'>
                    {/* form */}
                    <Box className='w-[60%] h-[100%] flex flex-col gap-[10px] overflow-y-scroll pb-[10px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
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
                                    <AppTextField
                                        id="product"
                                        value = {product}
                                        type='text'
                                        placeholder='Masukkkan nama Product konten di sini'
                                        onChange={(event)=>{
                                            const value = event.target.value
                                            setProduct(value)
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
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Gambar</label>
                            <AppTextFieldImage
                                onClick={(value)=>{}}
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
                        </Box>
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Hashtag</label>
                            <AppTextField
                                id="hashtag"
                                value = {hashtag}
                                type='text'
                                placeholder='Masukkkan nama Hashtag di sini'
                                InputProps={
                                    {
                                        style: {
                                            color : '#7591D2',
                                            borderRadius: "15px",
                                            backgroundColor: '#F7F9F9'
                                        },
                                    }
                                }
                                onChange={(event)=>{
                                    const value = event.target.value
                                    setHashtag(value)
                                }}
                            />
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
                                        onChange={(event)=>{
                                            const value = event.target.value
                                            setHashtag(value)
                                        }}
                                    />
                                    <AppCheckBox
                                        value= 'true'
                                        label = 'Unggah Sekarang'
                                        onChange= {(value , label)=>{
                                            value == 'true' ? setUpNow(true) : setUpNow(false)
                                        }}
                                    />
                                </Box>
                                <Box className='w-[100%] flex flex-col gap-[10px]'>
                                    <label className='text-black font-semibold'></label>
                                    <AppTextField
                                        id="time"
                                        value = { timeUp }
                                        type='time'
                                        placeholder='Pilih Jam Unggah'
                                
                                        onChange={(event)=>{
                                            const value = event.target.value
                                            setHashtag(value)
                                        }}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    </Box >
                    <Box style={{ width : '2px' , height:'90%' }} className='bg-black bg-opacity-[10%]'></Box>
                    {/* preview */}
                    <Box className = 'w-[40%] h-[100%] flex flex-col items-center justify-start gap-[20px] overflow-y-scroll pb-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                                <label className='text-black font-semibold' >Preview Konten</label>
                        </Box>
                        <img className='w-[70%] h-[50%] rounded-[15px]' src='https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg'/>
                        <Box className = 'flex flex-col gap-[8px] p-[10px] rounded-[15px] border-[1px] border-TEXT-1 '>
                            <p className='text-[14px] text-TEXT-1 font-semibold'>{props.caption || 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'}</p>
                            <p className='text-[14px] text-PRIMARY-400'>{props.hashtag ?? '#bakso #wedhus #gatau'}</p>
                        </Box>
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
                                onClick={()=>{}}
                            />
                        </Box>
                        <Box className='w-[15%]'>
                            <AppButton
                                className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Simpan'} 
                                type = {'button'}
                                onClick={()=>{}}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )

}

export default AppModalEditContent;