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
import AppPopupDashboardFilter from '@/app/(pages)/(dashboard)/dashboard/component/popup/appPopupDashboardFilter'
import ReactPaginate from 'react-paginate';
import { formatNumberHashtag } from '@/app/utils/helper'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus ,faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { getProductByUser } from '../../../api/repository/productRepository';
import { useDispatch } from "react-redux";
import { setGenerateAI } from "@/app/redux/slices/generateAIByOneSlice";
import { useMediaQuery } from "react-responsive";
import { recommendationContentAI , getContentPreview , contentRecap , trendingHashtag } from '@/app/api/repository/dashboardRepository'
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";

const createDataPreview = (time, contentTitle, productName, contentTypes, platform, caption , hashtag , image) => {
    return { time, contentTitle, productName, contentTypes, platform  , caption , hashtag , image};
}

const createDataRecap = (platform, success , failed , waiting) => {
    return {platform, success , failed , waiting};
}

const DashboardPage = () => {

    const sm = useMediaQuery({ maxWidth: 640 });
    const md = useMediaQuery({ maxWidth: 768 });
    const lg = useMediaQuery({ maxWidth: 1024 });
    const xl = useMediaQuery({ maxWidth: 1280 });

    const dispatch = useDispatch()
    const { push } = useRouter()
    // state modal
    const [openModalAI , setOpenModalAI ] = useState(false)
    const [openModalLoading , setOpenModalLoading ] = useState(false)
    const [openModalDetail , setOpenModalDetail ] = useState(false)
    const [openModalDetailPreview , setOpenModalDetailPreview ] = useState(false)
    const [openModalAdd , setOpenModalAdd ] = useState(false)
    // state data
    const [trendingDataHashtag , setTrendingDataHashtag ] = useState([])
    const [contentAI , setContentAI ] = useState([])
    const [contentDataPreview , setContentDataPreview ] = useState([])
    const [contentDataRecap , setContentDataRecap ] = useState([])
    const [contentDetail , setContentDetail ] = useState()
    const [contentDetailPreview , setContentDetailPreview ] = useState()
    const [productList , setProductList] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [productCheckBoxFilter , setProductCheckboxFilter] = useState('')


    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    
    const perPage = 4;
    const offset = currentPage * perPage;
    const currentPageData = contentAI.slice(offset, offset + perPage);
    
    const fetchUserProduct = async () => {
        const res = await getProductByUser();
        if(res.status = 'OK'){
            const productList = res.data.map(item => {
                return {value: item.idProduct , text : item.nameProduct}
            })
            setProductList(productList)
        }
    }

    const fetchRecommendationContentAI = async () => {
        try {
            const res = await recommendationContentAI();
        
            if(res.status == 'OK'){
                setContentAI(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchContentPreview = async () => {
        try {
            const res = await getContentPreview();        
            if(res.status == 'OK'){
                const data = res.data.map(data => {

                    return createDataPreview(
                        data.time,
                        data.captionPost,
                        productList.filter(item => { return data.idProduct === item.value })[0].text,
                        data.contentType,
                        data.platform,
                        data.captionPost,
                        data.hashtagPost,
                        data.imageUrlPost,
                    )
                })
                setContentDataPreview(data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const fetchContentRecap = async () => {
        try {
            const res = await contentRecap();
        
            if(res.status == 'OK'){
                const data = res.data.map(data => {
                    return createDataRecap(
                        data.platform,
                        data.success,
                        data.failed,
                        data.queue,
                    )
                })
                setContentDataRecap(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchTrendingHashtag = async () => {
        try {
            const res = await trendingHashtag();
        
            if(res.status == 'OK'){
                setTrendingDataHashtag(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchUserProduct() 
    },[])

    useEffect(()=>{
        fetchRecommendationContentAI();
        fetchTrendingHashtag();
        fetchContentPreview();
        fetchContentRecap();
    },[productList])


    return (
        <AppLayout title='Dashboard'>
            <Box className={` grow w-[100%] flex ${ sm || lg || md  ? 'flex-col' : 'flex-row'  }`}>
                {/* 
                *
                */}
                <Box className={`${ sm || lg || md ? 'w-[100%] px-[20px]' : xl ?  'w-[60%] pl-[20px]'  : 'w-[65%] pl-[20px]'  } py-[20px] h-[100%] flex flex-col gap-[15px]`}>

                    <Box className={`${ sm || lg ? 'w-[100%] flex justify-between' : 'w-[100%]'}`}>
                        <Box className='flex items-center justify-left gap-[10px]'>
                            <AppCustomButton className='flex gap-[10px] items-center bg-SECONDARY-500 rounded-[10px] px-[15px] py-[5px] '
                                    onClick={()=>{
                                        setOpenModalAdd(true)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlus} color={'white'} ></FontAwesomeIcon>
                                    {sm || lg ? null : <p className="text-TEXT-5 text-[14px]">Tambah Konten</p> }
                            </AppCustomButton>
                            <AppCustomButton className='flex gap-[10px] items-center bg-SECONDARY-500 rounded-[10px] px-[15px] py-[5px] '
                                    onClick={()=>{
                                        setOpenModalAI(!openModalAI)
                                    }}
                                >
                                    <img src="/images/icon/sparkling-white.svg" />
                                    {sm || lg ? null : <p className="text-TEXT-5 text-[14px]">Generate AI</p> }
                            </AppCustomButton>
                        </Box>
                        {
                            sm || lg ?  
                            <AppPopupDashboardFilter
                                isResponsive = { xl ? true : false  }
                                product = { productList}
                                listProductCheckbox={productCheckBoxFilter}
                                onClick={(value)=>{
                                    setProductCheckboxFilter(value.product)
                                    console.log(value.product)
                                }}
                            /> : null 
                        }
                    </Box>

                    {/*  */}

                    <Box className='rounded-[20px] p-[20px]  flex flex-col gap-[15px] border-[1px] border-TEXT-4 hover:shadow-xl '>
                        <p className="text-TEXT-1 font-bold text-[16px]">Preview Konten</p> 
                        <Box  className='h-[20vh] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                            <AppTablePreview
                                data = {contentDataPreview} //contentDataPreview
                                onClick = { (value) => {
                                    setOpenModalDetailPreview(!openModalDetailPreview)
                                    setContentDetailPreview(value)
                                    console.log(value)
                                }}

                            />
                        </Box>
                    </Box>

                    {/*  */}

                    <Box className='grow rounded-[20px] p-[20px] flex flex-col gap-[15px] border-[1px] border-TEXT-4 hover:shadow-xl  '>
                        <Box className='flex items-center justify-start '>
                            <p className="text-TEXT-1 font-bold text-[16px]">Rekomendasi Konten</p>
                        </Box>
                        <Box  className=' overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                            <Grid container direction={ sm || lg || md || xl ? 'column' : 'row' }  justifyContent="flex-start" alignItems="flex-start" spacing={2} className=" p-[8px] " >
                                {
                        
                                    contentAI.length > 0 ?

                                    currentPageData.map((data,index) => {
                                        return ( 
                                            <Grid className="w-[100%]" key = {index} item xs={ 6}>
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
                                    }) : 
                                    <>
                                        <div className="w-[100%] h-[200px]">
                                            <Skeleton count={5} className="w-[100%] h-[50px]"/>
                                        </div>
                                    </> 
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
                */}
                <Box className={`${ sm || lg || md ? 'w-[100%]' : xl ? 'w-[40%]' : ' w-[35%]' } p-[20px] grow flex flex-col gap-[15px]`}>

                    <Box className='flex items-center justify-end w-[100%]'>
                        {
                            sm || lg ?  null : 
                            <AppPopupDashboardFilter
                                isResponsive = { xl ? true : false  }
                                product = { productList}
                                listProductCheckbox={productCheckBoxFilter}
                                onClick={(value)=>{
                                    setProductCheckboxFilter(value.product)
                                    console.log(value.product)
                                }}
                            />
                        }
                    </Box>

                    <Box className= 'rounded-[20px] p-[20px] flex flex-col gap-[15px] border-[1px] border-TEXT-4 hover:shadow-xl  '>
                        <p className="text-TEXT-1 font-bold text-[16px]">Rekap Hari Ini</p>
                        <Box className='h-[20vh] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                            <AppTableRecap
                                data ={contentDataRecap} // contentDataRecap
                            />
                        </Box>
                    </Box>
                    {/* filter bar  */}
                    <Box className= ' grow rounded-[20px] p-[20px] flex flex-col gap-[15px] border-[1px] border-TEXT-4 hover:shadow-xl '>
                        <Box className='flex items-center justify-between w-[100%]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Trending Hashtag</p>
                        </Box>
                        <Box className=' h-[30vh] py-[10px] pl-[4px] pr-[5px] flex flex-col gap-[15px] overflow-x-hidden scrollbar scrollbar-w-[4px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        {
                                trendingDataHashtag.length > 0 ? 
                                trendingDataHashtag.map((data,index) => {

                                    const productName = productList.filter(data => {return data.value == data.idProduct})
                
                                    return (
                                        <AppContentFilter
                                            key={index}
                                            isDashboard={true}
                                            title = {data.hashtag}
                                            subtitle = {productName.text}
                                            contentTypes = {`${formatNumberHashtag(data.count)} unggahan`}
                                            platform = {data.platform}
                                            onClick= {()=>{
                                
                                            }}
                                        />
                                    );
                                })
                                : 
                                <>
                                    <div className="w-[100%] h-auto">
                                        <Skeleton count={6} className="w-[100%] h-[50px]"/>
                                    </div>
                                </> 
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
                image = {contentDetailPreview ? contentDetailPreview.image ? contentDetailPreview.image [0] : null : null}
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