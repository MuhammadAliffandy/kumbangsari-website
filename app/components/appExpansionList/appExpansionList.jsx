import React, { useState , useRef } from 'react';
import { motion } from 'framer-motion';

const AppExpansionList = (props) => {
    const [expanded, setExpanded] = useState(false);
    const handleRef = useRef(null);

    const toggleExpansion = () => {
        // setExpanded(!expanded);
        
        if (expanded) {
            setExpanded(false);
        } else {
            const handleWidth = handleRef.current.offsetWidth;
            setExpanded(true);
            handleRef.current.style.width = handleWidth + 'px';
            console.log( handleRef.current.style.width )
        }
        props.onClick(expanded)
        
        
    };

    return (
        <div ref={handleRef} className= {props.style  || 'text-black'}>
            <motion.div 
                onClick={toggleExpansion} 
                style={{ cursor: 'pointer'}}
            >
                {
                props.componentHandle ?  props.componentHandle :
                'CLICK'}
            </motion.div>
            <motion.div
                initial={false}
                animate={{ height: expanded ? 'auto' : 0 }} 
                style={{ 
                    width:'auto',
                    overflow: 'hidden',
                    position: 'absolute',
                    padding: expanded ?  '10px': '0px 10px',
                    zIndex: 999 //
    
                }}
            
                className={`${ props.componentItemStyle || 'w-[200px] h-[80px] bg-red-500' }`}>
                { props.componentItemList}
            </motion.div>
        </div>
    );
};

export default AppExpansionList;
