'use client'

import Box from '@mui/material/Box';
import CustomSpacing from '@/app/components/appCustomSpacing/appCustomSpacing';
import CircularProgress from '@mui/material/CircularProgress'
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getToken, setToken } from '@/app/redux/slices/authSlice';
import { validateEmail, validatePassword } from '../component/validation';
import { getCurrentUser, loginAuth } from '@/app/api/repository/authRepository';
import AppButton from '@/app/components/appButton/appButton';
import AppHeadline from '@/app/components/appHeadline/appHeadline';
import AppTextField from '@/app/components/appTextField/appTextField';
import { ToastContainer, toast } from "react-toastify";
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton';
import AppLoadingBar from '@/app/components/appLoadingBar/appLoadingBar'
import AppAnimationLayout from '@/app/components/appAnimation/appAnimationLayout'
import AppAnimationButton from '@/app/components/appAnimation/appAnimationButton'
import AppModal  from '@/app/components/appModal/appModal'
import 'react-toastify/dist/ReactToastify.css';
import "../../../../globals.css";
import { useState } from 'react';

const SignInPage = () => {

    const dispatch = useDispatch();
    const { push } = useRouter()
    const [loadingProgress,setLoadingProgress] = useState(0);
    const [openModalLoading,setOpenModalLoading] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const isAccountAdd = localStorage.getItem('isAccountAdd')
    const accountList = JSON.parse(localStorage.getItem('accountList') || [])
    
    const onSubmit  = async (data ) => {

        try {
            setLoadingProgress(50)
            setOpenModalLoading(true)
            const res = await loginAuth(data)
            
            if(isAccountAdd){
                localStorage.setItem('accountList' , JSON.stringify([ res.data.token , ...accountList]))
            }

            if(accountList == null ){
                localStorage.setItem('accountList' , JSON.stringify([res.data.token]))
            }

            dispatch(setToken(res.data.token))

            const currentUser = await getCurrentUser(); 
            if(currentUser.status == 'OK'){
                setOpenModalLoading(false)
                if(currentUser.data.countProduct > 0){
                    push('/dashboard')
                    localStorage.setItem('isAccountAdd',false)
                }else{
                    push('/input-product/add-product')
                }
            }

            setLoadingProgress(100)
        } catch (error) {
            setOpenModalLoading(false)
            setLoadingProgress(100)
            toast.error('Email atau Kata Sandi Salah')
            console.log(error)
        }
    };

    return(
    
        <Box className = ' h-[100vh] flex flex-col items-center justify-center px-[70px] relative'>
            <Box className='  flex justify-end  top-0 mt-[40px]  w-[100%] absolute z-[12]'> 
                <AppCloseButton
                    onClick = {()=>{
                        push('/auth/signup')
                    }}
                />
            </Box>
            <AppLoadingBar 
                progress={loadingProgress} 
                onLoaderFinished={() => setLoadingProgress(0)
            } />

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
                        <Box className = 'w-[100%] flex justify-end'>
                            <p onClick = {()=>{push('forgot-pass')}} className='text-black cursor-pointer font-poppins text-[12px] font-semibold'>Lupa Password</p>
                        </Box>
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
                        <button  onClick = {()=>{push('/auth/signup')}}  className='text-black cursor-pointer text-[14px] text-opacity-[25%]'>Belum punya akun?</button>
                        <CustomSpacing width = {5}/>
                        <button  onClick = {()=>{push('/auth/signup')}}  className='text-black cursor-pointer text-[14px] font-bold'>Daftar</button>
                    </Box>
                </AppAnimationLayout>
                <ToastContainer/>
                <AppModal
                        withClose = {false}
                        open = {openModalLoading}
                        width={'w-[35%]'}
                    >
                        <Box className ='flex flex-col items-center gap-[40px]'>
                            <CircularProgress style={{color : '#F45B69'}}  />
                            <Box className='flex flex-col items-center '>
                                <p className="text-SECONDARY-500 text-[20px] font-bold font-poppins">Sign In...</p>
                                <p className="text-TEXT-1 text-[14px] font-poppins">Mohon tunggu sebentar</p>
                            </Box>
                        </Box>
                </AppModal>
        </Box>
        
    )
}

export default SignInPage;