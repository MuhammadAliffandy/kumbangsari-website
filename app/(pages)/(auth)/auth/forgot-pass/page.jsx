'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { validateEmail } from '../component/validation';
import AppButton from '@/app/components/appButton';
import AppHeadline from '@/app/components/appHeadline';

const ForgotPasswordPage = () => {

    const { push } = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data ) => {
        console.log(data);
        return data;
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
                <TextField
                    className=' w-[100%] '
                    id="email"
                    placeholder='Masukkkan email di sini'
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
                <AppButton
                    text={'Kirim'} 
                    type = {'Submit'}
                    fontSize = {'12px'}
                    onClick = {()=>{}}
                />
            </form>
        </Box>
    )
}

export default ForgotPasswordPage;