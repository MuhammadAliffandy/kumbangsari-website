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
        animation="slide" // or 'fade' or 'zoom'
        autoPlay={true} // Set to true for autoplay
        indicators={true} // Set to true to show indicators
        timeout={500} // Set the interval time between slides in milliseconds
        navButtonsAlwaysVisible={true} // Set to true to always show navigation buttons
        navButtonsProps={{ style: { backgroundColor: 'transparent', color: 'white' } }} // Customize navigation buttons style
        navButtonsWrapperProps={{ style: { bottom: '20px' } }} // Customize navigation buttons wrapper style
        fullHeightHover={false} // Set to true to allow carousel item to take full height on hover
        cycleNavigation={true} // Set to true to enable cycle navigation
        swipe={true} // Set to true to enable swipe navigation
        draggable={true} // Set to true to enable dragging
        showNavButtonsOnHover={false} // Set to true to show navigation buttons only on hover
        stopAutoPlayOnHover={false} // Set to true to stop autoplay on hover
        renderIndicator={(onClickHandler, active, index, label) => (
            <button
            style={{
                width: active ? '20px' : '12px',
                height: '12px',
                backgroundColor: active ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.5)',
                border: 'none',
                borderRadius: '50%',
                margin: '0 5px',
                cursor: 'pointer',
            }}
            onClick={onClickHandler}
            />
        )}
        >
        {props.items.map((item, index) => (
            renderCustomItem(item, index)
        ))}
        </Carousel>
  );
}

export default AppCarousel;
