'use client'

import AppLayout from "../component/appLayout";
import AppCustomModal from "../../../../components/appModal/AppCustomModal";
import { useState , useEffect} from "react";
import AppButton from "@/app/components/appButton/appButton";
import Box from '@mui/material/Box'
import AppProfileButton from "../component/appProfileButton";
import AppExpansionList from "@/app/components/appExpansionList/appExpansionList";

const CalenderPage = () => {

    const [open , setOpen ] = useState(false)
    const [expanded , setExpanded ] = useState(false)


    return (
        <AppLayout title='Kalender'>
            <h1 className="text-black">
                ini adalah kalender page
            </h1>
            <button  onClick={()=>{setOpen(!open)}} className="text-TEXT-1 bg-red-400" >test</button>
        
            <AppExpansionList
                style = {'w-[14%] rounded-[20px] shadow-xl p-[10px]'}
                onClick={value => {
                    setExpanded(value)
                }}
                componentHandle = {
                    <div>
                        <AppProfileButton
                            isItemDropDown ={true}
                            dropDownIcon={true}
                            dropDownType={!expanded}
                            image = {'https://www.wowkeren.com/display/images/photo/2024/04/03/00506918.webp'}
                            name = {'Kazuha'}
                            countProduct = {`${3} Produk`}
                        />
                    </div>
                }
                componentItemStyle={'bg-white'}
                componentItemList = {
                    <div className="flex flex-col gap-[6px]">
                        <AppProfileButton
                            isItemDropDown ={true}
                            dropDownIcon={true}
                            dropDownType={true}
                            image = {'https://awsimages.detik.net.id/community/media/visual/2022/04/07/kim-chae-won_43.png?w=600&q=90'}
                            name = {'Chaewon'}
                            countProduct = {`${2} Produk`}
                        /> 
                        <AppProfileButton
                            isItemDropDown ={true}
                            dropDownIcon={false}
                            image = {'https://awsimages.detik.net.id/community/media/visual/2022/04/07/kim-chae-won_43.png?w=600&q=90'}
                            name = {'Chaewon'}
                            countProduct = {`${2} Produk`}
                        /> 
                        <AppButton
                            className='w-[100%] text-[12px] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[30px]'
                            text='Buat Akun'
                        />
                    </div>
                } 
            />

            <AppCustomModal
                open={open}
                withClose = {true}
                modalType = {'modal-status'}
                status = 'success'
                alignment={'center'}
                titleColor = {'text-STATE-GREEN-BASE'}
                title = {'Ini Adalah title'}
                subtitle = {'Anda dapat tahu tentang subtitle'}
                onCloseButton= {(value)=>{
                    setOpen(value)
                }}
            >
                <div className="w-[30vw]">
                    <AppButton
                        text='Unggah Sekarang'
                    />
                </div>
            </AppCustomModal>
        </AppLayout>
    ) 
}



export default CalenderPage;