'use client'

import { useEffect, useState } from "react";
import AppLayout from "@/app/(pages)/(dashboard)/dashboard/component/appLayout";
import Box from '@mui/material/Box'
import AppButton from "@/app/components/appButton/appButton";
import AppDropDown from '@/app/components/appDropDown/appDropDown'
import AppCustomModal from "@/app/components/appModal/AppCustomModal";
import CustomSpacing from '@/app/components/appCustomSpacing/appCustomSpacing';
import AppGenderCheckbox from '@/app/(pages)/(input-product)/input-product/add-product/component/appGenderCheckbox';
import AppSchoolCheckbox from '@/app/(pages)/(input-product)/input-product/add-product/component/appSchoolCheckbox';
import AppJobCheckbox from '@/app/(pages)/(input-product)/input-product/add-product/component/appJobCheckbox';
import AppRangeSlider from '@/app/components/appRangeSlider/appRangeSlider'; 
import AppTableProduct from "@/app/components/appTable/appTableProduct";
import AppModalConnection from './component/appModalConnection'
import { listPlatform } from '@/app/utils/model';

import Grid from '@mui/material/Grid'

const createDataProduct = (accountName, productName, platform, time, date , status) => {
    return { accountName, productName, platform, time, date , status};
}

const exampleDataProduct = [
    createDataProduct( 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , '15 : 00' , '14 Januari 2024' , 'success'),
    createDataProduct( 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , '15 : 00' , '14 Januari 2024' , 'waiting'),
    createDataProduct( 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , '15 : 00' , '14 Januari 2024' , 'failed'),
]

