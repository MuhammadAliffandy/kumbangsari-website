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
import { facebookPickPages, getFacebookPages , facebookCancelPages} from '@/app/api/repository/facebookRepository';


const AppModalFacebookPage = (props) => {

    const token = useSelector(state => state.auth.value)
    const [facebookPageData , setFacebookPageData] = useState([])
    const [facebookPageDataLoading , setFacebookPageDataLoading] = useState(true)
    const [dataPages , setDataPages ] = useState([])
    const [countCheckbox , setCountCheckbox ] = useState(-1)

    const fetchFacebookPages = async () => {
        try {
            setFacebookPageDataLoading(true)
            const res = await getFacebookPages(props.idProduct);
            if(res.status = 'OK'){
                setFacebookPageData(res.data)
                setFacebookPageDataLoading(false)
            }
        } catch (error) {
            setFacebookPageDataLoading(false)
        }
    }
    const fetchFacebookPickPages = async (data) => {
        const res = await facebookPickPages(data);
        if(res.status = 'OK'){
            toast.success('Facebook Page Berhasil Dipilih')
            props.onCloseButton(false)
        }
    }
    
    const fetchFacebookCancelPages = async () => {
        const res = await fetch('http://localhost:3000/api/v1/facebook/cancel-pages', {
                        method: 'DELETE', 
                        headers: {
                            'Content-Type': 'application/json' ,
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            idProduct: props.idProduct
                        }) 
                    })
        if(res.ok){
            toast.success('Facebook Page Dibatalkan')
        }else{
            toast.error('Ada Kesalahan Server (500)')
        }
    }

    useEffect(() => {
       if(props.open == true){
        fetchFacebookPages()
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
                                    fetchFacebookCancelPages()
                                    props.onCloseButton(false)
                                }}
                            />
                        </Box>
                        
                        <Box className='flex flex-col gap-[10px]'>
                            {/*  */}
                            { facebookPageData.length > 0 ? <p className = 'text-[12px] font-bold text-black' >Pilih halaman Facebook untuk dihubungkan!</p> : null }
                            <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="w-[100%]" >
                                {

                                    facebookPageDataLoading ? 
                                    
                                    <div className="w-[100%] h-[100px] px-[20px] ">
                                        <Skeleton count={5} className="w-[200px] h-auto"/>
                                    </div>

                                    :

                                    facebookPageData.length > 0 ? 
                                    facebookPageData.map((data,index) => {
                                        return (
                                                <Grid key={index} xs={12} item>
                                                    <Box className="flex justify-between p-[10px] rounded-[15px] bg-NEUTRAL-100">
                                                        <Box className='flex gap-[15px] items-center'>
                                                            <img src={data.picture.data.url} alt='facebook-page-image' className='w-[50px] h-[50px] object-cover rounded-[100%]' />
                                                            <p className='text-[14px] text-black font-poppins'>{data.name ||'Page Name'}</p>
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
                                        <p className="text-TEXT-1 p-[20px] text-[14px] text-center">Ada Masalah pada Facebook tidak bisa menampilkan Page</p> 
                                    </Box> 
                                 


                                }
                            </Grid>
                            <Box className='flex justify-end'>
                                <AppButton
                                    className='w-[30%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                                    text={'Simpan'} 
                                    type = {'button'}
                                    onClick={()=>{
                                        fetchFacebookPickPages({ idProduct : props.idProduct , ...dataPages })
                                    }}
                                />
                            </Box>
                        </Box>
                        
                    </Box>
                </motion.div>
        </Modal>
    )
}

export default AppModalFacebookPage;