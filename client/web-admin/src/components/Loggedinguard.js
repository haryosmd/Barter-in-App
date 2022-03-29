import { Navigate } from "react-router-dom";

const Loggedinguard = ({ children }) => {
  if (!localStorage.access_token) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Loggedinguard;
