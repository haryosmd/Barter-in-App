import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registerpage from "./pages/Register";
import Loggedoutguard from "./components/Loggedoutguard";
import Loggedinguard from "./components/Loggedinguard";
function App() {
  return (
    <div className="whole">
      <Routes>
        <Route
          path="/login"
          element={
            <Loggedoutguard>
              <Login></Login>
            </Loggedoutguard>
          }
        />
        <Route
          path="/"
          element={
            <Loggedinguard>
              <Home />
            </Loggedinguard>
          }
        />
        <Route
          path="/register"
          element={
            <Loggedinguard>
              <Registerpage />
            </Loggedinguard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
