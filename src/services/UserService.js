import axios from "./my-axios"

const fetchUsers = () => {
    return axios.get("users?page=2");
}

export { fetchUsers };