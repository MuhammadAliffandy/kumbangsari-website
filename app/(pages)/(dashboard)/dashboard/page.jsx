'use client';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import AppLayout from "./component/AppLayout";
import AppContent from '@/app/components/appContent/appContent'
import AppTablePreview from '@/app/components/appTable/appTablePreview'
import AppTableRecap from '@/app/components/appTable/appTableRecap'
import AppModal from '@/app/components/appModal/appModal'
import AppContentFilter from "@/app/(pages)/(dashboard)/dashboard/component/appContentFilter"
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import AppModalDetailContent from '@/app/(pages)/(dashboard)/dashboard/component/modal/appModalDetailContent';
import AppModalAddContent from '@/app/(pages)/(dashboard)/dashboard/component/modal/appModalAddContent';
import AppModalGenerateAI from "./generate-ai/component/appModalGenerateAI";
import AppPopupDashboardFilter from '@/app/(pages)/(dashboard)/dashboard/component/popup/appPopupDashboardFilter'
import AppAnimationButton from '@/app/components/appAnimation/appAnimationButton'
import AppCustomModal from "@/app/components/appModal/AppCustomModal";
import AppButton from "@/app/components/appButton/appButton";
import ReactPaginate from 'react-paginate';
import { formatNumberHashtag } from '@/app/utils/helper'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus ,faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { getProductByUser } from '@/app/api/repository/productRepository';
import { useDispatch , useSelector} from "react-redux";
import { setGenerateAI } from "@/app/redux/slices/generateAIByOneSlice";
import { useMediaQuery } from "react-responsive";
import { recommendationContentAI , getContentPreview , contentRecap , trendingHashtag } from '@/app/api/repository/dashboardRepository'
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";

const createDataPreview = (time, contentTitle, productName, contentTypes, platform, caption , hashtag , image ,idProduct , idContent) => {
    return { time, contentTitle, productName, contentTypes, platform  , caption , hashtag , image , idProduct , idContent};
}

const createDataRecap = (platform, success , failed , waiting) => {
    return {platform, success , failed , waiting};
}

