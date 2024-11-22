import { Outlet } from "react-router-dom";
import { Header } from "./header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="main-route">
        <Outlet />
      </div>
    </>
  );
};

export { Layout };
