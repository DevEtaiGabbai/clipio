"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import { useMedia } from "react-use";
import { Dialog } from "./dialog";
import { Drawer } from "./drawer";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose?: () => void;
}

const Modal = ({ children, isOpen, setIsOpen, onClose }: Props) => {

    const router = useRouter();

    const handleClose = ({ dragged }: { dragged: boolean }) => {
        onClose && onClose();

        if (isOpen) {
            setIsOpen(false);
        } else {
            router.back();
        }
    };

    const isDesktop = useMedia("(max-width: 768px)", false);

    if (isDesktop) {
        return (
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                {children}
            </Dialog>
        )
    }

    return (
        <Drawer
            open={isOpen}
            onOpenChange={setIsOpen}
            direction="bottom"
        >
            {children}
        </Drawer>
    )
};

export default Modal
