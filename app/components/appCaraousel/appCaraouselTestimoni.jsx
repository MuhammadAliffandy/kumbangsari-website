'use client'

import React from 'react';
import Carousel from 'react-material-ui-carousel';


function AppCarousel(props) {


    const renderCustomItem = (item, index) => (
        <div className='h-[50%] flex flex-col items-center justify-center gap-[20px]' key={index}>
            <h2 className='text-TEXT-5 text-[24px] text-center font-bold font-poppins'>{item.title}</h2>
            <p className='text-TEXT-5 text-[12px] text-center font-medium  font-poppins' >{item.subtitle}</p>
            <div className='flex items-center gap-[10px]'>
                <img className='w-[40px] h-[40px] bg-transparent rounded-[100%]' src={item.image} alt={item.name} />
                <p className='text-[14px] text-TEXT-5'>{item.username}</p>
            </div>
        </div>
    );

    return (
    <Carousel
        className='w-[70%] h-[70%] xl:h-[50%] '
        animation="slide" 
        autoPlay={true} 
        indicators={true} 
        timeout={800} 
        fullHeightHover={false} 
        cycleNavigation={true} 
        swipe={true} 
        draggable={true} 
        showNavButtonsOnHover={false} 
        stopAutoPlayOnHover={false} 
        >
        {props.items.map((item, index) => (
            renderCustomItem(item, index)
        ))}
        </Carousel>
  );
}

export default AppCarousel;
