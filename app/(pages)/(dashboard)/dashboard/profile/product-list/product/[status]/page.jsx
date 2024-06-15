'use client'

import { useEffect, useState } from "react";
import AppLayout from "../../../../component/AppLayout";
import Box from '@mui/material/Box'
import AppButton from "@/app/components/appButton/appButton";
import AppCustomModal from "@/app/components/appModal/AppCustomModal";
import CustomSpacing from '@/app/components/appCustomSpacing/appCustomSpacing';
import AppGenderCheckbox from '@/app/(pages)/(input-product)/input-product/add-product/component/appGenderCheckbox';
import AppSchoolCheckbox from '@/app/(pages)/(input-product)/input-product/add-product/component/appSchoolCheckbox';
import AppJobCheckbox from '@/app/(pages)/(input-product)/input-product/add-product/component/appJobCheckbox';
import AppRangeSlider from '@/app/components/appRangeSlider/appRangeSlider'; 
import AppTableProduct from "@/app/components/appTable/appTableProduct";
import AppModalEditProduct from '@/app/(pages)/(dashboard)/dashboard/profile/product-list/component/appModalEditProduct'
import AppModalConnection from '@/app/(pages)/(dashboard)/dashboard/profile/product-list/product/component/appModalConnection'
import AppModalFacebookPage from '@/app/(pages)/(dashboard)/dashboard/profile/product-list/product/component/appModalFacebookPage'
import AppModalInstagramPage from '@/app/(pages)/(dashboard)/dashboard/profile/product-list/product/component/appModalInstagramPage'
import { listPlatform } from '@/app/utils/model';
import { useSelector } from "react-redux";
import { deleteProduct, editProduct, getProductByUser } from "@/app/api/repository/productRepository";
import { twitterConnect } from "@/app/api/repository/twitterRepository";
import { facebookConnect, facebookValidation } from "@/app/api/repository/facebookRepository";
import { toast } from "react-toastify";
import { useRouter , useParams , useSearchParams } from 'next/navigation';
import { getUserConnectHistory } from "@/app/api/repository/userRepository";
import { convertToTimeWIB , convertToIndonesianDate, convertValueCheckbox } from "@/app/utils/helper";
import { listDropCategory } from "@/app/utils/model";
import { instagramConnect, instagramValidation } from "@/app/api/repository/instagramRepository";
import AppToastPending from "@/app/components/AppToastPending/appToastPending";
import { useDispatch } from "react-redux";
import { setNameProduct } from "@/app/redux/slices/nameProductSlice";
import { useMediaQuery } from "react-responsive";


const userDataHistory = ( productName, platform, time, date , status) => {
    return { productName, platform, time, date , status};
}

