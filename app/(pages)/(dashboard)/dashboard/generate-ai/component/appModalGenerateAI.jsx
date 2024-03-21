'use client'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AppTextField from '@/app/components/appTextField/appTextField'
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox'
import AppDropDown from '@/app/components/appDropDown/appDropDown'
import AppButton from '@/app/components/appButton/appButton'
import { useState } from 'react';

const  AppModalGenerateAI = ( ) => {

    const {contentTitle , setContentTitle} = useState('')

    return(
        <Box className = 'w-[60%] h-[60%] rounded-[20px] bg-white p-[20px]'>
            <Typography >Generate Ai</Typography>
            {/*  */}
            <Box className='w-[100%]'>
                <label>Judul  Konten</label>
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
                <AppCheckBox
                    value= 'test'
                    label = 'Sertakan judul ke awal caption'
                    onChange= {(value , label)=>{

                    }}
                />
            </Box>
            {/*  */}
            <Box>
                <Stack direction="row" spacing={2}>   
                    <Box className='flex flex-col gap-[10px]'>
                        <label className='text-black font-semibold'>Produk</label>
                        {/* <AppDropDown
                                value={categoryProduct}
                                placeholder={'Pilih Kategori Produk'}
                                listItem = {listDropCategory}
                                onChange={handleChangeCategory}
                            /> */}
                        <AppCheckBox
                            value= 'test'
                            label = 'Sertakan judul ke awal caption'
                            onChange= {(value , label)=>{

                            }}
                        />
                    </Box>
                    <Box className='flex flex-col gap-[10px]'>
                        <label className='text-black font-semibold'>Platform</label>
                        {/* <AppDropDown
                                value={categoryProduct}
                                placeholder={'Pilih Kategori Produk'}
                                listItem = {listDropCategory}
                                onChange={handleChangeCategory}
                        /> */}
                    </Box>
                </Stack>
            </Box>
            {/*  */}
            <Box className='flex justify-between'>
                <AppCheckBox
                    value= 'test'
                    label = 'Caption'
                    onChange= {(value , label)=>{

                    }}
                />
                <AppCheckBox
                    value= 'test'
                    label = 'Hashtag'
                    onChange= {(value , label)=>{

                    }}
                />
                <AppCheckBox
                    value= 'test'
                    label = 'Gambar'
                    onChange= {(value , label)=>{

                    }}
                />
            </Box>
            {/*  */}
            <Box className='flex flex-col gap-[10px]'>
                <label className='text-black font-semibold'>Produk</label>
                {/* <AppDropDown
                        value={categoryProduct}
                        placeholder={'Pilih Kategori Produk'}
                        listItem = {listDropCategory}
                        onChange={handleChangeCategory}
                    /> */}
            </Box>
            <AppButton
                text={'Generate'} 
                type = {'button'}
                fontSize = {'12px'}
                onClick = {()=>{}}
            />
        </Box>
    )
}

export default AppModalGenerateAI;