import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import "../login.scss"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActionLogin } from "../redux/actions/userAction";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector(state => state.user.isLoading);
  const userState = useSelector(state => state.user.userState);


  useEffect(() => {
    if (userState && userState.auth) {
      navigate("/");
    }
  }, [userState]);

  const handleLogin = async () => {
    dispatch(userActionLogin(email, password));
  }
  // console.log(">>> check state email: ", email);
  return (
    <>
      <div className=" d-flex flex-column align-items-center">
        <div className="col-12 col-sm-3 mt-3">
          <div className="text-center">
            Log in
          </div>
          <div className="mb-3">
            <label className="form-label" placeholder="Username or email ...">Username or email ( eve.holt@reqres.in )</label>
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label" placeholder="Password ...">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-danger w-50"
              disabled={!(email && password) || (email && password && isLoading) ? true : false}
              onClick={handleLogin}
            >
              {isLoading && <i className="fa-solid fa-sync fa-spin px-2"></i>}
              Log in
            </button>
          </div>
          <div className="text-center mt-4 ">
            <i className="fa-solid fa-angles-left"></i>
            <Link to="/" className="text-decoration-none text-black ms-1">Go back</Link>
          </div>
        </div>
      </div>
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
    </>
  )
}

export default Login;