const ProductDetailPage = () => {
    const productInit = JSON.parse(useSelector(state => state.nameProduct.value))
    const imageDefault =  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" 
    const { push } = useRouter()
    const dispatch = useDispatch()
    // 
    const xl = useMediaQuery({ maxWidth: 1280 });
    // state modal
    const [modalSuccessConnection , setModalSuccessConnection ] = useState(false)
    const [modalFailedConnection , setModalFailedConnection ] = useState(false)
    const [modalDeleteAccount , setModalDeleteAccount ] = useState(false)
    const [modalDeleteProduct , setModalDeleteProduct ] = useState(false)
    const [modalEditProduct , setModalEditProduct ] = useState(false)
    const [modalConnection , setModalConnection ] = useState(false)
    const [modalFacebookPage , setModalFacebookPage ] = useState(false)
    const [modalInstagramPage , setModalInstagramPage ] = useState(false)
    const [modalCheckConnection , setModalCheckConnection ] = useState(false)
    // state data  
    const [isFacebook , setIsFacebook ] = useState(false)
    const [isInstagram , setIsInstagram ] = useState(false)
    const [isTwitter , setIsTwitter ] = useState(false)
    // 
    const [accountTwitter , setAccountTwitter ] = useState([])
    const [accountInstagram , setAccountInstagram ] = useState([])
    const [accountFacebook , setAccountFacebook ] = useState([])
    //
    const [instagramStatus , setInstagramStatus ] = useState(false)
    const [facebookStatus , setFacebookStatus ] = useState(false)
    // 
    const [userProduct , setUserProduct] = useState([])
    const [userTableHistory , setUserTableHistory] = useState([])
    // 
    const [ platformStatusConnection, setPlatformStatusConnection ] = useState(false);
    const [ platformConnection, setPlatformConnection ] = useState('');
    const [ checkboxStatus, setCheckboxStatus ] = useState('');
    const [ ageRange , setAgeRange ] = useState([0,10]);
    const [ gender , setGender ] = useState([]);
    const [ school , setSchool ] = useState([]);
    const [ job , setJob ] = useState([]);
    

    const params = useParams()
    const statusConnection = params.status 
    const searchParams = useSearchParams();
    const queryPlatform = searchParams.get('platform');

    const fetchTwitterConnection = async () => {
        try {
            const res = await twitterConnect({ idProduct : productInit.id })
            if(res.status == 'OK'){
                window.location.href = res.data.redirect_url
            }else{
                toast.error('Koneksi Twitter Gagal')
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const fetchFacebookConnection = async () => {
        try {
            const res = await facebookConnect({idProduct :  productInit.id})
            if(res.status == 'OK'){
                window.location.href = res.data.redirect_url
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }
    const fetchInstagramConnection = async () => {
        try {
            
            const res = await instagramConnect({idProduct :  productInit.id})
            if(res.status == 'OK'){
                window.location.href = res.data.redirect_url
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const fetchInstagramValidation = async () => {
        if(productInit.id != null){
            const res = await instagramValidation({ idProduct : productInit.id })
            if(res.status == 'OK'){
                setInstagramStatus(res.data.status)
            }
        }
    }

    const fetchFacebookValidation = async () => {
        if(productInit.id != null){
            const res = await facebookValidation({ idProduct : productInit.id })
            if(res.status == 'OK'){
                setFacebookStatus(res.data.status)
            }
        }
    }

    const getUserProduct = async () => {
        const res = await getProductByUser();
        if(res.status == 'OK'){
            const data = res.data.filter(data => {
                return data.idProduct === productInit.id
            })[0]

            setUserProduct(data)
            // 
            setIsFacebook(data.platform.facebook)
            setIsInstagram(data.platform.instagram)
            setIsTwitter(data.platform.twitter)
            // 
            setAccountTwitter(data.platformInfo.twitter)
            setAccountFacebook(data.platformInfo.facebook)
            setAccountInstagram(data.platformInfo.instagram)
            // 
            setAgeRange(data.ageRange)
            setGender(data.gender)
            setSchool(data.education)
            setJob(data.work) 
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
                setUserTableHistory(dataHistory)
            }
        } catch (error) {
            if(error.status == 304){
                
            }
            if(error.status == 404){
                
            }else{
                toast.error(error.data.message)
            }
        }
    }

    const fetchDeleteProduct = async () => {
        try {

            const res = await deleteProduct(productInit.id)

            if(res.status == 'OK'){
                toast.success('Berhasil Hapus Produk')
                push('/dashboard/profile/product-list')
                setModalDeleteProduct(false)
            }
        } catch (error) {
            if(error.status == 404){
                toast.error('Gagal Hapus Produk')
                setModalDeleteProduct(false)
            }else if (error.status == 403){
                toast.warn('Produk sudah mencapai batas')
            }else{
                toast.error(error.data.message)
            }
        }
    }

    const notifyFetchDeleteProduct = () => {
        AppToastPending(fetchDeleteProduct)
    }

    
    useEffect(() => {
        getUserProduct()
        fetchUserConnectHistory()
    }, []);

    useEffect(()=>{
        if(queryPlatform == 'facebook'){
            setModalFacebookPage(true) 
        }else if(queryPlatform == 'instagram'){
            setModalInstagramPage(true)
        }else{
            if(statusConnection == 'success'){
                setModalSuccessConnection(true)
            }
            if(statusConnection == 'failed'){
                setModalFailedConnection(true)
            }
        }
    },[])

    useEffect(()=>{
        if(modalCheckConnection && platformConnection == 'instagram'){
            fetchInstagramValidation()
        }
            
        if(modalCheckConnection && platformConnection == 'facebook'){
            fetchFacebookValidation()        
        }
    },[modalCheckConnection])

    return(
        <AppLayout title={`Profil > Daftar Produk > ${productInit.name}`}>
            <AppModalEditProduct
                idProduct={productInit.id}
                currentData = {userProduct}
                open={modalEditProduct}
                onCloseButton={(value)=> setModalEditProduct(value) }
                onDone={(data)=>{
                    getUserProduct()
                    
                    dispatch(setNameProduct({id :productInit.id , name : data.nameProduct , category : data.category}))
                }}
            />
            <AppModalConnection
                open={modalConnection}
                onCloseButton={value => { setModalConnection(value) }}
                platform = {platformConnection == 'facebook' ? 'Facebook' : platformConnection == 'instagram' ? 'Instagram' : 'Twitter'}
                imagePlatform = {platformConnection == 'facebook' ? listPlatform.facebook : platformConnection == 'instagram' ? listPlatform.instagram : listPlatform.twitter}
                onClick={()=>{
                    if(platformConnection == 'facebook'){
                        fetchFacebookConnection()
                    }
                    if(platformConnection == 'instagram'){
                        fetchInstagramConnection()
                    }
                    if(platformConnection == 'twitter'){
                        fetchTwitterConnection()
                    }
                }}
            />
            <AppModalFacebookPage
                idProduct={productInit.id}
                open={modalFacebookPage}
                onCloseButton={(value)=>{setModalFacebookPage(value)}}
            />
            <AppModalInstagramPage
                idProduct={productInit.id}
                open={modalInstagramPage}
                onCloseButton={(value)=>{setModalInstagramPage(value)}}
            />
            {/*  */}
            <AppCustomModal
                open={modalCheckConnection}
                onClose={()=>{setModalCheckConnection(false)}}
                withClose={false}
                width={'w-[60vw] md:w-[20vw] lg:w-[20vw] xl:w-[20vw]'}
                modalType='modal-common'
                title={platformConnection == 'facebook' ? 'Facebook' : platformConnection == 'instagram' ? 'Instagram' : 'Twitter'}
                onCloseButton={(value)=> setModalCheckConnection(value) }
                children={
                <>
                    <Box className='flex flex-col justify-start w-[100%] gap-[15px]'>
                        <Box className='flex items-center gap-[10px]'>
                            <img alt="icon-check" src={`/images/icon/${platformStatusConnection ? 'success': 'failed'}.svg`} className="w-[12px] h-[12px]"/>
                            <p className="text-TEXT-1 text-[14px] font-medium" >{platformConnection == 'facebook' ? accountFacebook.username || '@username' : platformConnection == 'instagram' ? accountInstagram.username || '@username' : accountTwitter.username || '@username'}</p>
                        </Box>
                        <Box className='h-[1px] w-[100%] bg-TEXT-4'></Box>
                        <p className="text-TEXT-1 text-[14px] font-medium">Terakhir diperbarui: {platformConnection == 'facebook' ? convertToIndonesianDate(accountFacebook.date) : platformConnection == 'instagram' ? convertToIndonesianDate(accountInstagram.date) : convertToIndonesianDate(accountTwitter.date) || ''}</p>
                    </Box>
                    {
                        platformConnection == 'instagram' && instagramStatus == true  ? null : 
                        platformConnection == 'facebook' && facebookStatus == true ? null  :
                        platformConnection == 'twitter' ? null :
                        <AppButton
                                className='w-[100%] py-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
                                text={
                                    platformConnection == 'instagram' && instagramStatus == false ||   platformConnection == 'facebook' && facebookStatus == false ? 
                                    'Pilih Page' : 
                                    null
                                } 
                                type = {'button'}
                                onClick={()=>{
                                    
                                    if(platformConnection == 'facebook'){
                                        setModalFacebookPage(true) 
                                    }

                                    if(platformConnection == 'instagram'){
                                        setModalInstagramPage(true) 
                                    }

                                    setModalCheckConnection(false)
                                }}
                            /> 
                        }
                </>
            }
            />
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
                            className='w-[100%] py-[10px] bg-NEUTRAL-500 hover:bg-NEUTRAL-600 shadow-xl text-white font-poppins rounded-[18px]'
                            text={'Keluar'} 
                            type = {'button'}
                            onClick={()=>{

                        }}/>
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
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
                width={'w-[80vw] md:w-[30vw] lg:w-[30vw] xl:w-[30vw]'}
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
                            className='w-[100%] py-[10px] bg-NEUTRAL-500 hover:bg-NEUTRAL-600 shadow-xl text-white font-poppins rounded-[18px]'
                            text={'Keluar'} 
                            type = {'button'}
                            onClick={()=>{
                                setModalDeleteProduct(false)
                        }}/>
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
                            text={ 'Hapus'} 
                            type = {'button'}
                            onClick={()=>{
                                notifyFetchDeleteProduct()
                            }}
                        />
                    </Box>
                }
            />
            <AppCustomModal
                open={modalSuccessConnection}
                withClose={true}
                width={'w-[30vw]'}
                modalType='modal-status'
                title={'Berhasil'}
                titleColor={'text-STATE-GREEN-BASE'}
                alignment ={'center text-center'} 
                status={'success'}

                subtitle={'Akun telah berhasil ditambahkan. Mulai pengalaman autopost yang menyenangkan!'}
                onClose={()=>{}}
                onCloseButton={(value)=> {
                    setModalSuccessConnection(value) 
                    push(`/dashboard/profile/product-list/product/${productInit.name.split(' ').join('-').toLowerCase()}`)
                }}
                children={
                    <Box className=' flex  gap-[10px] w-[100%]'>
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
                            text={ 'Keluar'} 
                            type = {'button'}
                            onClick={()=>{
                                setModalSuccessConnection(false)
                                push(`/dashboard/profile/product-list/product/${productInit.name.split(' ').join('-').toLowerCase()}`)
                            }}
                        />
                    </Box>
                }
            />
            <AppCustomModal
                open={modalFailedConnection}
                withClose={true}
                width={'w-[30vw]'}
                modalType='modal-status'
                title={'Gagal'}
                titleColor={'text-STATE-GREEN-BASE'}
                alignment ={'center text-center'} 
                status={'failed'}

                subtitle={'Gagal menghubungkan akun. Hubungkan ulang untuk pengalaman autopost yang menyenangkan!'}
                onClose={()=>{}}
                onCloseButton={(value)=> {
                    setModalFailedConnection(value)
                    push(`/dashboard/profile/product-list/product/${productInit.name.split(' ').join('-').toLowerCase()}`)
                } }
                children={
                    <Box className=' flex  gap-[10px] w-[100%]'>
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
                            text={ 'Keluar'} 
                            type = {'button'}
                            onClick={()=>{
                                setModalFailedConnection(false)
                                push(`/dashboard/profile/product-list/product/${productInit.name.split(' ').join('-').toLowerCase()}`)
                            }}
                        />
                    </Box>
                }
            />
            {/*  */}
            <Box className='grow h-[86%] p-[20px] flex flex-col gap-[20px] overflow-y-scroll scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full '>
                <Box className='bg-NEUTRAL-100 flex justify-between gap-[10px] items-center p-[20px] rounded-[20px]'>
                    <Box className='flex flex-col'>
                        <p className="text-TEXT-1 text-[18px] font-bold">{productInit.name}</p>
                        <p className="text-TEXT-1 text-[12px]">{listDropCategory.filter(item => {return item.value == productInit.category})[0].text}</p>
                    </Box>
                    <Box className='flex gap-[15px]' >

                        <Box className='w-[40px] h-[40px] relative cursor-pointer' onClick={()=>{
                            setPlatformConnection('instagram')
                            setPlatformStatusConnection(isInstagram)
                            isInstagram ?
                            setModalCheckConnection(!modalCheckConnection) 
                            :
                            setModalConnection(!modalConnection)
                            
                    }}>
                            {
                                isInstagram ?
                                <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={listPlatform.instagram}/>
                                :
                                <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={'/images/icon/add-circle.svg'}/>
                            }

                            <img className='w-full h-full rounded-[100%] relative object-cover' src={ isInstagram ? accountInstagram.profileImageUrl ||  imageDefault :  listPlatform.instagram}/>
                        </Box>
                        <Box className='w-[40px] h-[40px] relative cursor-pointer' onClick={()=>{
                                setPlatformConnection('facebook')
                                if(isFacebook){
                                    setPlatformStatusConnection(isFacebook)
                                    setModalCheckConnection(!modalCheckConnection) 
                                    
                                }else{
                                    setModalConnection(!modalConnection)
                                    
                                }
                            
                            }}>
                            {
                                isFacebook ?
                                <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={listPlatform.facebook}/>
                                :
                                <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={'/images/icon/add-circle.svg'}/>
                            }

                            <img className='w-full h-full rounded-[100%] relative object-cover' src={ isFacebook ? accountFacebook.profileImageUrl ||  imageDefault :  listPlatform.facebook}/>
                        </Box>
                        <Box className='w-[40px] h-[40px] relative cursor-pointer' onClick={()=>{
                                setPlatformConnection('twitter')
                                if(isTwitter){
                                    setPlatformStatusConnection(isTwitter)
                                    setModalCheckConnection(!modalCheckConnection) 
                                }else{
                                    setModalConnection(!modalConnection)
                                }
                            }} >
                            {
                                isTwitter ?
                                <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={listPlatform.twitter}/>
                                :
                                <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={'/images/icon/add-circle.svg'}/>
                            }

                            <img className='w-full h-full rounded-[100%] relative object-cover' src={ isTwitter ? accountTwitter.profileImageUrl  ||  imageDefault  :  listPlatform.twitter}/>
                        </Box>
                    
                    
                    </Box>
                </Box>
                {/*  */}
                <Box className='bg-NEUTRAL-100 flex justify-between gap-[10px] items-center p-[20px] rounded-[20px]'>
                    <Box className= 'flex flex-col gap-[12px] w-[100%] overflow-x-scroll xl:overflow-x-hidden'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Target Pasar</p> 
                            <label className='text-black font-semibold'>Umur</label>
                            <AppRangeSlider
                                value = {ageRange}
                                onChange={(value)=>{
                                    setAgeRange(value)
                                }}
                            />
                            {/* checkbox */}
                            <Box className='w-full flex flex-col xl:flex-row gap-[10px] xl:gap-[100px]'>
                                <Box className='w-[50%]'>
                                    <label className='text-black font-semibold'>Gender</label>
                                    <CustomSpacing height={10} />
                                    <AppGenderCheckbox 
                                        status = {checkboxStatus}
                                        listValue = {gender}
                                        direction= {'row'}
                                        sx={{justifyContent : 'space-between'}}
                                        disabled={true}
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
                                        sxChild={{justifyContent : 'space-between' , width : xl ? '100%' :'40%'}}
                                        disabled={true}
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
                                    disabled={true}
                                />
                            </Box>
                            <Box className='flex justify-end w-[100%] gap-[15px]'>
                                <>  
                                    <AppButton
                                        className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-NEUTRAL-500 hover:bg-NEUTRAL-600 rounded-[12px] px-[25px] py-[8px] shadow-xl'}
                                        text={'Hapus Produk'} 
                                        type = {'Submit'}
                                        onClick = {()=>{
                                            setModalDeleteProduct(!modalDeleteProduct)
                                        }}
                                    />
                                    <AppButton
                                        className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-SECONDARY-500 hover:bg-SECONDARY-600 rounded-[12px] px-[40px] py-[8px] shadow-xl'}
                                        text={'Ubah Produk'} 
                                        type = {'Submit'}
                                        onClick = {()=>{
                                            setModalEditProduct(!modalEditProduct)
                                        }}
                                    />
                                </>
                            </Box>
                        </Box>
                </Box>
                {/*  */}
                {/* <p className="text-TEXT-1 font-bold text-[16px]">Daftar Riwayat</p> 
                <Box className='bg-NEUTRAL-100 flex justify-between gap-[10px] items-center p-[20px] rounded-[20px]'>
                    <AppTableProduct
                        data={userTableHistory}
                    />
                </Box> */}
            </Box>
        </AppLayout>
    )

}

export default ProductDetailPage