'use client'

import Box from '@mui/material/Box';
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getToken, setToken } from '@/app/redux/slices/authSlice';
import { validateEmail, validatePassword } from '../component/validation';
import { loginAuth } from '@/app/api/repository/authRepository';
import AppButton from '@/app/components/appButton';
import AppHeadline from '@/app/components/appHeadline';
import AppTextField from '@/app/components/appTextField';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import "../../../../globals.css";

import { useState } from 'react';

const SignInPage = () => {

    const dispatch = useDispatch();
    const { push } = useRouter()
    const [loadingProgress,setLoadingProgress] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit  = async (data ) => {

        try {
            setLoadingProgress(50)
            const res = await loginAuth(data)
            dispatch(setToken(res.token))
            push('/dashboard')
            setLoadingProgress(100)
        } catch (error) {
            toast.error('Email atau Kata Sandi Salah')
        }
    };

    return(
        
        <Box className = 'bg-white flex flex-col items-center rounded-sm px-[70px]'>
            <LoadingBar 
                color={'blue'} 
                progress={loadingProgress} 
                onLoaderFinished={() => setLoadingProgress(0)
            } />
            <AppHeadline 
                title = {'Selamat Datang Kembali!'}
                subtitle = {'Masuk ke dalam akun, dan akses kembali datamu!'}
            />
            <CustomSpacing height = {20} />
                <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                    <label className='text-black font-semibold'>Email</label>
                    <AppTextField
                        id="email"
                        placeholder='Masukkan email di sini'
                        {...register('email', { 
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
                        {...register(
                            'password', {   
                                validate : validatePassword
                        })}
                        error={Boolean(errors.password)}
                        helperText={errors.password && errors.password.message}
                    
                    />  
                    <Box className = 'w-[100%] flex justify-end'>
                        <p onClick = {()=>{push('forgot-pass')}} className='text-black cursor-pointer font-poppins text-[12px] font-semibold'>Lupa Password</p>
                    </Box>
                    <AppButton
                        text={'Masuk'} 
                        type = {'Submit'}
                        fontSize = {'12px'}
                        onClick = {()=>{}}
                    />
                </form>
                <CustomSpacing height={'10px'}/>
                <Box className = 'w-[100%] flex justify-center'>
                    <button  onClick = {()=>{push('/auth/signup')}}  className='text-black cursor-pointer text-[14px] text-opacity-[25%]'>Belum punya akun?</button>
                    <CustomSpacing width = {5}/>
                    <button  onClick = {()=>{push('/auth/signup')}}  className='text-black cursor-pointer text-[14px] font-bold'>Daftar</button>
                </Box>
                <ToastContainer/>
        </Box>
    )
}

export default SignInPage;