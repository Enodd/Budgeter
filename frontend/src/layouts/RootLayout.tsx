import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col justify-center items-center">
        <Outlet />
      </main>
    </>
  );
}
