'use client'

import images from '@/public/images/images'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import AppCustomButton from '@/app/components/appButton/appCustomButton'
import { useSelector } from 'react-redux';
import { formatRupiahNumber } from '@/app/utils/helper'

const ProductDetail = () => {

    const arr = [ 1 , 2 ,3 ,4 ]
    const arrSample = [ 1 , 2 ,3 ,4 , 5 ]

    const reviewSample = [
        {
            name: 'Fany Juney',
            rating : 4,
            text: 'bagus sekali bahannya saya suka',
            createdAt: '12 November 2024'

        },
    ]

    const productData = useSelector((state) => state.product.value)

    return(
        <Box className='flex flex-col gap-[20px] py-[40px] items-center justify-center w-[100%]'>
            {/*  */}
            <Box className='flex items-center justify-start w-[80%] gap-[20px] p-[20px] rounded-[12px] border-[1px] border-CUSTOM-GREY-LIGHT '>
                <Box className='flex flex-col w-[45%] h-auto gap-[10px] p-[20px]  '>
                    <Box className='w-full h-[350px] rounded-md bg-red-500'>
                        <img src={productData.image} className='w-[100%] h-[100%] rounded-md object-cover' />
                    </Box>
                    <Grid container spacing={2} justifyContent="flex-center" alignItems="flex-center" direction="row" className='w-[100%]'>
                        {
                            arr.map(data => {
                            return(
                                <Grid item xs={3}>
                                    <Box className='w-full h-[80px] rounded-md bg-yellow-500'>

                                    </Box>
                                </Grid>
                            )})
                        }
                    </Grid>
                </Box>
                {/*  */}
                <Box className='flex flex-col w-full h-full items-start justify-start gap-[10px]'>
                    <p className='text-black text-[24px] font-bold'>{productData.title}</p>

                    <div className='flex items-center gap-[8px]'>
                        <div className='flex gap-[4px] items-center'>
                            {
                                arrSample.map((item , index) => {
                                    return(
                                        <FontAwesomeIcon icon={faStar} color={  index < productData.rating ? '#FFC300' :  '#D9D9D9'} className='text-[12px]' />
                                    )
                                })
                            }
                        </div>
                        <div className='bg-black bg-opacity-35 w-[1px] h-[18px]'></div>
                        <p className='text-black text-[12px] '>{productData.category}</p>
                    </div>

                    <div className='text-black pt-[20px]'>
                        <p className='font-bold'>Deskripsi</p>
                        <p className='w-[60%]'>{productData.description}</p>
                    </div>
                    
                    <p className='text-black font-bold text-[28px] pt-[10px]'>Rp{formatRupiahNumber(productData.price)}</p>
                    <AppCustomButton 
                            className={` flex gap-[10px] items-center bg-PRIMARY-500 hover:bg-PRIMARY-600 rounded-[6px] px-[20px] py-[10px] `}
                            onClick={()=>{
                                const url = `https://wa.me/${productData.phoneNumber}`;
                                window.open(url, '_blank');
                            }}
                        >
                            <p className="text-TEXT-5 text-[16px]">{'Hubungi Penjual'}</p>
                            <img src={images.icon.sosmed.whatsappWhiteIcon} className="h-[16px] w-[auto] text-white" alt="alt-icon" />
                    </AppCustomButton>

                    <div className='flex items-center justify-start gap-[10px]'>
                            <p className='text-black text-[14px]'>Bagikan : </p>
                            <div className='flex items-center gap-[10px]'>
                                <img src={images.icon.sosmed.instagramOriIcon} className='text-white w-[18px] h-[18px]' />
                                <img src={images.icon.sosmed.facebookOriIcon} className='text-white w-[18px] h-[18px]' />
                                <img src={images.icon.sosmed.twitterOriIcon} className='text-white w-[18px] h-[18px]' />
                            </div>
                    </div>
                    
                </Box>
            </Box>
            {/*  */}
            <Box className='flex flex-col items-start justify-start w-[80%] gap-[20px] p-[20px] rounded-[12px] border-[1px] border-CUSTOM-GREY-LIGHT '>
                <p className='text-[18px] font-bold text-black'>Ulasan Produk</p>
                <Box className='flex flex-col justify-start items-start gap-[10px]'>
                    {
                        reviewSample.map(data => {
                            return(
                                <div className='flex flex-col'>
                                    <div className='flex items-start gap-[8px]'>
                                        <div className='rounded-full w-[40px] h-[40px] bg-red-500'>

                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='flex items-center gap-[8px]'>
                                                <p className='text-black text-[14px] '>{data.name}</p>
                                                <div className='bg-black bg-opacity-35 w-[2px] h-[18px]'></div>
                                                <div className='flex gap-[4px] items-center'>
                                                    {
                                                        arrSample.map(data => {
                                                            return(
                                                            <FontAwesomeIcon icon={faStar} color='gray' />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <p className='text-gray-400 text-[10px]'>{data.createdAt}</p>
                                            <p className='pt-[20px] text-black text-[14px]'>{data.text}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default ProductDetail;