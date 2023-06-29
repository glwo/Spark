import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push("/recipes")
    }
  };

  const demolitionUser = (e) => {
    e.preventDefault();
    // const demouser = User
    dispatch(
      login(
        'demo@aa.io',
        'password'
      )
    )
    .then(closeModal())
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  }

  return (
    <>
    <div className="LoginFormModal">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
        <label>
          Email :
          <input
            type="text"
            // placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        </div>
        <div>
        <label>
          Password :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        </div>
        <div>
        <button className="loginModalButtons" type="submit">Log In</button>
        </div>
        <div>
        <button className="loginModalButtons" type="submit" onClick={demolitionUser}>Demo User Login</button>
        </div>
      </form>
      </div>
    </>
  );
}

export default LoginFormModal;
