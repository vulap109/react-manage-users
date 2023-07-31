import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "../login.scss"
import { loginUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    setLoading(true);
    let res = await loginUser({ email: email, password: password });
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoading(false);
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
              disabled={!(email && password) || (email && password && loading) ? true : false}
              onClick={handleLogin}
            >
              {loading && <i className="fa-solid fa-sync fa-spin px-2"></i>}
              Log in
            </button>
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