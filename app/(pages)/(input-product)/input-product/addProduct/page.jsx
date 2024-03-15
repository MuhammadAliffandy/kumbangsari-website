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
import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { convertValueCheckbox } from '@/app/utils/helper';

const AddProductPage = () => {

    const { push } = useRouter()
    const countProduct = useSelector(state => state.countInputProduct.value)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [page, setPage] = useState('product1');
    const [categoryProduct, setCategoryProduct] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [ ageRange , setAgeRange ] = useState([]);
    const [ gender , setGender ] = useState(localStorage.getItem('gender'));
    const [ school , setSchool ] = useState(localStorage.getItem('school'));
    const [ job , setJob ] = useState(localStorage.getItem('job'));
    const [ checkboxStatus, setCheckboxStatus ] = useState('');

    const handleChangeCategory = (event) => {
        setCategoryProduct(event.target.value);
    };

    const clearForm = () => {
        setNameProduct('') 
        setCategoryProduct('') 
    }
    
    const initiateProductForm = (page) => {

        clearForm();

        const product1Value = localStorage.getItem( 'product1')
        const product2Value = localStorage.getItem( 'product2')
        const product3Value = localStorage.getItem( 'product3')

        if(product1Value != '' && page == 'product1'){
            initiateProductValue(JSON.parse(product1Value))
            
        }else if(product2Value != '' && page == 'product2'){
            initiateProductValue(JSON.parse(product2Value))
          
            
        }else if(product3Value != '' && page == 'product3'){
      
            initiateProductValue(JSON.parse(product3Value))
        }

    }

    const initiateProductValue = (data) => {
        setNameProduct(data.nameProduct) 
        setCategoryProduct(data.category) 
        setAgeRange(data.age)
        setSchool(data.education)
        setGender(data.gender)
        setJob(data.work)
    }

    const onSubmit = async (event) => {
        try {

            event.preventDefault();

            const jsonData = {
                nameProduct :nameProduct,
                category : categoryProduct,
                age : ageRange,
                education: convertValueCheckbox(school) ,
                gender : convertValueCheckbox(gender),
                work: convertValueCheckbox(job),
            };

            
            if(page == 'product1'){
                localStorage.setItem( 'product1' ,JSON.stringify(jsonData) )
            }else if(page == 'product2'){
                localStorage.setItem( 'product2' ,JSON.stringify(jsonData) )
            }else if(page == 'product3'){
                localStorage.setItem( 'product3' ,JSON.stringify(jsonData) )

            }

        } catch (error) {
            console.log(error)
            toast.error('Ada Kesalahan Server')
        }
    };

    const handlePageClick = (page) => {
        setPage(page)
        initiateProductForm(page)
    }

    return(
        <Box className = 'bg-transparent flex flex-col items-center justify-center rounded-sm px-[140px]  w-[100%] relative'>
            <Box className='flex justify-between w-[100%] px-[20px] xl:px-[140px] md:px-[70px] lg:px-[20px] top-0 mt-[40px] absolute z-[12]'> 
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
            <Box className='flex flex-col h-[70%] items-center overflow-y-scroll pb-[10px] overflow-x-hidden px-[20px] scrollbar scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'> 
                <AppHeadline 
                    title = {'Data Produk'}
                    subtitle = {''}
                />
                {/* handle form validation */}
                <form  className='flex flex-col pt-[20px] gap-[20px] w-[100%]'>
                    <AppTextWithLine
                            text = 'Informasi Produk'

                        />
                    <label className='text-black font-semibold'>Nama Produk</label>
                    <AppTextField
                        id="productName"
                        value = {nameProduct}
                        type='text'
                        placeholder='Masukkkan nama produk di sini'
                        validationConfig = {register('productName', { 
                            validate : validateText
                        })}
                        error={Boolean(errors.productName)}
                        helperText={errors.productName && errors.productName.message}
                        onChange={(event)=>{
                            const value = event.target.value
                            setNameProduct(value)
                        }}
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
                                    status = {checkboxStatus}
                                />
                            </Box>
                            <Box>
                                <label className='text-black font-semibold'>Pendidikan Terakhir</label>
                                <CustomSpacing height={10} />
                                <AppSchoolCheckbox 
                                    status = {checkboxStatus}
                                />
                            </Box>
                        </Box>
                        <Box>
                                <label className='text-black font-semibold'>Ranah Pekerjaan</label>
                                <CustomSpacing height={10} />
                                <AppJobCheckbox
                                    status = {checkboxStatus}
                                />
                            </Box>
                    </Box>
                    {/* handle button validation  */}
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
                                    (event)=>{
                                        handlePageClick('product2')
                                        onSubmit(event)
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
                                                (event)=>{
                                                    event.preventDefault()
                                                    handlePageClick('product1')
                                                } :
                                                page == 'product2' ? 
                                                (event)=>{
                                                    event.preventDefault()
                                                    handlePageClick('product1')
                                    
                                                } : page == 'product3' ? 
                                                (event)=>{
                                                    event.preventDefault()
                                                    handlePageClick('product2')
                                                } : ()=>{}
                                            }
                                        /> 
                                        <AppButton
                                            text={ countProduct == 2 ? 'Simpan' : page == 'product2' ? 'Selanjutnya' : page == 'product3' ? 'Simpan' : null} 
                                            type = {'Submit'}
                                            fontSize = {'12px'}
                                            onClick = {

                                                countProduct == 3 ? 
                                                (event)=>{
                                                    onSubmit(event)
                                                } :
                                                countProduct == 2 ? 
                                                (event) => {
                                                    console.log('simpan')
                                                    onSubmit(event)
                                                }
                                                :
                                                page == 'product2' ? 
                                                (event)=>{
                                                    handlePageClick('product3')
                                                    onSubmit(event)
                                                } : page == 'product3' ? 
                                                (event)=>{
                                                    console.log('simpan')
                                                    onSubmit(event)
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