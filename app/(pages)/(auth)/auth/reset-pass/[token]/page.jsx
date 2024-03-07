'use client'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { validatePassword, } from '../../component/validation';
import { createAuth } from '@/app/api/repository/authRepository';
import AppButton from '@/app/components/appButton';
import AppHeadline from '@/app/components/appHeadline';

const  ResetPasswordPage = () => {

    const { push } = useRouter();

    const { register, watch ,handleSubmit, formState: { errors } } = useForm();

    const password = watch('password', '');
    
    const onSubmit= async (data ) => {

        const res = await createAuth(data)
        console.log(res)

    };

    return(
        <Box className = 'bg-white flex flex-col items-center rounded-sm p-[10px]'>
                    <AppHeadline 
                        title = {'Password Baru'}
                        subtitle = {'Buat password baru yang berbeda dari sebelumnya.' }
                    />
                    <CustomSpacing height = {20} />
                    <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
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
                                text={'Simpan'} 
                                type = {'Submit'}
                                fontSize = {'12px'}
                                onClick = {()=>{}}
                        />
                    </form>
                </Box>
    )
}

export default  ResetPasswordPage;