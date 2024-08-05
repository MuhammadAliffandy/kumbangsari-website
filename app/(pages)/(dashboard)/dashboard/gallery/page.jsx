'use client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState , useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { getAllGallery } from '@/app/api/repository/galleryRepository'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { convertToIndonesianDate } from '@/app/utils/helper';
import AppButton from "@/app/components/appButton/appButton";
import AppAnimationButton from "@/app/components/appAnimation/appAnimationButton";
import AppModalCreateGallery from './components/appModalCreate';
import AppModalGallery from './components/appModal';
import { setGalleryData } from '@/app/redux/slices/gallerySlice';

const DashboardGallery = () => {
    
    const dispatch = useDispatch()
    const { push } = useRouter()
    const [openModal , setOpenModal] = useState(false)
    const [openModalCreate , setOpenModalCreate] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [gallery , setGallery] = useState([])
    const [currentPageData, setCurrentPageData] = useState([]);
    

    const perPage = 6;

    
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    
    const fetchGalleryData = async () => {
        try {
            const res = await getAllGallery()
            
            if(res.status == 'OK'){
    
                setGallery(res.data)
                setCurrentPageData(res.data.slice(0, perPage))
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server 500')
        }
    }

    useEffect(()=>{
        if(gallery.length == 0){
            fetchGalleryData()
        }
    } , [gallery])


    useEffect(() => {
        const offset = currentPage * perPage;
        setCurrentPageData(gallery.slice(offset, offset + perPage));
    }, [currentPage, gallery]);

    return(
        <>
            <AppModalCreateGallery
                open = { openModalCreate }
                onCloseButton = { (value) => {setOpenModalCreate(value)} } 
            />
            <AppModalGallery
                open = { openModal }
                onCloseButton = { (value) => {setOpenModal(value)} } 
            />
            <section className='w-[100%] flex flex-col items-center justify-center h-auto relative'>
                <Box className='flex flex-col items-center gap-[40px] w-[90%] py-[20px]' >
                    <Box className='flex flex-col gap-[5px] items-center'>
                        <p className="text-[18px] text-PRIMARY-500">{ 'Galeri Desa'}</p>
                        <p className="text-[24px] font-extrabold text-TEXT-1">{'Menampilkan kegiatan-kegiatan yang berlangsung di Desa'}</p>
                    </Box>
                    <Box className={'flex items-center justify-end w-[100%]'}>
                        <AppAnimationButton className='w-auto'>
                                <AppButton
                                    className={` px-[20px] py-[6px]  text-[12px] bg-PRIMARY-500 text-white font-poppins rounded-[6px]`}
                                    text={'Tambah Galeri'} 
                                    type = {'button'}
                                    onClick={()=>{
                                        setOpenModalCreate(!openModalCreate)
                                    }}
                                />
                            </AppAnimationButton>
                        </Box>
                    <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" direction="row" className='w-[100%]'>
                        {
                            currentPageData.map(data => {
                                return(
                                    <Grid item xs={4} onClick={()=>{
                                        setOpenModal(!openModal)
                                        dispatch(setGalleryData(data))
                                    }}>
                                        <Box className='w-full rounded-[10px] flex flex-col text-center shadow-xl bg-white h-[250px] border-[1px] border-transparent hover:border-[1px] hover:border-PRIMARY-300'>
                                            <img src={data.image} alt='news-photos' className='h-[100%] rounded-[10px] object-cover'/>
                                    
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <ReactPaginate
                        pageCount={Math.ceil(gallery.length / perPage)}
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

export default DashboardGallery;