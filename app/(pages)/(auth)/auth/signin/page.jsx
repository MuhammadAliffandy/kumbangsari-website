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
// import { makeStyles } from '@mui/styles';
import "../../../../globals.css";


// const useStyles = makeStyles({
//     fieldset: {
//         borderRadius: 20,
//     },
// });

const SignInPage = () => {

    const dispatch = useDispatch();
    const { push } = useRouter()

    // const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit  = async (data ) => {

        const res = await loginAuth(data)

        console.log(res);
        dispatch(setToken(res.token))
        push('/example')
    };

    return(
        <div  className=' h-[100vh] flex'>
            <Box className = 'w-[50%] h-[100vh] bg-black'>
            {/*  */}
            </Box>
            <Box className = 'w-[50%] h-[100vh] flex flex-col items-center justify-center'>
                <Box className = 'bg-white flex flex-col items-center rounded-sm p-[70px]'>
                    <h1 className='text-[32px] text-black font-bold'>
                        Selamat Datang Kembali!
                    </h1>
                    <p className='text-[15px] text-black font-medium'>
                        Masuk ke dalam akun, dan akses kembali datamu!
                    </p>
                    <CustomSpacing height = {20} />
                        <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                            <label className='text-black'>Email</label>
                            <TextField
                                className=' w-[100%] rounded-xl '
                                id="email"
                                placeholder='Email'
                                {...register('email', { 
                                    validate : validateEmail
                                })}
                                error={Boolean(errors.email)}
                                helperText={errors.email && errors.email.message}
                                />
                            <label className='text-black'>Password</label>
                            <TextField
                                className=' w-[100%]'
                                id="password"
                                placeholder='Password'
                                type="password"
                                sx={{
                                    borderRadius : '15px'
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
            </Box>
        </div>
    )
}

export default SignInPage;