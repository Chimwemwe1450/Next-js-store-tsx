"use client";

import Link from "next/link";
import { useCart } from "../hooks/useCart";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { cartCount } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    router.push("/login"); 
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
     
      <div className="flex space-x-4">
        <Link href="/home" className="font-semibold hover:underline">
          Home
        </Link>
        <Link href="/store" className="font-semibold hover:underline">
          Store
        </Link>
      </div>

    
      <div className="flex items-center space-x-4">
        
        <div className="flex items-center space-x-1">
          <ShoppingCartIcon className="h-5 w-5 text-white" />
          <Link
            href="/cart"
            className="font-semibold hover:underline flex items-center gap-1"
          >
            Cart ({cartCount})
          </Link>
        </div>


        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
