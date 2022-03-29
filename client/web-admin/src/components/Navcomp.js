import { Link, useNavigate } from "react-router-dom";
function Navcomp() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate(`/login`);
  };

  return (
    <div className="sidebar">
      <div className="d-flex flex-column h-100">
        <div id="cornleft" className="cornleft">
          <img src="./imagewhite.png" alt="" style={{ height: "5rem" }} />
          <h4
            style={{
              wordBreak: "break-all",
              color: "white",
            }}
          >
            Barter-in
          </h4>
          <p
            className="marpad0"
            style={{
              wordBreak: "break-all",
              color: "white",
            }}
          >
            Admin
          </p>
        </div>
        <div className="d-flex flex-column justify-content-between mt-5 h-75">
          <div>
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
              className="sidelink"
            >
              <i
                className="bi-list sidel"
                style={{ fontSize: "2.2rem", color: "#26CBFF" }}
              ></i>
              <p className="sidel">ItemList</p>
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
              }}
              className="sidelink"
            >
              <i
                className="bi-person-plus sidel"
                style={{ fontSize: "2.2rem", color: "#26CBFF" }}
              ></i>
              <p className="sidel">NewAdmin</p>
            </Link>
          </div>
          <div
            className="sidelink d-flex flex-column"
            style={{ paddingBottom: "100px" }}
          >
            <i
              className="bi-box-arrow-left sidel"
              style={{ fontSize: "2.2rem", color: "#26CBFF" }}
              onClick={Logout}
            ></i>
            <p className="sidel">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navcomp;
