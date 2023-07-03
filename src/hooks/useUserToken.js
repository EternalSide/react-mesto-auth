import { useNavigate } from "react-router-dom";

const useUserToken = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  fetch("https://auth.nomoreparties.co/users/me", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      if (!data.data?.email) {
        navigate("/sign-in");
      }
    });
};

export default useUserToken;
