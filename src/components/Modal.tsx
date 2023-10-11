'use client'
import Portal from '@/components/Portal'
import { motion } from 'framer-motion'
import classNames from 'class-names'

interface Modal {
    visible: boolean;
    size: string,
    onClose: () => void;
    children: any;
}


export default function Modal({ visible, onClose, children, size }: Modal) {

    if (!visible) return
    return <Portal>
        <motion.div animate={{ opacity: [0, 100] }} exit={{ opacity: 0 }} className="w-full h-full fixed inset-0 top-0 z-40 bg-primary bg-opacity-90 flex items-center justify-center p-6" onClick={onClose}>
            <motion.div animate={{ translateY: ['-100%', '0%'] }} exit={{ translateX: '-100%' }} onClick={(e) => e.stopPropagation()} className={classNames("bg-secondary p-6 border border-primary rounded-none w-full", size ? size : 'max-w-md')}>
                {children}
            </motion.div>
        </motion.div>
    </Portal>
}