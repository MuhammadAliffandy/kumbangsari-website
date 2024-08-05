'use client'

import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import AppCustomModal from '@/app/components/appModal/AppCustomModal'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import AppButton from '@/app/components/appButton/appButton';
import AppTextField from '@/app/components/appTextField/appTextField'
import AppTextFieldImage from '@/app/components/appTextField/appTextFieldImage'

import AppDefaultText from '@/app/components/appText/appDefaultText';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import AppAnimationButton from '@/app/components/appAnimation/appAnimationButton';

import { addNews , editNews } from '@/app/api/repository/newsRepository'

const AppModalNews = (props) => {

    const { push } = useRouter()

    const data = useSelector((state) => state.news.value)


    const [image , setImage] = useState(null)
    const [productImage , setProductImage] = useState(null)
    const [title , setTitle] = useState('')
    const [text , setText] = useState('')
    const [author , setAuthor] = useState('')

    const handleChangeImage = (value) => {
        setImage(value)
        if (value) {
            const reader = new FileReader();
            reader.onload = () => {
                setProductImage(reader.result);
            };
            reader.readAsDataURL(value);
        }
    }

    const handleUpdateNews = async () => {
        try {

            const formData = new FormData();
            formData.append('title', title);
            
            if(image?.type){
                formData.append('imageUrl', '');
                formData.set('image',image , image.name );
            }else{
                formData.append('imageUrl', image);
                formData.set('image', '');
            }
            

            const res = await editNews(formData)

            if(res.status == 'OK'){
                toast.success('Edit Berita Sukses')
            }

        } catch (error) {
            toast.error('Ada Kesalahan Server 500')
        }
    }

    const handleCreateNews = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            
            if(image?.type){
                formData.append('imageUrl', '');
                formData.set('image',image , image.name );
            }else{
                formData.append('imageUrl', image);
                formData.set('image', '');
            }
            formData.append('author', image);
            formData.append('text', image);

            const res = await addNews(formData)

            if(res.status == 'OK'){
                toast.success('Tambah Galeri Sukses')
            }

        } catch (error) {
            toast.error('Ada Kesalahan Server 500')
        }
    }


    useEffect(()=>{
        setTitle(data.title)
        setText(data.text)
        setAuthor(data.author)
        setTitle(data.title)
        setProductImage(data.image)
        setImage(data.image)
    },[props.open])

    return(
        <Modal
            open={props.open}
            className='flex flex-col justify-center items-center'
        >

            {/*  */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className = ' w-[90%]  md:w-[90%]  lg:w-[90%] xl:w-[90%] h-[90vh] xl:h-[80vh] rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] '>
                {/* Modal validation */}
                
                {/* headline */}
                <Box className = 'flex justify-between'>
                    <p className = 'text-[18px] font-bold text-black' >Berita Manajemen</p>
                    <Box className='flex items-center gap-[15px]'>
                        <AppCloseButton
                            onClick = {()=>{
                                props.onCloseButton(false)
                            }}
                        />
                    </Box>
                </Box>
                {/* content  */}
                <Box className='flex flex-col xl:flex-row  gap-[20px] w-[100%] h-[80%]'>
                    {/* form */}
                    <Box className='w-[100%] xl:w-[60%] h-[100%] pr-[10px] flex flex-col gap-[10px] overflow-y-scroll pb-[10px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        {/*  */}
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Title</label>
                            <AppTextField
                                id="title"
                                value = {title}
                                type='text'
                                placeholder='Masukkkan judul di sini'
                                onChange={(event)=>{
                                    setTitle(event.target.value)
                                }}
                            />
                        </Box>
                        {/*  */}

                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Gambar</label>
                            <AppTextFieldImage
                                value = {image != null ?  image?.type ? null : image : null}
                                onClick={handleChangeImage}
                            />
                    
                        </Box>

                        {/*  */}
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Isi Berita</label>
                            <AppTextField
                                id="text"
                                value = {text}
                                type='text'
                                placeholder='Masukkkan deskripsi di sini'
                                onChange={(event)=>{
                                    setText(event.target.value)
                                }}
                            />
                        </Box>
                        {/*  */}
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Author</label>
                            <AppTextField
                                id="author"
                                value = {author}
                                type='text'
                                placeholder='Masukkkan judul di sini'
                                onChange={(event)=>{
                                    setAuthor(event.target.value)
                                }}  
                            />
                        </Box>
                       
                        {/*  */}

                    </Box >
                    <Box className=' hidden xl:flex w-[100%] xl:w-[2px] h-[2px] xl:[100%] bg-black bg-opacity-[10%]'></Box>
                    {/* preview */}
                    <Box className = ' hidden  w-[100%] xl:w-[40%] h-[100%]  xl:flex flex-col items-center justify-start gap-[20px] pr-[10px] overflow-y-scroll pb-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                                <label className='text-black font-semibold' >Preview </label>
                        </Box>
                        {
                            productImage == null && title == ''?

                            <AppDefaultText 
                                text = 'Masukkan data terlebih dahulu untuk menampilkan preview!'
                            />  :

                            <>
                                {productImage ? <img className='w-[70%] h-[50%] rounded-[15px] object-cover' src={productImage}/> : 
                                    <AppDefaultText 
                                        text = 'Masukkan image terlebih dahulu untuk menampilkan preview!'
                                    />  
                                
                                }
                                <Box className = 'flex flex-col gap-[8px] p-[10px] rounded-[15px] '>
                                    <p className='text-[14px] w-[100%] text-TEXT-1 font-semibold break-all whitespace-normal'>{ title || '( Judul Kosong )' }</p>
                                    <p className='py-[4px] text-[12px] w-[100%] text-TEXT-1  break-all whitespace-normal'>{ text || '( Teks Kosong )' }</p>
                                </Box>
                            </> 
                        }
                    </Box>
                </Box>
                {/*  */}
                <Box className = 'flex justify-end'>
                    <Box className='flex justify-end gap-[15px] w-[100%]'>
                        <Box className='w-[35%] md:w-[15%] lg:w-[15%] xl:w-[15%]'>
                            <AppAnimationButton>
                                <AppButton
                                    className='w-[100%] p-[10px] bg-NEUTRAL-500 hover:bg-NEUTRAL-600 shadow-xl text-white font-poppins rounded-[18px]'
                                    text={'Keluar'} 
                                    type = {'button'}
                                    onClick={()=>{
                                        props.onCloseButton(false)
                                    }}
                                />
                            </AppAnimationButton>
                        </Box>
                        <Box className='w-[35%] md:w-[15%] lg:w-[15%] xl:w-[15%]'>
                            <AppAnimationButton>
                                <AppButton
                                    className='w-[100%] p-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
                                    text={'Ubah'} 
                                    type = {'button'}
                                    onClick={()=>{
                                        handleUpdateNews()
                                    }}
                                />
                            </AppAnimationButton>
                        </Box>
                
                    </Box>
                </Box>
            </motion.div>
        </Modal>
    )

}

export default AppModalNews;