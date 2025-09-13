"use client";

import { useState, useEffect } from "react";


type Post = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  published: boolean;
  publishedAt: string;
};

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

useEffect(() => {
  fetch("https://mocki.io/v1/dea47629-d44a-4b2d-b74a-ec29e02943e5")
    .then((res) => res.json())
    .then((data: { posts: Post[] }) => {

      setPosts(data.posts);
    })
    .catch((err) => console.error("API Error:", err));
}, []);

  return (
    <div className="bg-white min-h-screen">
      <main className="flex flex-col items-center justify-center p-8 max-w-6xl mx-auto">
     
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Home Page</h2>
        <p className="text-lg text-gray-700">
          This page uses Next.js App Router with Tailwind CSS.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full mt-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white border rounded-lg shadow hover:shadow-xl transition p-6 flex flex-col"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {post.title}
              </h2>
              <p className="text-base font-medium text-gray-900 mb-3">
                {post.excerpt}
              </p>
        
               <p className="text-base font-medium text-gray-900 mb-3">
                {post.content}
              </p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
