'use client';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import AppLayout from "./component/appLayout";
import AppContent from '@/app/components/appContent/appContent'
import AppTablePreview from '@/app/components/appTable/appTablePreview'
import AppTableRecap from '@/app/components/appTable/appTableRecap'
import AppModal from '@/app/components/appModal/appModal'
import AppContentFilter from "./component/appContentFilter"
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import AppModalDetailContent from './component/modal/appModalDetailContent';
import AppModalAddContent from './component/modal/appModalAddContent';
import AppModalGenerateAI from "./generate-ai/component/appModalGenerateAI";
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus ,faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import { getProductByUser } from '../../../api/repository/productRepository';
import { useDispatch } from "react-redux";
import { setGenerateAI } from "@/app/redux/slices/generateAIByOneSlice";
import { useMediaQuery } from "react-responsive";
import { recommendationContentAI } from '@/app/api/repository/dashboardRepository'
import { useRouter } from "next/navigation";

function createData(time, contentTitle, productName, contentTypes, platform) {
    return { time, contentTitle, productName, contentTypes, platform };
}

const rows = [
    createData('17.00', 'Manfaat cuci muka pagi hari', 'Skincaremoe', 'Gambar, Caption, Hashtag', 'facebook'),
    createData('17.00', 'Manfaat Bakso Aci ', 'BaksoAci', 'Caption, Hashtag', 'instagram'),
    createData('17.00', 'Skincare ini bagus bgt', 'Skinku', 'Caption', 'twitter'),
    createData('17.00', 'Burger Murah Meriah', 'Burgar', 'Gambar, Caption', 'facebook'),
    createData('17.00', 'Sate Taichan Mantap', 'Taichan','Hashtag', 'twitter'),
];


function createDataRecap(platform, success , failed , waiting) {
    return {platform, success , failed , waiting};
}

const recap = [
    createDataRecap('facebook',7,1,5),
    createDataRecap('instagram',7,1,5),
    createDataRecap('facebook',7,1,5),
    createDataRecap('twitter',7,1,5),
    createDataRecap('facebook',7,1,5),

];


