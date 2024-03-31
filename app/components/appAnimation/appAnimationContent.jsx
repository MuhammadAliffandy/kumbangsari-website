import React from 'react';
import { motion } from 'framer-motion';

const AppAnimationContent = (props) => {
    return (
        <motion.div
            className='w-[100%]'
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.9 }}  
        >
            {props.children}
        </motion.div>
    );
}

export default AppAnimationContent;
