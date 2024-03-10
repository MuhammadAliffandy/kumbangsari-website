'use client'

import Box from '@mui/material/Box';
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { validateEmail } from '../component/validation';
import AppButton from '@/app/components/appButton';
import AppHeadline from '@/app/components/appHeadline';
import AppTextField from '@/app/components/appTextField'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { resetPasswordAuth } from '@/app/api/repository/authRepository';

const ForgotPasswordPage = () => {

    const { push } = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const notify = () => {
        toast.success('Email Berhasil dikirim')
    }

    
    const onSubmit = async (data ) => {
        try {
            const res = await resetPasswordAuth({email : data.email});

            if(res.status == 'OK'){
                notify()
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server')
        }
    };

    return(
        <Box className = 'bg-white flex flex-col items-center rounded-sm p-[70px]'>
            <AppHeadline 
                title = {'Lupa Kata Sandi?'}
                subtitle = {'Buat kata sandi baru dan masuk kembali ke akunmu!'}
            />
            <CustomSpacing height = {20} />
            <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                <label className='text-black font-semibold'>Email</label>
                <AppTextField
                    id="email"
                    type='email'
                    placeholder='Masukkkan email di sini'
                    validationConfig = {register('email', { 
                        validate : validateEmail
                    })}
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                    />
                <AppButton
                    text={'Kirim'} 
                    type = {'Submit'}
                    fontSize = {'12px'}
                    onClick = {()=>{}}
                />
            </form>
            <ToastContainer autoClose={800} />
        </Box>
    )
}

export default ForgotPasswordPage;