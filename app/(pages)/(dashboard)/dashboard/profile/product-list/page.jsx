'use client'

import { useEffect, useState } from "react";
import AppLayout from "../../component/appLayout";
import Box from '@mui/material/Box'
import AppButton from "@/app/components/appButton/appButton";
import AppDropDown from '@/app/components/appDropDown/appDropDown'
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import AppTableProduct from "@/app/components/appTable/appTableProduct";
import AppPopupFilter from '@/app/(pages)/(dashboard)/dashboard/component/popup/appPopupFilter'
import Grid from '@mui/material/Grid'
import AppCustomModal from "../../../../../components/appModal/AppCustomModal";
import { getProductByUser } from '@/app/api/repository/productRepository';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from "react-responsive";
import { listDropPlatform } from '@/app/utils/model';

const exampleProduct = [
    {productName : 'Bakso kuat'},
    {productName : 'Bakso mantap'},
    {productName : 'Bakso enjoy'},
]

const createDataProduct = (accountName, productName, platform, createdAt, updatedAt , status) => {
    return { accountName, productName, platform, createdAt, updatedAt , status};
}

const exampleDataProduct = [
    createDataProduct( 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , '14 Januari 2024' , '14 Januari 2024' , 'success'),
    createDataProduct( 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , '14 Januari 2024' , '14 Januari 2024' , 'success'),
    createDataProduct( 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , '14 Januari 2024' , '14 Januari 2024' , 'success'),
]

