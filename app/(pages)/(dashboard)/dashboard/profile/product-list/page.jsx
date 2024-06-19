'use client'

import { useEffect, useState } from "react";
import AppLayout from "../../component/AppLayout";
import Box from '@mui/material/Box'
import AppButton from "@/app/components/appButton/appButton";
import AppDropDown from '@/app/components/appDropDown/appDropDown'
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import AppTableProduct from "@/app/components/appTable/appTableProduct";
import AppPopupFilter from '@/app/(pages)/(dashboard)/dashboard/component/popup/appPopupFilter'
import Skeleton from "react-loading-skeleton";

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
import { useDispatch ,useSelector } from "react-redux";
import { setNameProduct } from "@/app/redux/slices/nameProductSlice";
import { getUserConnectHistory } from "@/app/api/repository/userRepository";
import { convertToIndonesianDate , convertToTimeWIB } from "@/app/utils/helper";
import { listDropCategory } from "@/app/utils/model";
import { toast } from "react-toastify";

const userDataHistory = ( productName, platform, time, date , status) => {
    return {  productName, platform, time, date , status};
}
const ProductListPage = () => {

    const arr = [1,2,3]
    const { push } = useRouter()
    const dispatch = useDispatch() 
    const userSubscription = useSelector(state => state.userSubscription.value)
    const idSelection = userSubscription <= 2 ? 1 : 3
    // state responsive
    const xl = useMediaQuery({ maxWidth: 1280 });
    // state modal
    const [modalAddProduct , setModalAddProduct ] = useState(false)
    const [modalAddPlatform , setModalAddPlatform] = useState(false)
    const [modalDeleted , setModalDeleted] = useState(false)
    const [modalEdited , setModalEdited] = useState(false)
    // state data
    const [currentUserTableHistory , setCurrentUserTableHistory] = useState([])
    const [userTableHistory , setUserTableHistory] = useState([])
    const [product , setProduct] = useState('')
    const [platform , setPlatform] = useState('')
    const [productList , setProductList] = useState([])
    const [productData , setProductData] = useState([])
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
            setProductData(res.data)
        }
    }

    const fetchUserConnectHistory = async () => {
        try {
            const res = await getUserConnectHistory()
            if(res.status == 'OK'){
                const dataHistory = res.data.map(data => {
                    return userDataHistory(
                        data.product,
                        data.platform,
                        convertToTimeWIB(data.createdAt),
                        convertToIndonesianDate(data.createdAt),
                        data.status,
                    )
                })
                setCurrentUserTableHistory(dataHistory)
                setUserTableHistory(dataHistory)
            }
        } catch (error) {
            if(error.status == 404){
            
            }else{
                toast.error(error.data.message)
            }
            
        }
    }

    const handleFilterConnectHistory = (target) => {

        if(currentUserTableHistory.length > 0 ){
            const filteredData = currentUserTableHistory.filter(data => {
                if(target.product.indexOf(data.productName) > -1 || target.platform.indexOf(data.platform) > -1 ){
                    return data
                }
            })
            setUserTableHistory(filteredData)
        }

        if(target.product.length == 0 && target.platform.length == 0 ){
            setUserTableHistory(currentUserTableHistory)
        }
    }

    useEffect(()=>{
        getUserProduct() 
        fetchUserConnectHistory()
    },[])

    return(
        <AppLayout title={'Profil > Daftar Produk'} >
            <AppModalAddProduct
                open={modalAddProduct}
                onCloseButton={(value)=> setModalAddProduct(value) }
                onDone={()=>{
                    getUserProduct()
                }}
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
                                className='w-[100%] py-[10px] bg-NEUTRAL-500 hover:bg-NEUTRAL-600 shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Keluar'} 
                                type = {'button'}
                                onClick={()=>{
                                }}
                            />
                            <AppButton
                                className='w-[100%] py-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
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
                                className='w-[100%] py-[10px] bg-NEUTRAL-500 hover:bg-NEUTRAL-600 shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Keluar'} 
                                type = {'button'}
                                onClick={()=>{
                                }}
                            />
                            <AppButton
                                className='w-[100%] py-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
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
                                className='w-[20%] py-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
                                text={'Simpan'} 
                                type = {'button'}
                                onClick={()=>{
                                }}
                            />
                        </Box>
                    </>
                }
            />
            <Box className='grow h-[86%] p-[20px] flex flex-col gap-[20px] overflow-y-scroll scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                {/*  */}
                <Box className='flex items-center justify-between'>
                    <p className="text-TEXT-1 font-bold text-[16px]">Daftar Produk</p> 
                    <AppAnimationButton className='w-auto'>
                        <AppCustomButton className='flex gap-[10px] items-center bg-CUSTOM-RED hover:bg-SECONDARY-600 rounded-[10px] px-[15px] py-[5px] '
                                    onClick={()=>{setModalAddProduct(true)}}
                        >
                            <FontAwesomeIcon icon={faPlus} color={'white'} ></FontAwesomeIcon>
                            <p className="text-TEXT-5 font-bold text-[14px] ">Tambah Produk</p>
                        </AppCustomButton>
                    </AppAnimationButton>
                </Box>

                {/*  */}
                <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="w-[100%]" >
                        {
                            productData.length > 0 ? 
                            productData.map((data,index) => {
                                return (
                                    <Grid key={index} xs={12} xl={4} lg={4} md={12} sm={12} item>
                                            <AppAnimationButton className='w-auto cursor-pointer'>
                                                <Box onClick={()=>{
                                                    if(index < idSelection){
                                                        dispatch(setNameProduct({id :data.idProduct , name : data.nameProduct , category : data.category}))
                                                        push(`/dashboard/profile/product-list/product/${data.nameProduct.split(' ').join('-').toLowerCase()}`)
                                                    }else{
                                                        toast.warn('Upgrade ke Premium untuk Mengakses')
                                                    }

                                                    }} className={`${index < idSelection ? 'opacity-[100%]' : 'opacity-[20%]'} p-[20px] bg-NEUTRAL-100 rounded-[20px] flex flex-col gap-[8px] hover:shadow-md`}>
                                                    <Box className='flex flex-col gap-[10px] items-start h-full'>
                                                        <Box className='flex flex-col'>
                                                            <p className="text-TEXT-1 text-[18px] font-bold">{data.nameProduct}</p>
                                                            <p className="text-TEXT-1 text-[12px]">{listDropCategory.filter(item => {return item.value == data.category})[0].text}</p>
                                                        </Box>
                                                        <Box className='flex gap-[10px] h-[25px]'>
                                                            { data.platform.instagram ? <img className='w-[25px] h-[25px] rounded-[100%]' src={listPlatform.instagram}/> : null}
                                                            { data.platform.facebook ? <img className='w-[25px] h-[25px] rounded-[100%]' src={listPlatform.facebook}/> : null }
                                                            { data.platform.twitter ? <img className='w-[25px] h-[25px] rounded-[100%]' src={listPlatform.twitter}/> : null}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </AppAnimationButton>
                                        </Grid>
                                )
                            }) 
                            :
                            
                            <div className="w-[100%] h-[50vh] xl:h-[100px] flex xl:flex-row flex-col items-center gap-[30px] px-[20px]">
                                {
                                    arr.map(data => {
                                        return(
                                            <div className="w-[100%] h-[80%] flex items-center gap-[10px]">
                                                <div className="w-[40%] h-[100%]">
                                                    <Skeleton className="h-[100%] w-[100%] "/>
                                                </div>
                                                <div className="flex flex-col gap-[10px] h-[100%] w-[100%]">
                                                    <div className="w-[100%] h-[25%]">
                                                        <Skeleton className="h-[100%] w-[100%] "/>
                                                    </div>
                                                    <div className="w-[80%] h-[25%]">
                                                        <Skeleton className="h-[100%] w-[100%] "/>
                                                    </div>
                                                    <div className="w-[70%] h-[25%]">
                                                        <Skeleton className="h-[100%] w-[100%] "/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    

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
                                    handleFilterConnectHistory(value)
                                }}
                                onCheckPlatform = {(value)=>{ 
                                    setPlatformCheckboxFilter(value.platform)
                                    handleFilterConnectHistory(value)

                                }}
                            />
                </Box>
                {/*  */}
                <Box className='p-[20px] bg-NEUTRAL-100 rounded-[20px] flex flex-col gap-[8px] hover:shadow-md'>
                    <AppTableProduct
                        data={userTableHistory}
                    />
                </Box>
            </Box>
        </AppLayout>
    )
}

export default ProductListPage;