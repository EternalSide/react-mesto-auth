import InfoTooltip from "../InfoToolTip/InfoTooltip";
import "./Auth.css";
import logo from "../../images/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [isRegSuccess, setIsRegSuccess] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://auth.nomoreparties.co/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "password": `${userInfo.password}`,
          "email": `${userInfo.email}`,
        }),
      });
      const { token } = await res.json();

      if (!token) {
        setIsRegSuccess(false);
        setIsInfoPopupOpen(true);
      }
      if (token) {
        localStorage.setItem("token", token);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!isRegSuccess && isInfoPopupOpen && (
        <InfoTooltip isRegSuccess={isRegSuccess} isInfoPopupOpen={isInfoPopupOpen} setIsInfoPopupOpen={setIsInfoPopupOpen} />
      )}
      <div className="auth">
        <div className="auth__header">
          <img src={logo} alt="Лого сайта" />
          <Link to="/sign-up" className="auth__link">
            Регистрация
          </Link>
        </div>
        <form className="auth__form" onSubmit={handleSubmit}>
          <h1 className="auth__title">Вход</h1>
          <input
            type="text"
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) => {
              setUserInfo((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
          />
          <input
            type="text"
            placeholder="Пароль"
            value={userInfo.password}
            onChange={(e) => {
              setUserInfo((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
            }}
          />
          <button className="auth__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
