'use client'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import CustomSpacing from '@/app/components/appCustomSpacing/appCustomSpacing';
import { useForm , SubmitHandler } from 'react-hook-form';
import { useRouter , useParams } from 'next/navigation';
import { validatePassword, } from '../../component/validation';
import {  verifyPasswordAuth } from '@/app/api/repository/authRepository';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AppLoadingBar from '@/app/components/appLoadingBar/appLoadingBar'
import AppButton from '@/app/components/appButton/appButton';
import AppTextField from '@/app/components/appTextField/appTextField'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton';
import AppHeadline from '@/app/components/appHeadline/appHeadline';
import { useState } from 'react';


const  ResetPasswordPage = () => {

    const { push } = useRouter();

    const [loadingProgress,setLoadingProgress] = useState(0);

    const params = useParams()
    const uniqueId = params.uniqueId 

    const { register, watch ,handleSubmit, formState: { errors } } = useForm();

    const password = watch('password', '');
    
    const onSubmit= async (data ) => {

        try {

            const jsonData = {
                uniqueId : uniqueId,
                newPassword : data.password,
                newConfirmPassword : data.confirmPassword, 
            }

            if(data.password != data.confirmPassword){
                toast.warn('Passward tidak cocok')
                return false
            }

            const res = await verifyPasswordAuth(jsonData)

            setLoadingProgress(80)

            if(res.status == 'OK'){
                toast.success('Ganti Kata Sandi Berhasil')
                setLoadingProgress(100)
                push('/auth/signin')
            }
                
        } catch (error) {
            if(error.status == 400){
                toast.error(error.data.message)
            }else{
                toast.error(error.data.message)   
            }
                setLoadingProgress(100)
        }


    };

    return(
            <Box className = 'flex flex-col items-center justify-center rounded-sm p-[40px] xl:p-[10px] h-[100vh]  relative'>
                <Box className='  flex justify-end  top-0 mt-[40px] right-[30px] lg:right-0 xl:right-0  w-[100%] absolute z-[12]'> 
                    <AppCloseButton
                        onClick = {()=>{
                            push('/auth/signin')
                        }}
                    />
                </Box>
                    <AppLoadingBar 
                        
                        progress={loadingProgress} 
                        onLoaderFinished={() => setLoadingProgress(0)
                    } />
                    <AppHeadline 
                        title = {'Password Baru'}
                        subtitle = {'Buat password baru yang berbeda dari sebelumnya.' }
                    />
                    <CustomSpacing height = {20} />
                    <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                        <label className='text-black font-semibold'>Kata Sandi</label>
                        <AppTextField
                                id="password"
                                placeholder='Masukkan kata sandi di sini'
                                type="password"
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
                                type="password"
                                validationConfig = {register('confirmPassword', {
                                required: 'Please confirm your password',
                                    validate: value => {
                                        if(value !== password ){
                                            'Password tidak Cocok'
                                        }
                                    }
                                })}
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword && errors.confirmPassword.message}
                            />
            
                        <AppButton
                                text={'Simpan'} 
                                type = {'Submit'}
                                fontSize = {'12px'}
                                onClick = {()=>{}}
                        />
                    </form>
                    <ToastContainer autoClose={800}/>
                </Box>
    )
}

export default  ResetPasswordPage;