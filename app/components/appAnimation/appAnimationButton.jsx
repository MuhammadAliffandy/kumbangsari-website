import React from 'react';
import { motion } from 'framer-motion';

const AppAnimationButton = (props) => {
    return (
        <motion.div
            className={props.className || 'w-[100%]'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}  
        >
            {props.children}
        </motion.div>
    );
}

export default AppAnimationButton;
