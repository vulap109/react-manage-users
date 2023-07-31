import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchUsers } from "../services/UserService";
import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import ModalAddUser from "./ModalAddUser";
import _ from "lodash";

const TableUsers = (props) => {
    // initial state
    const [listUsers, setListUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [showAddUser, setShowAddUser] = useState(false);
    const [modalAction, setModalAction] = useState(1);
    const [dataUser, setDataUser] = useState({});
    const [sortBy, setSortBy] = useState("");
    const [idSortIcon, setIdSortIcon] = useState("fa-solid fa-sort");
    const [fNameSortIcon, setFNameSortIcon] = useState("fa-solid fa-sort");


    useEffect(() => {
        // get list user on first load
        getUser(1);
    }, []);

    // get list user per page
    const getUser = async (page) => {
        let res = await fetchUsers(page);
        if (res && res.data) {
            setListUsers(res.data);
            setTotalPages(res.total_pages);
        }
    }

    // handle change current page
    const handlePageClick = (e) => {
        getUser(+e.selected + 1);
    }

    // open modal for add user
    const handleAddUser = () => {
        setShowAddUser(true);
        setModalAction(1);
    }
    // open modal for edit user
    const handleEditUser = (user) => {
        setShowAddUser(true);
        setModalAction(2);
        setDataUser(user);
    }
    // open modal for confirm delete user
    const handleDeleteUser = (user) => {
        setShowAddUser(true);
        setModalAction(3);
        setDataUser(user);
    }

    // close modal
    const handleCloseModal = () => { setShowAddUser(false); }

    // add user to the list
    const handleUpdateListUsers = (user) => {
        setListUsers([user, ...listUsers]);
    }
    // edit user to the list
    const handleEditListUser = (user) => {
        let listUsersTmp = [...listUsers];
        let objIndex = listUsers.findIndex(obj => obj.id === user.id);
        if (objIndex !== -1) {
            listUsersTmp[objIndex].first_name = user.first_name;
            setListUsers(listUsersTmp);
        }
    }
    // delete user from the list
    const handleDeleteListUser = (user) => {
        let listUsersTmp = [...listUsers];
        listUsersTmp = listUsersTmp.filter(obj => obj.id !== user.id);
        setListUsers(listUsersTmp);
    }

    // sort data on the table
    const handleSort = (field) => {
        let listUsersTmp = [...listUsers];
        if (field === "id") {
            setFNameSortIcon("fa-solid fa-sort");
            switch (sortBy) {
                case "":
                    setSortBy("asc");
                    setIdSortIcon("fa-solid fa-sort-up");
                    listUsersTmp = _.orderBy(listUsersTmp, [field], ['asc']);
                    setListUsers(listUsersTmp);
                    break;

                case "asc":
                    setSortBy("desc");
                    setIdSortIcon("fa-solid fa-sort-down");
                    listUsersTmp = _.orderBy(listUsersTmp, [field], ['desc']);
                    setListUsers(listUsersTmp);
                    break;

                default:
                    setSortBy("");
                    setIdSortIcon("fa-solid fa-sort");
                    break;
            }
        } else {
            setIdSortIcon("fa-solid fa-sort");
            switch (sortBy) {
                case "":
                    setSortBy("asc");
                    setFNameSortIcon("fa-solid fa-sort-up");
                    listUsersTmp = _.orderBy(listUsersTmp, [field], ['asc']);
                    setListUsers(listUsersTmp);
                    break;

                case "asc":
                    setSortBy("desc");
                    setFNameSortIcon("fa-solid fa-sort-down");
                    listUsersTmp = _.orderBy(listUsersTmp, [field], ['desc']);
                    setListUsers(listUsersTmp);
                    break;

                default:
                    setSortBy("");
                    setFNameSortIcon("fa-solid fa-sort");
                    break;
            }
        }
    }

    const handleSearch = _.debounce((keyWord) => {
        if (keyWord) {
            let listUsersTmp = [...listUsers];
            listUsersTmp = listUsersTmp.filter(item => item.email.includes(keyWord));
            setListUsers(listUsersTmp);
        } else {
            getUser(1);
        }
    }, 500)

    return (
        <>
            <div className="d-flex justify-content-between align-items-center my-2">
                <span>List Users:</span>
                <button type="button" className="btn btn-primary" onClick={handleAddUser}>Add User</button>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Search</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="type Email to search"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(event) => handleSearch(event.target.value)}
                />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th
                            className="d-flex justify-content-center align-items-center"
                            onClick={() => handleSort("id")}
                        >
                            <span>Id</span>
                            <i className={idSortIcon + " ps-2"}></i>
                        </th>
                        <th
                            className="justify-content-center align-items-center"
                            onClick={() => handleSort("first_name")}
                        >
                            <span>First Name</span>
                            <i className={fNameSortIcon + " ps-2"}></i>
                        </th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
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
                                    <td>
                                        <button type="button" className="btn btn-warning py-1 me-3" onClick={() => handleEditUser(item)}>Edit</button>
                                        <button type="button" className="btn btn-danger py-1" onClick={() => handleDeleteUser(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination justify-content-center"
                activeClassName="active"
            />
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
            />
            <ModalAddUser
                modalAction={modalAction}
                show={showAddUser}
                dataUser={dataUser}
                handleCloseModal={handleCloseModal}
                handleUpdateListUsers={handleUpdateListUsers}
                handleEditListUser={handleEditListUser}
                handleDeleteListUser={handleDeleteListUser}
            />
        </>
    )
}
export default TableUsers;