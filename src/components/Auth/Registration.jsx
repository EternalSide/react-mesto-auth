import "./Auth.css";
import logo from "../../images/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InfoTooltip from "../InfoToolTip/InfoTooltip";
import { Link } from "react-router-dom";
const Registration = () => {
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
      const res = await fetch("https://auth.nomoreparties.co/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "password": `${userInfo.password}`,
          "email": `${userInfo.email}`,
        }),
      });
      const { data } = await res.json();
      if (!data) {
        setIsRegSuccess(false);
        setIsInfoPopupOpen(true);
      }
      if (data) {
        setIsRegSuccess(true);
        setIsInfoPopupOpen(true);
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setIsRegSuccess(false);
      setIsInfoPopupOpen(true);
    }
  };
  return (
    <>
      {isRegSuccess && isInfoPopupOpen && (
        <InfoTooltip isRegSuccess={isRegSuccess} isInfoPopupOpen={isInfoPopupOpen} setIsInfoPopupOpen={setIsInfoPopupOpen} />
      )}
      {!isRegSuccess && isInfoPopupOpen && (
        <InfoTooltip isRegSuccess={isRegSuccess} isInfoPopupOpen={isInfoPopupOpen} setIsInfoPopupOpen={setIsInfoPopupOpen} />
      )}
      <div className="auth">
        <div className="auth__header">
          <img src={logo} alt="Лого сайта" />
          <Link to="/sign-in" className="auth__link">
            Войти
          </Link>
        </div>
        <form className="auth__form" onSubmit={handleSubmit}>
          <h1 className="auth__title">Регистрация</h1>
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
            Зарегистрироваться
          </button>
          <p>
            Уже зарегистрированы?{" "}
            <span className="auth__question-login-button" onClick={() => navigate("/sign-in")}>
              Войти
            </span>
          </p>
        </form>
      </div>
    </>
  );
};
export default Registration;
