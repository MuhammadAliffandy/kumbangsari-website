'use client'

import Box from '@mui/material/Box';
import AppTextField from '@/app/components/appTextField/appTextField'
import Stack from '@mui/material/Stack'
import CustomSpacing from '@/app/components/appCustomSpacing/appCustomSpacing';
import { useForm , } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { validateEmail, validateName, validatePassword, validatePhoneNumber } from '../component/validation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createAuth } from '@/app/api/repository/authRepository';
import AppButton from '@/app/components/appButton/appButton';
import AppHeadline from '@/app/components/appHeadline/appHeadline';
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton';
import AppLoadingBar from '@/app/components/appLoadingBar/appLoadingBar'
import AppAnimationLayout from '@/app/components/appAnimation/appAnimationLayout';
import AppAnimationButton from '@/app/components/appAnimation/appAnimationButton';
import { useState } from 'react';


const SignUpPage  = () => {

    const { push } = useRouter();
    const [loadingProgress,setLoadingProgress] = useState(0);
    const { register, watch ,handleSubmit, formState: { errors } } = useForm();

    const password = watch('password', '');
    
    const notify = () => {
        toast.success('Pendaftaran Berhasil')
    }

    const onSubmit= async (data ) => {

        try {
            setLoadingProgress(50)
            sessionStorage.setItem('email' ,data.email)
            const res = await createAuth(data)

            if(res.status == 'OK'){
                notify();
                push('/auth/otp-verified')
                setLoadingProgress(100)
            }
        } catch (error) {
            if(error.status === 404){
                toast.error('Email Sudah Digunakan')
            }else if(error.status == 400){
                toast.error(error.data.message)
            }
            else{
                toast.error('Ada Kesalahan Server');
            }
            setLoadingProgress(100)
        }


    };

    return(
            <Box className = 'flex flex-col items-center justify-center rounded-sm p-[10px] h-[100vh] relative'>
                    <AppLoadingBar 
                        
                        progress={loadingProgress} 
                        onLoaderFinished={() => setLoadingProgress(0)
                    } />
                    <Box className='  flex justify-end  top-0 mt-[40px] right-[30px] lg:right-0 xl:right-0  w-[100%] absolute z-[12]'> 
                        <AppCloseButton
                            onClick = {()=>{
                                push('/auth/signin')
                            }}
                        />
                    </Box>
                    <AppAnimationLayout>
                        <Box className='flex flex-col justify-center items-center overflow-y-scroll h-[98vh] overflow-x-hidden px-[20px] py-[10px] scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                            <AppHeadline 
                                title = {'Selamat Datang!'}
                                subtitle = {'Daftarkan akun dan mulai manajemen kontenmu!' }
                            />
                            <CustomSpacing height = {20} />
                            <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                                <label className='text-black font-semibold'>Nama</label>
                                <AppTextField
                                        id="name"
                                        placeholder='Masukkan nama lengkap di sini'
                                        validationConfig = {register('name', 
                                            {
                                                validate: validateName
                                            })}
                                        error={Boolean(errors.name)}
                                        helperText={errors.name && errors.name.message}
                                    />
                                <Stack direction="row" spacing={2}>   
                                    <Box className='flex flex-col gap-[10px]'>
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
                                    </Box>
                                    <Box className='flex flex-col gap-[10px]'>
                                        <label className='text-black font-semibold'>Nomor Telepon</label>
                                        <AppTextField            
                                                id="phoneNumber"
                                                placeholder='Masukkan no telepon di sini'
                                                validationConfig = {register('phoneNumber', { 
                                                    validate: validatePhoneNumber 
                                                })}
                                                error={Boolean(errors.phoneNumber)}
                                            />
                                    </Box>
                                </Stack> 
                                <label className='text-black font-semibold'>Kata Sandi</label>
                                <AppTextField
                                        id="password"
                                        placeholder='Masukkan kata sandi di sini'
                                        type={"password"} 
                                        validationConfig = {register('password', {
                                            validate : validatePassword
                                        })}
                                        error={Boolean(errors.password)}
                                        helperText={errors.password && errors.password.message}
                                    
                                    />
                                <label className='text-black font-semibold'>Konfirmasi Kata Sandi</label>
                                <AppTextField
                        
                                        id="confirmPassword"
                                        placeholder='Masukkan konfirmasi kata sandi di sini'
                                        type={"password"  } 
                                        validationConfig = {register('confirmPassword', {
                                        required: 'Password harus sama',
                                            validate: value => {
                                                if(value !== password ){
                                                    'Password tidak Cocok'
                                                }
                                            }
                                        })}
                                        error={Boolean(errors.confirmPassword)}
                                        helperText={errors.confirmPassword && errors.confirmPassword.message}
                                    />
                                <AppAnimationButton>   
                                    <AppButton
                                            text={'Daftar Sekarang'} 
                                            type = {'Submit'}
                                            fontSize = {'12px'}
                                            onClick = {()=>{}}
                                    />
                                </AppAnimationButton>
                            </form>
                            <CustomSpacing height={'10px'}/>
                            <Box className = 'w-[100%] flex justify-center'>
                                    <p  onClick = {()=>{push('/auth/signin')}}  className='text-black cursor-pointer text-[14px] text-opacity-[25%]'>Sudah punya akun?</p>
                                    <CustomSpacing width = {5}/>
                                    <p  onClick = {()=>{push('/auth/signin')}}  className='text-black cursor-pointer text-[14px] font-bold'>Masuk</p>
                            </Box>
                        </Box>
                    </AppAnimationLayout>
                </Box>

    )
}

export default SignUpPage ;