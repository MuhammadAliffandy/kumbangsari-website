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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'



const GenerateAIPage = () => {

    const [openModalAI , setOpenModalAI ] = useState(false)
    const [openModalDetail , setOpenModalDetail ] = useState(false)
    const [openModalEdit , setOpenModalEdit ] = useState(false)
    const [prev , setPrev ] = useState(true)
    const [contentAI , setContentAI ] = useState([])


    const listContent = [
        {
            image : 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg',
            caption : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            hashtag : '#ansd #sdjadl #djaskdk'
        },
        {
            image : 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg',
            caption : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            hashtag : '#ansd #sdjadl #djaskdk'
        },
        {
            image : 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg',
            caption : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            hashtag : '#ansd #sdjadl #djaskdk'
        },
        {
            image : 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg',
            caption : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            hashtag : '#ansd #sdjadl #djaskdk'
        },
        {
            image : 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg',
            caption : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            hashtag : '#ansd #sdjadl #djaskdk'
        },
        {
            image : 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg',
            caption : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            hashtag : '#ansd #sdjadl #djaskdk'
        },
    ]


    const pagination = () => {
        
        const filterData = listContent.filter((data, index) => index + 1 < 5);
        setContentAI(filterData);
    
    }

    const paginationMax  = () => {
        setPrev(!prev)
        setContentAI(listContent)
    }
    const paginationMin  = () => {
        setPrev(!prev)
        pagination()
    }

    useEffect(()=>{
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
                                contentAI.map((data,index) => {
                                    return ( 
                                        <Grid key = {index} item xs={ data.image == null  ? 4 : data.image != null && data.caption == null && data.hashtag == null ? 3 : 6}>
                                                <AppContent
                                                    image={data.image}
                                                    caption = {data.caption}
                                                    hashtag = {data.hashtag}
                                                    onClick={()=>{
                                                        setOpenModalDetail(!openModalDetail)
                                                    }}
                                                />
                                        </Grid>
                                    )
                                })
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
        
                    <AppModalGenerateAI open={openModalAI} onCloseButton={(value)=>{setOpenModalAI(value)}} />
                </Box>
                {/* ================== */}
                <Box className='w-[30%] p-[20px]'>
                    {/* filter bar  */}
                    <Box className= ' rounded-[20px] p-[20px] flex flex-col gap-[15px] border-[1px] border-TEXT-4'>
                        <Box className='flex items-center justify-between w-[100%]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Riwayat Penelusuran</p>
                            <AppCustomButton className='flex gap-[10px] items-center bg-white rounded-[20px] px-[15px] py-[5px] border-[1px] border-TEXT-4' onClick={()=>{}}>
                                <img className='w-[18px] h-[18px] ' src={'/images/icon/filter.png'}/>
                                <p className="text-TEXT-1 font-bold text-[14px]">Filter</p>
                            </AppCustomButton>
                        </Box>
                        <AppContentFilter
                            title = {'Khasiat Bakso Aci'}
                            subtitle = {'Bakso Aci Mantap'}
                            contentTypes = {'Gambar, caption, hasgtag'}
                            iconImage = {'https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9'}
                            onClick= {()=>{}}
                        />
                        <AppContentFilter
                            title = {'Khasiat Bakso Aci'}
                            subtitle = {'Bakso Aci Mantap'}
                            contentTypes = {'Gambar, caption, hasgtag'}
                            iconImage = {'https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM'}
                            onClick= {()=>{}}
                        />
                        <AppContentFilter
                            title = {'Khasiat Bakso Aci'}
                            subtitle = {'Bakso Aci Mantap'}
                            contentTypes = {'Gambar, caption, hasgtag'}
                            iconImage = {'https://store-images.s-microsoft.com/image/apps.60673.9007199266244427.4d45042b-d7a5-4a83-be66-97779553b24d.5d82b7eb-9734-4b51-b65d-a0383348ab1b?h=464'}
                            onClick= {()=>{}}
                        />
                        <AppContentFilter
                            title = {'Khasiat Bakso Aci'}
                            subtitle = {'Bakso Aci Mantap'}
                            contentTypes = {'Gambar, caption, hasgtag'}
                            iconImage = {'https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9'}
                            onClick= {()=>{}}
                        />
                        <AppContentFilter
                            title = {'Khasiat Bakso Aci'}
                            subtitle = {'Bakso Aci Mantap'}
                            contentTypes = {'Gambar, caption, hasgtag'}
                            iconImage = {'https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM'}
                            onClick= {()=>{}}
                        />
                    </Box>
                </Box>
            </Box>
            <AppModalEditContent
                open={openModalEdit}
                onCloseButton = {(value)=> {setOpenModalEdit(value)}}
            />
            <AppModalDetailContent
                open= {openModalDetail}
                image = {'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg'}
                caption = {'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'}
                hashtag = {'#bakso #wedhus #gatau'}
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