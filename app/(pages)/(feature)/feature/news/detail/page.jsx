'use client'
import images from '@/public/images/images'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock , faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { convertToIndonesianDate } from '@/app/utils/helper';
import { getAllNews } from '@/app/api/repository/newsRepository'
import { useEffect, useState } from 'react';

const NewsDetail = () => {

    const arr = [ 1 ,2 , 3, 4 ,5]
    
    const newsData = useSelector( (state) => state.news.value )
    const [ news , setNews ] = useState([])

    const paragraphs = newsData.text.split('. ');
    const groupedParagraphs = paragraphs.reduce((acc, sentence, index) => {
      const groupIndex = Math.floor(index / 3); 
      if (!acc[groupIndex]) acc[groupIndex] = '';
      acc[groupIndex] += sentence + '. ';
      return acc;
    }, []);


    const fetchNewsData = async () => {
        try {
            const res = await getAllNews()
            
            if(res.status == 'OK'){
                const data = res.data.filter((data , index) => {
                    return index < 4
                })
                setNews(data)
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server 500')
        }
    }

    useEffect(()=>{
        if(news.length == 0){
            fetchNewsData()
        }
    } , [news])

    return (
        <Box className='flex flex-col gap-[20px] py-[40px] items-center justify-center w-[100%]'>
            <Box className='w-[74%]  flex items-start justify-center gap-[40px]'>
                <Box className='w-[70%] flex-none flex flex-col items-center justify-center gap-[10px]'>
                    <p className='text-black text-[32px] font-bold'>{newsData.title}</p>

                    <Box className='flex items-center justify-start w-full gap-[20px]'>
                        <div className='flex items-center gap-[10px]'>
                            <FontAwesomeIcon icon={faClock} color='gray' className='text-[12px]' />
                            <p className='text-CUSTOM-GREY-LIGHT text-[12px]'>{convertToIndonesianDate(newsData.createdAt)}</p>
                        </div>
                        <div className='flex items-center gap-[10px]'>
                            <FontAwesomeIcon icon={faUser} color='gray' className='text-[12px]' />
                            <p className='text-CUSTOM-GREY-LIGHT text-[12px]'>Ditulis Oleh : {newsData.author}</p>
                        </div>
                    </Box>

                    <Box className='w-full h-[500px] rounded-xl bg-red-500'>
                        <img src={newsData.image} className='w-full h-full rounded-xl object-cover' />
                    </Box>

                    {groupedParagraphs.map((paragraph, index) => (
                        <p className='text-black' key={index}>{paragraph.trim()}</p>
                    ))}
                </Box>
                <Box className='grow flex flex-col items-start justify-center gap-[10px]'>
                    <p className='text-[18px] font-bold text-black'>Berita Produk</p>
                    
                    {
                        news.map(data => {
                            return(
                                <Box className='bg-white rounded-xl flex shadow-xl'>
                                    <img src={data.image} className='w-[100px] h-[100px] object-cover rounded-xl'/>
                                    <div className='p-[10px] flex flex-col gap-[8px]'>
                                        <p className='text-black text-[14px] h-[60px] overflow-hidden break-words'>{data.title}</p>
                                        <div className='flex items-center ga gap-[10px]'>
                                            <FontAwesomeIcon icon={faClock} color='gray' className='text-[10px]' />
                                            <p className='text-CUSTOM-GREY-LIGHT text-[10px]'>{convertToIndonesianDate(data.createdAt)}</p>
                                        </div>
                                    </div>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default  NewsDetail ;