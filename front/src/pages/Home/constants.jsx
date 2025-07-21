import dateFormatter from '../../utils/dateFormatter';

export const initialTask = {
    id: '',
    text: '',
    completed: false,
    userId: null,
    created: null,
}

export const columns = [
    {
        label: "Titulo",
        key: "title",
    },
    {
        label: "Descripcion",
        key: "text"
    },
    {
        label: "Fecha de creación",
        key: "created",
        render: (value) => {
            return dateFormatter(value)
        },
    },
];