import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import AppButton from '@/app/components/appButton/appButton'
import Grid from '@mui/material/Grid'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import AppAnimationButton from '@/app/components/appAnimation/appAnimationButton';
import Skeleton from 'react-loading-skeleton';
import { listPlatform } from '@/app/utils/model';
import { useSelector } from 'react-redux';
import { useState , useEffect } from 'react';
import { getProductByUser } from '@/app/api/repository/productRepository';
import { toast } from 'react-toastify';

import AppCheckBox from '@/app/components/appCheckBox/appCheckBox';
import { instagramPickPages, getInstagramPages , instagramCancelPages} from '@/app/api/repository/instagramRepository';


const AppModalInstagramPage = (props) => {

    // const token = useSelector(state => state.auth.value)
    const [instagramPageData , setInstagramPageData] = useState([])
    const [instagramPageDataLoading , setInstagramPageDataLoading] = useState(true)
    const [countCheckbox , setCountCheckbox ] = useState(-1)
    const [dataPages , setDataPages ] = useState([])

    const fetchInstagramPages = async () => {
        setInstagramPageDataLoading(true)
        try {
            const res = await getInstagramPages(props.idProduct);
            if(res.status = 'OK'){
                setInstagramPageData(res.data)
                setInstagramPageDataLoading(false)
            }
        } catch (error) {
            setInstagramPageDataLoading(false)
        }
    }
    const fetchInstagramPickPages = async (data) => {
        const res = await instagramPickPages(data);
        if(res.status = 'OK'){
            toast.success('Instagram Page Berhasil Dipilih')
            props.onCloseButton(false)
        }
    }
    
    // const fetchFacebookCancelPages = async () => {
    //     const res = await fetch('http://localhost:3000/api/v1/facebook/cancel-pages', {
    //                     method: 'DELETE', 
    //                     headers: {
    //                         'Content-Type': 'application/json' ,
    //                         'Authorization': `Bearer ${token}`
    //                     },
    //                     body: JSON.stringify({
    //                         idProduct: props.idProduct
    //                     }) 
    //                 })
    //     if(res.ok){
    //         toast.success('Facebook Page Dibatalkan')
    //     }else{
    //         toast.error('Ada Kesalahan Server (500)')
    //     }
    // }

    useEffect(() => {
        if(props.open == true){
            fetchInstagramPages()
            localStorage.setItem('countCheckbox' , -1)
        }
    },[props.open])


    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className = 'w-[40%] max-h-[80vh] h-auto rounded-[20px] bg-white p-[20px] overflow-y-scroll scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full'>
                    <Box  className='flex flex-col gap-[25px]'>
                        <Box className = 'flex justify-between'>
                            <p className = 'text-[16px] font-bold text-black' >Silahkan Pilih Page</p>
                            <AppCloseButton
                                onClick = {()=>{
                                    // fetchFacebookCancelPages()
                                    props.onCloseButton(false)
                                }}
                            />
                        </Box>
                        
                        <Box className='flex flex-col gap-[10px]'>
                            {/*  */}
                            {instagramPageData.length > 0 ?  <p className = 'text-[12px] font-bold text-black' >Pilih halaman Instagram untuk dihubungkan!</p> : null}
                            <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="w-[100%]" >
                                {
                                    instagramPageDataLoading ? 

                                    <div className="w-[100%] h-[100px] px-[20px] ">
                                        <Skeleton count={5} className="w-[200px] h-auto"/>
                                    </div> :

                                    instagramPageData.length > 0 ? 
                                    instagramPageData.map((data,index) => {
                                        return (
                                                <Grid key={index} xs={12} item>
                                                    <Box className="flex justify-between p-[10px] rounded-[15px] bg-NEUTRAL-100">
                                                        <Box className='flex gap-[15px] items-center'>
                                                            <Box className='flex relative w-[80px] '>
                                                                <Box className='w-[50px] h-[50px] absolute right-0' >
                                                                    <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={listPlatform.facebook}/>
                                                                    <img src={data.pages.picture_url} alt='instagram-page-image' className='w-full h-full  object-cover rounded-[100%]' />
                                                                </Box>
                                                                <Box className='w-[50px] h-[50px] relative' >
                                                                    <img className=' absolute z-[100] bottom-0 right-0 w-[18px] h-[18px] rounded-[100%]' src={listPlatform.instagram}/>
                                                                    <img src={data.instagram.picture_url} alt='instagram-page-image' className='w-full h-full  object-cover rounded-[100%]' />
                                                                </Box>
                                                            </Box>
                                                            {/*  */}
                                                            <p className='text-[14px] text-black font-poppins'>{data.instagram.username ||'Page Name'}</p>
                                                        </Box>
                                                        <AppCheckBox
                                                            customHandle={true}
                                                            value= {''}
                                                            checked={ localStorage.getItem('countCheckbox')  != index ? false : true}
                                                            label={''}
                                                            onChange= {()=>{
                                                                    setCountCheckbox(index)
                                                                    localStorage.setItem('countCheckbox' , index)

                                                                    if(localStorage.getItem('countCheckbox') == index ){
                                                                        setDataPages(data)
                                                                    }

                                                            }}
                                                        />
                                                    </Box>
                                                </Grid>
                                        )
                                    }) 
                                    :
                                    
                                    <Box className = 'w-[100%]'>
                                        <p className="text-TEXT-1 p-[20px] text-[14px] text-center">Ada Masalah pada Instagram tidak bisa menampilkan Page</p> 
                                    </Box> 
                            


                                }
                            </Grid>
                            <Box className='flex justify-end'>
                                <AppButton
                                    className='w-[30%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                                    text={'Simpan'} 
                                    type = {'button'}
                                    onClick={()=>{
                                        fetchInstagramPickPages({ idProduct : props.idProduct , ...dataPages })
                                    }}
                                />
                            </Box>
                        </Box>
                        
                    </Box>
                </motion.div>
        </Modal>
    )
}

export default AppModalInstagramPage;