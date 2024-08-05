
const AppButton = (props) => {
    return (
        <button type={props.type} onClick={props.onClick} className={ props.className || `w-[100%] ${props.fontSize}  py-[15px] bg-PRIMARY-500 hover:bg-PRIMARY-600 shadow-xl text-white font-poppins rounded-[15px]`}>
            {props.text}
        </button>
    ) 
}

export default AppButton;