const DashboardPage = () => {

    const sm = useMediaQuery({ maxWidth: 640 });
    const md = useMediaQuery({ maxWidth: 768 });
    const lg = useMediaQuery({ maxWidth: 1024 });
    const xl = useMediaQuery({ maxWidth: 1280 });

    const userSubscription = useSelector(state => state.userSubscription.value)
    const dispatch = useDispatch()
    const { push } = useRouter()
    // state modal
    const [openModalAI , setOpenModalAI ] = useState(false)
    const [openModalLoading , setOpenModalLoading ] = useState(false)
    const [openModalDetail , setOpenModalDetail ] = useState(false)
    const [openModalDetailPreview , setOpenModalDetailPreview ] = useState(false)
    const [openModalAdd , setOpenModalAdd ] = useState(false)
    const [openModalUpload , setOpenModalUpload ] = useState(false)
    const [openModalSuccessUpload , setOpenModalSuccessUpload ] = useState(false)
    const [openModalFailedUpload , setOpenModalFailedUpload ] = useState(false)
    const [contentAILoading , setContentAILoading] = useState(true)
    const [contentPreviewLoading , setContentPreviewLoading ]= useState(true)
    const [contentRecapLoading , setContentRecapLoading ]= useState(true)
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
        if(res.status == 'OK'){
            const currentData = res.data.filter((data , index) => {
            if(userSubscription <= 2){
                    return index === 0
                }else{
                    return data
                }
            })
    
            const productList = currentData.map(item => {
                return {value: item.idProduct , text : item.nameProduct}
            })
            setProductList(productList)
        }
    }

    const fetchRecommendationContentAI = async () => {
        try {
            const res = await recommendationContentAI();
            
            setContentAILoading(true)
            if(res.status == 'OK'){
                const data = res.data.map(item => {
                    return { ...item , productName : '', }
                }) 
                setContentAI(data)
                setContentAILoading(false)
                
            }
        } catch (error) {
            setContentAILoading(false)
        }
    }

    const fetchContentPreview = async () => {
        try {
            setContentPreviewLoading(true)
            const res = await getContentPreview();        
            if(res.status == 'OK'){
                const data = res.data.map(data => {
                    
                    return createDataPreview(
                        data.time,
                        data.contentTitle,
                        productList.filter(item => { return data.idProduct === item.value })[0].text,
                        data.contentType,
                        data.platform,
                        data.captionPost,
                        data.hashtagPost,
                        data.imageUrlPost,
                        data.idProduct,
                        data.idContent,
                    )
                })
                setContentDataPreview(data)
                setContentPreviewLoading(false)
            }else{
                setContentPreviewLoading(false)
            }
            
        } catch (error) {
            setContentPreviewLoading(false)
        }
    }

    const fetchContentRecap = async () => {
        try {
            setContentRecapLoading(true)
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
                setContentRecapLoading(false)
                setContentDataRecap(data)
            }else{
                setContentRecapLoading(false)
            }
        } catch (error) {
            setContentRecapLoading(false)
        }
    }

    const fetchTrendingHashtag = async () => {
        try {
            const res = await trendingHashtag();
            
            if(res.status == 'OK'){
                
                const data = res.data.map(item => {
                    return { ...item , productName :  productList.filter(product => { 

                            if(item.idProduct !== product.value ){
                                return product
                            }


                            return item.idProduct === product.value 
                            
                        })[0].text, 
                    }
                }) 
                setTrendingDataHashtag(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleFilter = (value) => {
        setContentDataPreview(contentDataPreview.filter(data => value.product.indexOf(data.productName) > -1))
        setTrendingDataHashtag(trendingDataHashtag.filter(data => value.product.indexOf(data.productName) > -1))
        setContentAI(contentAI.filter(data => value.product.indexOf(data.productName) > -1))
    }

    useEffect(()=>{
        fetchUserProduct() 
    },[])

    useEffect(()=>{
        if(productList.length > 0){
            fetchRecommendationContentAI();
        }
    },[productList])

    useEffect(()=>{
        if(productList.length > 0){
            fetchTrendingHashtag();
            fetchContentPreview();
            fetchContentRecap();
        }
    },[productList])


    return (
        <AppLayout title='Dashboard'>
            {/*  */}
            <AppModalAddContent
                open={openModalAdd}
                onCloseButton = {(value)=> {
                    setOpenModalAdd(value)
                }}
                onDone={()=>{}}
            />
            <AppModalDetailContent
                open= {openModalDetail}
                withAddButton = {true}
                image = {contentDetail ? contentDetail.imageUrlPost : ''}
                caption = {contentDetail ? contentDetail.captionPost : ''}
                hashtag = {contentDetail ? contentDetail.hashtagPost.split(',').join(' ') : ""}
                platform = {contentDetail ? contentDetail.platform : ""}
                productName = {contentDetail ? contentDetail.contentTitle : ""}
                idProduct = {contentDetail ? productList.filter(data => data.value == contentDetail.idProduct)[0].value : ""}
                data = {contentDetail ? contentDetail : ''}
                isDashboard={true}
                deleteButton={false}
                onClick = {()=> {
                    // setOpenModalUpload(!openModalUpload)
                }}
                onEditButton = {()=> {
                    setOpenModalDetail(false)
                    dispatch(setGenerateAI(contentDetail)) 

                }}
                onCloseButton = {(value)=> {setOpenModalDetail(value)}}
                onDone={()=>{}}
            />
            <AppModalDetailContent
                open= {openModalDetailPreview}
                image = {contentDetailPreview ? contentDetailPreview.image ? contentDetailPreview.image[0] : null : null}
                caption = {contentDetailPreview ? contentDetailPreview.caption : ''}
                hashtag = {contentDetailPreview ? contentDetailPreview.hashtag : ""}
                platform = {contentDetailPreview ? contentDetailPreview.platform : ""}
                productName = {contentDetailPreview ? contentDetailPreview.productName : ""}
                idProduct = {contentDetailPreview ? contentDetailPreview.idProduct : ""}
                idContent = {contentDetailPreview ? contentDetailPreview.idContent : ""}
                isGenerate={true}
                isDashboard={true}
                deleteButton={false}
                onClick = {()=> {

                }}
                onDone={()=>{}}
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
                    // setContentAI(value) 
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
            <AppCustomModal
                open={openModalUpload}
                withClose={true}
                width={'w-[30vw]'}
                modalType='modal-common'
                title={'Unggah Sekarang'}
                onCloseButton={(value)=> setOpenModalUpload(value) }
                children={
                <>
                    <p className="text-TEXT-1 text-[14px] font-medium">Apakah Anda yakin ingin mengunggah konten ini sekarang?</p>
                    <Box className=' flex gap-[10px] w-[100%]'>
                        <AppButton
                            className='w-[100%] py-[10px] bg-NEUTRAL-500 shadow-xl text-white font-poppins rounded-[18px]'
                            text={'Kembali'} 
                            type = {'button'}
                            onClick={()=>{
                            }}
                        />
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                            text={'Ya'} 
                            type = {'button'}
                            onClick={()=>{
                                setOpenModalSuccessUpload(!openModalSuccessUpload)
                            }}
                        />
                    </Box>
                </>
            }
            />
            <AppCustomModal
                open={openModalSuccessUpload}
                withClose={true}
                width={'w-[30vw]'}
                modalType='modal-status'
                status={'success'}
                alignment={'center'}
                title={'Berhasil'}
                titleColor={'text-STATE-GREEN-BASE'}
                subtitle={'Konten telah berhasil diunggah!'}
                onCloseButton={(value)=> setOpenModalSuccessUpload(value) }
                children={
                <>
                    <Box className=' flex gap-[10px] w-[100%]'>
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                            text={'Keluar'} 
                            type = {'button'}
                            onClick={()=>{
                            }}
                        />
                    </Box>
                </>
            }
            />
            <AppCustomModal
                open={openModalFailedUpload}
                withClose={true}
                width={'w-[30vw]'}
                modalType='modal-status'
                status={'failed'}
                alignment={'center'}
                title={'Gagal!'}
                titleColor={'text-STATE-RED-BASE'}
                subtitle={'Cek konektivitas akun'}
                onCloseButton={(value)=> setOpenModalFailedUpload(value) }
                children={
                <>
                    <Box className=' flex gap-[10px] w-[100%]'>
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                            text={'Keluar'} 
                            type = {'button'}
                            onClick={()=>{
                            }}
                        />
                    </Box>
                </>
            }
            />
            <Box className={` grow w-[100%] flex ${ sm || lg || md  ? 'flex-col' : 'flex-row'  }`}>
                {/* 
                *
                */}
                <Box className={`${ sm || lg || md ? 'w-[100%] px-[20px]' : xl ?  'w-[60%] pl-[20px]'  : 'w-[65%] pl-[20px]'  } py-[20px] h-[100%] flex flex-col gap-[15px]`}>

                    <Box className={`${ sm || lg ? 'w-[100%] flex justify-between' : 'w-[100%]'}`}>
                        <Box className='flex items-center justify-left gap-[10px]'>
                            <AppAnimationButton className='w-auto'>
                                <AppCustomButton className='flex gap-[10px] items-center bg-SECONDARY-500 rounded-[10px] px-[15px] py-[5px] '
                                        onClick={()=>{
                                            setOpenModalAdd(true)
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} color={'white'} ></FontAwesomeIcon>
                                        {sm || lg ? null : <p className="text-TEXT-5 text-[14px]">Tambah Konten</p> }
                                </AppCustomButton>
                            </AppAnimationButton>
                            <AppAnimationButton className='w-auto'>
                                <AppCustomButton className='flex gap-[10px] items-center bg-SECONDARY-500 rounded-[10px] px-[15px] py-[5px] '
                                        onClick={()=>{
                                            setOpenModalAI(!openModalAI)
                                        }}
                                    >
                                        <img src="/images/icon/sparkling-white.svg" />
                                        {sm || lg ? null : <p className="text-TEXT-5 text-[14px]">Generate AI</p> }
                                </AppCustomButton>
                            </AppAnimationButton>
                        </Box>
                        {
                            sm || lg ?  
                            <AppPopupDashboardFilter
                                isResponsive = { xl ? true : false  }
                                product = { productList}
                                listProductCheckbox={productCheckBoxFilter}
                                onClick={handleFilter}
                            /> : null 
                        }
                    </Box>

                    {/*  */}

                    <Box className='rounded-[20px] p-[20px]  flex flex-col gap-[15px] bg-NEUTRAL-100 hover:shadow-md '>
                        <p className="text-TEXT-1 font-bold text-[16px]">Preview Konten</p> 
                        <Box  className='h-[20vh] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                            <AppTablePreview
                                loading ={contentPreviewLoading}
                                data = {contentDataPreview} 
                                onClick = { (value) => {
                                    setOpenModalDetailPreview(!openModalDetailPreview)
                                    setContentDetailPreview(value)
                                }}

                            />
                        </Box>
                    </Box>

                    {/*  */}

                    <Box className='grow rounded-[20px] p-[20px] flex flex-col gap-[15px] bg-NEUTRAL-100 hover:shadow-md  '>
                        <Box className='flex items-center justify-start '>
                            <p className="text-TEXT-1 font-bold text-[16px]">Rekomendasi Konten</p>
                        </Box>
                        <Box  className=' max-h-[23vh] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
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
                                                    hashtag = {data.hashtagPost.split(',').join(' ')}
                                                    onClick={()=>{
                                                        setOpenModalDetail(!openModalDetail)
                                                        setContentDetail(data)
                                                    }}
                                                />
                                            </Grid>
                                        )
                                    }) :
                                    
                                    contentAILoading ? 
                                    <>
                                        <div className="w-[100%] h-[200px]">
                                            <Skeleton count={5} className="w-[100%] h-[50px]"/>
                                        </div>
                                    </> 
                                    :
                                    <Box className = 'w-[100%]'>
                                        <p className="text-TEXT-1 p-[10px] text-center">Belum Melakukan Aktivitas Generate</p> 
                                    </Box>

                                }
                            </Grid>
                        </Box>
                        <Box className = 'w-[100%] flex items-center justify-center'>
                            {
                                contentAI.length > 0 ? 
                                <ReactPaginate
                                    pageCount={Math.ceil(contentAI.length / perPage)}
                                    pageRangeDisplayed={5}
                                    marginPagesDisplayed={2}
                                    onPageChange={handlePageChange}
                                    containerClassName={'pagination text-[12px] flex p-[10px] items-center justify-center gap-[10px] text-TEXT-1'}
                                    activeClassName={'active bg-PRIMARY-500 px-[12px] py-[6px] rounded-[50%] text-TEXT-5'}
                                    previousLabel={<FontAwesomeIcon icon={faChevronLeft} />} 
                                    nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                                /> : null 
                            }
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
                                onClick={handleFilter}
                            />
                        }
                    </Box>

                    <Box className= 'rounded-[20px] p-[20px] flex flex-col gap-[15px] bg-NEUTRAL-100 hover:shadow-md  '>
                        <p className="text-TEXT-1 font-bold text-[16px]">Rekap Hari Ini</p>
                        <Box className='h-[20vh] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                            <AppTableRecap
                                loading={contentRecapLoading}
                                data ={contentDataRecap} // contentDataRecap
                            />
                        </Box>
                    </Box>
                    {/* filter bar  */}
                    <Box className= ' grow  rounded-[20px] p-[20px] flex flex-col gap-[15px] bg-NEUTRAL-100 hover:shadow-md '>
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
            

        </AppLayout>
    ); 
}

export default DashboardPage;