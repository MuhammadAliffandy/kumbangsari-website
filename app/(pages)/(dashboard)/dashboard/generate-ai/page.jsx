'use client'

import { useEffect, useState } from "react";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import AppLayout from "../component/appLayout";
import AppContent from '@/app/components/appContent/appContent'
import AppModal from '@/app/components/appModal/appModal'
import AppContentFilter from "../component/appContentFilter"
import AppModalGenerateAI from "./component/appModalGenerateAI";
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import AppModalDetailContent from '../component/modal/appModalDetailContent';
import AppModalEditContent from '../component/modal/appModalEditContent';
import AppPopupFilter from '../component/popup/appPopupFilter'
import { updateGenerateAI, updateGenerateAIList} from '@/app/redux/slices/generateAISlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import { deleteContent, generateAI, getContentByHistory, getContentById, refreshAI } from '@/app/api/repository/contentRepository';
import { getProductByUser } from '../../../../api/repository/productRepository';
import { deleteContentHistory, filterContentHistory } from '@/app/redux/slices/generateAIContentHistorySlice';
import { useDispatch } from "react-redux";
import { setGenerateAI } from "@/app/redux/slices/generateAIByOneSlice";
import { useMediaQuery } from "react-responsive";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";


const GenerateAIPage = () => {

    // state responsive
    const sm = useMediaQuery({ maxWidth: 640 });
    const md = useMediaQuery({ maxWidth: 768 });
    const lg = useMediaQuery({ maxWidth: 1024 });
    const xl = useMediaQuery({ maxWidth: 1280 });
    // external state 
    const { push } = useRouter()
    const dispatch = useDispatch()
    const generateAIContentHistory = useSelector( state => state.generateAIContentHistory.value )
    const generateListContent = useSelector(state => state.generateAI.value)
    // state loading
    const [contentAILoading  , setContentAILoading ] = useState(false)
    const [contentAIHistoryLoading  , setContentAIHistoryLoading ] = useState(false)
    const [openModalLoading , setOpenModalLoading ] = useState(false)
    // state modal
    const [openModalAI , setOpenModalAI ] = useState(false)
    const [openModalDetail , setOpenModalDetail ] = useState(false)
    const [openModalEdit , setOpenModalEdit ] = useState(false)
    // state data
    const [prev , setPrev ] = useState(true)
    const [contentAI , setContentAI ] = useState([])
    const [contentAIHistory , setContentAIHistory ] = useState([])
    const [contentDetail , setContentDetail ] = useState()
    const [productList , setProductList] = useState([])
    const [productCheckBoxFilter , setProductCheckboxFilter] = useState('')
    const [platformCheckBoxFilter , setPlatformCheckboxFilter] = useState('')

    const pagination = () => {
        
        if(generateListContent){
            const filterData = generateListContent.filter((data, index) => index + 1 < 7);
            setContentAI(filterData);
        }else{
            setContentAI(generateListContent);
            
        }
    }

    const getUserProduct = async () => {
        const res = await getProductByUser();
        if(res.status = 'OK'){
            const productList = res.data.map(item => {
                return {value: item.idProduct , text : item.nameProduct}
            })
            setProductList(productList)
        }
    }

    const mappingGenerateAIValue = (data) => {
        const currentData = data;

        const generateValue = { 
            caption : data.caption ,
            hashtag : data.hashtag,
            image : data.imageUrl, 
        }
        
        const lengthData = generateValue.caption || generateValue.hashtag || generateValue.image
        
        const mappingArray = lengthData.map((data,index)=>{
            return { 
                image : !generateValue.image ? null : generateValue.image[index] , 
                caption :!generateValue.caption ? null : generateValue.caption[index].content ,
                hashtag : !generateValue.hashtag ? null : generateValue.hashtag[index].content,
                productName : productList[currentData.idProduct - 1].text,
                platform : currentData.platform,
                idContent: currentData.idContent,
            }
        }) 
        return mappingArray;
    }

    const mappingGenerateCurrentAIValue = (data) => {
        const currentData = data;

        const generateValue = { 
            caption : data.archives.caption ,
            hashtag : data.archives.hashtag,
            image : data.archives.imageUrl, 
        }
        
        const lengthData = generateValue.caption || generateValue.hashtag || generateValue.image
        
        const mappingArray = lengthData.map((data,index)=>{
            return { 
                image : !generateValue.image ? null : generateValue.image[index] , 
                caption :!generateValue.caption ? null : generateValue.caption[index].content ,
                hashtag : !generateValue.hashtag ? null : generateValue.hashtag[index].content,
                productName : productList[currentData.idProduct - 1]?.text,
                platform : currentData.platform,
                idContent: currentData.idContent,
            }
        }) 

        return mappingArray;
    }
    
    const refreshGenerateAI = async () => {
        try {
            const data = {
                idContent : generateListContent[0].idContent,
                nameProduct :true,
                image: true, 
                caption : true,
                hashtag: true,
            }
            const res = await refreshAI(data)
            if(res.status == 'OK'){
                const newGenerate =  mappingGenerateAIValue(res.data) 
                dispatch(updateGenerateAIList(newGenerate))
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server (500)')
        }
    }

    const fetchContentHistory = async () => {

        setContentAIHistoryLoading(true)
        
        const res = await getContentByHistory();
        if(res.status == 'OK'){
            if(res.data.length !== 0){
                setContentAIHistory(res.data)
                setContentAIHistoryLoading(false)
            }else{
                setContentAIHistoryLoading(true)
            }
        }else{
            toast.error('Content History Gagal Generate')
            setContentAIHistoryLoading(false)
        }
    }

    const fetchCurrentContentAI = async () => {

        setContentAILoading(true)
        if(contentAIHistory[0]?.idContent != null){
            const res = await getContentById(contentAIHistory[0].idContent);
    
            if(res.status == 'OK'){
                const contentAIConvert = await mappingGenerateCurrentAIValue(res.data);
                setOpenModalLoading(false)
                setContentAI(contentAIConvert)
            }else{
                toast.error('Content Gagal Generate')
            }
            setContentAILoading(false)
        }else{
            setContentAILoading(true)
        }
    }

    const handleDeleteContentHistory = async (contentId) => {
        try {
            const res = await deleteContent(contentId);
            if(res.status == 'OK'){
                toast.success('Content History Berhasil Dihapus',
                {
                    onClose: () => {
                        push('/dashboard/generate-ai');
                    }
                }
            )
            }else{
                toast.error('Content History Gagal Dihapus')
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server (500)')
        }
    }

    const paginationMax  = () => {
        setPrev(!prev)
        refreshGenerateAI()
        setContentAI(generateListContent)

    }
    const paginationMin  = () => {
        setPrev(!prev)
    }

    useEffect(()=>{
        getUserProduct() 
    },[])

    useEffect(()=>{
        fetchContentHistory(),
        fetchCurrentContentAI()
    },[
        productList,
    ])


    return (
        <AppLayout title='Generate AI'>
            <Box className={`grow  flex  ${ sm || lg || md  ? 'flex-col' : 'flex-row'  } h-[86%]`}>
                {/* 
                *
                *
                */}
                <Box className={`${ sm || lg || md ? 'w-[100%] px-[20px]' : xl ?  'w-[60%] pl-[20px]'  : 'w-[65%] pl-[20px]'  } py-[20px] h-[100%] `}>
                    <Box className='h-[100%] rounded-[20px] p-[20px]  flex flex-col gap-[15px] border-[1px] border-TEXT-4 hover:shadow-xl  '>
                        <Box className='flex items-center justify-between'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Hasil Penelusuran</p>
                            <AppCustomButton className='flex gap-[10px] items-center bg-CUSTOM-RED rounded-[10px] px-[15px] py-[5px] '
                                onClick={()=>{setOpenModalAI(!openModalAI)}}
                            >
                                <FontAwesomeIcon icon={faPlus} color={'white'} ></FontAwesomeIcon>
                                <p className="text-TEXT-5 font-bold text-[14px] ">Generate AI</p>
                            </AppCustomButton>
                        </Box>
                        <Box  className='h-[100%]  overflow-x-hidden overflow-y-scroll scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                            <Grid container direction={ sm || lg || md || xl ? 'column' : 'row' }  justifyContent="flex-start" alignItems="flex-start" spacing={2} className=" p-[8px] " >
                                {
                        
                                    contentAILoading ?

                                    <>
                                        <div className="w-[100%] h-[100px]">
                                            <Skeleton count={5} className="w-[100%]"/>
                                        </div>
                                    </> :

                                    contentAI.map((data,index) => {
                                        return ( 
                                            <Grid key = {index} item xs={ data.image == null  ? 4 : data.image != null && data.caption == null && data.hashtag == null ? 3 : 6}>
                                                    <AppContent
                                                        key={index}
                                                        image={data.image}
                                                        caption = {data.caption}
                                                        hashtag = {data.hashtag}
                                                        onClick={()=>{
                                                            setOpenModalDetail(!openModalDetail)
                                                            setContentDetail(data)
                                                        }}
                                                    />
                                            </Grid>
                                        )
                                    }) 

                                }
                            </Grid>
                        </Box>
                        <Box className = 'w-[100%] flex items-center justify-center'>
                            <AppCustomButton className='flex gap-[10px] items-center bg-white rounded-[20px] px-[15px] py-[5px] border-[1px] border-TEXT-4  '
                                    onClick={()=>{prev ?  paginationMax() : paginationMin()}}
                                >
                                    <p className="text-TEXT-1 font-bold text-[14px]">{prev ? 'Selanjutnya' : 'Sebelumnya'}</p>
                                    <FontAwesomeIcon icon={prev ? faChevronDown : faChevronUp} color={'black'} ></FontAwesomeIcon>
                            </AppCustomButton>
                        </Box>
                    </Box>

                </Box>
                {/* 
                *
                *
                */}
                <Box className={`${ sm || lg || md ? 'w-[100%]' : xl ? 'w-[40%]' : ' w-[35%]' } h-[100%] p-[20px]`}>
                    {/* filter bar  */}
                    <Box className= 'h-[100%] rounded-[20px] p-[20px] flex flex-col gap-[15px] border-[1px] border-TEXT-4  hover:shadow-xl '>
                        <Box className=' flex items-center justify-between w-[100%]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Riwayat Penelusuran</p>
                            <AppPopupFilter
                                isResponsive = { xl ? true : false  }
                                product = { productList}
                                listProductCheckbox={productCheckBoxFilter}
                                listPlatformCheckbox={platformCheckBoxFilter}
                                onCheckProduct = {(value)=>{ 
                                    setProductCheckboxFilter(value.product)
                                    dispatch(filterContentHistory({ product : value.product , platform : value.platform }))
                                }}
                                onCheckPlatform = {(value)=>{ 
                                    setPlatformCheckboxFilter(value.platform)
                                    dispatch(filterContentHistory({ product : value.product , platform : value.platform }))

                                }}
                            />
                        </Box>
                        <Box className='h-[100%] py-[10px]  pl-[4px] pr-[5px] flex flex-col gap-[15px] overflow-x-hidden scrollbar scrollbar-w-[4px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        {
                                contentAIHistoryLoading ? 

                                <>
                                    <div className="w-[100%] h-[100px]">
                                        <Skeleton count={5} className="w-[100%]"/>
                                    </div>
                                </> :

                                contentAIHistory.map((data,index) => {
                                    
                                    const contentTypes = [  
                                        data.archives.caption ? 'Caption' : null,  
                                        data.archives.hashtag ? 'Hashtag' : null,  
                                        data.archives.imageUrl ? 'Gambar' : null,  
                                    ]

                                    return(
                                        <AppContentFilter
                                            key={index}
                                            title = {data.contentTitle}
                                            subtitle = {data.productName}
                                            contentTypes = {contentTypes.join(',').split(/,,|, /)}
                                            platform = {data.platform}
                                            onClick= {()=>{
                                                const contentAIConvert = mappingGenerateCurrentAIValue(data);
                                                setContentAI(contentAIConvert)
                                                console.log(data)
                                            }}
                                            onDeleteButton={()=>{
                                                handleDeleteContentHistory(data.idContent)
                                            }}
                                        />
                                    )
                                })
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>    
             {/*  */}
            <AppModalGenerateAI open={openModalAI} onCloseButton={(value)=>{setOpenModalAI(value)}} 
                onClick = { ( value ) => {  
                    setContentAI(value) 
                }}
                onLoad = {
                    (load)=>{
                        setOpenModalLoading(load)
                        setOpenModalAI(false)
                    }
                }
            />
            <AppModalEditContent
                open={openModalEdit}
                onCloseButton = {(value)=> {
                    setOpenModalEdit(value)
                }}
            />
            <AppModalDetailContent
                open= {openModalDetail}
                image = {contentDetail ? contentDetail.image : ''}
                caption = {contentDetail ? contentDetail.caption : ''}
                hashtag = {contentDetail ? contentDetail.hashtag : ""}
                platform = {contentDetail ? contentDetail.platform : ""}
                productName = {contentDetail ? contentDetail.productName : ""}
                onClick = {()=> {}}
                onEditButton = {()=> {
                    setOpenModalDetail(false)
                    setOpenModalEdit(true)
                    dispatch(setGenerateAI(contentDetail)) 

                }}
                onCloseButton = {(value)=> {setOpenModalDetail(value)}}
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
            <ToastContainer/>
        </AppLayout>
    ) 
}

export default GenerateAIPage;