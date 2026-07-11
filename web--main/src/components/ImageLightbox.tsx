import { motion } from "motion/react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface Props {
    image: string;
    onClose: () => void;
}

export const ImageLightbox = ({ image, onClose }: Props) => {

    const modal = (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >

            {/* CLOSE BUTTON */}

            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-3 rounded-full bg-black/50 border border-white/10 hover:bg-black/70"
            >
                <X className="w-6 h-6 text-white" />
            </button>

            {/* IMAGE */}

            <motion.img
                src={image}
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
            />

        </motion.div>
    );

    return createPortal(modal, document.body);
};