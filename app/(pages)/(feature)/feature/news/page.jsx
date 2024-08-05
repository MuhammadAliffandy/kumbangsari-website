'use client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState , useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { getAllNews } from '@/app/api/repository/newsRepository'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setNewsData } from '@/app/redux/slices/newsSlice';
import { convertToIndonesianDate } from '@/app/utils/helper';

const newsPage = () => {
    
    const dispatch = useDispatch()
    const { push } = useRouter()
    const [currentPage, setCurrentPage] = useState(0);
    const [news , setNews] = useState([])
    const [currentPageData, setCurrentPageData] = useState([]);
    

    const perPage = 6;
    const offset = currentPage * perPage;
    
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    
    const fetchNewsData = async () => {
        try {
            const res = await getAllNews()
            
            if(res.status == 'OK'){
    
                setNews(res.data)
                setCurrentPageData(res.data.slice(offset, offset + perPage))
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

    return(
        <>
            <section className='w-[100%] flex flex-col items-center justify-center h-auto relative'>
                <Box className='flex flex-col items-center gap-[40px] w-[90%] py-[20px]' >
                    <Box className='flex flex-col gap-[5px] items-center'>
                        <p className="text-[18px] text-PRIMARY-500">{ 'Berita Desa'}</p>
                        <p className="text-[24px] font-extrabold text-TEXT-1">{'Informasi Seluruh Berita di Desa Kumbangsari'}</p>
                    </Box>
                    
                    <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" direction="row" className='w-[100%]'>
                        {
                            currentPageData.map(data => {
                            return(
                                <Grid item xs={4} onClick={ ()=> {
                                    dispatch(setNewsData(data))
                                    push('/feature/news/detail')
                                } }>
                                    <Box className='w-full rounded-[10px] flex flex-col text-center shadow-xl bg-white h-[280px] border-[1px] border-transparent hover:border-[1px] hover:border-PRIMARY-300 cursor-pointer'>
                                        <img src={data.image} alt='news-photos' className='h-[50%] rounded-t-[10px] object-cover '/>
                                        <div className='h-[40%] flex w-[100%]  relative'>
                                        <div className='bg-PRIMARY-500 py-[8px] px-[12px] bottom-5 rounded-l-[14px] right-0 absolute'>
                                            <p className='text-[10px]'>{convertToIndonesianDate(data.createdAt)}</p>
                                        </div>
                                        <div className='  overflow-hidden flex flex-col gap-[4px] p-[15px] items-start justify-start'>
                                            <p className='text-[18px] text-start text-black font-bold'>{data.title}</p>
                                            <p className='text-[14px] text-start text-black break-words'>{data.text}</p>
                                        </div>
                                        </div>
                                    </Box>
                                </Grid>
                            )
                            })
                        }
                    </Grid>
                    <ReactPaginate
                        pageCount={Math.ceil(news.length / perPage)}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination text-[12px] flex p-[10px] items-center justify-center gap-[20px] text-TEXT-1'}
                        activeClassName={'active bg-PRIMARY-500 px-[12px] py-[6px] rounded-[50%] text-TEXT-5'}
                        previousLabel={<FontAwesomeIcon icon={faChevronLeft} />} 
                        nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                    />

                </Box>
            </section>
        </>
    )
}

export default newsPage;