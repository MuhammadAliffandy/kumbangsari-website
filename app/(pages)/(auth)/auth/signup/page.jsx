'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { validateEmail, validateName, validatePassword, validatePhoneNumber } from '../component/validation';
import { createAuth } from '@/app/api/repository/authRepository';
import AppButton from '@/app/components/appButton';

const SignUpPage  = () => {

    const { push } = useRouter();

    const { register, watch ,handleSubmit, formState: { errors } } = useForm();

    const password = watch('password', '');
    
    const onSubmit= async (data ) => {

        const res = await createAuth(data)
        console.log(res)
        

    };

    return(

        <div  className=' h-[100vh] flex'>
            <Box className = 'w-[50%] h-[100vh] bg-black'>

            </Box>
            <Box className = 'w-[50%] h-[100vh] flex flex-col items-center justify-center'>
                <Box className = 'bg-white flex flex-col items-center rounded-sm p-[10px]'>
                    <h1 className='text-[32px] text-black font-bold'>
                        Selamat Datang Kembali!
                    </h1>
                    <p className='text-[15px] text-black font-medium'>
                        Masuk ke dalam akun, dan akses kembali datamu!
                    </p>
                    <CustomSpacing height = {20} />
                    <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                        <TextField
                                className=' w-[100%]'
                                id="name"
                                label="Name"
                                placeholder='Name'
                                {...register('name', 
                                    {
                                        validate: validateName
                                    })}
                                error={Boolean(errors.name)}
                                helperText={errors.name && errors.name.message}
                            />
                        <TextField
                                className=' w-[100%]'
                                id="email"
                                label="Email"
                                placeholder='Email'
                                {...register('email', {
                                    validate : validateEmail
                                })}
                                error={Boolean(errors.email)}
                                helperText={errors.email && errors.email.message}
                            />
                            <TextField
                                className=' w-[100%]'
                                id="phoneNumber"
                                label="No Handphone"
                                placeholder='Nomor Handphone'
                                {...register('phoneNumber', { 
                                    validate: validatePhoneNumber 
                                })}
                                error={Boolean(errors.phoneNumber)}
                            />
                            <TextField
                                className=' w-[100%]'
                                id="password"
                                label="Password"
                                placeholder='Password'
                                type="password"
                                {...register('password', {
                                    validate : validatePassword
                                })}
                                error={Boolean(errors.password)}
                                helperText={errors.password && errors.password.message}
                            
                            />
                            <TextField
                                className=' w-[100%]'
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                    validate: value => value === password || 'Password tidak cocok'
                                })}
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword && errors.confirmPassword.message}
                            />
            
                        <CustomSpacing height = {20} />
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
                </Box>
            </Box>
        </div>
    )
}

export default SignUpPage ;