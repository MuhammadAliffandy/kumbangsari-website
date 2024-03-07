'use client'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { validateEmail, validateName, validatePassword, validatePhoneNumber } from '../component/validation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createAuth } from '@/app/api/repository/authRepository';
import AppButton from '@/app/components/appButton';
import AppHeadline from '@/app/components/appHeadline';


const SignUpPage  = () => {

    const { push } = useRouter();

    const { register, watch ,handleSubmit, formState: { errors } } = useForm();

    const password = watch('password', '');
    
    const notify = () => {
        toast.success('Pendaftaran Berhasil')
    }

    const onSubmit= async (data ) => {

        sessionStorage.setItem('email' ,data.email)
        const res = await createAuth(data)
        console.log(res)

        if(res.status = 'OK'){
            push('/auth/otp-verified')
        }
        notify();

    };

    return(
        <Box className = 'bg-white flex flex-col items-center rounded-sm p-[10px]'>
                    <AppHeadline 
                        title = {'Selamat Datang!'}
                        subtitle = {'Daftarkan akun dan mulai manajemen kontenmu!' }
                    />
                    <CustomSpacing height = {20} />
                    <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                        <label className='text-black font-semibold'>Nama</label>
                        <TextField
                                className=' w-[100%]   '
                                id="name"
                                placeholder='Masukkan nama lengkap disini'
                                InputProps={{
                                    style: {
                                        borderRadius: "15px",
                                        backgroundColor: '#F7F9F9'
                                    }
                                }}
                                {...register('name', 
                                    {
                                        validate: validateName
                                    })}
                                error={Boolean(errors.name)}
                                helperText={errors.name && errors.name.message}
                            />
                        <Stack direction="row" spacing={2}>   
                            <Box className='flex flex-col gap-[10px]'>
                                <label className='text-black font-semibold'>Email</label>
                                <TextField
                                        className=' w-[100%]  '
                                        id="email"
                                        placeholder='Masukkan email di sini'
                                        InputProps={{
                                            style: {
                                                borderRadius: "15px",
                                                backgroundColor: '#F7F9F9'
                                            }
                                        }}
                                        {...register('email', {
                                            validate : validateEmail
                                        })}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email && errors.email.message}
                                    />
                            </Box>
                            <Box className='flex flex-col gap-[10px]'>
                                <label className='text-black font-semibold'>Nomor Telepon</label>
                                <TextField
                                        className=' w-[100%]  '
                                        id="phoneNumber"
                                        placeholder='Masukkan no telephone di sini'
                                        InputProps={{
                                            style: {
                                                borderRadius: "15px",
                                                backgroundColor: '#F7F9F9'
                                            }
                                        }}
                                        {...register('phoneNumber', { 
                                            validate: validatePhoneNumber 
                                        })}
                                        error={Boolean(errors.phoneNumber)}
                                    />
                            </Box>
                        </Stack> 
                        <label className='text-black font-semibold'>Kata Sandi</label>
                        <TextField
                                className=' w-[100%]  '
                                id="password"
                                placeholder='Masukkan kata sandi di sini'
                                type="password"
                                InputProps={{
                                    style: {
                                        borderRadius: "15px",
                                        backgroundColor: '#F7F9F9'
                                    }
                                }}
                                {...register('password', {
                                    validate : validatePassword
                                })}
                                error={Boolean(errors.password)}
                                helperText={errors.password && errors.password.message}
                            
                            />
                        <label className='text-black font-semibold'>Konfirmasi Kata Sandi</label>
                        <TextField
                                className=' w-[100%]  '
                                id="confirmPassword"
                                placeholder='Masukkan konfirmasi kata sandi di sini'
                                type="password"
                                InputProps={{
                                    style: {
                                        borderRadius: "15px",
                                        backgroundColor: '#F7F9F9'
                                    }
                                }}
                                {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                    validate: value => value === password || 'Password tidak cocok'
                                })}
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword && errors.confirmPassword.message}
                            />
                        <AppButton
                                text={'Daftar Sekarang'} 
                                type = {'Submit'}
                                fontSize = {'12px'}
                                onClick = {()=>{}}
                        />
                        <Box className = 'w-[100%] flex justify-center'>
                                <p  onClick = {()=>{push('/auth/signin')}}  className='text-black cursor-pointer text-[14px] text-opacity-[25%]'>Sudah punya akun?</p>
                                <CustomSpacing width = {5}/>
                                <p  onClick = {()=>{push('/auth/signin')}}  className='text-black cursor-pointer text-[14px] font-bold'>Masuk</p>
                        </Box>
                    </form>
                    <ToastContainer/>
                </Box>

    )
}

export default SignUpPage ;