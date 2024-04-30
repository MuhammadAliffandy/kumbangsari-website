'use client'

import AppButton from "@/app/components/appButton/appButton";
import AppLayout from "../../component/appLayout";
import Box from '@mui/material/Box'
import AppModalChangePass from '@/app/(pages)/(dashboard)/dashboard/profile/component/appModalChangePass'
import AppTextField from '@/app/components/appTextField/appTextField'
import { validateEmail, validateName, validatePassword, validatePhoneNumber } from '@/app/(pages)/(auth)/auth/component/validation';
import { useForm , } from 'react-hook-form';
import { getCurrentUser } from '@/app/api/repository/authRepository'
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const { register, watch ,handleSubmit, formState: { errors } } = useForm();
    const [userLoading , setUserLoading ] = useState(false)
    const [ openModalChangePass , setOpenModalChangePass  ] = useState(false)
    const [ user , setUser ] = useState('')
    const inputFileImageRef = useRef(null)
    const [fileImage, setFileImage] = useState(null);

    const handleFileChange = (event) => {
        const value = event.target.files[0]
        if (value) {
            const reader = new FileReader();
            reader.onload = () => {
                setFileImage(reader.result);
            };
            reader.readAsDataURL(value);
        }
    };

    const handleButtonFileClick = () => {
        inputFileImageRef.current.click();
    };
    
    const fetchUserProfile = async () => {
        setUserLoading(true)
        try {
            const res = await getCurrentUser()
            
            if(res.status === 'OK'){
                console.log(res.data)
                setUser(res.data)
            }
            setUserLoading(false)
        } catch (error) {
            toast.error('Authentication Failed')
            setUserLoading(false)
        }
    }
    
    const onSubmit= async (data ) => {

    };


    useEffect(()=>{
        fetchUserProfile()
    },[])


    return (
        <AppLayout title='Profil > Akun'>
            <AppModalChangePass 
                open={openModalChangePass}
                onCloseButton = {(value)=> {
                    setOpenModalChangePass(value)
                }}
            />
            <Box className = "grow h-[86%] p-[20px] bg-NEUTRAL-100">
                <Box className='h-[100%] w-[100%] flex flex-col border-[1px] border-TEXT-4 rounded-[20px] relative'>
                    <Box className='w-[100%] bg-gradient-to-r from-[#44B8F8] to-[#4F55E3] rounded-t-[20px] h-[30%]'>
                    </Box>
                    <Box className='w-[100%] h-[88%] flex gap-[20px] p-[20px] absolute z-[100] bottom-0'>
                        <Box className='flex-none flex flex-col items-center justify-between bg-white w-[20%] h-[100%] p-[20px] rounded-[20px] border-[1px] border-TEXT-4'>
                            <Box className='flex flex-col gap-[20px] items-center'>
                                <Box className='w-[160px] h-[160px] relative'>
                                    <input type="file" onChange={handleFileChange} ref={inputFileImageRef} hidden/>
                                    <button onClick={handleButtonFileClick} className="bg-PRIMARY-500 rounded-[20px] border-white border-[4px] p-[7px] absolute z-[100] bottom-0 right-5" ><img src="/images/icon/edit-profile.svg" /></button>
                                    <img className="rounded-[100%] w-[100%] h-[100%] relative" 
                                        src={
                                            fileImage || "https://akcdn.detik.net.id/visual/2023/10/25/suzy-ungkap-alasan-di-balik-gaya-rambut-hime-di-doona-1_43.jpeg?w=650&q=90"
                                        } alt="image-profile" 
                                    />
                                </Box>
                                <Box className='flex flex-col items-center'>
                                    <p className="text-TEXT-1 text-[16px] font-bold">{user.name || 'Your Name'}</p>
                                    <span className="flex items-center gap-[3px]">
                                        <p className="text-TEXT-1 text-[12px]">Paket 1</p>
                                        <img src="/images/icon/success-check.svg" />
                                    </span>
                                    <p className="text-TEXT-1 text-[12px]">{user.phoneNumber || '081xxxxxx'}</p>
                                    <p className="text-TEXT-1 text-[12px]">{user.email || 'taylorsiwft@gmail.com' }</p>
                                    <p className="text-TEXT-4 text-[10px]">{user.countProduct || '0'} Produk</p>
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
                                    <p onClick={() => setOpenModalChangePass(!openModalChangePass)} className="text-TEXT-1 underline font-bold text-[14px] cursor-pointer ">Ubah Kata Sandi</p>
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