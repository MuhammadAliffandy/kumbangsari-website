'use client'
import AppLayout from '@/app/(pages)/(dashboard)/dashboard/component/appLayout'
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

    const fetchUserProduct = async () => {
      const res = await getProductByUser();
      if(res.status = 'OK'){

          const currentData = res.data.filter(data => {
                  if(userSubscription <= 2){
                    return data.idProduct == 1
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
          const currentData = res.data.filter(data => {
                  if(userSubscription <= 2){
                    return data.idProduct == 1
                }else{
                    return data
                }
          })
          setCurrentCalendar(currentData)
          setCalendar(currentData.map(data => {
            return {...data , productName : productList[data.idProduct - 1]?.text}
          }))
        }else{
          toast.error('Calendar Content Error')
        }

      } catch (error) {
        toast.error('Ada Kesalahan Sever (500)')
      }
    } 

    const handleChangeCheckbox = (listCheckbox) => {
      console.log(listCheckbox)
      if(listCheckbox.product.length == 0 && listCheckbox.platform.length == 0){
        setCalendar( currentCalendar)
      }else{
        const calenderChange = calendar.filter(data => { 
          return listCheckbox.product.indexOf(data.idProduct) > -1 || listCheckbox.platform.indexOf(data.platform) > -1
        })
        setCalendar( calenderChange)
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
            <Box className='p-[20px] grow w-[100%] flex flex-col gap-[15px] '>
              <Box className='flex justify-between '>
                <AppAnimationButton className='w-auto'>
                  <AppCustomButton className='flex gap-[10px] items-center bg-SECONDARY-500 rounded-[10px] px-[15px] py-[5px] '
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
              <Box className='bg-NEUTRAL-100 w-[100%] h-[100%] hover:shadow-xl overflow-y-scroll rounded-[20px] p-[20px] border-[1px] border-TEXT-4 overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                <Calendar
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
                        status : 'success', 
                      }
                    })
                  }
                />
              </Box>
            </Box>
            <AppModalAddContent
                open={openModalAdd}
                onCloseButton = {(value)=> {
                    setOpenModalAdd(value)
                }}
                onDone={()=>{
                  fetchCalendarContent()
                }}
            />
        </AppLayout>
    ) 
}

export default CalenderPage;

