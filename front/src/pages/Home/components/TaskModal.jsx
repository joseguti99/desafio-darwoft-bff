import { Modal, Box, Button } from "@mui/material";
import { TaskForm } from "../../../components";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function TaskModal({
    open,
    onClose,
    handleSubmit,
    handleChange,
    initialData,
}) {
    const isEdit = initialData?.title?.length && initialData?.text?.length
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="employee-modal-title">
            <Box sx={style}>
                <TaskForm
                    form={initialData}
                    isEditionMode={isEdit}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button onClick={onClose} sx={{ mr: 1 }}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
