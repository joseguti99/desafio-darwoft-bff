import { useEffect, useState } from "react"
import TaskService from "../../services/taskService"
import { HttpStatusCode } from "axios"
import { initialTask } from "./constants"
import useAlert from "../../components/Alert/useAlert"

export default function useHome() {
    const [taskForm, setTaskForm] = useState(initialTask)
    const [taskList, setTaskList] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { message: messageAlert, isVisible: isVisibleAlert, showToast, hideToast } = useAlert();

    const [search, setSearch] = useState('');

    const handleOpenModalCreate = () => {
        setTaskForm(initialTask);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSubmit = () => {
        const lowerSearch = search.toLowerCase();
        setFilteredTasks(
            taskList.filter((row) =>
                row.title.toLowerCase().includes(lowerSearch) ||
                row.text.toLowerCase().includes(lowerSearch)
            )
        );
    };

    const handleChangeTask = (e) => {
        setTaskForm({
            ...taskForm,
            [e.target.name]: e.target.value,
        })
    }

    const getTaskList = async () => {
        try {
            const taskService = new TaskService()
            const response = await taskService.getTaskList()
            const { data, status } = response
            if (status === HttpStatusCode.Ok) {
                const sort = data.sort((a, b) => a.created > b.created ? -1 : 1)
                setTaskList(sort)
                return;
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setTaskList([])
        }
    }

    const handleSuccess = () => {
        setTaskForm(initialTask)
        getTaskList()
        handleCloseModal()
    }

    const updateTask = async (id, task) => {
        const taskService = new TaskService()
        const { title, text, completed } = task
        const body = { title, text, completed };
        const response = await taskService.updateTask(id, body)

        if (response.status === HttpStatusCode.Ok) {
            handleSuccess()
            showToast('Tarea actualizada exitosamente')
        }
    }

    const createTask = async (task) => {
        const taskService = new TaskService()
        const { title, text } = task
        const response = await taskService.createTask({ title, text })

        if (response.status === HttpStatusCode.Ok) {
            handleSuccess()
            showToast('Tarea creada exitosamente')
        }
    }

    const createOrEditTask = async (e) => {
        e.preventDefault()
        try {
            if (taskForm.id) {
                await updateTask(taskForm.id, taskForm)
            } else {
                await createTask(taskForm)
            }
        } catch (httpError) {
            const { response } = httpError
            if (response?.status === HttpStatusCode.BadRequest) {
                setErrorMessage(response.data.message)
            }
        }
    }

    const markAsCompleted = async (id, task) => {
        task.completed = !task.completed
        await updateTask(id, task)
    }

    const deleteTask = async (id) => {
        const taskService = new TaskService()
        const newTask = await taskService.deleteTask(id)
        if (newTask.status === HttpStatusCode.Ok) {
            handleSuccess()
            showToast('Tarea eliminada exitosamente')
        }
    }

    const handleEditTask = (row) => {
        setTaskForm(row)
        setOpenModal(true)
    }

    const CardStatesData = [
        { label: "Total Tareas", value: taskList?.length || 0 },
        { label: "Pendientes", value: taskList?.filter((row) => !row.completed).length || 0 },
        { label: "Completadas", value: taskList?.filter((row) => row.completed).length || 0 },
    ]

    useEffect(() => {
        getTaskList()
    }, [])

    useEffect(() => {
        if (!search.trim()) {
            setFilteredTasks(taskList);
        }
    }, [search, taskList]);

    return {
        taskForm,
        taskList,
        getTaskList,
        createOrEditTask,
        updateTask,
        deleteTask,
        handleChangeTask,
        handleSubmit,
        filteredTasks,
        search,
        setSearch,
        handleEditTask,
        markAsCompleted,
        // Modal
        openModal,
        handleOpenModalCreate,
        handleCloseModal,
        // Error handling
        errorMessage,
        // Alert
        messageAlert,
        isVisibleAlert,
        hideToast,
        CardStatesData
    }
}