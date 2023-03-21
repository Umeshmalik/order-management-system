import { lazy, Suspense } from 'react'
import { Loading, NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from './components/navbar';
import UserContext from "./context";

const Signup = lazy(() => import('./components/user/signup'));
const Signin = lazy(() => import("./components/user/signin"));
const Orders = lazy(()=> import("./components/orders"));

const Router = () => {
  return <NextUIProvider>
    <BrowserRouter>
      <UserContext>
        <AppNavbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/user/signup" element={<Signup />} />
            <Route path="/user/signin" element={<Signin />} />
          </Routes>
        </Suspense>
      </UserContext>
    </BrowserRouter>
  </NextUIProvider>
}

export default Router;
