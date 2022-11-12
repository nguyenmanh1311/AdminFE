import { useState } from "react";
import clsx from "clsx";
import styles from "./login.module.scss";
import authService from "../../services/auth.service";
import { useUser } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
const Login = () => {
  const [login, setLogin] = useState(true);
  const { isLoggedIn, setUserState } = useUser();
  const [email, setEmail] = useState("");
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [password, setPassword] = useState("");
  const handleEmailChange = () => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = () => {
    setPassword(event.target.value);
  };
  const [alert, setAlert] = useState(false);
  const handleLoginSubmit = async () => {
    event.preventDefault();
    try {
      const res = await authService.login(email, password);
      if (res.statusCode) {
        setTimeout(() => {
          setUserState(res);
        }, 1500);
      } else {
        setAlert(true);
      }
    } catch (error) {}
  };
  const handleSignupSubmit = () => {};

  if (redirectToReferrer) {
    return <Navigate to="/" />;
  }
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.backbox}>
          <div className={clsx(styles.loginMsg, !login && styles.hide)}>
            {" "}
            <div className={styles.textcontent}>
              <p className={styles.title}>Bạn chưa có tài khoản?</p>
              <p>Đăng ký tại đây</p>
              <button id="switch1" onClick={() => setLogin(false)}>
                Đăng ký
              </button>
            </div>
          </div>
          <div className={clsx(styles.signupMsg, login && styles.hide)}>
            <div className={styles.textcontent}>
              <p className={styles.title}>Bạn đã có tài khoản rồi</p>
              <p>Đăng nhập tại đây</p>
              <button id="switch2" onClick={() => setLogin(true)}>
                Đăng nhập
              </button>
            </div>
          </div>
        </div>

        <div className={styles.frontbox}>
          {alert && <p className={styles.alert}>Đăng nhập thất bại</p>}
          <form
            onSubmit={handleLoginSubmit}
            className={clsx(styles.login, !login && styles.hide)}
          >
            <h2>Đăng nhập</h2>
            <div className={styles.inputbox}>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="email"
                tabIndex={1}
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="password"
                tabIndex={2}
              />
            </div>
            <p>Quên mật khẩu</p>
            <button type="submit">Đăng nhập</button>
          </form>

          <form
            onSubmit={handleSignupSubmit}
            className={clsx(styles.signup, login && styles.hide)}
          >
            <h2>Đăng ký</h2>
            <div className={styles.inputbox}>
              <input
                type="text"
                name="fullname"
                placeholder="fullname"
                tabIndex={1}
              />
              <input
                type="text"
                name="email"
                placeholder="email"
                tabIndex={2}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                tabIndex={3}
              />
            </div>
            <button type="submit">Đăng ký</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
