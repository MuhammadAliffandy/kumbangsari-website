const AppTextWithLine = (props) => {
    return(
        <div className="flex gap-[10px] w-[100%] items-center">
            <div style={{ height : '2px' , width : props.width ? props.width : '30%' }} className="bg-black bg-opacity-[25%]"></div>
            <h1 className='text-[15px] text-black font-medium'>{props.text}</h1>
            <div style={{ height : '2px' , width : props.width ? props.width : '30%' }} className="bg-black bg-opacity-[25%]"></div>
        </div>
    )
}

export default AppTextWithLine;