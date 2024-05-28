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
import { listPlatform } from '@/app/utils/model';
import AppAnimationButton from "@/app/components/appAnimation/appAnimationButton";
import AppModalAddProduct from "./component/appModalAddProduct"
import { useRouter } from "next/navigation";

const exampleProduct = [
    {productName : 'Bakso kuat'},
    {productName : 'Bakso mantap'},
    {productName : 'Bakso enjoy'},
]

const createDataProduct = (accountName, productName, platform, time, date , status) => {
    return { accountName, productName, platform, time, date , status};
}

const exampleDataProduct = [
    createDataProduct( 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , '15 : 00' , '14 Januari 2024' , 'success'),
    createDataProduct( 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , '15 : 00' , '14 Januari 2024' , 'waiting'),
    createDataProduct( 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , '15 : 00' , '14 Januari 2024' , 'failed'),
]

const ProductListPage = () => {

    const { push } = useRouter()
    // state responsive
    const xl = useMediaQuery({ maxWidth: 1280 });
    // state modal
    const [modalAddProduct , setModalAddProduct ] = useState(false)
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
            <AppModalAddProduct
                open={modalAddProduct}
                onCloseButton={(value)=> setModalAddProduct(value) }
            />
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
                                onClick={()=>{setModalAddProduct(true)}}
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
                                            <AppAnimationButton className='w-auto'>
                                                <Box onClick={()=>{
                                                    push('/dashboard/profile/product-list/product')
                                                    }} className='p-[20px] bg-NEUTRAL-100 rounded-[20px] flex flex-col gap-[8px] hover:shadow-xl'>
                                                    <Box className='flex flex-col gap-[10px] items-start'>
                                                        <Box className='flex flex-col'>
                                                            <p className="text-TEXT-1 text-[18px] font-bold">{data.productName}</p>
                                                            <p className="text-TEXT-1 text-[12px]">Makanan dan Minuman</p>
                                                        </Box>
                                                        <Box className='flex gap-[10px]'>

                                                            <img className='w-[25px] h-[25px] rounded-[100%]' src={listPlatform.instagram}/>
                                                            <img className='w-[25px] h-[25px] rounded-[100%]' src={listPlatform.facebook}/>
                                                            <img className='w-[25px] h-[25px] rounded-[100%]' src={listPlatform.twitter}/>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </AppAnimationButton>
                                        </Grid>
                                )
                            })
                        }
                </Grid>
                {/*  */}
                <Box className='flex items-center justify-between'>
                    <p className="text-TEXT-1 font-bold text-[16px]">Daftar Riwayat</p> 
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
                <Box className='p-[20px] bg-NEUTRAL-100 rounded-[20px] flex flex-col gap-[8px] hover:shadow-xl'>
                    <AppTableProduct
                        data={exampleDataProduct}
                    />
                </Box>
            </Box>
        </AppLayout>
    )
}

export default ProductListPage;