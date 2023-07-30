import axios from "./my-axios"

const fetchUsers = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const addUser = (data) => {
    return axios.post('/api/users', data);
}

const editUser = (id, data) => {
    return axios.put(`/api/users/${id}`, data);
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
}

export { fetchUsers, addUser, editUser, deleteUser };