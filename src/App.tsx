import { createBrowserRouter } from "react-router-dom";
import { Home } from "../src/pages/home"
import { Admin } from "../src/pages/Admin"
import { Login } from "../src/pages/login"
import { Network } from "../src/pages/network"
import { Private } from "./routes/private";
import { Notfound } from "./pages/error";

export const Router = createBrowserRouter([
  {
     path: "/" ,
     element: <Home/>
  },
  {
    path: "/admin", 
    element: <Private> <Admin/></Private>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/admin/social",
    element: <Private><Network/></Private>
  } , 
  {
    path: "*" , 
    element: <Notfound/>
  }
])