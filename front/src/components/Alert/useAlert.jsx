import { useState } from "react";

const useAlert = () => {
    const [toastState, setToastState] = useState({
        isVisible: false,
        message: ''
    });

    const showToast = (msg) => {
        setToastState({
            message: msg,
            isVisible: true
        });
    };

    const hideToast = () => {
        setToastState(prev => ({
            ...prev,
            isVisible: false
        }));
    };

    return {
        isVisible: toastState.isVisible,
        message: toastState.message,
        showToast,
        hideToast
    };
};

export default useAlert;