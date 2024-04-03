import { useMediaQuery } from "react-responsive";
import { Outlet, useLocation } from "react-router-dom";
import { MenuHambuguer } from "../components/menuHambuguer";
import { SideBar } from "../components/siderBar";

export const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: "768px" });
  const location = useLocation();

  const pageText = { text: "Compras", url: "/" };
  const menuItems = [
    { text: "Mercados", url: "/mercado/lista" },
    { text: "Categorias", url: "/categoria/lista" },
    { text: "Produtos", url: "/produto/lista" },
    { text: "Compras", url: "/compra/lista" },
    { text: "Relatórios", url: "/relatorio" },
  ];
  const logoutText = { text: "Sair", url: "/login" };

  return (
    <div>
      {isMobile ? (
        <>
          <MenuHambuguer
            pageText={pageText}
            menuItems={[...menuItems, logoutText]}
            activeRouter={location.pathname}
          ></MenuHambuguer>
          <Outlet />
        </>
      ) : (
        <SideBar
          activeRouter={location.pathname}
          pageText={pageText}
          menuItems={menuItems}
          logoutText={logoutText}
        >
          <Outlet />
        </SideBar>
      )}
    </div>
  );
};
