'use client'

import Box from '@mui/material/Box';
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import AppButton from '@/app/components/appButton';
import AppHeadline from '@/app/components/appHeadline';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import AppDropDown from '../../../../components/appDropDown';


const AddCountProductPage = () => {

    const { push } = useRouter()

    const [countProduct, setCountProduct] = useState('');

    const listDropItem = [
        {value : 1 , text : 'Satu'},
        {value : 2 , text : 'Dua'},
        {value : 3 , text : 'Tiga'},
    ]

    const handleChange = (event) => {
        setCountProduct(event.target.value);
    };

    
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            push('/input-product/addProduct')
        } catch (error) {
            toast.error('Ada Kesalahan Server')
        }
    };

    return(
        <Box className = 'bg-white flex flex-col items-center rounded-sm p-[70px]'>
            <AppHeadline 
                title = {'Input Jumlah Produk'}
                subtitle = {'Masukkan jumlah produk yang akan dikelola!'}
            />
            <CustomSpacing height = {20} />
            <form  onSubmit={onSubmit} className='flex flex-col gap-[20px] w-[100%]'>
                <label className='text-black font-semibold'>Jumlah Produk</label>
                <AppDropDown
                    value={countProduct}
                    placeholder={'Pilih Jumlah Produk'}
                    listItem = {listDropItem}
                    onChange={handleChange}
                />
                <AppButton
                    text={'Selanjutnya'} 
                    type = {'Submit'}
                    fontSize = {'12px'}
                    onClick = {()=>{}}
                />
            </form>
            <ToastContainer autoClose={800} />
        </Box>
    )
}

export default AddCountProductPage;