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

const SignUpPage  = () => {

    const { push } = useRouter();

    type signUpData = {
        name : string;
        email : string;
        phoneNumber : string;
        password : string ;
        confirmPassword : string;
    }

    const { register, watch ,handleSubmit, formState: { errors } } = useForm<signUpData>();

    const password = watch('password', '');
    
    const onSubmit : SubmitHandler<signUpData> = async (data ) => {

        const res = await createAuth(data)
        console.log(res)
        

    };

    return(
        <Container className='bg-red-500'>
            <Box className = 'bg-white flex flex-col items-center shadow-xl rounded-sm p-[10px]'>
                <Typography className='text-[20px] text-black'>
                    Register
                </Typography>
                <CustomSpacing height = {10} />
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
                    <Button type='submit' variant="contained" className='w-[100%]'>
                        Daftar
                    </Button>
                    <Typography onClick = {()=>{push('/auth/signin')}}  className='text-black cursor-pointer'>sudah punya akun</Typography>
                </form>
            </Box>
        </Container>
    )
}

export default SignUpPage ;