const DashboardPage = () => {

    const sm = useMediaQuery({ maxWidth: 640 });
    const md = useMediaQuery({ maxWidth: 768 });
    const lg = useMediaQuery({ maxWidth: 1024 });
    const xl = useMediaQuery({ maxWidth: 1280 });

    const dispatch = useDispatch()
    const { push } = useRouter()
    const generateAIContentHistory = useSelector( state => state.generateAIContentHistory.value )

    const [openModalAI , setOpenModalAI ] = useState(false)
    const [openModalLoading , setOpenModalLoading ] = useState(false)
    const [openModalDetail , setOpenModalDetail ] = useState(false)
    const [openModalDetailPreview , setOpenModalDetailPreview ] = useState(false)
    const [openModalAdd , setOpenModalAdd ] = useState(false)
    const [prev , setPrev ] = useState(true)
    const [contentAI , setContentAI ] = useState([])
    const [contentDetail , setContentDetail ] = useState()
    const [contentDetailPreview , setContentDetailPreview ] = useState()
    const [productList , setProductList] = useState([])
    const [currentPage, setCurrentPage] = useState(0);


    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    
    const perPage = 4;
    const offset = currentPage * perPage;
    const currentPageData = contentAI.slice(offset, offset + perPage);
    
    const getUserProduct = async () => {
        const res = await getProductByUser();
        if(res.status = 'OK'){
            const productList = res.data.map(item => {
                return {value: item.idProduct , text : item.nameProduct}
            })
            setProductList(productList)
        }
    }


    const getRecommendationContentAI = async () => {
        const res = await recommendationContentAI();
        
        if(res.status == 'OK'){
            setContentAI(res.data)
        }
    }

    useEffect(()=>{
        getUserProduct() 
        getRecommendationContentAI();
    },[])


    return (
        <AppLayout title='Dashboard'>
            <Box className={`flex flex-grow ${ sm || lg || md  ? 'flex-col' : 'flex-row'  }`}>
                {/* 
                *
                *
                */}
                <Box className={`${ sm || lg || md ? 'w-[100%] px-[20px]' : xl ?  'w-[60%] pl-[20px]'  : 'w-[65%] pl-[20px]'  } pt-[20px] h-[100%] flex flex-col gap-[15px]`}>

                    <Box className='flex items-center justify-left gap-[10px]'>
                        <AppCustomButton className='flex gap-[10px] items-center bg-SECONDARY-500 rounded-[10px] px-[15px] py-[5px] '
                                onClick={()=>{
                                    setOpenModalAdd(true)
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} color={'white'} ></FontAwesomeIcon>
                                <p className="text-TEXT-5 text-[14px]">Tambah Konten</p>
                        </AppCustomButton>
                        <AppCustomButton className='flex gap-[10px] items-center bg-SECONDARY-500 rounded-[10px] px-[15px] py-[5px] '
                                onClick={()=>{
                                    setOpenModalAI(!openModalAI)
                                }}
                            >
                                <img src="/images/icon/sparkling-white.svg" />
                                <p className="text-TEXT-5 text-[14px]">Generate AI</p>
                        </AppCustomButton>
                        
                    </Box>

                    {/*  */}

                    <Box className='rounded-[20px] p-[20px]  flex flex-col gap-[15px] border-[1px] border-TEXT-4 hover:shadow-xl '>
                        <p className="text-TEXT-1 font-bold text-[16px]">Preview Konten</p> 
                        <Box  className='h-[20vh] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                            <AppTablePreview
                                data = {rows}
                                onClick = { (value) => {
                                    setOpenModalDetailPreview(!openModalDetailPreview)
                                }}

                            />
                        </Box>
                    </Box>

                    {/*  */}

                    <Box className='rounded-[20px] p-[20px]  flex flex-col gap-[15px] border-[1px] border-TEXT-4 hover:shadow-xl  '>
                        <Box className='flex items-center justify-start '>
                            <p className="text-TEXT-1 font-bold text-[16px]">Rekomendasi Konten</p>
                        </Box>
                        <Box  className='h-[25vh] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                            <Grid container direction={ sm || lg || md || xl ? 'column' : 'row' }  justifyContent="flex-start" alignItems="flex-start" spacing={2} className=" p-[8px] " >
                                {
                        
                                    contentAI != [] ?

                                    currentPageData.map((data,index) => {
                                        return ( 
                                            <Grid key = {index} item xs={6}>
                                                    <AppContent
                                                        key={index}
                                                        isDashboard = {true}
                                                        platform={data.platform}
                                                        productName = {data.contentTitle}
                                                        image={data.imageUrlPost}
                                                        caption = {data.captionPost}
                                                        hashtag = {data.hashtagPost}
                                                        onClick={()=>{
                                                            setOpenModalDetail(!openModalDetail)
                                                            setContentDetail(data)
                                                        }}
                                                    />
                                            </Grid>
                                        )
                                    }) : null
                                }
                            </Grid>
                        </Box>
                        <Box className = 'w-[100%] flex items-center justify-center'>
                            <ReactPaginate
                                pageCount={Math.ceil(contentAI.length / perPage)}
                                pageRangeDisplayed={5}
                                marginPagesDisplayed={2}
                                onPageChange={handlePageChange}
                                containerClassName={'pagination text-[12px] flex p-[10px] items-center justify-center gap-[10px] text-TEXT-1'}
                                activeClassName={'active bg-PRIMARY-500 px-[12px] py-[6px] rounded-[50%] text-TEXT-5'}
                                previousLabel={<FontAwesomeIcon icon={faChevronLeft} />} 
                                nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                            />
                        </Box>
                    </Box>

                </Box>
                {/* 
                *
                *
                */}
                <Box className={`${ sm || lg || md ? 'w-[100%]' : xl ? 'w-[40%]' : ' w-[35%]' } h-[100%] p-[20px] flex flex-col gap-[15px]`}>

                    <Box className='flex items-center justify-end w-[100%]'>
                        <AppCustomButton className='flex gap-[10px] items-center bg-white rounded-[10px] px-[15px] py-[5px] border-[1px] border-TEXT-4 '
                                onClick={()=>{}}
                            >
                                <img src="/images/icon/sparkling-black.svg" />
                                <p className="text-TEXT-1 font-bold text-[14px]">Filter</p>
                        </AppCustomButton>
                        
                    </Box>


                    <Box className= 'h-auto rounded-[20px] p-[20px] flex flex-col gap-[15px] border-[1px] border-TEXT-4 hover:shadow-xl  '>
                        <p className="text-TEXT-1 font-bold text-[16px]">Rekap Hari Ini</p>
                        <Box className='h-[20vh] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                            <AppTableRecap
                                data ={recap}
                            />
                        </Box>
                    </Box>
                    {/* filter bar  */}
                    <Box className= 'h-auto rounded-[20px] p-[20px] flex flex-col gap-[15px] border-[1px] border-TEXT-4 hover:shadow-xl '>
                        <Box className='flex items-center justify-between w-[100%]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Trending Hashtag</p>
                        </Box>
                        <Box className='h-[31vh] py-[10px]  pl-[4px] pr-[5px] flex flex-col gap-[15px] overflow-x-hidden scrollbar scrollbar-w-[4px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        {
                                generateAIContentHistory != [] ? 

                                generateAIContentHistory.map((data,index) => {
                                    
                                    const contentTypes = [  
                                        data.caption ? 'Caption' : null,  
                                        data.hashtag ? 'Hashtag' : null,  
                                        data.image ? 'Gambar' : null,  
                                    ]

                                    return (
                                        <AppContentFilter
                                            key={index}
                                            isDashboard={true}
                                            title = {data.contentTitle}
                                            subtitle = {data.productName}
                                            contentTypes = {contentTypes.join(',').split(/,,|, /)}
                                            platform = {data.platform}
                                            onClick= {()=>{
                                
                                            }}
                                        />
                                    );
                                })
                        
                                : <p>Anda belum Melakukan Generate</p>
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>    
             {/*  */}
            <AppModalAddContent
                open={openModalAdd}
                onCloseButton = {(value)=> {
                    setOpenModalAdd(value)
                }}
            />
            <AppModalDetailContent
                open= {openModalDetail}
                image = {contentDetail ? contentDetail.imageUrlPost : ''}
                caption = {contentDetail ? contentDetail.captionPost : ''}
                hashtag = {contentDetail ? contentDetail.hashtagPost : ""}
                platform = {contentDetail ? contentDetail.platform : ""}
                productName = {contentDetail ? contentDetail.contentTitle : ""}
                isDashboard={true}
                onClick = {()=> {}}
                onEditButton = {()=> {
                    setOpenModalDetail(false)
                    dispatch(setGenerateAI(contentDetail)) 

                }}
                onCloseButton = {(value)=> {setOpenModalDetail(value)}}
            />
            <AppModalDetailContent
                open= {openModalDetailPreview}
                image = {contentDetailPreview ? contentDetailPreview.image : ''}
                caption = {contentDetailPreview ? contentDetailPreview.caption : ''}
                hashtag = {contentDetailPreview ? contentDetailPreview.hashtag : ""}
                platform = {contentDetailPreview ? contentDetailPreview.platform : ""}
                productName = {contentDetailPreview ? contentDetailPreview.productName : ""}
                isDashboard={true}
                onClick = {()=> {

                }}
                onCloseButton = {(value)=> {setOpenModalDetailPreview(value)}}
            />
            <AppModal
                    withClose = {false}
                    open = {openModalLoading}
                    width={'w-[35%]'}
                >
                    <Box className ='flex flex-col items-center gap-[40px]'>
                        <CircularProgress style={{color : '#F45B69'}}  />
                        <Box className='flex flex-col items-center '>
                            <p className="text-SECONDARY-500 text-[20px] font-bold font-poppins">Generate...</p>
                            <p className="text-TEXT-1 text-[14px] font-poppins">Mohon tunggu sebentar</p>
                        </Box>
                    </Box>
            </AppModal>
            {/*  */}
            <AppModalGenerateAI open={openModalAI} onCloseButton={(value)=>{setOpenModalAI(value)}} 
                onClick = { ( value ) => {  
                    setContentAI(value) 
                }}
                onLoad = {
                    (load)=>{
                        setOpenModalLoading(load)
                        load == false ? push('/dashboard/generate-ai') : null
                        setOpenModalAI(false)
                    }
                }
            />
            <AppModal
                    withClose = {false}
                    open = {openModalLoading}
                    width={'w-[35%]'}
                >
                    <Box className ='flex flex-col items-center gap-[40px]'>
                        <CircularProgress style={{color : '#F45B69'}}  />
                        <Box className='flex flex-col items-center '>
                            <p className="text-SECONDARY-500 text-[20px] font-bold font-poppins">Generate...</p>
                            <p className="text-TEXT-1 text-[14px] font-poppins">Mohon tunggu sebentar</p>
                        </Box>
                    </Box>
            </AppModal>

        </AppLayout>
    ); 
}

export default DashboardPage;