import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { LoginPage } from "../pages/home";

const Layout = () => {
  return (
    // <>
    //   <Header />
    //   <div className="main-route">
    //     {/* <Outlet /> */}
    //   </div>
    // </>
    <LoginPage />
  );
};

export { Layout };
