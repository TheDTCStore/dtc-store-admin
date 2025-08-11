import React, { createContext, useContext, useState } from "react";
import { Dialog } from "@/components/ui/dialog";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
    const [modal, setModal] = useState(null);

    const showModal = (component, props = {}) => setModal({ component, props });
    const hideModal = () => setModal(null);

    const ModalComponent = modal?.component;

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            <Dialog open={!!ModalComponent} onOpenChange={hideModal}>
                {ModalComponent && <ModalComponent {...modal.props} />}
            </Dialog>
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within ModalProvider");
    return context;
}
