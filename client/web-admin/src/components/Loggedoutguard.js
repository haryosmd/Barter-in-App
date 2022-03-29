import { Navigate } from "react-router-dom";

const Loggedoutguard = ({ children }) => {
  if (localStorage.access_token) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default Loggedoutguard;
