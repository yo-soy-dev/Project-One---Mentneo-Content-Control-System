import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);

   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar user={user} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
