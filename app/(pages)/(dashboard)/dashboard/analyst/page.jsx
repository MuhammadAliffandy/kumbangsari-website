'use client'

import { useEffect, useState } from "react";
import AppLayout from "../component/appLayout";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Line , Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import AppTablePost from "@/app/components/appTable/appTablePost";
import { getProductByUser } from '@/app/api/repository/productRepository';
import { useMediaQuery } from "react-responsive";
import AppPopupFilter from '@/app/(pages)/(dashboard)/dashboard/component/popup/appPopupFilter'


    const listPlatform = [
    { color : '#FFC300' , platform : 'Instagram'},
    { color : '#8E8E8E' , platform : 'Facebook'},
    { color : '#5A4999' , platform : 'Twitter'},
    ]

    const exampleProduct = [
    {productName : 'Bakso kuat'},
    {productName : 'Bakso mantap'},
    {productName : 'Bakso enjoy'},
    ]

    const exampleData = {
        labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu",'Minggu'],
        datasets: [
            {
                label: null,
                data: [33, 53, 85, 41, 44, 65, 45],
                fill: false,
                lineTension: 0.5,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "#8E8E8E"
            },
            {
                label: null,
                data: [33, 25, 35, 51, 54, 76 , 28],
                lineTension: 0.5,
                fill: false,
                borderColor: "#FFC300"
            },
            {

                label: null,
                data: [33, 15, 45, 21, 44, 56 , 18],
                fill: false,
                lineTension: 0.5,
                borderColor: "#5A4999"
            }
        ]
    };

    const exampleDoughnutData = {
        datasets: [
            {
            label: '# of Votes',
            data: [12, 19, 3,],
            backgroundColor: [
                '#FFC300',
                '#8E8E8E',
                '#5A4999',
            ],
            borderWidth: 1,
            },
        ],
        };

    const createDataPost = (date, contentTitle, productName, platform, like , comment , share , follower) => {
        return { date, contentTitle, productName, platform, like , comment , share , follower};
    }

    const exampleDataPost = [
        createDataPost('14 Januari 2024' , 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , 12 , 21 ,3 , 3),
        createDataPost('14 Januari 2024' , 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , 12 , 21 ,3 , 3),
        createDataPost('14 Januari 2024' , 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , 12 , 21 ,3 , 3),
        createDataPost('14 Januari 2024' , 'Bakso Mantap' , 'Bakso Cihuy' , 'instagram' , 12 , 21 ,3 , 3),
    ]

