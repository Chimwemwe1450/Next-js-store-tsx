"use client";
import Image from "next/image";
import { useCart } from "../hooks/useCart";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { addToCart } = useCart();


useEffect(() => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data: Product[]) => {
      setProducts(data);

      const uniqueCategories = Array.from(
        new Set(data.map((p: Product) => p.category))
      ) as string[];

      setCategories(uniqueCategories);
    });
}, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white ">
      <h2 className="text-4xl font-bold mb-6 text-black">Store</h2>


  <div className="flex gap-4 mb-8 flex-wrap">
  <button
    onClick={() => setSelectedCategory("all")}
    className={`px-4 py-2 rounded font-medium transition ${
      selectedCategory === "all"
        ? "bg-blue-600 text-white"
        : "bg-black text-white hover:bg-gray-900"
    }`}
  >
    All
  </button>
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={`px-4 py-2 rounded font-medium transition ${
        selectedCategory === cat
          ? "bg-blue-600 text-white"
          : "bg-black text-white hover:bg-gray-900"
      }`}
    >
      {cat.charAt(0).toUpperCase() + cat.slice(1)}
    </button>
  ))}
</div>



<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl bg-white p-6 rounded-lg">
  {filteredProducts.map((product) => (
    <div
      key={product.id}
      className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center"
    >
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="object-contain mb-4"
      />
      <h3 className="text-lg font-semibold mb-2 text-center text-gray-900">
        {product.title}
      </h3>
      <p className="text-gray-700 font-medium mb-4">
        ${product.price.toFixed(2)}
      </p>
  <button
              onClick={() => addToCart(product)}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded w-full mt-auto"
            >
              Add to Cart
            </button>
    </div>
  ))}
</div>


    </div>
  );
}
