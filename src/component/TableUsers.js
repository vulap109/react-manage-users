import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchUsers } from "../services/UserService";

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);


    useEffect(() => {
        getUser();
    }, []);


    const getUser = async () => {
        let res = await fetchUsers();
        if (res && res.data) {
            setListUsers(res.data);
        }
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.map((item, index) => {
                            return (
                                <tr key={`user${item.id}`}>
                                    <td>{item.id}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.email}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}
export default TableUsers;