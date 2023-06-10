import "./login.scss";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/baloshop-w.png";
import { AuthService } from "../../services/auth.service";

const Login = () => {
  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const btnRef = useRef(null);

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const navigate = useNavigate();
  const loginOnclick = () => {
    AuthService.login(usernameLogin, passwordLogin).then((response) => {
      if (localStorage.getItem("accessToken")) {
        navigate("/");
      }
    });
  };

  // const login = () => {
  //   loginRef.current.style.left = "50px";
  //   registerRef.current.style.left = "450px";
  //   btnRef.current.style.left = "0";
  // };
  return (
    <div>
      <div className="hero">
        <div className="form-box">
          <div className="social-icons">
            <img src={logo} alt="" />
          </div>

          <div id="login" ref={loginRef} className="input-group-login">
            <input
              type="text"
              className="input-field"
              placeholder="Nhập số điện thoại"
              required
              onChange={(event) => {
                setUsernameLogin(event.target.value);
              }}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Nhập mật khẩu"
              required
              onChange={(event) => {
                setPasswordLogin(event.target.value);
              }}
            />
            <div className="d-flex align-items-center">
              <input id="remember" type="checkbox" className="check-box" />
              <label style={{ marginBottom: 0 }} htmlFor="remember">
                Ghi nhớ mật khẩu
              </label>
            </div>
            <div className="submit-btn" onClick={loginOnclick}>
              Đăng nhập
            </div>
          </div>
        </div>
      </div>
      <div>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Login;
