import useHome from "./useHome"
import { NavBar, Search, CustomTable, Alert, CardStates } from "../../components"
import { Box, Button, Grid, Switch, Typography } from "@mui/material"
import { columns } from "./constants"
import TaskModal from "./components/TaskModal"
import { Delete, Edit } from "@mui/icons-material";
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import { green, red } from "@mui/material/colors"
import { useAuth } from "../../context/auth/authContext"

export default function Home() {
    const {
        taskForm,
        handleSubmit,
        filteredTasks,
        search,
        setSearch,
        openModal,
        handleOpenModalCreate,
        handleCloseModal,
        createOrEditTask,
        handleChangeTask,
        handleEditTask,
        markAsCompleted,
        deleteTask,
        messageAlert,
        isVisibleAlert,
        hideToast,
        CardStatesData
    } = useHome()
    const { user } = useAuth()
    const userName = user?.email?.includes('@') ? user.email.split('@')[0]?.toUpperCase() : '';

    const columnsDinamic = [
        ...columns,
        {
            label: "Estado",
            key: "completed",
            render: (value, row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {value ? (
                        <>
                            <VerifiedIcon sx={{ color: green[500] }} />
                            <span style={{ color: green[700], fontWeight: 'bold' }}>Completado</span>
                        </>
                    ) : (
                        <>
                            <CancelIcon sx={{ color: red[500] }} />
                            <span style={{ color: red[700], fontWeight: 'bold' }}>Pendiente</span>
                        </>
                    )}
                    <Switch
                        checked={value}
                        onChange={() => markAsCompleted(row.id, row)}
                        color="primary"
                        size="small"
                    />
                </div>
            )
        },
        {
            label: "Editar",
            key: "editar",
            render: (_, row) => (
                <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEditTask(row)}
                >
                    Editar
                </Button>
            ),
        },
        {
            label: "Eliminar",
            key: "eliminar",
            render: (_, row) => (
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => deleteTask(row.id)}
                >
                    Eliminar
                </Button>
            ),
        }
    ]
    return (
        <>
            <NavBar />
            <Box display='flex' justifyContent='space-between' alignItems='center' p={2}>
                <Typography
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                    }}
                >
                    ¡ Bienvenido, {userName} !
                </Typography>
                <Button variant="contained" color="primary" onClick={handleOpenModalCreate}>
                    Crear tarea
                </Button>
            </Box>
            <CardStates data={CardStatesData} />
            <Grid display='flex' justifyContent='space-between' alignItems='center' mx={1} gap={2}>
                <Search value={search} setValue={setSearch} onSearch={handleSubmit} />
            </Grid>
            <Grid mx={1} mt={2}>
                <CustomTable columns={columnsDinamic} rows={filteredTasks} />
            </Grid>
            <TaskModal
                open={openModal}
                onClose={handleCloseModal}
                handleSubmit={createOrEditTask}
                handleChange={handleChangeTask}
                initialData={taskForm} />
            <Alert
                message={messageAlert}
                isVisible={isVisibleAlert}
                onClose={hideToast}
            />
        </>
    )
}