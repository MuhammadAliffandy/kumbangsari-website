import React from 'react';
import { motion } from 'framer-motion';

const AppAnimationLayout = (props) => {
    return (
        <motion.div
            className="box"
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }}    
            transition={{ duration: 1 }}   
        >
            {props.children}
        </motion.div>
    );
}

export default AppAnimationLayout;
