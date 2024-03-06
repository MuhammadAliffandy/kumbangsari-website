'use client'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getToken, setToken } from '@/app/redux/slices/authSlice';
import { validateEmail, validatePassword } from '../component/validation';
import { loginAuth } from '@/app/api/repository/authRepository';
import AppButton from '@/app/components/appButton';
import AppHeadline from '@/app/components/appHeadline'
import "../../../../globals.css";



const SignInPage = () => {

    const dispatch = useDispatch();
    const { push } = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit  = async (data ) => {

        const res = await loginAuth(data)

        console.log(res);
        dispatch(setToken(res.token))
        push('/example')
    };

    return(
        <Box className = 'bg-white flex flex-col items-center rounded-sm p-[70px]'>
            <AppHeadline 
                title = {'Selamat Datang Kembali!'}
                subtitle = {'Masuk ke dalam akun, dan akses kembali datamu!'}
            />
            <CustomSpacing height = {20} />
                <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                    <label className='text-black font-semibold'>Email</label>
                    <TextField
                        className=' w-[100%] rounded-xl bg-CUSTOM-GREY  '
                        id="email"
                        placeholder='Masukkan email di sini'
                        InputProps={{
                            style: {
                                borderRadius: "15px",
                            }
                        }}
                        {...register('email', { 
                            validate : validateEmail
                        })}
                        error={Boolean(errors.email)}
                        helperText={errors.email && errors.email.message}
                        />
                    <label className='text-black font-semibold '>Kata Sandi</label>
                    <TextField
                        className=' w-[100%] bg-CUSTOM-GREY '
                        id="password"
                        placeholder='Masukkan kata sandi di sini'
                        type="password"
                        InputProps={{
                            style: {
                                borderRadius: "15px",
                            }
                        }}
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
                    <Box className = 'w-[100%] flex justify-center'>
                        <button  onClick = {()=>{push('/auth/signup')}}  className='text-black cursor-pointer text-[14px] text-opacity-[25%]'>Belum punya akun?</button>
                        <CustomSpacing width = {5}/>
                        <button  onClick = {()=>{push('/auth/signup')}}  className='text-black cursor-pointer text-[14px] font-bold'>Daftar</button>
                    </Box>
                </form>
        </Box>
    )
}

export default SignInPage;