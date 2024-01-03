import React, { useEffect, useState } from "react";
import Router from "./shared/Router";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.config";

function App() {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  if (!isAuthInitialized) return null;

  return <Router user={user} />;
}

export default App;
