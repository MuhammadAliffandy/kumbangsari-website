'use client'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import AppButton from '@/app/components/appButton/appButton';
import AppCustomButton from '@/app/components/appButton/appCustomButton';
import AppTextField from '@/app/components/appTextField/appTextField'
import AppTextFieldImage from '@/app/components/appTextField/appTextFieldImage'
import AppDropDown from '@/app/components/appDropDown/appDropDown'
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox'
import AppMultiSelection from '@/app/components/appMultiSelection/appMultiSelection';
import AppPopupCaption from '../popup/appPopupCaption';
import AppPopupImage from '../popup/appPopupImage';
import { listDropPlatform } from '@/app/utils/model';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

    const listHashtagExample = [
        { value: '#makanan', label: '#makanan' },
        { value: '#music', label: '#music' },
        { value: '#baksomantap', label: '#baksomantap' },
        { value: '#olahraga', label: '#olahraga' },
        { value: '#minuman', label: '#minuman' },
        { value: '#yummy', label: '#yummy' },
        { value: '#surabaya', label: '#surabaya' },
        { value: '#snack', label: '#snack' },
    ];


    const hashtagOptions = [
        { value: '#apple', label: '#Apple' },
        { value: '#banana', label: '#Banana' },
        { value: '#orange', label: '#Orange' },
        { value: '#grape', label: '#Grape' },
    ]

    const options = [ ...listHashtagExample , ...hashtagOptions ]