const ProductListPage = () => {

    // state responsive
    const xl = useMediaQuery({ maxWidth: 1280 });
    // state modal
    const [modalAddPlatform , setModalAddPlatform] = useState(false)
    const [modalDeleted , setModalDeleted] = useState(false)
    const [modalEdited , setModalEdited] = useState(false)
    // state data
    const [product , setProduct] = useState('')
    const [platform , setPlatform] = useState('')
    const [productList , setProductList] = useState([])
    const [productCheckBoxFilter , setProductCheckboxFilter] = useState('')
    const [platformCheckBoxFilter , setPlatformCheckboxFilter] = useState('')

    const handleChangeProduct = (event) => {
        setProduct(event.target.value)
    }

    const handleChangePlatform = (event) => {
        setPlatform(event.target.value)
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

    useEffect(()=>{
        getUserProduct() 
    },[])

    return(
        <AppLayout title={'Profil > Daftar Produk'} >
            <AppCustomModal
                open={modalDeleted}
                withClose={true}
                width={'w-[30vw]'}
                modalType='modal-common'
                title={'Hapus Akun'}
                onCloseButton={(value)=> setModalDeleted(value) }
                children={
                    <>
                        <Box className='flex flex-col justify-start w-[100%]'>
                            <p className="text-TEXT-1 text-[14px] font-medium">Apakah Anda yakin ingin menghapus akun?</p>
                        </Box>
                        <Box className=' flex gap-[10px] w-[100%]'>
                            <AppButton
                                className='w-[100%] py-[10px] bg-NEUTRAL-500 shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Keluar'} 
                                type = {'button'}
                                onClick={()=>{
                                }}
                            />
                            <AppButton
                                className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Simpan'} 
                                type = {'button'}
                                onClick={()=>{
                                }}
                            />
                        </Box>
                    </>
                }
            />
            <AppCustomModal
                open={modalEdited}
                withClose={true}
                width={'w-[30vw]'}
                modalType='modal-common'
                title={'Edit Akun'}
                onCloseButton={(value)=> setModalEdited(value) }
                children={
                    <>
                        <Box className='flex flex-col justify-start w-[100%]'>
                            <p className="text-TEXT-1 text-[14px] font-medium">Apakah Anda yakin ingin mengubah akun?</p>
                        </Box>
                        <Box className=' flex gap-[10px] w-[100%]'>
                            <AppButton
                                className='w-[100%] py-[10px] bg-NEUTRAL-500 shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Keluar'} 
                                type = {'button'}
                                onClick={()=>{
                                }}
                            />
                            <AppButton
                                className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Simpan'} 
                                type = {'button'}
                                onClick={()=>{
                                }}
                            />
                        </Box>
                    </>
                }
            />
            <AppCustomModal
                open={modalAddPlatform}
                withClose={true}
                width={'w-[60vw]'}
                modalType='modal-common'
                title={'Tambah Platform'}
                onCloseButton={(value)=> setModalAddPlatform(value) }
                children={
                    <>
                        <Box className='flex gap-[10px] justify-between w-[100%]'>
                            <Box className='w-[100%] flex flex-col gap-[10px]'>
                                <label className='text-black font-semibold'>Produk</label>
                                <AppDropDown
                                        value={product}
                                        placeholder={'Pilih Nama Produk'}
                                        listItem = {productList}
                                        onChange={handleChangeProduct}
                                    />
                            </Box>
                            <Box className='w-[100%] flex flex-col gap-[10px]'>
                                <label className='text-black font-semibold'>Platform</label>
                                <AppDropDown
                                        value={platform}
                                        placeholder={'Pilih Nama Platform'}
                                        listItem = {listDropPlatform}
                                        onChange={handleChangePlatform}
                                />
                            </Box>
                        </Box>
                        <Box className=' flex gap-[10px] w-[100%] justify-end'>
                            <AppButton
                                className='w-[20%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Simpan'} 
                                type = {'button'}
                                onClick={()=>{
                                }}
                            />
                        </Box>
                    </>
                }
            />
            <Box className='grow h-[86%] p-[20px] flex flex-col gap-[20px]'>
                {/*  */}
                <Box className='flex items-center justify-between'>
                    <p className="text-TEXT-1 font-bold text-[16px]">Daftar Produk</p> 
                    <AppCustomButton className='flex gap-[10px] items-center bg-CUSTOM-RED rounded-[10px] px-[15px] py-[5px] '
                                onClick={()=>{}}
                    >
                        <FontAwesomeIcon icon={faPlus} color={'white'} ></FontAwesomeIcon>
                        <p className="text-TEXT-5 font-bold text-[14px] ">Tambah Produk</p>
                    </AppCustomButton>
                </Box>

                {/*  */}
                <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="w-[100%]" >
                        {
                            exampleProduct.map(data => {
                                return (
                                    <Grid xs={12} xl={4} lg={4} md={12} sm={12} item>
                                        <Box className='p-[20px] bg-NEUTRAL-100 rounded-[20px] flex flex-col gap-[8px] hover:shadow-xl'>
                                            <Box className='flex justify-between items-start'>
                                                <Box className='flex flex-col'>
                                                    <p className="text-TEXT-1 text-[18px] font-bold">{data.productName}</p>
                                                    <p className="text-TEXT-1 text-[12px]">Makanan dan Minuman</p>
                                                </Box>
                                                <Box className='flex items-center gap-[10px]'>
                                                    <AppCustomButton className=' bg-white ' onClick={()=>{}}>
                                                        <img className='w-[18px] h-[18px] ' src={'/images/icon/edit.png'}/>
                                                    </AppCustomButton>
                                                    <AppCustomButton className=' bg-white ' onClick={()=>{}}>
                                                        <img className='w-[18px] h-[18px] ' src={'/images/icon/trash.png'}/>
                                                    </AppCustomButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                </Grid>
                {/*  */}
                <Box className='flex items-center justify-between'>
                    <p className="text-TEXT-1 font-bold text-[16px]">Daftar Platform</p> 
                    <AppCustomButton className='flex gap-[10px] items-center bg-CUSTOM-RED rounded-[10px] px-[15px] py-[5px] '
                                onClick={()=>{
                                    setModalAddPlatform(true)
                                }}
                    >
                        <FontAwesomeIcon icon={faPlus} color={'white'} ></FontAwesomeIcon>
                        <p className="text-TEXT-5 font-bold text-[14px] ">Tambah Platform</p>
                    </AppCustomButton>
                </Box>
                {/*  */}
                <Box className='p-[20px] bg-NEUTRAL-100 rounded-[20px] flex flex-col gap-[8px] hover:shadow-xl'>
                    <Box className='flex items-center justify-between'>
                        <p className="text-TEXT-1 font-bold text-[12px]">Semua Akun</p> 
                        <AppPopupFilter
                                isResponsive = { xl ? true : false  }
                                product = { productList}
                                listProductCheckbox={productCheckBoxFilter}
                                listPlatformCheckbox={platformCheckBoxFilter}
                                onCheckProduct = {(value)=>{ 
                                    setProductCheckboxFilter(value.product)
                                }}
                                onCheckPlatform = {(value)=>{ 
                                    setPlatformCheckboxFilter(value.platform)

                                }}
                            />
                    </Box>
                    {/*  */}
                    <AppTableProduct
                        data={exampleDataProduct}
                        onEdited={(value)=>{
                            setModalEdited(!modalEdited)
                        }}
                        onDeleted={(value)=>{
                            setModalDeleted(!modalDeleted)
                        }}
                    />
                </Box>
            </Box>
        </AppLayout>
    )
}

export default ProductListPage;