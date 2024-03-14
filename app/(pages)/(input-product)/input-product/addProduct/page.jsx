'use client'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { validateEmail } from '../.../../../../(auth)/auth/component/validation';
import AppButton from '@/app/components/appButton';
import AppHeadline from '@/app/components/appHeadline';
import AppTextField from '@/app/components/appTextField';
import AppTextWithLine from '@/app/components/appTextWithLine';
import AppDropDown from '@/app/components/appDropDown';
import AppSubNav from '@/app/components/appSubNav';
import AppCloseButton from '@/app/components/appCloseButton';
import AppGenderCheckbox from '../addProduct/component/appGenderCheckbox';
import AppSchoolCheckbox from '../addProduct/component/appSchoolCheckbox';
import AppJobCheckbox from '../addProduct/component/appJobCheckbox';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { resetPasswordAuth } from '@/app/api/repository/authRepository';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AddProductPage = () => {

    const listDropItem = [
        {value : 1 , text : 'Satu'},
        {value : 2 , text : 'Dua'},
        {value : 3 , text : 'Tiga'},
    ]

    const { push } = useRouter()
    const countProduct = useSelector(state => state.countInputProduct.value)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [categoryProduct, setCategoryProduct] = useState('');
    const [page, setPage] = useState('product1');

    const notify = () => {
        toast.success('Email Berhasil dikirim')
    }

    const handleChangeCategory = (event) => {
        setCategoryProduct(event.target.value);
    };

    
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
        <Box className = 'bg-transparent flex flex-col items-center rounded-sm px-[180px] w-[100%]'>
            <Box className='flex justify-between w-[100%]'> 
                <AppSubNav 
                    status={page}
                    value={countProduct}
                    handleSub1={()=>{setPage('product1')}}
                    handleSub2={()=>{setPage('product2')}}
                    handleSub3={()=>{setPage('product3')}}
                />
                <AppCloseButton
                    onClick = {()=>{
                        push('/input-product/addCountProduct')
                    }}
                />
            </Box>
            <AppHeadline 
                title = {'Data Produk'}
                subtitle = {''}
            />
            <CustomSpacing height = {20} />
            <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                <AppTextWithLine
                        text = 'Informasi Produk'
                        width='28.5%'
                    />
                <label className='text-black font-semibold'>Nama Produk</label>
                <AppTextField
                    id="productName"
                    type='text'
                    placeholder='Masukkkan nama produk di sini'
                    validationConfig = {register('productName', { 
                        validate : validateEmail
                    })}
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                    />
                <label className='text-black font-semibold'>Kategori Produk</label>
                <AppDropDown
                    value={categoryProduct}
                    placeholder={'Pilih Kategori Produk'}
                    listItem = {listDropItem}
                    onChange={handleChangeCategory}
                />
                <Box className= 'flex flex-col gap-[12px]'>
                    <AppTextWithLine
                        text = 'Target Pasar'
                        width='32%'
                    />
                    {/* checkbox */}
                    <Box className='flex justify-between'>
                        <Box>
                            <label className='text-black font-semibold'>Gender</label>
                            <CustomSpacing height={10} />
                            <AppGenderCheckbox 
                                onChange={(data)=>{
                                    console.log(data)
                                }}
                            />
                        </Box>
                        <Box>
                            <label className='text-black font-semibold'>Pendidikan Terakhir</label>
                            <CustomSpacing height={10} />
                            <AppSchoolCheckbox 
                                onChange={(data)=>{
                                    console.log(data)
                                }}
                            />
                        </Box>
                    </Box>
                    <Box>
                            <label className='text-black font-semibold'>Ranah Pekerjaan</label>
                            <CustomSpacing height={10} />
                            <AppJobCheckbox
                                onChange={(data)=>{
                                    console.log(data)
                                }}
                            />
                        </Box>
                </Box>
                <Box className='w-[100%] flex gap-[10px]'>
                    {
                        page == 'product1' ? 
                        <AppButton
                            text={ countProduct == 1 ? 'Simpan'  : 'Selanjutnya'} 
                            type = {'Submit'}
                            fontSize = {'12px'}
                            onClick = {
                                countProduct == 1 ? 

                                ()=>{
                                    console.log('simpan')
                                } :
                                ()=>{
                                    setPage('product2')
                                }
                            }
                        /> :  page == 'product2' || page == 'product3' ?
                                <>
                                    <AppButton
                                        text={'Sebelumnya'} 
                                        type = {'Submit'}
                                        fontSize = {'12px'}
                                        onClick = {

                                            countProduct == 2 ? 
                                            ()=>{
                                                console.log('simpan')
                                            } :
                                            page == 'product2' ? 
                                            ()=>{
                                                setPage('product1')
                                            } : page == 'product3' ? 
                                            ()=>{
                                                setPage('product2')
                                            } : ()=>{}
                                        }
                                    /> 
                                    <AppButton
                                        text={ countProduct == 2 ? 'Simpan' : page == 'product2' ? 'Selanjutnya' : page == 'product3' ? 'Simpan' : null} 
                                        type = {'Submit'}
                                        fontSize = {'12px'}
                                        onClick = {

                                            countProduct == 3 ? 
                                            ()=>{
                                                console.log('simpan')
                                            } :

                                            page == 'product2' ? 
                                            ()=>{
                                                setPage('product3')
                                            } : page == 'product3' ? 
                                            ()=>{
                                                console.log('simpan')
                                            } : ()=>{}
                                        }
                                    /> 
                                </> : null
                    }
                </Box>
            </form>
            <ToastContainer autoClose={800} />
        </Box>
    )
}

export default AddProductPage;