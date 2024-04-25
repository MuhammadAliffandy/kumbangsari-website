'use client'

import AppButton from "@/app/components/appButton/appButton";
import AppLayout from "../../component/appLayout";
import Box from '@mui/material/Box'
import AppTextField from '@/app/components/appTextField/appTextField'
import Stack from '@mui/material/Stack'
import { validateEmail, validateName, validatePassword, validatePhoneNumber } from '@/app/(pages)/(auth)/auth/component/validation';
import { useForm , } from 'react-hook-form';


const ProfilePage = () => {
    const { register, watch ,handleSubmit, formState: { errors } } = useForm();
    
    const fetchUserProfile = async () => {

    }
    
    const onSubmit= async (data ) => {

    };


    return (
        <AppLayout title='Profil > Akun'>
            <Box className = "grow h-[86%] p-[20px] bg-NEUTRAL-100">
                <Box className='h-[100%] w-[100%] flex flex-col border-[1px] border-TEXT-4 rounded-[20px] relative'>
                    <Box className='w-[100%] bg-gradient-to-r from-[#44B8F8] to-[#4F55E3] rounded-t-[20px] h-[30%]'>
                    </Box>
                    <Box className='w-[100%] h-[88%] flex gap-[20px] p-[20px] absolute z-[100] bottom-0'>
                        <Box className='flex-none flex flex-col items-center justify-between bg-white w-[20%] h-[100%] p-[20px] rounded-[20px] border-[1px] border-TEXT-4'>
                            <Box className='flex flex-col gap-[20px] items-center'>
                                <img className="rounded-[100%] w-[160px] h-[160px]" 
                                    src="https://akcdn.detik.net.id/visual/2023/10/25/suzy-ungkap-alasan-di-balik-gaya-rambut-hime-di-doona-1_43.jpeg?w=650&q=90" alt="image-profile" 
                                />
                                <Box className='flex flex-col items-center'>
                                    <p className="text-TEXT-1 text-[16px] font-bold">Taylor Swift</p>
                                    <span className="flex items-center gap-[3px]">
                                        <p className="text-TEXT-1 text-[12px]">Paket 1</p>
                                        <img src="/images/icon/success-check.svg" />
                                    </span>
                                    <p className="text-TEXT-1 text-[12px]">0831212332</p>
                                    <p className="text-TEXT-1 text-[12px]">taylorsiwft@gmail.com</p>
                                    <p className="text-TEXT-4 text-[10px]">3 Produk</p>
                                </Box>
                            </Box>
                            <AppButton
                                    className={' flex gap-[10px] w-[100%] justify-center items-center text-[14px] bg-SECONDARY-500 rounded-[10px] px-[25px] py-[8px]'}
                                    text={'Keluar'} 
                                    type = {'Submit'}
                                    onClick = {()=>{}}
                            />
                        </Box>
                        <Box className='grow flex flex-col bg-white h-[100%] p-[20px] rounded-[20px] border-[1px] border-TEXT-4'>
                        <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                                <label className='text-black font-semibold'>Nama</label>
                                <AppTextField
                                        id="name"
                                        placeholder='Masukkan nama lengkap di sini'
                                        validationConfig = {register('name', 
                                            {
                                                validate: validateName
                                            })}
                                        error={Boolean(errors.name)}
                                        helperText={errors.name && errors.name.message}
                                    />
                                <Box className='flex items-center gap-[20px] w-[100%]'>   
                                    <Box className='flex flex-col gap-[10px] w-[50%]'>
                                        <label className='text-black font-semibold'>Email</label>
                                        <AppTextField
                                                id="email"
                                                type='email'
                                                placeholder='Masukkan email di sini'
                                                validationConfig = {register('email', {
                                                    validate : validateEmail
                                                })}
                                                error={Boolean(errors.email)}
                                                helperText={errors.email && errors.email.message}
                                            />
                                    </Box>
                                    <Box className='grow flex flex-col gap-[10px] '>
                                        <label className='text-black font-semibold'>Nomor Telepon</label>
                                        <AppTextField            
                                                id="phoneNumber"
                                                placeholder='Masukkan no telepon di sini'
                                                validationConfig = {register('phoneNumber', { 
                                                    validate: validatePhoneNumber 
                                                })}
                                                error={Boolean(errors.phoneNumber)}
                                            />
                                    </Box>
                                </Box> 
                                <label className='text-black font-semibold'>Kata Sandi</label>
                                <AppTextField
                                        id="password"
                                        placeholder='Masukkan kata sandi di sini'
                                        type={"password"} 
                                        validationConfig = {register('password', {
                                            validate : validatePassword
                                        })}
                                        error={Boolean(errors.password)}
                                        helperText={errors.password && errors.password.message}
                                        disabled={true}
                                    />
                                    <p className="text-TEXT-1 underline font-bold text-[14px] ">Ubah Kata Sandi</p>
                                    <Box className='w-[100%] flex justify-end '>
                                        <AppButton
                                                className={' flex gap-[10px] w-[20%] justify-center items-center text-[14px] bg-SECONDARY-500 rounded-[10px] px-[25px] py-[8px]'}
                                                text={'Simpan'} 
                                                type = {'Submit'}
                                                onClick = {()=>{}}
                                            />
                        
                                    </Box>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    ) 
}

export default ProfilePage;