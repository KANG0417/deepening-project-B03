import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "./shared/Router";
import { useEffect } from "react";

function App() {
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
        window.location.href = "localhost:3000/login";
      }
    });
  }, []);

  return <Router />;
}

export default App;
