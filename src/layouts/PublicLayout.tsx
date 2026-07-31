import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;