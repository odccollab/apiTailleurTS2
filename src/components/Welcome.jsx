import React from 'react';
import { motion } from 'framer-motion';

const AccDisc = () => {
    return (
        <div className="main-content flex-1 flex items-center justify-center bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <motion.h1
                    className="text-4xl font-bold mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Accueil des Discussions
                </motion.h1>
                <p className="text-xl text-gray-600">Bienvenue dans votre espace de discussion</p>
            </motion.div>
        </div>
    );
};

export default AccDisc;