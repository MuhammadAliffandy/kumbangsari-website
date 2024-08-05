'use client'

import Box from '@mui/material/Box';
import CustomSpacing from '@/app/components/appCustomSpacing/appCustomSpacing';
import CircularProgress from '@mui/material/CircularProgress'
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { validateEmail , validatePassword } from '../component/validation';
import AppButton from '@/app/components/appButton/appButton';
import AppHeadline from '@/app/components/appHeadline/appHeadline';
import AppTextField from '@/app/components/appTextField/appTextField';
import { ToastContainer, toast } from "react-toastify";
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton';
import AppLoadingBar from '@/app/components/appLoadingBar/appLoadingBar'
import AppAnimationLayout from '@/app/components/appAnimation/appAnimationLayout'
import AppAnimationButton from '@/app/components/appAnimation/appAnimationButton'
import AppModal  from '@/app/components/appModal/appModal'
import AppCustomModal from '@/app/components/appModal/AppCustomModal';
import 'react-toastify/dist/ReactToastify.css';
import "../../../../globals.css";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setCookie } from '@/app/utils/helper';

const SignInPage = () => {

    const dispatch = useDispatch();
    const { push } = useRouter()
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    
    const onSubmit  = async (data ) => {

        try {
            if(data.email == '' && data.password == ''){
                toast.warn('Email dan Password Kosong')
            }else if(data.email != 'admin@gmail.com' || data.password != 'Admin123#'){
                toast.warn('Email dan Password Salah')
            }else{
                toast.success('Login Berhasil')
                push('/dashboard/gallery')
            }
        } catch (error) {

            toast.error(error.data.message)

        }
    };



    return(
    
        <Box className = ' h-[100vh] flex flex-col items-center justify-center px-[70px] relative'>
          
            {/*  */}


            <AppAnimationLayout>
                    <AppHeadline 
                        title = {'Selamat Datang Kembali!'}
                        subtitle = {'Masuk ke dalam akun, dan akses kembali datamu!'}
                    />
                    <CustomSpacing height = {20} />
                    <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                        <label className='text-black font-semibold'>Email</label>
                        <AppTextField
                            id="email"
                            type='email'
                            placeholder='Masukkan email di sini'
                            validationConfig = {register('email', { 
                                validate : validateEmail
                            })}
                            error={Boolean(errors.email)}
                            helperText={errors.email && errors.email.message}
                        />
                        <label className='text-black font-semibold '>Kata Sandi</label>
                        <AppTextField
                            id="password"
                            placeholder='Masukkan kata sandi di sini'
                            type={ "password" } 
                            validationConfig = {register(
                                'password', {   
                                    validate : validatePassword
                            })}
                            error={Boolean(errors.password)}
                            helperText={errors.password && errors.password.message}
                        
                        />  
                        <AppAnimationButton>
                            <AppButton
                                text={'Masuk'} 
                                type = {'Submit'}
                                fontSize = {'12px'}
                                onClick = {()=>{}}
                            />
                        </AppAnimationButton>
                    </form>
                    <CustomSpacing height={'10px'}/>
                    <Box className = 'w-[100%] flex justify-center'>
                        <button  onClick = {()=>{push('/')}}  className='text-black cursor-pointer text-[14px] text-opacity-[25%]'>Kembali ke halaman awal</button>
                    </Box>

                </AppAnimationLayout>
                <ToastContainer/>

        </Box>
        
    )
}

export default SignInPage;