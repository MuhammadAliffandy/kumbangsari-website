'use client'

import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import AppButton from '@/app/components/appButton/appButton';
import AppTextField from '@/app/components/appTextField/appTextField'
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox'
import {  formatDateTime, getCurrentDateTime} from '@/app/utils/helper'
import { useEffect, useState } from 'react';

const AppModalAddTime = (props) => {


    const [dateUp , setDateUp] = useState('')
    const [timeUp , setTimeUp] = useState('')
    const [upNow , setUpNow] = useState(false)

    return(
        <Modal
            open={props.open}
            className='flex flex-col justify-center items-center'
        >

            {/*  */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className = ' w-[60%]  md:w-[60%]  lg:w-[60%] xl:w-[60%] h-auto  rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] '>
             
                    {/* headline */}
                    <Box className = 'flex justify-between'>
                        <p className = 'text-[18px] font-bold text-black' >Tambah Waktu </p>
                        <Box className='flex items-center gap-[15px]'>
                            <AppCloseButton
                                onClick = {()=>{
                                    props.onCloseButton(false)
                                }}
                            />
                        </Box>
                    </Box>
              
                    {/*  */}
                    <Box className='flex flex-col gap-[15px]'>
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
                                {/* <AppCheckBox
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
                                /> */}
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

                        {/*  */}
                        <Box className = 'flex justify-end'>
                            <Box className='flex justify-end gap-[15px] w-[100%]'>
                                <Box className='w-[35%] md:w-[15%] lg:w-[15%] xl:w-[15%]'>
                                    <AppButton
                                        className='w-[100%] p-[10px] bg-NEUTRAL-500 hover:bg-NEUTRAL-600 shadow-xl text-white font-poppins rounded-[18px]'
                                        text={'Keluar'} 
                                        type = {'button'}
                                        onClick={()=>{
                                            props.onCloseButton(false)
                                        }}
                                    />
                                </Box>
                                <Box className='w-[35%] md:w-[15%] lg:w-[15%] xl:w-[15%]'>
                                    <AppButton
                                        className='w-[100%] p-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
                                        text={upNow ? 'Unggah' : 'Simpan'} 
                                        type = {'button'}
                                        onClick={()=>{
                                            props.onClick(formatDateTime(dateUp,timeUp))
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            </motion.div>
        </Modal>
    )

}

export default AppModalAddTime;