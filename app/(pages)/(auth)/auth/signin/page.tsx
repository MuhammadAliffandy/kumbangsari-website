'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getToken, setToken } from '@/app/redux/slices/authSlice';
import { validateEmail, validatePassword } from '../component/validation';
import { loginAuth } from '@/app/api/repository/authRepository';

const SignInPage = () => {

    const dispatch = useDispatch();
    const { push } = useRouter()
    type signInData = {
        email : string;
        password : string ;
    }

    const { register, handleSubmit, formState: { errors } } = useForm<signInData>();
    
    const onSubmit : SubmitHandler<signInData> = async (data ) => {

        const res = await loginAuth(data)

        console.log(res);
        dispatch(setToken(res.token))
        push('/example')
    };

    return(
        <Container className='bg-red-500'>
            <Box className = 'bg-white flex flex-col items-center shadow-xl rounded-sm p-[10px]'>
                <Typography className='text-[20px] text-black'>
                    Login
                </Typography>
                <CustomSpacing height = {10} />
                    <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
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
                            id="password"
                            label="Password"
                            placeholder='Password'
                            type="password"
                            {...register(
                                'password', {   
                                    validate : validatePassword
                            })}
                            error={Boolean(errors.password)}
                            helperText={errors.password && errors.password.message}
                        
                        />  
                        <CustomSpacing height = {10} /> 
                        <Box className = 'w-[100%] flex justify-end'>
                            <Typography onClick = {()=>{push('forgot-pass')}} className='text-black cursor-pointer'>Lupa Password</Typography>
                        </Box>

                        <CustomSpacing height = {10} />
                        <Button type='submit' variant="contained" className='w-[100%]'>
                            Masuk
                        </Button>
                        <Typography  onClick = {()=>{push('/auth/signup')}}  className='text-black cursor-pointer'>belum punya akun</Typography>
                    </form>
            </Box>
        </Container>
    )
}

export default SignInPage;