const ProductDetailPage = () => {
    const isFacebook = true
    // state modal
    const [modalDeleteAccount , setModalDeleteAccount ] = useState(false)
    const [modalDeleteProduct , setModalDeleteProduct ] = useState(false)
    const [modalConnection , setModalConnection ] = useState(false)
    const [modalCheckConnection , setModalCheckConnection ] = useState(false)
    // state data  
    const [ platformStatusConnection, setPlatformStatusConnection ] = useState(false);
    const [ platformConnection, setPlatformConnection ] = useState('');
    const [ checkboxStatus, setCheckboxStatus ] = useState('');
    const [ ageRange , setAgeRange ] = useState([0,10]);
    const [ gender , setGender ] = useState([]);
    const [ school , setSchool ] = useState([]);
    const [ job , setJob ] = useState([]);


    return(
        <AppLayout title={`Profil > Daftar Produk > ${'name_product'}`}>
            <AppModalConnection
                open={modalConnection}
                onCloseButton={value => { setModalConnection(value) }}
                platform = {platformConnection == 'facebook' ? 'Facebook' : platformConnection == 'instagram' ? 'Instagram' : 'Twitter'}
                imagePlatform = {platformConnection == 'facebook' ? listPlatform.facebook : platformConnection == 'instagram' ? listPlatform.instagram : listPlatform.twitter}
                onClick={()=>{}}
            />
            {/*  */}
            <AppCustomModal
                open={modalCheckConnection}
                onClose={()=>{setModalCheckConnection(false)}}
                withClose={false}
                width={'w-[20vw]'}
                modalType='modal-common'
                title={platformConnection == 'facebook' ? 'Facebook' : platformConnection == 'instagram' ? 'Instagram' : 'Twitter'}
                onCloseButton={(value)=> setModalCheckConnection(value) }
                children={
                <>
                    <Box className='flex flex-col justify-start w-[100%] gap-[15px]'>
                        <Box className='flex items-center gap-[10px]'>
                            <img alt="icon-check" src={`/images/icon/${platformStatusConnection ? 'success': 'failed'}.svg`} className="w-[12px] h-[12px]"/>
                            <p className="text-TEXT-1 text-[14px] font-medium" >@baksoacimantap</p>
                        </Box>
                        <Box className='h-[1px] w-[100%] bg-TEXT-4'></Box>
                        <p className="text-TEXT-1 text-[14px] font-medium">Terakhir diperbarui: 17 Agustus 2023</p>
                    </Box>
                    <Box className=' flex flex-col gap-[10px] w-[100%]'>
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                            text={ platformConnection ? 'Hapus Akun' : 'Perbarui Konektivitas'} 
                            type = {'button'}
                            onClick={()=>{
                                if(platformConnection){
                                    setModalDeleteAccount(!modalDeleteAccount)
                                    setModalCheckConnection(false)
                                }
                            }}
                        />
                        {
                            !platformConnection ? 

                            <AppButton
                                className='w-[100%] py-[10px] bg-TEXT-4 shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Hapus Akun'} 
                                type = {'button'}
                                onClick={()=>{
                                    setModalDeleteAccount(!modalDeleteAccount)
                                    setModalCheckConnection(false)
                                }}
                            /> : null

                        }
                    </Box>
                </>
            }
            />
            {/*  */}
            <AppCustomModal
                open={modalDeleteAccount}
                withClose={true}
                width={'w-[30vw]'}
                modalType='modal-status'
                status={'info'}
                titleTop={true}
                alignment={'center text-center'}
                title={'Hapus Akun'}
                subtitle={'Menghapus akun akan menghilangkan seluruh data akun termasuk kalender dan analisis. Tetap hapus akun?'}
                onClose={()=>{}}
                onCloseButton={(value)=> setModalDeleteAccount(value) }
                children={
                    <Box className=' flex  gap-[10px] w-[100%]'>
                        <AppButton
                            className='w-[100%] py-[10px] bg-TEXT-4 shadow-xl text-white font-poppins rounded-[18px]'
                            text={'Keluar'} 
                            type = {'button'}
                            onClick={()=>{

                        }}/>
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                            text={ 'Hapus'} 
                            type = {'button'}
                            onClick={()=>{

                            }}
                        />
                    </Box>
                }
            />
            <AppCustomModal
                open={modalDeleteProduct}
                withClose={true}
                width={'w-[30vw]'}
                modalType='modal-status'
                status={'info'}
                titleTop={true}
                alignment={'center text-center'}
                title={'Hapus Produk'}
                subtitle={'Menghapus produk akan menghilangkan seluruh data produk termasuk kalender dan analisis. Tetap hapus produk?'}
                onClose={()=>{}}
                onCloseButton={(value)=> setModalDeleteProduct(value) }
                children={
                    <Box className=' flex  gap-[10px] w-[100%]'>
                        <AppButton
                            className='w-[100%] py-[10px] bg-TEXT-4 shadow-xl text-white font-poppins rounded-[18px]'
                            text={'Keluar'} 
                            type = {'button'}
                            onClick={()=>{

                        }}/>
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                            text={ 'Hapus'} 
                            type = {'button'}
                            onClick={()=>{

                            }}
                        />
                    </Box>
                }
            />
            {/*  */}
            <Box className='grow h-[86%] p-[20px] flex flex-col gap-[20px] overflow-y-scroll scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full '>
                <Box className='bg-NEUTRAL-100 flex justify-between gap-[10px] items-center p-[20px] rounded-[20px]'>
                    <Box className='flex flex-col'>
                        <p className="text-TEXT-1 text-[18px] font-bold">adasd</p>
                        <p className="text-TEXT-1 text-[12px]">Makanan dan Minuman</p>
                    </Box>
                    <Box className='flex gap-[15px]' >

                        <Box className='w-[40px] h-[40px] relative cursor-pointer' onClick={()=>{
                            setPlatformConnection('instagram')
                            setModalConnection(!modalConnection)
                    }}>
                            {
                                !isFacebook ?
                                <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={listPlatform.instagram}/>
                                :
                                <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={'/images/icon/add-circle.svg'}/>
                            }

                            <img className='w-full h-full rounded-[100%] relative object-cover' src={ !isFacebook ? 'https://statik.tempo.co/data/2022/06/25/id_1120454/1120454_720.jpg' :  listPlatform.instagram}/>
                        </Box>
                            <Box className='w-[40px] h-[40px] relative cursor-pointer' onClick={()=>{
                                setPlatformConnection('facebook')
                                setPlatformStatusConnection(true)
                                isFacebook ?
                                setModalCheckConnection(!modalCheckConnection) 
                                :
                                setModalConnection(!modalConnection)
                            }}>
                            {
                                isFacebook ?
                                <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={listPlatform.facebook}/>
                                :
                                <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={'/images/icon/add-circle.svg'}/>
                            }

                            <img className='w-full h-full rounded-[100%] relative object-cover' src={ isFacebook ? 'https://statik.tempo.co/data/2022/06/25/id_1120454/1120454_720.jpg' :  listPlatform.facebook}/>
                        </Box>
                        <Box className='w-[40px] h-[40px] relative cursor-pointer' onClick={()=>{
                            setPlatformConnection('twitter')
                            setModalConnection(!modalConnection)
                        }} >
                            {
                                !isFacebook ?
                                <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={listPlatform.twitter}/>
                                :
                                <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={'/images/icon/add-circle.svg'}/>
                            }

                            <img className='w-full h-full rounded-[100%] relative object-cover' src={ !isFacebook ? 'https://statik.tempo.co/data/2022/06/25/id_1120454/1120454_720.jpg' :  listPlatform.twitter}/>
                        </Box>
                    
                    
                    </Box>
                </Box>
                {/*  */}
                <Box className='bg-NEUTRAL-100 flex justify-between gap-[10px] items-center p-[20px] rounded-[20px]'>
                    <Box className= 'flex flex-col gap-[12px] w-[100%]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Target Pasar</p> 
                            <label className='text-black font-semibold'>Umur</label>
                            <AppRangeSlider
                                value = {ageRange}
                                onChange={(value)=>{
                                    setAgeRange(value)
                                }}
                            />
                            {/* checkbox */}
                            <Box className='w-full flex gap-[20px]'>
                                <Box className='w-[50%]'>
                                    <label className='text-black font-semibold'>Gender</label>
                                    <CustomSpacing height={10} />
                                    <AppGenderCheckbox 
                                        status = {checkboxStatus}
                                        listValue = {gender}
                                        direction= {'row'}
                                        sx={{justifyContent : 'space-between'}}
                                    />
                                </Box>
                                <Box className='w-[50%]'>
                                    <label className='text-black font-semibold'>Pendidikan Terakhir</label>
                                    <CustomSpacing height={10} />
                                    <AppSchoolCheckbox 
                                        status = {checkboxStatus}
                                        listValue = {school}
                                        directionChild={'row'}
                                        sx={{justifyContent : 'space-between' , width : '100%'}}
                                        sxChild={{justifyContent : 'space-between' , width : '40%'}}
                                    />
                                </Box>
                            </Box>
                            <Box>
                                    <label className='text-black font-semibold'>Ranah Pekerjaan</label>
                                    <CustomSpacing height={10} />
                                    <AppJobCheckbox
                                        status = {checkboxStatus}
                                        listValue = {job}
                                        sx={{justifyContent : 'space-between'}}
                                    />
                                </Box>
                        </Box>
                </Box>
                {/*  */}
                <p className="text-TEXT-1 font-bold text-[16px]">Target Pasar</p> 
                <Box className='bg-NEUTRAL-100 flex justify-between gap-[10px] items-center p-[20px] rounded-[20px]'>
                    <AppTableProduct
                        data={exampleDataProduct}
                    />
                </Box>
            </Box>
        </AppLayout>
    )

}

export default ProductDetailPage