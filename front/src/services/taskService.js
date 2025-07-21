import axiosInstance from "./api"

export default class TaskService {
    async getTaskList() {
        return await axiosInstance.get('/task')
    }
    async createTask(task) {
        return await axiosInstance.post('/task', task)
    }
    async deleteTask(id) {
        return await axiosInstance.delete(`/task/${id}`)
    }
    async updateTask(id, task) {
        return await axiosInstance.patch(`/task/${id}`, task)
    }
}