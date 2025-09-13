"use client"; 
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const hideNavbarRoutes = ["/login" , "/register" ];

export default function ConditionalNavbar() {
  const pathname = usePathname();

  const showNavbar = !hideNavbarRoutes.includes(pathname);

  return <>{showNavbar && <Navbar />}</>;
}
