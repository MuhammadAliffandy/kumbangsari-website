'use client'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import { motion } from 'framer-motion';
import { listDropCategory }  from '@/app/utils/model'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton';
import AppButton from '@/app/components/appButton/appButton';
import AppTextField from '@/app/components/appTextField/appTextField';
import AppTextWithLine from '@/app/components/appTextWithLine/appTextWithLine';
import AppDropDown from '@/app/components/appDropDown/appDropDown';
import AppGenderCheckbox from '@/app/(pages)/(input-product)/input-product/add-product/component/appGenderCheckbox';
import AppSchoolCheckbox from '@/app/(pages)/(input-product)/input-product/add-product/component/appSchoolCheckbox';
import AppJobCheckbox from '@/app/(pages)/(input-product)/input-product/add-product/component/appJobCheckbox';
import AppRangeSlider from '@/app/components/appRangeSlider/appRangeSlider'; 
import AppAnimationButton from '@/app/components/appAnimation/appAnimationButton' 
import CustomSpacing from '@/app/components/appCustomSpacing/appCustomSpacing';
import { useState } from 'react'; 
import { useForm , SubmitHandler} from 'react-hook-form';
import { validateText } from '@/app/(pages)/(auth)/auth/component/validation';
import { addProduct } from '@/app/api/repository/productRepository';
import { convertValueCheckbox } from '@/app/utils/helper';
import { getCurrentUser } from '@/app/api/repository/authRepository';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AppModalAddProduct = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const userSubscription = useSelector(state => state.userSubscription.value) 
    const [nameProduct, setNameProduct] = useState('');
    const [ categoryProduct, setCategoryProduct ] = useState('');
    const [ checkboxStatus, setCheckboxStatus ] = useState('');
    const [ ageRange , setAgeRange ] = useState([0,10]);
    const [ gender , setGender ] = useState([]);
    const [ school , setSchool ] = useState([]);
    const [ job , setJob ] = useState([]);

    const handleChangeCategory = (event) => {
        setCategoryProduct(event.target.value);
    };

    const handleAddProduct = async () => {
        try {

            const currentUser = await getCurrentUser(); 

            if(currentUser.data.countProduct < 3 && userSubscription == 3){
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
                const res = await addProduct(jsonData);
                if(res.status == 'OK'){
                    toast.success('Produk berhasil ditambahkan ')
                    props.onCloseButton(false)
                } 
            }else{
                toast.warn('Jumlah Produk sudah Maksimal')
            }
            props.onDone()
        } catch (error) {
                toast.error('Produk gagal Ditambahkan')
        }
    }

    return(
        <Modal
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className = 'w-[35%] h-[90vh] rounded-[20px] bg-white p-[20px] overflow-y-scroll scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full '>

                <form  className='flex flex-col pt-[20px] gap-[20px] w-[100%]'>
                    <Box className = 'flex items-center justify-between'>
                        <p className = 'text-[18px] font-bold text-black' >Tambah Produk</p>
                        <AppCloseButton
                            onClick = {()=>{
                                props.onCloseButton(false)
                            }}
                        />
                    </Box>
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
                            setNameProduct(event.target.value)
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
                
                    <Box className='w-[100%] flex justify-end'>
                            <Box className='w-[30%] py-[0px] px-[0px] text-[14px]'>
                                <AppButton
                                    text={'Simpan'} 
                                    type = {'button'}
                                    fontSize = {'12px'}
                                    onClick = {handleAddProduct}
                                />
                            </Box>
                    </Box>
                
                </form>
            </motion.div>

        </Modal>
    )
}

export default AppModalAddProduct