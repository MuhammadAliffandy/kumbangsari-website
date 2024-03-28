'use client'

import { useEffect, useState } from "react";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AppLayout from "../component/appLayout";
import AppContent from '@/app/components/appContent/appContent'
import AppContentFilter from "../component/appContentFilter"
import AppModalGenerateAI from "./component/appModalGenerateAI";
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import AppModalDetailContent from '../component/modal/appModalDetailContent';
import AppModalEditContent from '../component/modal/appModalEditContent';
import AppPopupFilter from '../component/popup/appPopupFilter'
import { setGenerateAIList} from '@/app/redux/slices/generateAISlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import { generateAI } from '../../../../api/repository/contentRepository';
import { getProductByUser } from '../../../../api/repository/productRepository';
import { deleteContentHistory, filterContentHistory } from '@/app/redux/slices/generateAIContentHistorySlice';
import { useDispatch } from "react-redux";

const GenerateAIPage = () => {

    const dispatch = useDispatch()
    const generateAIContentHistory = useSelector( state => state.generateAIContentHistory.value )
    const generateListContent = useSelector(state => state.generateAI.value)
    const [openModalAI , setOpenModalAI ] = useState(false)
    const [openModalDetail , setOpenModalDetail ] = useState(false)
    const [openModalEdit , setOpenModalEdit ] = useState(false)
    const [prev , setPrev ] = useState(true)
    const [contentAI , setContentAI ] = useState([])
    const [contentDetail , setContentDetail ] = useState()
    const [productList , setProductList] = useState([])




    const pagination = () => {
        
        // console.log(listContent)
        // console.log(generateListContent)

        // if(generateListContent){
        //     const filterData = generateListContent.filter((data, index) => index + 1 < 5);
        //     setContentAI(filterData);
        // }else{
        //     setContentAI(listContent);
            
        // }
        setContentAI(generateListContent);
    }

    
    const paginationMax  = () => {
        setPrev(!prev)
        setContentAI(generateListContent)
    }
    const paginationMin  = () => {
        setPrev(!prev)
        pagination()
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

    const onGenerateByHistory = async (data) => {
    
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
            setContentAI(contentAIByHistory)
            console.log('GENERATE BY HISTORY OK')
        }
    }

    useEffect(()=>{
        getUserProduct() 
        pagination()
    },[])


    return (
        <AppLayout title='Generate AI'>

            <Box className='flex'>
                {/* ================== */}
                <Box className='w-[70%] py-[20px] pl-[20px] '>
                    <Box className='rounded-[20px] p-[20px] flex flex-col gap-[15px] border-[1px] border-TEXT-4'>
                        <Box className='flex items-center justify-between'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Hasil Penelusuran</p>
                            <AppCustomButton className='flex gap-[10px] items-center bg-white rounded-[10px] px-[15px] py-[5px] border-[1px] border-TEXT-4 '
                                onClick={()=>{setOpenModalAI(!openModalAI)}}
                            >
                                <FontAwesomeIcon icon={faPlus} color={'black'} ></FontAwesomeIcon>
                                <p className="text-TEXT-1 font-bold text-[14px]">Generate AI</p>
                            </AppCustomButton>
                        </Box>
                        <Grid container spacing={2}>
                            {
                                contentAI != []?

                                contentAI.map((data,index) => {
                                    return ( 
                                        <Grid key = {index} item xs={ data.image == null  ? 4 : data.image != null && data.caption == null && data.hashtag == null ? 3 : 6}>
                                                <AppContent
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
                                }) : <p>data belum ada</p>
                            }
                        </Grid>
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
                {/* ================== */}
                <Box className='w-[30%] p-[20px]'>
                    {/* filter bar  */}
                    <Box className= ' rounded-[20px] p-[20px] flex flex-col gap-[15px] border-[1px] border-TEXT-4'>
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
                            {
                                generateAIContentHistory != [] ? 

                                generateAIContentHistory.map(data => {
                                    
                                    return(
                                        <AppContentFilter
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
                        
                                : null
                            }
                    </Box>
                </Box>
            </Box>     
            <AppModalGenerateAI open={openModalAI} onCloseButton={(value)=>{setOpenModalAI(value)}} 
                onClick = { value => {  setContentAI(value)} }
            />
            <AppModalEditContent
                open={openModalEdit}
                onCloseButton = {(value)=> {
                    setOpenModalEdit(value)
                }}
            />
            <AppModalDetailContent
                open= {openModalDetail}
                image = {  contentDetail ? contentDetail.image : ''}
                caption = {  contentDetail ? contentDetail.caption : ''}
                hashtag = {  contentDetail ? contentDetail.hashtag : ""}
                platform =  {  contentDetail ? contentDetail.platform : ""}
                productName =  {  contentDetail ? contentDetail.productName : ""}
                onClick = {()=> {}}
                onEditButton = {()=> {
                    setOpenModalDetail(false)
                    setOpenModalEdit(true)
                }}
                onCloseButton = {(value)=> {setOpenModalDetail(value)}}
            />
    
        </AppLayout>
    ) 
}

export default GenerateAIPage;