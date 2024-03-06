const  AppHeadline = (props) => {
    return (
        <>
            <h1 className='text-[32px] text-black font-black'>
                {props.title}
            </h1>
            <p className='text-[15px] text-black font-medium'>
                {props.subtitle}
            </p>
        </>
    ) 
}

export default AppHeadline ;