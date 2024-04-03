import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/home";
import { CategoryList } from "./pages/category/list";
import { CategoryForm } from "./pages/category/form";
import "react-toastify/dist/ReactToastify.css";
import { MarketList } from "./pages/market/list";
import { MarketForm } from "./pages/market/form";
import { ProductList } from "./pages/product/list";
import { ProductForm } from "./pages/product/form";
import { ShoppingListList } from "./pages/shoppingList/list";
import { ShoppingListForm } from "./pages/shoppingList/form";
import { FinalizeShoppingListForm } from "./pages/finalizeShoppingList/form";
import { ReportsForm } from "./pages/reports";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ToastContainer />
        <Home />
      </>
    ),
    children: [
      {
        path: "/categoria/lista",
        element: <CategoryList />,
      },
      {
        path: "/categoria/formulario/:id?",
        element: <CategoryForm />,
      },
      {
        path: "/mercado/lista",
        element: <MarketList />,
      },
      {
        path: "/mercado/formulario/:id?",
        element: <MarketForm />,
      },
      {
        path: "/produto/lista",
        element: <ProductList />,
      },
      {
        path: "/produto/formulario/:id?",
        element: <ProductForm />,
      },
      {
        path: "/compra/lista",
        element: <ShoppingListList />,
      },
      {
        path: "/compra/formulario/:id?",
        element: <ShoppingListForm />,
      },
      {
        path: "/compra/finalizar/:id?",
        element: <FinalizeShoppingListForm />,
      },
      {
        path: "/relatorio",
        element: <ReportsForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);

//npm install styled-components
//npm install react-router-dom
//npm install --save react-toastify
//npm install react-responsive
//npm install axios
//npm install formik --save
// npm install yup --save
//npm install react-select
//npm install recharts
