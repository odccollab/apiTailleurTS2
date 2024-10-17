import { motion } from 'framer-motion';
import { FaComments } from 'react-icons/fa';

const WelcomePage = () => {
    return (
        <div className="main-content right-chat-active ">

            <div className="row feed-body">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, ease: "easeOut"}}
                    className="text-center"
                >
                    {/* Icon Animation */}
                    <motion.div
                        initial={{scale: 0.9}}
                        animate={{scale: [1, 1.2, 1], rotate: [0, 10, -10, 0]}}
                        transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                        className="inline-block text-blue-500 mb-4"
                    >
                        <FaComments size={50}/>
                    </motion.div>

                    {/* Header Text Animation */}
                    <motion.h1
                        className="text-5xl font-extrabold mb-3 text-blue-600"
                        animate={{scale: [1, 1.05, 1], y: [0, -5, 0]}}
                        transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                    >
                        Bienvenue dans vos discussions
                    </motion.h1>

                    {/* Subtext Animation */}
                    <motion.p
                        className="text-lg text-gray-700"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.8, duration: 0.6}}
                    >
                        Sélectionnez une conversation pour commencer
                    </motion.p>
                </motion.div>
            </div>
            </div>
            );
            };

            export default WelcomePage;
