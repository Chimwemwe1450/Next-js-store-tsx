
"use client";

import Link from "next/link";
import { useCart } from "../hooks/useCart";
import { ShoppingCartIcon } from "@heroicons/react/24/outline"; 

export default function Navbar() {
  const { cartCount } = useCart();

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

    
      <div className="flex items-center space-x-1">
        <ShoppingCartIcon className="h-5 w-5 text-white" /> 
        <Link href="/cart" className="font-semibold hover:underline flex items-center gap-1">
          Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
}
