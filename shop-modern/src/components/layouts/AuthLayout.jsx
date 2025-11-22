import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title, subtitle, image }) => {
    return (
        <div className="min-h-screen flex pt-20">
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white py-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3 tracking-tight">{title}</h1>
                        <p className="text-gray-500 text-lg">{subtitle}</p>
                    </div>
                    {children}
                </motion.div>
            </div>
            <div className="hidden lg:block w-1/2 bg-gray-100 relative overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={image}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Auth Background"
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                <div className="absolute bottom-12 left-12 right-12 text-white">
                    <p className="text-lg font-medium opacity-90 mb-2">Lumos Collection 2025</p>
                    <h3 className="text-4xl font-bold leading-tight">Tarzını yansıtan en özel parçalar şimdi seninle.</h3>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;