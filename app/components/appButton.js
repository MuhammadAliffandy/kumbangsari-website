
const AppButton = (props) => {
    return (
        <button type={props.type} onClick={props.onClick} className={`w-[100%] ${props.fontSize} py-[15px] bg-black text-white font-poppins rounded-[15px]`}>
            {props.text}
        </button>
    ) 
}

export default AppButton;