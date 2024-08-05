'use client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight , faStar} from '@fortawesome/free-solid-svg-icons'
import { useState , useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { getAllProduct } from '@/app/api/repository/productRepository'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setProductData } from '@/app/redux/slices/productSlice';
import AppModalProduct from './components/appModal'


const DashboardProduct = () => {

    const { push } = useRouter()

    const arr =[ 1 , 2, 3,4 ,5]

    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(0);
    const [product , setProduct] = useState([])
    const [currentPageData, setCurrentPageData] = useState([]);
    const [openModal , setOpenModal ] = useState(false)


    const perPage = 6;

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const fetchProductData = async () => {
        try {
            const res = await getAllProduct()
            
            if(res.status == 'OK'){
    
                setProduct(res.data)
                setCurrentPageData(res.data.slice(0, perPage))
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server 500')
        }
    }

    useEffect(()=>{
        if(product.length == 0){
            fetchProductData()
        }
    } , [product])

    useEffect(() => {
        const offset = currentPage * perPage;
        setCurrentPageData(product.slice(offset, offset + perPage));
    }, [currentPage, product]);    

    return(
        <>
            <AppModalProduct
                open = { openModal }
                onCloseButton = { (value) => {setOpenModal(value)} } 
            />
            <section className='w-[100%] flex flex-col items-center justify-center h-auto'>
                <Box className='flex flex-col items-center gap-[40px] w-[90%] py-[20px]' >
                    <Box className='flex flex-col gap-[5px] items-center'>
                        <p className="text-[18px] text-PRIMARY-500">{ 'Dari Desa Untuk Desa'}</p>
                        <p className="text-[24px] font-extrabold text-TEXT-1">{'Layanan pembelian produk yang dibuat oleh desa'}</p>
                    </Box>
                    
                    <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" direction="row" className='w-[100%]'>
                        {
                            currentPageData.map(data => {
                            return(
                                <Grid item xs={4} onClick={ ()=> { 
                                        setOpenModal(!openModal)
                                        dispatch(setProductData(data))
                                    }}>
                                    <Box className='w-full rounded-[10px] flex flex-col text-center shadow-xl bg-white h-[250px] border-[1px] border-transparent hover:border-[1px] hover:border-PRIMARY-300'>
                                        <img src={data.image} alt='news-photos' className='h-[70%] rounded-t-[10px] '/>
                                        <div className='h-[30%] flex w-[100%]  relative'>
                                            <div className='bg-STATE-YELLOW-BASE py-[8px] px-[12px] bottom-5 rounded-l-[14px] right-0 shadow-xl absolute'>
                                            <p className='text-[10px]'>Lihat Produk</p>
                                            </div>
                                            <div className='  overflow-hidden flex flex-col gap-[4px] p-[15px] items-start justify-start'>
                                                <p className='text-[18px] text-start text-black font-bold'>{data.title}</p>
                                                <div className='flex gap-[4px] items-center'>
                                                {
                                                    arr.map((item , index) => {
                                                    return(
                                                        <FontAwesomeIcon icon={faStar} color={  index < data.rating ? '#FFC300' :  '#D9D9D9'} />
                                                    )
                                                    })
                                                }
                                                </div>
                                            </div>
                                        
                                        </div>
                                    </Box>
                                </Grid>
                            )
                            })
                        }
                    </Grid>
                    <ReactPaginate
                        pageCount={Math.ceil(product.length / perPage)}
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

export default DashboardProduct;