const AnalystPage = () => {

    // state responsive
    const xl = useMediaQuery({ maxWidth: 1280 });
    // state hover
    const [optimalProduct , setOptimalProduct ] = useState(false)
    const [postRecap , setPostRecap ] = useState(false)
    // state data
    const [productList , setProductList] = useState([])
    const [productCheckBoxFilter , setProductCheckboxFilter] = useState('')
    const [platformCheckBoxFilter , setPlatformCheckboxFilter] = useState('')

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

    return (
        <AppLayout title='Analisis'>
            <Box className = 'grow h-[86%] p-[20px] flex flex-col gap-[20px]'>
            {/*  */}
                <Box className='p-[20px] flex-none h-[100%] w-[100%] flex flex-col border-[1px] gap-[15px] border-TEXT-4 rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full '>
                    <Box className='flex gap-[5px] items-center relative'>
                        <p className="text-TEXT-1 font-bold text-[16px]">Keoptimalan Produk</p>
                        <Box 
                            onMouseEnter={()=>{
                                setOptimalProduct(true)
                            }} 
                            onMouseLeave={()=>{
                                setOptimalProduct(false)
                            }}
                            className = 'flex flex-col relative'> 
                                <img className="w-[24px] h-[24px] relative " src="/images/icon/info-packet.svg" />
                                {
                                    optimalProduct ? 

                                    <Box className=' w-[35vw] flex flex-col gap-[6px] bg-white rounded-[15px] p-[15px] shadow-xl absolute'>
                                        <p className="text-TEXT-1 font-bold text-[18px]">Keoptimalan Produk</p>
                                        <p className="text-TEXT-1 text-[12px]">Didapatkan melalui hasil pengolahan data terhadap jumlah suka, pengikut, komentar, kunjungan, dan bagikan.</p>
                                    </Box>

                                    : null
                                }
                        </Box>
                    </Box>
                    <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="w-[100%]" >
                        {
                            exampleProduct.map(data => {
                                return (
                                    <Grid xs={12} xl={4} lg={4} md={12} sm={12} item>
                                        <Box className='p-[20px] bg-NEUTRAL-100 rounded-[20px] flex flex-col gap-[8px] hover:shadow-xl'>
                                            <p className="text-TEXT-3 text-[12px]">{data.productName}</p>
                                            <Box className='flex justify-between items-center'>
                                                <Box className='flex flex-col'>
                                                    <p className="text-TEXT-1 text-[28px] font-bold">14.000</p>
                                                    <span className="flex gap-[10px] items-center">
                                                        <img src="/images/icon/analyst/traffic-up.svg" alt="icon-grow"/>
                                                        <p className="text-STATE-GREEN-BASE text-[12px] font-bold">15%</p>
                                                    </span>
                                                </Box>
                                                <img src="/images/icon/analyst/growth-up.svg" alt="icon-grow" className="w-auto h-[60px]"/>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
            {/*  */}
                    <Box className='w-[100%]'>
                        <Box className='flex w-[100%] justify-end items-center'>
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
                    </Box>
            {/*  */}
                    <Box className='flex flex-col xl:flex-row lg:flex-row gap-[15px] w-[100%]'>
                        <Box className='grow h-auto rounded-[20px] bg-NEUTRAL-100 flex flex-col gap-[15px] p-[20px] hover:shadow-xl'>
                            <Box className='flex items-center justify-between'>
                                <p className="text-TEXT-1 font-bold text-[16px]">Grafik Kunjungan Pengguna</p>
                                <Box className='flex items-center gap-[20px]'>
                                    {
                                        listPlatform.map(data => {
                                            return(
                                                <span className="flex items-center gap-[6px]">
                                                    <Box className={`w-[10px] h-[10px] bg-[${data.color}] rounded-full`}></Box>
                                                    <p className="text-TEXT-1 text-[12px]">{data.platform}</p>
                                                </span>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                            <Line 
                                data={exampleData} 
                                options={{
                                    plugins: {
                                        legend: {
                                            display: false 
                                        }
                                    }
                                }}
                            />
                        </Box>     
                        <Box className='w-[100%] xl:w-[30%] lg:w-[30%] bg-NEUTRAL-100 p-[20px] rounded-[20px] flex flex-col gap-[15px] hover:shadow-xl'>
    
                            <Box className='flex gap-[5px] items-center relative'>
                                <p className="text-TEXT-1 font-bold text-[16px]">Rekap Postingan</p>
                                <Box 
                                    onMouseEnter={()=>{
                                        setPostRecap(true)
                                    }} 
                                    onMouseLeave={()=>{
                                        setPostRecap(false)
                                    }}
                                    className = 'flex flex-col relative'> 
                                        <img className="w-[24px] h-[24px] relative " src="/images/icon/info-packet.svg" />
                                        {
                                            postRecap ? 

                                            <Box className=' w-[15vw] flex flex-col gap-[6px] bg-white rounded-[15px] p-[15px] shadow-xl absolute'>
                                                <p className="text-TEXT-1 font-bold text-[18px]">Rekap Postingan</p>
                                                <p className="text-TEXT-1 text-[12px]">Merupakan persentase seluruh postingan dari semua produk yang sudah diunggah</p>
                                            </Box>

                                            : null
                                        }
                                    </Box>
                            </Box>

                            <Box className='grow w-[100%] flex flex-col justify-center items-center gap-[20px]'>
                                    <Box className='h-[60%] w-[100%] items-center justify-center flex'>
                                        <Doughnut data={exampleDoughnutData} />;
                                    </Box>
                                    <Box className='flex flex-col items-center gap-[20px] w-[100%] justify-between'>
                                            {
                                                productList.map((data,index) => {
                                                    return(
                                                        <span className="w-[60%] flex items-center gap-[10px] justify-between" >
                                                            <Box className='flex gap-[6px] items-center'>
                                                                <Box className={`w-[10px] h-[10px] rounded-full`} sx={{ backgroundColor: listPlatform[index].color }}></Box>
                                                                <p className="text-TEXT-1 text-[12px]">{data.text}</p>
                                                            </Box>
                                                                <p className="text-TEXT-1 text-[12px]">7 Postingan</p>

                                                        </span>
                                                    )
                                                })
                                            }
                                    </Box>
                            </Box>
                        </Box>
                    </Box>
                {/*  */}
                    <Box className=' bg-NEUTRAL-100 p-[20px] rounded-[20px] flex flex-col gap-[15px] hover:shadow-xl'> 
                        <AppTablePost
                                data = {exampleDataPost}
                                onClick = { (value) => {
                                    console.log(value)
                                }}

                            />
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    ) 
}

export default AnalystPage;