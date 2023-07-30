import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addUser, deleteUser, editUser } from "../services/UserService";
import { useEffect } from "react";

const ModalAddUser = (props) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const { modalAction, dataUser, show, handleCloseModal, handleUpdateListUsers, handleEditListUser, handleDeleteListUser } = props;

  useEffect(() => {
    if (show && modalAction === 2) {
      setName(dataUser.first_name)
    }
  }, [dataUser, show, modalAction])

  const handleSaveUser = async () => {
    let res = await addUser({ name: name, job: job });

    if (res && res.id) {
      // something to refesh listusers, but this API doesn't save to DB
      // this function will work, for now
      handleUpdateListUsers({ id: res.id, first_name: res.name });

      toast.success("Add user successfully!");
    } else {
      toast.error("Add user error!");
    }
    handleClose();
  }

  const handleEditUser = async () => {
    let res = await editUser(dataUser.id, { name: name, job: job });

    if (res && res.name) {
      // something to refesh listusers, but this API doesn't save to DB
      // this function will work, for now
      handleEditListUser({ id: dataUser.id, first_name: res.name });

      toast.success("Edit user successfully!");
    } else {
      toast.error("Edit user error!");
    }
    handleClose();
  }

  const handleDelteUser = async () => {
    let res = await deleteUser(dataUser.id);
    if (res && res.statusCode) {
      // something to refesh listusers, but this API doesn't save to DB
      // this function will work, for now
      handleDeleteListUser({ id: dataUser.id });

      toast.success("Delete user successfully!");
    } else {
      toast.error("Delete user error!");
    }
    handleClose();
  }

  // Close modal
  const handleClose = () => {
    setName('');
    setJob('');
    handleCloseModal();
  }

  // render component to <Modal.Body>
  const headerRender = () => {
    switch (modalAction) {
      case 2:
        return (
          <Modal.Title>Edit user</Modal.Title>
        )
      case 3:
        return (
          <Modal.Title>Delete user</Modal.Title>
        )
      default:
        return (
          <Modal.Title>Add user</Modal.Title>
        )
    }
  }

  // render component to <Modal.Footer>
  const footerRender = () => {
    switch (modalAction) {
      case 2:
        return (
          <Button variant="primary" onClick={handleEditUser}>
            Edit
          </Button>
        )
      case 3:
        return (
          <Button variant="primary" onClick={handleDelteUser}>
            Confirm
          </Button>
        )
      default:
        return (
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        )
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {headerRender()}
        </Modal.Header>
        <Modal.Body>
          {
            modalAction === 3 ?
              <>
                <span>Do you want to delete this user:</span>
                <span>Email: {dataUser.email}</span>
              </>
              :
              <>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                  <label className="form-label">Job</label>
                  <input type="text" className="form-control" id="exampleInputPassword1" value={job} onChange={(e) => setJob(e.target.value)} />
                </div>
              </>
          }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {footerRender()}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalAddUser;