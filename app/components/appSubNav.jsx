import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const AppSubNav = (props) => {
    return (
        <>
            <div className="flex items-center gap-[10px]">
                <h1 className={`text-[12px] font-medium cursor-pointer ${ props.status == 'product1' ? 'text-black' : 'text-opacity-[50%] text-black'  }`} onClick={props.handleSub1} >Produk 1</h1>
                { props.value == 1 || props.value == 2 ? <FontAwesomeIcon className={`${ props.status == 'product2' ? 'text-black' : 'text-opacity-[50%] text-black'  }`} icon={faChevronRight} style={{ fontSize: '12px' }} /> : <></>}
                {
                    props.value == 2 ? 
                    <>
                        <h1 className={`${ props.status == 'product2' ? 'text-black' : 'text-opacity-[50%] text-black'  } text-[12px] font-medium cursor-pointer`} onClick={props.handleSub2} >Produk 2</h1>
                    </> :
                    props.value == 3 ? 
                    <>
                        <FontAwesomeIcon className={`${ props.status == 'product2' ? 'text-black' : 'text-opacity-[50%] text-black'  }`} icon={faChevronRight} style={{ fontSize: '12px' }} />
                        <h1 className={`${ props.status == 'product2' ? 'text-black' : 'text-opacity-[50%] text-black'  } text-[12px] font-medium cursor-pointer`} onClick={props.handleSub2} >Produk 2</h1>
                        <FontAwesomeIcon className={`${ props.status == 'product3' ? 'text-black' : 'text-opacity-[50%] text-black'  }`} icon={faChevronRight} style={{ fontSize: '12px' }} />
                        <h1 className={`${ props.status == 'product3' ? 'text-black' : 'text-opacity-[50%] text-black'  } text-[12px] font-medium cursor-pointer`} onClick={props.handleSub3} >Produk 3</h1> 
                    </> : null
                }
            </div>
        </>
    )
}

export default AppSubNav;