'use client'

import Box from '@mui/material/Box';
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { validateText } from '../.../../../../(auth)/auth/component/validation';
import { listDropCategory }  from '@/app/utils/model'
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
import AppRangeSlider from '@/app/components/appRangeSlider';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { convertValueCheckbox } from '@/app/utils/helper';

const AddProductPage = () => {



    const { push } = useRouter()
    const countProduct = useSelector(state => state.countInputProduct.value)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [page, setPage] = useState('product1');
    const [categoryProduct, setCategoryProduct] = useState('');
    const [ ageRange , setAgeRange ] = useState([]);
    const [ gender , setGender ] = useState(localStorage.getItem('gender'));
    const [ school , setSchool ] = useState(localStorage.getItem('school'));
    const [ job , setJob ] = useState(localStorage.getItem('job'));


    const handleChangeCategory = (event) => {
        setCategoryProduct(event.target.value);
    };

    
    const onSubmit = async (data) => {
        try {
            const jsonData = {
                productName : data.productName,
                productCategory : categoryProduct,
                age : ageRange,
                school: convertValueCheckbox(school) ,
                gender : convertValueCheckbox(gender),
                job: convertValueCheckbox(job),
            };

            console.log(jsonData)

        } catch (error) {
            toast.error('Ada Kesalahan Server')
        }
    };

    return(
        <Box className = 'bg-transparent flex flex-col items-center justify-center rounded-sm px-[140px]  w-[100%] relative'>
            <Box className='flex justify-between w-[100%] px-[140px] top-0 mt-[40px] absolute z-[12]'> 
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
            <Box className='flex flex-col h-[70%] items-center overflow-y-scroll overflow-x-hidden px-[20px] scrollbar scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'> 
                <AppHeadline 
                    title = {'Data Produk'}
                    subtitle = {''}
                />
                <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col pt-[20px] gap-[20px] w-[100%]'>
                    <AppTextWithLine
                            text = 'Informasi Produk'

                        />
                    <label className='text-black font-semibold'>Nama Produk</label>
                    <AppTextField
                        id="productName"
                        type='text'
                        placeholder='Masukkkan nama produk di sini'
                        validationConfig = {register('productName', { 
                            validate : validateText
                        })}
                        error={Boolean(errors.productName)}
                        helperText={errors.productName && errors.productName.message}
                        />
                    <label className='text-black font-semibold'>Kategori Produk</label>
                    <AppDropDown
                        value={categoryProduct}
                        placeholder={'Pilih Kategori Produk'}
                        listItem = {listDropCategory}
                        onChange={handleChangeCategory}
                    />
                    <Box className= 'flex flex-col gap-[12px]'>
                        <AppTextWithLine
                            text = 'Target Pasar'
                        />
                        <label className='text-black font-semibold'>Umur</label>
                        <AppRangeSlider
                            onChange={(value)=>{
                                setAgeRange(value)
                            }}
                        />
                        {/* checkbox */}
                        <Box className='flex justify-between'>
                            <Box>
                                <label className='text-black font-semibold'>Gender</label>
                                <CustomSpacing height={10} />
                                <AppGenderCheckbox 
                                />
                            </Box>
                            <Box>
                                <label className='text-black font-semibold'>Pendidikan Terakhir</label>
                                <CustomSpacing height={10} />
                                <AppSchoolCheckbox />
                            </Box>
                        </Box>
                        <Box>
                                <label className='text-black font-semibold'>Ranah Pekerjaan</label>
                                <CustomSpacing height={10} />
                                <AppJobCheckbox />
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
            </Box>
            <ToastContainer autoClose={800} />
        </Box>
    )
}

export default AddProductPage;