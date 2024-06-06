'use client'

import AppButton from "@/app/components/appButton/appButton";
import AppLayout from "../../component/appLayout";
import Box from '@mui/material/Box'
import AppModalChangePass from '@/app/(pages)/(dashboard)/dashboard/profile/component/appModalChangePass'
import AppTextField from '@/app/components/appTextField/appTextField'
import { validateEmail, validateName, validatePassword, validatePhoneNumber } from '@/app/(pages)/(auth)/auth/component/validation';
import { useForm , } from 'react-hook-form';
import { getUserProfile , editUserProfile } from '@/app/api/repository/userRepository'
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AppAnimationButton from "@/app/components/appAnimation/appAnimationButton";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const { push } = useRouter() 
    const { register, watch ,handleSubmit, formState: { errors } } = useForm();
    const [userLoading , setUserLoading ] = useState(false)
    const [ openModalChangePass , setOpenModalChangePass  ] = useState(false)
    const [ name , setName ] = useState('')
    const [ email , setEmail ] = useState('')
    const [ phoneNumber , setPhoneNumber ] = useState('')
    const [image, setImage] = useState('');
    const [ user , setUser ] = useState('')
    const inputFileImageRef = useRef(null)
    const [fileImage, setFileImage] = useState(null);
    const [imgPayload, setImgPayload] = useState(null);

    const handleFileChange = (event) => {
        const value = event.target.files[0]
        setImgPayload(event.target.files[0])
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
    
    const getCurrentUserData = () => {
        setName(user.name)
        setEmail(user.email)
        setPhoneNumber(user.phoneNumber)
        setImage(user.profileImage)
    }

    const fetchUserProfile = async () => {
        setUserLoading(true)
        try {
            const res = await getUserProfile()
            
            if(res.status === 'OK'){ 
                setUser(res.data)
            }
            setUserLoading(false)
        } catch (error) {
            setUserLoading(false)
            if(error.status == 401){
                toast.error('Authentication Failed') 
            }else{
                toast.error('Ada Kesalahan Server (500)') 

            }
        }
    }
    
    const onSubmit= async () => {
        
        try {
            const formData = new FormData();

            formData.append('name',name)
            formData.append('phoneNumber',phoneNumber)
            
            if(imgPayload){
                formData.set('image',imgPayload , imgPayload.name)
            }
            
            const res = await editUserProfile(formData)
            
            if(res.status === 'OK'){
                toast.success('Edit Profile Berhasil')
            }
            
        } catch (error) {
            if(error.status == 404){
                toast.error('Edit Profile Gagal')
            }else{
                toast.error('Ada Kesalahan Server (500)')
            }
        }

    };


    useEffect(()=>{
        fetchUserProfile()
    },[])

    useEffect(()=>{
        getCurrentUserData()
    },[user])


    return (
        <AppLayout title='Profil > Akun'>
            <AppModalChangePass 
                open={openModalChangePass}
                onCloseButton = {(value)=> {
                    setOpenModalChangePass(value)
                }}
                onClose = {(value)=> {
                    setOpenModalChangePass(value)
                }}
            />
            <Box className = "grow h-[86%] p-[20px] bg-white">
                <Box className='h-[100%] w-[100%] flex flex-col bg-NEUTRAL-100 rounded-[20px] relative'>
                    <Box className='w-[100%] bg-gradient-to-r from-[#44B8F8] to-[#4F55E3] rounded-t-[20px] h-[30%]'>
                    </Box>
                    <Box className='w-[100%] h-[88%] flex flex-col xl:flex-row md:flex-row sm:flex-col gap-[20px] p-[20px] absolute z-[100] bottom-0 overflow-y-auto scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full '>
                        <Box className='flex-none flex flex-col items-center justify-between bg-white w-[100%] lg:w-[20%] xl:w-[20%] h-[100%] p-[20px] rounded-[20px] hover:shadow-md'>
                            <Box className='flex flex-col gap-[20px] items-center'>
                                <Box className=' w-[200px] h-[200px] relative'>
                                    <input type="file" onChange={handleFileChange} ref={inputFileImageRef} hidden/>
                                    <button onClick={handleButtonFileClick} className="bg-PRIMARY-500 rounded-[20px] border-white border-[4px] p-[7px] absolute z-[100] bottom-0 right-5" ><img src="/images/icon/edit-profile.svg" /></button>
                                    <img className="rounded-[100%] w-[100%] h-[100%] xl:h-[100%] object-cover relative" 
                                        src={
                                            fileImage ? fileImage : image ? image :  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" 
                                            
                                        } alt="image-profile" 
                                    />
                                </Box>
                                <Box className='flex flex-col items-center'>
                                    <p className="text-TEXT-1 text-[16px] font-bold">{user.name || 'Your Name'}</p>
                                    <span className="flex items-center gap-[3px]">
                                        <p className="text-TEXT-1 text-[12px]">Paket {user.subscription || 0}</p>
                                        <img src="/images/icon/success-check.svg" />
                                    </span>
                                    <p className="text-TEXT-1 text-[12px]">{user.phoneNumber || '081xxxxxx'}</p>
                                    <p className="text-TEXT-1 text-[12px]">{user.email || 'taylorsiwft@gmail.com' }</p>
                                    <p className="text-TEXT-4 text-[10px]">{user.productCount || '0'} Produk</p>
                                </Box>
                            </Box>
                            <AppAnimationButton>
                                <AppButton
                                        className={' flex gap-[10px] w-[100%] justify-center items-center text-[14px] bg-SECONDARY-500 rounded-[10px] px-[25px] py-[8px]'}
                                        text={'Keluar'} 
                                        type = {'Submit'}
                                        onClick = {()=>{
                                            push('/')
                                        }}
                                />
                            </AppAnimationButton>
                        </Box>
                        <Box className='grow flex flex-col bg-white h-[100%] p-[20px] rounded-[20px] hover:shadow-md'>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[20px] w-[100%]'>
                                <label className='text-black font-semibold'>Nama</label>
                                <AppTextField
                                        id="name"
                                        value = {name}
                                        placeholder='Masukkan nama lengkap di sini'
                                        validationConfig = {register('name', 
                                            {
                                                validate: validateName
                                            })}
                                        error={Boolean(errors.name)}
                                        helperText={errors.name && errors.name.message}
                                        onChange={(event)=>{
                                            setName(event.target.value)
                                        }}
                                    />
                                <Box className='flex items-center gap-[20px] w-[100%]'>   
                                    <Box className='flex flex-col gap-[10px] w-[50%]'>
                                        <label className='text-black font-semibold'>Email</label>
                                        <AppTextField
                                            id="email"
                                            value={email}
                                            type='email'
                                            placeholder='Masukkan email di sini'
                                            disabled={true}
                                            />
                                    </Box>
                                    <Box className='grow flex flex-col gap-[10px] '>
                                        <label className='text-black font-semibold'>Nomor Telepon</label>
                                        <AppTextField            
                                                id="phoneNumber"
                                                value = {phoneNumber}
                                                placeholder='Masukkan no telepon di sini'
                                                validationConfig = {register('phoneNumber', { 
                                                    validate: validatePhoneNumber 
                                                })}
                                                error={Boolean(errors.phoneNumber)}
                                                onChange={(event)=>{
                                                    setPhoneNumber(event.target.value)
                                                }}
                                            />
                                    </Box>
                                </Box> 
                                <label className='text-black font-semibold'>Kata Sandi</label>
                                <AppTextField
                                        id="password"
                                        value = {'000000000000'}
                                        placeholder='Masukkan kata sandi di sini'
                                        type={"password"} 
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