const AppModalEditContent = (props) => {

    const contentAI = useSelector(state => state.generateAIByOne.value) 
    const [contentTitle , setContentTitle] = useState('')
    const [productImage , setProductImage] = useState(null)
    const [product , setProduct] = useState('')
    const [platform , setPlatform] = useState('')
    const [caption , setCaption] = useState('')
    const [hashtagString , setHashtagString] = useState('')
    const [hashtag , setHashtag] = useState([])
    const [hashtagAI , setHashtagAI] = useState([])
    const [dateUp , setDateUp] = useState('')
    const [timeUp , setTimeUp] = useState('')
    const [UpNow , setUpNow] = useState(false)

    const handleChangePlatform = (event) => {
        setPlatform(event.target.value)
    }

    const handleChangeImage = (value) => {
        if (value) {
            const reader = new FileReader();
            reader.onload = () => {
                setProductImage(reader.result);
            };
            reader.readAsDataURL(value);
        }
    }

    const convertHashtagString = (item) => {
        const arr = [];

        if(item != null ){
            item.map(data => arr.push(data.value))
            setHashtagString(arr.join(' ')) 
        }
    }

    const getContentUser = () => {
        console.log(contentAI)
        setContentTitle(contentAI.contentTitle)
        setProduct(contentAI.productName)
        setProductImage(contentAI.image)
        setPlatform(contentAI.platform)
        setCaption(contentAI.caption)
        setHashtag(hashtagOptions)
        localStorage.setItem('hashtag',JSON.stringify(hashtagOptions))
        setHashtagAI(listHashtagExample)
        convertHashtagString(hashtagOptions)
    }


    const handleEditContent = () => {
        
    }

    useEffect(()=>{
        getContentUser()
    },[])

    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <Box className = 'w-[90%] h-[80vh] rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] border-[2px]'>
                {/* headline */}
                <Box className = 'flex justify-between'>
                    <p className = 'text-[18px] font-bold text-black' >Edit Konten</p>
                    <Box className='flex items-center gap-[15px]'>
                        <AppCloseButton
                            onClick = {()=>{
                                props.onCloseButton(false)
                            }}
                        />
                    </Box>
                </Box>
                {/* content  */}
                <Box className='flex  gap-[20px] w-[100%] h-[80%]'>
                    {/* form */}
                    <Box className='w-[60%] h-[100%] pr-[10px] flex flex-col gap-[10px] overflow-y-scroll pb-[10px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        {/* content title */}
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Judul  Konten</label>
                            <AppTextField
                                id="contentTitle"
                                value = {contentTitle}
                                type='text'
                                placeholder='Masukkkan nama Judul konten di sini'
                                onChange={(event)=>{
                                    const value = event.target.value
                                    setContentTitle(value)
                                }}
                            />
                        </Box>
                        {/*  */}
                        <Box>
                            <Stack direction="row" spacing={2}>   
                            {/* product */}
                                <Box className='w-[100%] flex flex-col gap-[10px]'>
                                    <label className='text-black font-semibold'>Produk</label>
                                    <AppTextField
                                        id="product"
                                        value = {product}
                                        type='text'
                                        placeholder='Masukkkan nama Product konten di sini'
                                        onChange={(event)=>{
                                            const value = event.target.value
                                            setProduct(value)
                                        }}
                                    />
                                </Box>
                                <Box className='w-[100%] flex flex-col gap-[10px]'>
                                    {/* platform */}
                                    <label className='text-black font-semibold'>Platform</label>
                                    <AppDropDown
                                            value={platform}
                                            placeholder={'Pilih Nama Platform'}
                                            listItem = {listDropPlatform}
                                            onChange={handleChangePlatform}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                        {/*  */}

                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Gambar</label>
                            <AppTextFieldImage
                                onClick={handleChangeImage}
                            />
                            <AppPopupImage/>
                        </Box>

                        {/*  */}
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Caption</label>
                            <AppTextField
                                id="caption"
                                value = {caption}
                                type='text'
                                placeholder='Masukkkan nama Caption di sini'
                                onChange={(event)=>{
                                    const value = event.target.value
                                    setCaption(value)
                                }}
                            />

                            <AppPopupCaption/>
                        </Box>
                        {/*  */}
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold' >Hashtag</label>
                            <AppMultiSelection
                                value = {hashtag}
                                options = { options }
                                onChange = {(value)=>{
                                    setHashtag(value)
                                    localStorage.setItem('hashtag',JSON.stringify(value))
                                    convertHashtagString(value)

                                    const filteredHashtagAI = listHashtagExample.filter(item => !value.includes(item));
                                    setHashtagAI(filteredHashtagAI)
                                }}
                            />
                            <Grid container spacing={1}>
                            {
                                hashtagAI.map((data,index) => {
                                    return ( 
                                        <Grid key = {index} item xs={2}>
                                            <Box  onClick={()=>{
                                                setHashtag(prevHashtag => [...prevHashtag , data] )
                                                const popData = hashtagAI.filter(item => {
                                                    return item !== data;
                                                })
                                                setHashtagAI(popData)

                                                const hashtagKeep = JSON.parse(localStorage.getItem('hashtag'))              
                                                const filteredDataArr = listHashtagExample.filter(value => !popData.includes(value));
                                                const matchHashtag = [...hashtagKeep,...filteredDataArr]
                                                convertHashtagString(matchHashtag)
                                                
                                            }}  className ='cursor-pointer px-[10px] py-[8px] border-[2px] border-PRIMARY-500 text-PRIMARY-500 text-[12px] rounded-[20px]'>
                                                {data.value}
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }
                            </Grid>
                        </Box>
                        {/*  */}
                        <Box>
                            <Stack direction="row" spacing={2}>   
                                <Box className='w-[100%] flex flex-col gap-[10px]'>
                                    <label className='text-black font-semibold'>Waktu Unggah</label>
                                    <AppTextField
                                        id="date"
                                        value = { dateUp }
                                        type='date'
                                        placeholder='Pilih Tanggal Unggah'
                                        onChange={(event)=>{
                                            const value = event.target.value
                                            setDateUp(value)
                                        }}
                                    />
                                    <AppCheckBox
                                        value= 'true'
                                        label = 'Unggah Sekarang'
                                        onChange= {(value , label)=>{
                                            value == 'true' ? setUpNow(true) : setUpNow(false)
                                        }}
                                    />
                                </Box>
                                <Box className='w-[100%] flex flex-col gap-[10px] justify-center'>
                                    <AppTextField
                                        id="time"
                                        value = { timeUp }
                                        type='time'
                                        placeholder='Pilih Jam Unggah'
                                        onChange={(event)=>{
                                            const value = event.target.value
                                            setTimeUp(value)
                                        }}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    </Box >
                    <Box style={{ width : '2px' , height:'90%' }} className='bg-black bg-opacity-[10%]'></Box>
                    {/* preview */}
                    <Box className = 'w-[40%] h-[100%] flex flex-col items-center justify-start gap-[20px] pr-[10px] overflow-y-scroll pb-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                                <label className='text-black font-semibold' >Preview Konten</label>
                        </Box>
                        <img className='w-[70%] h-[50%] rounded-[15px]' src={productImage}/>
                        <Box className = 'flex flex-col gap-[8px] p-[10px] rounded-[15px] border-[1px] border-TEXT-1 '>
                            <p className='text-[14px] w-[100%] text-TEXT-1 font-semibold break-all whitespace-normal'>{ caption }</p>
                            <p className='text-[14px] text-PRIMARY-400'>{hashtagString}</p>
                        </Box>
                    </Box>
                </Box>
                {/*  */}
                <Box className = 'flex justify-end'>
                    <Box className='flex justify-end gap-[15px] w-[100%]'>
                        <Box className='w-[15%]'>
                            <AppButton
                                className='w-[100%] py-[10px] bg-NEUTRAL-500 shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Keluar'} 
                                type = {'button'}
                                onClick={()=>{
                                    props.onCloseButton(false)
                                }}
                            />
                        </Box>
                        <Box className='w-[15%]'>
                            <AppButton
                                className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Simpan'} 
                                type = {'button'}
                                onClick={()=>{
                                    
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )

}

export default AppModalEditContent;