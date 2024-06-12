'use client'
import AppLayout from "../component/AppLayout";
import React, { useEffect, useState } from "react";
import Calendar from './component/calendar'
import Box  from '@mui/material/Box'
import AppModalAddContent from '@/app/(pages)/(dashboard)/dashboard/component/modal/appModalAddContent';
import AppPopupFilter from '@/app/(pages)/(dashboard)/dashboard/component/popup/appPopupFilter'
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import { getContentCalendar } from '@/app/api/repository/calendarRepository'
import { getProductByUser } from '@/app/api/repository/productRepository';
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { convertEventDate } from '@/app/utils/helper';
import { useSelector } from 'react-redux';
import AppAnimationButton from '@/app/components/appAnimation/appAnimationButton';

const CalenderPage = () => {
    const userSubscription = useSelector(state => state.userSubscription.value) 
    // state responsive
    const sm = useMediaQuery({ maxWidth: 640 });
    const lg = useMediaQuery({ maxWidth: 1024 });
    const xl = useMediaQuery({ maxWidth: 1280 });
    // state modal
    const [openModalAdd , setOpenModalAdd ] = useState(false)
    // state data
    const [ currentCalendar , setCurrentCalendar ] = useState([])
    const [ calendar , setCalendar ] = useState([])
    const [productList , setProductList] = useState([])
    const [productCheckBoxFilter , setProductCheckboxFilter] = useState('')
    const [platformCheckBoxFilter , setPlatformCheckboxFilter] = useState('')

    const calendarLegend = [
      {
        text:"Berhasil Diunggah",
        color:'#53D34F'
      },
      {
        text:"Gagal Diunggah",
        color:'#F04438'
      },
      {
        text:"Menunggu (Data Lengkap)",
        color:'#328EFF'
      },
      {
        text:"Menunggu (Data Tidak Lengkap)",
        color:'#FFC300'
      },
    ]

    const fetchUserProduct = async () => {
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
      }
  }

    const fetchCalendarContent = async () => {
      try {
        const res = await getContentCalendar()

        if(res.status === 'OK'){
          const currentData = res.data.filter(( data , index ) => {
                if(userSubscription <= 2){
                    return index === 0
                }else{
                    return data
                }
          })
          setCurrentCalendar(currentData)
          setCalendar(currentData.map(data => {
            return {...data , productName : productList[data.idProduct - 1]?.text}
          }))
        }

      } catch (error) {
        if(error.status == 404){
          toast.error('Calendar Content Error')
        }else{
          
          toast.error('Ada Kesalahan Sever (500)')
        }
      }
    } 

    const handleChangeCheckbox = (listCheckbox) => {
    
      if(currentCalendar.length > 0){
        const calenderChange = currentCalendar.filter(data => { 
          return listCheckbox.product.indexOf(productList[data.idProduct - 1].text) > -1 || listCheckbox.platform.indexOf(data.platform) > -1
        })
        setCalendar( calenderChange)
      }
      
      if(listCheckbox.product.length == 0 && listCheckbox.platform.length == 0){
        setCalendar(currentCalendar)
      }
    }
    
    useEffect(()=>{
      fetchUserProduct()
    },[])

    useEffect(() => {
      if(productList.length > 0){
        fetchCalendarContent()
      }
    },[productList])

    return (
        <AppLayout title='Kalender'>
            <AppModalAddContent
                open={openModalAdd}
                onCloseButton = {(value)=> {
                    setOpenModalAdd(value)
                }}
                onDone={()=>{
                  fetchCalendarContent()
                }}
            />
            <Box className='p-[20px] grow w-[100%] flex flex-col gap-[15px] '>
              <Box className='flex justify-between '>
                <AppAnimationButton className='w-auto'>
                  <AppCustomButton className='flex gap-[10px] items-center bg-SECONDARY-500 hover:bg-SECONDARY-600 rounded-[10px] px-[15px] py-[5px] '
                          onClick={()=>{
                            setOpenModalAdd(!openModalAdd)
                          }}
                      >
                          <FontAwesomeIcon icon={faPlus} color={'white'} ></FontAwesomeIcon>
                          {sm || lg ? null : <p className="text-TEXT-5 text-[14px]">Tambah Konten</p> }
                  </AppCustomButton>
                </AppAnimationButton>
                <AppPopupFilter
                    paddingRight={'4%'}
                    isResponsive = { xl ? true : false  }
                    product = { productList}
                    listProductCheckbox={productCheckBoxFilter}
                    listPlatformCheckbox={platformCheckBoxFilter}
                    onCheckProduct = {(value)=>{ 
                        setProductCheckboxFilter(value.product)
                        handleChangeCheckbox(value)
                      }}
                    onCheckPlatform = {(value)=>{ 
                        setPlatformCheckboxFilter(value.platform)
                        handleChangeCheckbox(value)
              
                    }}
                />
              </Box>
              <Box className='bg-NEUTRAL-100 w-[100%] h-[100%] hover:shadow-md overflow-y-scroll rounded-[20px] p-[20px]  overflow-x-scroll xl:overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                <Calendar
                  onDeleteDone = {()=> {
                    fetchCalendarContent()
                  }}
                  onDone = {()=> {
                    fetchCalendarContent()
                  }}
                  events={

                    calendar.length == 0 ? 

                    null : 

                    calendar.map( data => {
                      return { 
                        allData: data,
                        title: data.contentTitle, 
                        date: convertEventDate(data.dates.postedAt), 
                        platform : data.platform , 
                        borderColor:'transparent', 
                        status : data.status || 'INCOMPLETED', 
                      }
                    })
                  }
                />
                <Box className='w-[100%] gap-[20px] pt-[15px] flex flex-col xl:flex-row items-start xl:items-center justify-center'>
                  {
                    calendarLegend.map(data => {
                      return(
                        <span className="flex items-center gap-[6px]">
                            <Box sx={{backgroundColor : data.color}} className={`w-[10px] h-[10px] rounded-full`}></Box>
                            <p className="text-TEXT-1 text-[12px]">{data.text}</p>
                        </span>
                      )
                    })
                  }
                </Box>
              </Box>
            </Box>
      
        </AppLayout>
    ) 
}

export default CalenderPage;

