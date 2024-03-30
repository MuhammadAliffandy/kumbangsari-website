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
import { generateAI, refreshAI } from '../../../../api/repository/contentRepository';
import { getProductByUser } from '../../../../api/repository/productRepository';
import { deleteContentHistory, filterContentHistory } from '@/app/redux/slices/generateAIContentHistorySlice';
import { useDispatch } from "react-redux";
import { setGenerateAI } from "@/app/redux/slices/generateAIByOneSlice";
import { useMediaQuery } from "react-responsive";

const GenerateAIPage = () => {

    const sm = useMediaQuery({ maxWidth: 640 });
    const md = useMediaQuery({ maxWidth: 768 });
    const lg = useMediaQuery({ maxWidth: 1024 });
    const xl = useMediaQuery({ maxWidth: 1280 });
    const dispatch = useDispatch()
    const generateAIContentHistory = useSelector( state => state.generateAIContentHistory.value )
    const generateListContent = useSelector(state => state.generateAI.value)

    const [openModalAI , setOpenModalAI ] = useState(false)
    const [openModalLoading , setOpenModalLoading ] = useState(false)
    const [openModalDetail , setOpenModalDetail ] = useState(false)
    const [openModalEdit , setOpenModalEdit ] = useState(false)
    const [prev , setPrev ] = useState(true)
    const [contentAI , setContentAI ] = useState([])
    const [contentDetail , setContentDetail ] = useState()
    const [productList , setProductList] = useState([])


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

        const mappingArray = generateValue.caption.map((data,index)=>{

            return { 
                image : generateValue.image[index], 
                caption : generateValue.caption[index].content ,
                hashtag : generateValue.hashtag[index].content,
                productName : productList[currentData.idProduct - 1].text,
                platform : currentData.platform
            }
        }) 
        return mappingArray;
    }

    
    const refreshGenerateAI = async () => {
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
    }


    const onGenerateByHistory = async (data) => {
        
        setOpenModalLoading(true)
        const content = {
            contentTitle : data.contentTitle,
            idProduct : data.idProduct,
            nameProduct: data.nameProduct,
            platform: data.platform,
            style: data.style,
            image: data.image,
            caption : data.caption ,
            hashtag: data.hashtag,
        }

        const res = await generateAI(content);
        
        if(res.status = 'OK'){
            const contentAIByHistory = await mappingGenerateAIValue(res.data);
            setOpenModalLoading(false)
            setContentAI(contentAIByHistory)
            console.log('GENERATE BY HISTORY OK')

        }
    }

    const paginationMax  = () => {
        setPrev(!prev)
        refreshGenerateAI()
        setContentAI(generateListContent)

    }
    const paginationMin  = () => {
        setPrev(!prev)
        pagination()
    }


    useEffect(()=>{
        getUserProduct() 
        pagination()
    },[])


    return (
        <AppLayout title='Generate AI'>
            <Box className={`flex flex-grow ${ sm || lg || md  ? 'flex-col' : 'flex-row'  }`}>
                {/* 
                *
                *
                */}
                <Box className={`${ sm || lg || md ? 'w-[100%] px-[20px]' : xl ?  'w-[60%] pl-[20px]'  : 'w-[71%] pl-[20px]'  } pt-[20px] h-[100%]`}>
                    <Box className='rounded-[20px] p-[20px]  flex flex-col gap-[15px] border-[1px] border-TEXT-4 '>
                        <Box className='flex items-center justify-between'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Hasil Penelusuran</p>
                            <AppCustomButton className='flex gap-[10px] items-center bg-white rounded-[10px] px-[15px] py-[5px] border-[1px] border-TEXT-4 '
                                onClick={()=>{setOpenModalAI(!openModalAI)}}
                            >
                                <FontAwesomeIcon icon={faPlus} color={'black'} ></FontAwesomeIcon>
                                <p className="text-TEXT-1 font-bold text-[14px]">Generate AI</p>
                            </AppCustomButton>
                        </Box>
                        <Box  className='h-[64.5vh] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                            <Grid container direction={ sm || lg || md || xl ? 'column' : 'row' }  justifyContent="flex-start" alignItems="flex-start" spacing={2} className=" pr-[10px] " >
                                {
                        
                                    contentAI != [] ?

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
                                    }) : null
                                }
                            </Grid>
                        </Box>
                        <Box className = 'w-[100%] flex items-center justify-center'>
                            <AppCustomButton className='flex gap-[10px] items-center bg-white rounded-[20px] px-[15px] py-[5px] border-[1px] border-TEXT-4 '
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
                <Box className={`${ sm || lg || md ? 'w-[100%]' : xl ? 'w-[40%]' : ' w-[29%]' } h-[100%] p-[20px]`}>
                    {/* filter bar  */}
                    <Box className= 'h-[100%] rounded-[20px] p-[20px] flex flex-col gap-[15px] border-[1px] border-TEXT-4 '>
                        <Box className='flex items-center justify-between w-[100%]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Riwayat Penelusuran</p>
                            <AppPopupFilter
                                product = { productList}
                                onCheckProduct = {(value)=>{ 
                                    dispatch(filterContentHistory({ product : value.product , platform : value.platform }))
                                    console.log(value)
                                }}
                                onCheckPlatform = {(value)=>{ 
                                    dispatch(filterContentHistory({ product : value.product , platform : value.platform }))
                                    console.log(value)
                                    
                                }}
                            />
                        </Box>
                        <Box className='h-[70vh] py-[10px]  pl-[4px] pr-[5px] flex flex-col gap-[15px] overflow-x-hidden scrollbar scrollbar-w-[4px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        {
                                generateAIContentHistory != [] ? 

                                generateAIContentHistory.map((data,index) => {
                                    
                                    return(
                                        <AppContentFilter
                                            key={index}
                                            title = {data.contentTitle}
                                            subtitle = {data.productName}
                                            contentTypes = {'Gambar, caption, hasgtag'}
                                            platform = {data.platform}
                                            onClick= {()=>{
                                                onGenerateByHistory(data)
                                                
                                            }}
                                            onDeleteButton={()=>{
                                                dispatch(deleteContentHistory(data))
                                            }}
                                        />
                                    )
                                })
                        
                                : <p>Anda belum Melakukan Generate</p>
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

        </AppLayout>
    ) 
}

export default GenerateAIPage;