import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "./shared/Router";
import { useNavigate } from "react-router-dom";

function App() {
  const auth = getAuth();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      navigate("/login");
    }
  });

  return <Router />;
}

export default App;
