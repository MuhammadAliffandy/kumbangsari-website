'use client'

import Box from '@mui/material/Box';
import CustomSpacing from '@/app/components/appCustomSpacing/appCustomSpacing';
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { validateText } from '../.../../../../(auth)/auth/component/validation';
import { listDropCategory }  from '@/app/utils/model'
import AppButton from '@/app/components/appButton/appButton';
import AppHeadline from '@/app/components/appHeadline/appHeadline';
import AppTextField from '@/app/components/appTextField/appTextField';
import AppTextWithLine from '@/app/components/appTextWithLine/appTextWithLine';
import AppDropDown from '@/app/components/appDropDown/appDropDown';
import AppSubNav from '@/app/components/appSubNavigation/appSubNav';
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton';
import AppGenderCheckbox from '../addProduct/component/appGenderCheckbox';
import AppSchoolCheckbox from '../addProduct/component/appSchoolCheckbox';
import AppJobCheckbox from '../addProduct/component/appJobCheckbox';
import AppRangeSlider from '@/app/components/appRangeSlider/appRangeSlider';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import AppLoadingBar from '@/app/components/appLoadingBar/appLoadingBar'
import { convertValueCheckbox } from '@/app/utils/helper';
import { addProduct } from '@/app/api/repository/inputProductRepository';

