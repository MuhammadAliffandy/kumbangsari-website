'use client'

import React from 'react';
import Carousel from 'react-material-ui-carousel';

function AppCarousel(props) {


    const renderCustomItem = (item, index) => (
        <div className='h-[80%] flex flex-col items-center justify-center gap-[20px]' key={index}>
            <img className='w-[460px] h-[360px] bg-gray-500 rounded-[15px]' src={item.image} alt={item.name} />
            <h2 className='text-white text-[28px] font-bold font-poppins'>{item.name}</h2>
            <p className='text-white text-[14px] text-center font-medium  font-poppins' >{item.description}</p>
        </div>
    );

    return (
    <Carousel
        className='w-[70%] h-[70%]'
        animation="slide" 
        autoPlay={true} 
        indicators={true} 
        timeout={500} 
        fullHeightHover={false} 
        cycleNavigation={true} 
        swipe={true} 
        draggable={true} 
        showNavButtonsOnHover={false} 
        stopAutoPlayOnHover={false} 
        // renderIndicator={(onClickHandler, active, index, label) => (
        //     <button
        //     style={{
        //         width: active ? '20px' : '12px',
        //         height: '12px',
        //         backgroundColor: active ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.5)',
        //         border: 'none',
        //         borderRadius: '50%',
        //         margin: '0 5px',
        //         cursor: 'pointer',
        //     }}
        //     onClick={onClickHandler}
        //     />
        // )}
        >
        {props.items.map((item, index) => (
            renderCustomItem(item, index)
        ))}
        </Carousel>
  );
}

export default AppCarousel;
