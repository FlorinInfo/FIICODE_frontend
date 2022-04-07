import "./LoginStyles.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import LeftImage from "../../components/LeftImage/LeftImage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      navigate(-1);
    }
  }, []);

  return (
    <>
      {cookies.token ? (
        ""
      ) : (
        <div className="login">
          <div className="login__left">
            <LeftImage />
          </div>
          <div className="login__form">
            <LoginForm />
            <span className="login__signup-redirect">
              Nu ai inca cont? <Link to="/signup">Inregistreaza-te</Link>{" "}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
