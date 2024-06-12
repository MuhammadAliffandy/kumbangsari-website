const  AppHeadline = (props) => {
    return (
        <>
        <div className="flex flex-col gap-[10px]">
            <h1 className='text-[28px] text-black font-black text-center'>
                    {props.title}
                </h1>
                <p className='text-[15px] text-black font-medium text-center'>
                    {props.subtitle}
                </p>
        </div>
        </>
    ) 
}

export default AppHeadline ;