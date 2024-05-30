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
import AppModalConnection from '@/app/(pages)/(dashboard)/dashboard/profile/product-list/product/component/appModalConnection'
import { listPlatform } from '@/app/utils/model';
import { useSelector } from "react-redux";
import { getProductByUser } from "@/app/api/repository/productRepository";
import { twitterConnect } from "@/app/api/repository/twitterRepository";
import { toast } from "react-toastify";
import { useRouter , useParams } from 'next/navigation';


const createDataProduct = (accountName, productName, platform, time, date , status) => {
    return { accountName, productName, platform, time, date , status};
}

const exampleDataProduct = [
    createDataProduct( 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , '15 : 00' , '14 Januari 2024' , 'success'),
    createDataProduct( 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , '15 : 00' , '14 Januari 2024' , 'waiting'),
    createDataProduct( 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , '15 : 00' , '14 Januari 2024' , 'failed'),
]

const ProductDetailPage = () => {
    const productInit = JSON.parse(useSelector(state => state.nameProduct.value))
    // state modal
    const [modalSuccessConnection , setModalSuccessConnection ] = useState(false)
    const [modalFailedConnection , setModalFailedConnection ] = useState(false)
    const [modalDeleteAccount , setModalDeleteAccount ] = useState(false)
    const [modalDeleteProduct , setModalDeleteProduct ] = useState(false)
    const [modalConnection , setModalConnection ] = useState(false)
    const [modalCheckConnection , setModalCheckConnection ] = useState(false)
    // state data  
    const [isFacebook , setIsFacebook ] = useState(false)
    const [isInstagram , setIsInstagram ] = useState(false)
    const [isTwitter , setIsTwitter ] = useState(false)
    const [accountTwitter , setAccountTwitter ] = useState([])
    const [accountInstagram , setAccountInstagram ] = useState([])
    const [accountFacebook , setAccountFacebook ] = useState([])
    const [ platformStatusConnection, setPlatformStatusConnection ] = useState(false);
    const [ platformConnection, setPlatformConnection ] = useState('');
    const [ checkboxStatus, setCheckboxStatus ] = useState('');
    const [ ageRange , setAgeRange ] = useState([0,10]);
    const [ gender , setGender ] = useState([]);
    const [ school , setSchool ] = useState([]);
    const [ job , setJob ] = useState([]);

    const params = useParams()
    const statusConnection = params.status 

    const fetchTwitterConnection = async () => {
        try {
            const res = await twitterConnect({ idProduct : productInit.id })
            if(res.status == 'OK'){
                window.location.href = res.data.redirect_url
            }else{
                toast.error('Koneksi Twitter Gagal')
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server (500)')
        }
    }

    const getUserProduct = async () => {
        const res = await getProductByUser();
        if(res.status = 'OK'){
            const data = res.data.filter(data => {
                return data.idProduct === productInit.id
            })[0]

            setIsFacebook(data.platform.facebook)
            setIsInstagram(data.platform.instagram)
            setIsTwitter(data.platform.twitter)
            setAccountTwitter(data.platformInfo.twitter)
            setAgeRange(data.ageRange)
            setGender(JSON.stringify(data.gender))
            setSchool(data.education)
            setJob(data.work) 
        }
    }

    useEffect(() => {
        getUserProduct()
    }, []);

    useEffect(()=>{
        if(statusConnection == 'success'){
            setModalSuccessConnection(true)
        }
        if(statusConnection == 'failed'){
            setModalFailedConnection(true)
        }
    },[])

    return(
        <AppLayout title={`Profil > Daftar Produk > ${productInit.name}`}>
            <AppModalConnection
                open={modalConnection}
                onCloseButton={value => { setModalConnection(value) }}
                platform = {platformConnection == 'facebook' ? 'Facebook' : platformConnection == 'instagram' ? 'Instagram' : 'Twitter'}
                imagePlatform = {platformConnection == 'facebook' ? listPlatform.facebook : platformConnection == 'instagram' ? listPlatform.instagram : listPlatform.twitter}
                onClick={()=>{
                    // if(platformConnection == 'facebook'){}
                    // if(platformConnection == 'instagram'){}
                    if(platformConnection == 'twitter'){
                        fetchTwitterConnection()
                    }
                }}
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
                            <p className="text-TEXT-1 text-[14px] font-medium" >{accountTwitter.username || '@username'}</p>
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
                onCloseButton={(value)=> setModalSuccessConnection(value) }
                children={
                    <Box className=' flex  gap-[10px] w-[100%]'>
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                            text={ 'Keluar'} 
                            type = {'button'}
                            onClick={()=>{
                                setModalSuccessConnection(false)
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
                onCloseButton={(value)=> setModalFailedConnection(value) }
                children={
                    <Box className=' flex  gap-[10px] w-[100%]'>
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                            text={ 'Keluar'} 
                            type = {'button'}
                            onClick={()=>{
                                setModalFailedConnection(false)
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
                        <p className="text-TEXT-1 text-[12px]">{productInit.category}</p>
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

                            <img className='w-full h-full rounded-[100%] relative object-cover' src={ isInstagram ? 'https://statik.tempo.co/data/2022/06/25/id_1120454/1120454_720.jpg' :  listPlatform.instagram}/>
                        </Box>
                        <Box className='w-[40px] h-[40px] relative cursor-pointer' onClick={()=>{
                                setPlatformConnection('facebook')
                                setPlatformStatusConnection(isFacebook)
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

                            <img className='w-full h-full rounded-[100%] relative object-cover' src={ isTwitter ? accountTwitter.profileImageUrl :  listPlatform.twitter}/>
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
                            <Box className='w-full flex gap-[100px]'>
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
                            <Box className='flex justify-end w-[100%] gap-[15px]'>
                                <>  
                                    <AppButton
                                        className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-NEUTRAL-500 rounded-[12px] px-[25px] py-[8px] shadow-xl'}
                                        text={'Hapus Produk'} 
                                        type = {'Submit'}
                                        onClick = {()=>{
                                            
                                        }}
                                    />
                                    <AppButton
                                        className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-SECONDARY-500 rounded-[12px] px-[40px] py-[8px] shadow-xl'}
                                        text={'Ubah Detail'} 
                                        type = {'Submit'}
                                        onClick = {()=>{
                                    
                                        }}
                                    />
                                </>
                            </Box>
                        </Box>
                </Box>
                {/*  */}
                <p className="text-TEXT-1 font-bold text-[16px]">Daftar Riwayat</p> 
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