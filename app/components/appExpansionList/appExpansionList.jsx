import React, { useState , useRef } from 'react';
import { motion } from 'framer-motion';

const AppExpansionList = (props) => {
    const [expanded, setExpanded] = useState(false);
    const handleRef = useRef(null);

    const toggleExpansion = () => {
        setExpanded(!expanded);
        
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
                    width:'100%',
                    overflow: 'hidden',
                    position: 'absolute',
                    zIndex: 999 
                }}
            
                className={`${ props.componentItemStyle || 'w-[200px] h-[80px] bg-red-500' }`}>
                { props.componentItemList}
            </motion.div>
        </div>
    );
};

export default AppExpansionList;