const AddProductPage = () => {

    const { push } = useRouter()
    const countProduct = useSelector(state => state.countInputProduct.value)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [page, setPage] = useState('product1');
    const [loadingProgress,setLoadingProgress] = useState(0);
    const [categoryProduct, setCategoryProduct] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [ ageRange , setAgeRange ] = useState([0,10]);
    const [ gender , setGender ] = useState([]);
    const [ school , setSchool ] = useState([]);
    const [ job , setJob ] = useState([]);
    const [ checkboxStatus, setCheckboxStatus ] = useState('');
    const product1Value = localStorage.getItem( 'product1')
    const product2Value = localStorage.getItem( 'product2')
    const product3Value = localStorage.getItem( 'product3')

    const handleChangeCategory = (event) => {
        setCategoryProduct(event.target.value);
    };

    const refreshLocalCheckbox = async (gender,school,job) => {
        localStorage.setItem('gender',gender)
        localStorage.setItem('school',school)
        localStorage.setItem('job',job)
    }

    const refreshLocalStorage = () => {
        localStorage.setItem('product1','')
        localStorage.setItem('product2','')
        localStorage.setItem('product3','')
        refreshLocalCheckbox( '','','' )
    }

    useEffect(()=>{
        refreshLocalStorage()
    },[])

    const clearForm = () => {
        setNameProduct('') 
        setCategoryProduct('') 
        setAgeRange([0,10])
        setCheckboxStatus('reset')
    }
    
    const initiateProductForm = async (page) => {

        await clearForm();

        if(product1Value != '' && page == 'product1'){
            const product1 = JSON.parse(product1Value);
            await initiateProductValue(product1)
        }
        
        if(product2Value != '' && page == 'product2'){
            const product2 = JSON.parse(product2Value);
            await initiateProductValue(product2)
        }
        if(product3Value != '' && page == 'product3'){
            
            const product3 = JSON.parse(product3Value);
            await initiateProductValue(product3)
        }
        setCheckboxStatus('')

    }

    const initiateProductValue = (data) => {
        setNameProduct(data.nameProduct) 
        setCategoryProduct(data.category) 
        setAgeRange(data.age)
        setSchool(data.education)
        setGender(data.gender)
        setJob(data.work) 
        refreshLocalCheckbox( data.gender ,data.education, data.work )
        
    }   

    const fetchAddProduct = async (data) => {
        try {
            const res = await addProduct(data);
            if(res.status == 'OK'){
                toast.success('Produk berhasil ditambahkan ')
                setLoadingProgress(100)
            } 
        } catch (error) {
                toast.error('Data gagal Ditambahkan')
        }
    }


    const onSubmit = async (event) => {
        try {
            event.preventDefault();

            const genderValue = localStorage.getItem('gender') ;
            const schoolValue = localStorage.getItem('school');
            const jobValue = localStorage.getItem('job');
            
            const jsonData = {
                nameProduct :nameProduct,
                age : ageRange,
                work: convertValueCheckbox(jobValue),
                education: convertValueCheckbox(schoolValue) ,
                category : categoryProduct,
                gender : convertValueCheckbox(genderValue),
            };
            
            if(page == 'product1'){
                localStorage.setItem( 'product1' ,JSON.stringify(jsonData))
            }else if(page == 'product2'){
                localStorage.setItem( 'product2' ,JSON.stringify(jsonData))
            }else if(page == 'product3'){
                localStorage.setItem( 'product3' ,JSON.stringify(jsonData))
            }
            
            refreshLocalCheckbox( '','', '' )


        } catch (error) {
            console.log(error)
            toast.error('Ada Kesalahan Server')
        }
    };


    const addProductValidation = async () => {

        try {
            const product1Value = localStorage.getItem( 'product1')
            const product1 = JSON.parse(product1Value);
            
            const product2Value = localStorage.getItem( 'product2')
            const product2 =  product2Value != '' ? JSON.parse(product2Value) : '';
            
            const product3Value = localStorage.getItem( 'product3')
            const product3 = product3Value != '' ? JSON.parse(product3Value) : '';

            setLoadingProgress(50)
    
            if(countProduct == 1 && product1Value != '' ){
                await fetchAddProduct(product1)
            }else if(countProduct == 2 && product1Value != '' &&  product2Value != '') {
                await fetchAddProduct(product1)
                await fetchAddProduct(product2)
                
            }else if (countProduct == 3 && product1Value != '' &&  product2Value != '' &&  product3Value != '') {
                await fetchAddProduct(product1)
                await fetchAddProduct(product2)
                await fetchAddProduct(product3)
            }

            clearForm()
            push('/dashboard')
        } catch (error) {
            console.log(error)
            toast.error('Server error')
        }
    }

    const handlePageClick = (page) => {
        setPage(page)
        initiateProductForm(page)
    }

    const handleNavClick = (page) => {

        if(product1Value == '' && page == 'product1' || product2Value == '' && page == 'product2' || product3Value == '' && page == 'product3'){
            const pageInfo = page == 'product2' ? 'Halaman 1' : page == 'product3' ? 'Halaman 2' : ''
            toast.error(`Mohon ${pageInfo} diisi terlebih dahulu`)
        }else{
            setPage(page)
            initiateProductForm(page)
        }

    }



    return(
        <Box className = 'bg-transparent flex flex-col items-center justify-center rounded-sm px-[140px]  w-[100%] relative'>
            <AppLoadingBar 
                
                progress={loadingProgress} 
                onLoaderFinished={() => setLoadingProgress(0)
            } />
            <Box className='flex justify-between w-[100%] px-[20px] xl:px-[140px] md:px-[70px] lg:px-[20px] top-0 mt-[40px] absolute z-[12]'> 
                <AppSubNav 
                    status={page}
                    value={countProduct}
                    handleSub1={()=>{
                        handleNavClick('product1')
                    }}
                    handleSub2={()=>{
                        handleNavClick('product2')
                    }}
                    handleSub3={()=>{
                        handleNavClick('product3')
                        
                    }}
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
                            value = {ageRange}
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
                                    listValue = {gender}
                                />
                            </Box>
                            <Box>
                                <label className='text-black font-semibold'>Pendidikan Terakhir</label>
                                <CustomSpacing height={10} />
                                <AppSchoolCheckbox 
                                    status = {checkboxStatus}
                                    listValue = {school}
                                />
                            </Box>
                        </Box>
                        <Box>
                                <label className='text-black font-semibold'>Ranah Pekerjaan</label>
                                <CustomSpacing height={10} />
                                <AppJobCheckbox
                                    status = {checkboxStatus}
                                    listValue = {job}
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
                                    countProduct == 1 && page == 'product1' ? 
                                    async (event)=>{
                                        await onSubmit(event)
                                        addProductValidation()
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

                                                countProduct == 3 && page == 'product2' ? 
                                                (event)=>{
                                                    onSubmit(event)
                                                    handlePageClick('product3')
                                                } :
                                                countProduct == 2 && page == 'product2'? 
                                                async (event) => {
                                                    await onSubmit(event)
                                                    addProductValidation()
                                                }
                                                :
                                                countProduct == 3 && page == 'product3' ?
                                                async (event)=>{
                                                    await onSubmit(event)
                                                    addProductValidation()
                                                    
                                                } : countProduct == 3 && page == 'product3' ? 
                                                (event)=>{
                                                    event.preventDefault()
                                                    handlePageClick('product3')
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