'use client'

import AppButton from "@/app/components/appButton/appButton";
import AppLayout from "./component/appLayout";
import AppModalDetailContent from './component/modal/appModalDetailContent';
import AppModalEditContent from './component/modal/appModalEditContent';
import { useState } from "react";

const DashboardPage = () => {

    const [openModalDetail , setOpenModalDetail ] = useState(false)
    const [openModalEdit , setOpenModalEdit ] = useState(false)

    return (
        <AppLayout title='Dashboard'>
            <h1 className="text-black">
                ini adalah dashboard page
            </h1>
            <AppButton
            
                text={'test modal detail'}
                onClick = {()=>{
                    setOpenModalDetail(!openModalDetail)
                }}
            />
            <AppButton
            
                text={'test modal edit'}
                onClick = {()=>{
                    setOpenModalEdit(!openModalEdit)
                }}
            />


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
                onEditButton = {()=> {}}
                onCloseButton = {(value)=> {setOpenModalDetail(value)}}
            />

        </AppLayout>
    ) 
}

export default DashboardPage;