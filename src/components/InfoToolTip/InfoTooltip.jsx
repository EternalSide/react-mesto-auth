import "./InfoTooltip.css";
import Success from "../../images/Success.svg";
import Fail from "../../images/Fail.svg";
const InfoTooltip = ({ isRegSuccess, isInfoPopupOpen, setIsInfoPopupOpen }) => {
  return (
    <div className={isInfoPopupOpen ? "popup popup_opened" : "popup"}>
      <div className="popup-info">
        <button className="popup__close" type="button" onClick={() => setIsInfoPopupOpen(false)}></button>
        <img src={isRegSuccess ? Success : Fail} />
        <h2>{isRegSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
    </div>
  );
};
export default InfoTooltip;
