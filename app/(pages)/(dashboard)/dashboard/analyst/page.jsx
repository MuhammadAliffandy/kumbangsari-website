'use client'

import { useEffect, useState } from "react";
import AppLayout from "../component/AppLayout";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Line , Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import AppTablePost from "@/app/components/appTable/appTablePost";
import AppModalDetailContent from '@/app/(pages)/(dashboard)/dashboard/component/modal/appModalDetailContent';
import { getProductByUser } from '@/app/api/repository/productRepository';
import { getAnalysisBestPerformance, getAnalysisChartPerformance, getAnalysisRecapPost } from '@/app/api/repository/analysisRepository';
import { useMediaQuery } from "react-responsive";
import AppPopupFilter from '@/app/(pages)/(dashboard)/dashboard/component/popup/appPopupFilter'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { convertToIndonesianDate } from "@/app/utils/helper";
import AppAnimationButton from "@/app/components/appAnimation/appAnimationButton";
import Skeleton from "react-loading-skeleton";
import images from '@/public/images/images'


    const listPlatform = [
    { color : '#5A4999' , platform : 'Twitter'},
    { color : '#FFC300' , platform : 'Instagram'},
    { color : '#8E8E8E' , platform : 'Facebook'},
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
                // backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "#5A4999"
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
                borderColor: "#8E8E8E"
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



const AnalystPage = () => {

    // state responsive
    const xl = useMediaQuery({ maxWidth: 1280 });
    const arr = [1,2,3]
    // 
    const userSubscription = useSelector(state => state.userSubscription.value)
    // state modal
    const [openModalDetail , setOpenModalDetail] = useState(false)
    // state hover
    const [optimalProduct , setOptimalProduct ] = useState(false)
    const [postRecap , setPostRecap ] = useState(false)
    // state data
    const [contentDetail , setContentDetail] = useState([])
    const [product , setProduct] = useState([])
    const [productList , setProductList] = useState([])
    const [productListChart , setProductListChart] = useState([])
    const [currentBestPerformance , setCurrentBestPerformance ] = useState([])
    const [chartPerformance , setChartPerformance ] = useState([])
    const [chartGraphicPerformance , setChartGraphicPerformance ] = useState(exampleData)
    const [bestPerformance , setBestPerformance ] = useState([])
    const [recapPost , setRecapPost ] = useState({
        datasets: [
            {
            label: '# of Votes',
            data: [12,7,3],
            backgroundColor: [
                '#5A4999',
                '#FFC300',
                '#8E8E8E',
            ],
            borderWidth: 1,
            },
        ],
    })
    const [productCheckBoxFilter , setProductCheckboxFilter] = useState('')
    const [platformCheckBoxFilter , setPlatformCheckboxFilter] = useState('')

    const createDataPost = (date, contentTitle, productName, platform, like , comment , share , follower, content) => {
        return { date, contentTitle, productName, platform, like , comment , share , follower , content};
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

            const productListChart = currentData.map((data,index) => {
                return { ...data , color : listPlatform[index].color }
            })


            setProductListChart(productListChart)
            setProductList(productList)
            setProduct(currentData)
        }
    }

    const fetchAnalysisBestPerformance = async () => {
        try {
            const res = await getAnalysisBestPerformance();

            if(res.status == 'OK'){

                const data = res.data.map(item => {
                    return createDataPost(
                        convertToIndonesianDate(item.date.createAt),
                        item.contentTitle,
                        productList[item.idProduct - 1 ]?.text,
                        item.platform,
                        item.detailPost.likes_count,
                        item.detailPost.comments_count,
                        item.detailPost.shares_count,
                        0,
                        item,
                    )
                })

                setCurrentBestPerformance(data)
                setBestPerformance(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAnalysisRecapPost = async () => {
        try {
            const res = await getAnalysisRecapPost();

            if(res.status == 'OK'){
                const currentData = res.data.filter((data , index) => {
                    if(userSubscription <= 2){
                        return index === 0
                    }else{
                        return data
                    }
                })
        
                const data  = currentData.map(item => {
                    return item.total_count || 1
                })

            const doughnutData = {
                    datasets: [
                        {
                        label: '# of Votes',
                        data: data,
                        backgroundColor: [
                            '#5A4999',
                            '#FFC300',
                            '#8E8E8E',
                        ],
                        borderWidth: 1,
                        },
                    ],
                };

                setRecapPost(doughnutData)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const fetchChartPerformance = async () => {
        try {
            const res = await getAnalysisChartPerformance()
            if(res.status == 'OK'){

                const chartGraphic = res.data.map((data,index)=> {
                    return {
                        label: null,
                        data: [
                            data.avg_monday || 0,
                            data.avg_tuesday || 0,
                            data.avg_wednesday || 0,
                            data.avg_thursday || 0,
                            data.avg_friday || 0,
                            data.avg_saturday || 0,
                            data.avg_sunday || 0,
                        ],
                        fill: false,
                        lineTension: 0.5,
                        borderColor: listPlatform[index].color
                    }
                })
                

                setChartGraphicPerformance({
                    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu",'Minggu'],
                    datasets:[
                        ...chartGraphic
                    ]
                })
                setChartPerformance(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleFilter = (listCheckbox) => {

        if(currentBestPerformance.length > 0){
            const bestPerformanceChange = currentBestPerformance.filter(data => { 
            return listCheckbox.product.indexOf(productList[data.content.idProduct - 1].text) > -1 || listCheckbox.platform.indexOf(data.content.platform) > -1
            })
            setBestPerformance( bestPerformanceChange)
        }
        
        if(listCheckbox.product.length == 0 && listCheckbox.platform.length == 0){
            setBestPerformance(currentBestPerformance)
        }
    }

    useEffect(()=>{
        getUserProduct() 
    },[])

    useEffect(()=>{
        fetchAnalysisBestPerformance()
        fetchAnalysisRecapPost()
        fetchChartPerformance()
    },[productList])

    return (
        <AppLayout title='Analisis'>
            <AppModalDetailContent
                open= {openModalDetail}
                image = {contentDetail ? contentDetail.imageUrlPost : ''}
                caption = {contentDetail ? contentDetail.captionPost : ''}
                hashtag = {contentDetail ? contentDetail.hashtagPost : ""}
                platform = {contentDetail ? contentDetail.platform : ""}
                productName = {contentDetail ? contentDetail.contentTitle : ""}
                withButton={false}
                deleteButton={false}
                isDashboard={true}
                onClick = {()=> {
                    setOpenModalUpload(!openModalUpload)
                }}
                onEditButton = {()=> {
                    setOpenModalDetail(false)
                    dispatch(setGenerateAI(contentDetail)) 

                }}
                onCloseButton = {(value)=> {setOpenModalDetail(value)}}
                onDone={()=>{}}
            />
            <Box className = 'grow h-[86%] p-[20px] flex flex-col gap-[20px]'>
            {/*  */}
                <Box className='p-[20px] flex-none h-[100%] w-[100%] flex flex-col  gap-[15px]  rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full '>
                    <Box className='flex gap-[5px] items-center relative'>
                        <p className="text-TEXT-1 font-bold text-[16px]">Performa Konten</p>
                        <Box 
                            onMouseEnter={()=>{
                                setOptimalProduct(true)
                            }} 
                            onMouseLeave={()=>{
                                setOptimalProduct(false)
                            }}
                            className = 'flex flex-col relative'> 
                                <img className="w-[24px] h-[24px] relative " src={images.icon.infoPacket} />
                                {
                                    optimalProduct ? 

                                    <Box className=' w-[35vw] flex flex-col gap-[6px] bg-white rounded-[15px] p-[15px] shadow-xl absolute'>
                                        <p className="text-TEXT-1 font-bold text-[18px]">Performa Konten</p>
                                        <p className="text-TEXT-1 text-[12px]">Didapatkan melalui hasil pengolahan data terhadap jumlah suka, pengikut, komentar, kunjungan, dan bagikan.</p>
                                    </Box>

                                    : null
                                }
                        </Box>
                    </Box>
                    <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="w-[100%]" >
                        {

                            chartPerformance.length > 0 ?

                            chartPerformance.map(data => {
                                return (
                                    <Grid xs={12} xl={ 12 / chartPerformance.length || 4 } lg={ 12 / chartPerformance.length || 4 } md={12} sm={12} item>
                                        <AppAnimationButton className='w-auto'>
                                            <Box className='p-[20px] bg-NEUTRAL-100 rounded-[20px] flex flex-col gap-[8px] hover:shadow-md'>
                                                <p className="text-TEXT-3 text-[12px]">{data.product}</p>
                                                <Box className='flex justify-between items-center'>
                                                    <Box className='flex flex-col'>
                                                        <p className="text-TEXT-1 text-[28px] font-bold">{data.average_score_today}</p>
                                                        <span className="flex gap-[10px] items-center">
                                                            <img src={data.status == 'up' ? images.icon.analyst.trafficUp : images.icon.analyst.trafficDown} alt="icon-grow"/>
                                                            <p className={`${data.status == 'down' ? 'text-STATE-RED-BASE' : 'text-STATE-GREEN-BASE'} text-[12px] font-bold`}>{data.percentage_change}</p>
                                                        </span>
                                                    </Box>
                                                    <img src={ data.status == 'up' ?  images.icon.analyst.growthUp : images.icon.analyst.growthDown} alt="icon-grow" className="w-auto h-[60px]"/>
                                                </Box>
                                            </Box>
                                        </AppAnimationButton>
                                    </Grid>
                                )
                            }) : 
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
                    
                    {/*  */}
                    <Box className='flex flex-col xl:flex-row lg:flex-row gap-[15px] w-[100%]'>
                        <Box className='grow h-auto rounded-[20px] bg-NEUTRAL-100 flex flex-col gap-[15px] p-[20px] hover:shadow-md'>
                            <Box className='flex items-center justify-between'>
                                <p className="text-TEXT-1 font-bold text-[16px] w-[20%] xl:w-[70%]">Grafik Performa Konten</p>
                                <Box className='flex xl:flex-row flex-col items-center justify-end gap-[20px] w-[30%]'>
                                    {
                                        productListChart.map(data => {
                                            return(
                                                <span className="flex items-center gap-[6px] w-[100%]">
                                                    <Box sx={{backgroundColor : data.color}} className={`w-[10px] h-[10px] rounded-full`}></Box>
                                                    <p className="text-TEXT-1 text-[12px]">{data.nameProduct}</p>
                                                </span>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                            <Line 
                                data={ chartGraphicPerformance || exampleData} 
                                options={{
                                    plugins: {
                                        legend: {
                                            display: false 
                                        }
                                    }
                                }}
                            />
                        </Box>     
                        <Box className='w-[100%] xl:w-[30%] lg:w-[30%] bg-NEUTRAL-100 p-[20px] rounded-[20px] flex flex-col gap-[15px] hover:shadow-md'>
    
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
                                        <img className="w-[24px] h-[24px] relative " src={images.icon.infoPacket} />
                                        {
                                            postRecap ? 

                                            <Box className=' w-[25vw] xl:w-[15vw] flex flex-col gap-[6px] bg-white rounded-[15px] p-[15px] shadow-xl absolute'>
                                                <p className="text-TEXT-1 font-bold text-[18px]">Rekap Postingan</p>
                                                <p className="text-TEXT-1 text-[12px]">Merupakan persentase seluruh postingan dari semua produk yang sudah diunggah</p>
                                            </Box>

                                            : null
                                        }
                                    </Box>
                            </Box>

                            <Box className='grow w-[100%] flex flex-col justify-center items-center gap-[20px]'>
                                    <Box className='h-[200px] xl:h-[60%] w-[100%] items-center justify-center flex'>
                                        <Doughnut data={recapPost} />;
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
                                                                <p className="text-TEXT-1 text-[12px]">{recapPost.datasets[0].data[index] || 0 } Postingan</p>

                                                        </span>
                                                    )
                                                })
                                            }
                                    </Box>
                            </Box>
                        </Box>
                    </Box>
                    {/*  */}
                    <Box className='w-[100%]'>
                        <Box className='flex w-[100%] justify-end items-center'>
                            <AppPopupFilter
                                paddingRight={'8%'}
                                isResponsive = { xl ? true : false  }
                                product = { productList}
                                listProductCheckbox={productCheckBoxFilter}
                                listPlatformCheckbox={platformCheckBoxFilter}
                                onCheckProduct = {(value)=>{ 
                                        setProductCheckboxFilter(value.product)
                                        handleFilter(value)
                                    }}
                                    onCheckPlatform = {(value)=>{ 
                                        setPlatformCheckboxFilter(value.platform)
                                        handleFilter(value)
                                        
                                }}
                            />
                        </Box>
                    </Box>
                    <Box className=' bg-NEUTRAL-100 p-[20px] rounded-[20px] flex flex-col gap-[15px] hover:shadow-md'> 
                        <AppTablePost
                                data = {bestPerformance}
                                onClick = { (value) => {
                                    setOpenModalDetail(!openModalDetail)
                                    setContentDetail(value)
                                }}
                            />
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    ) 
}

export default AnalystPage;