"use client";
import Counter from "@/components/Counter";
import React from "react";

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="font-bold text-3xl">React Redux Toolkit</h1>
      <Counter />
    </div>
  );
};

export default Home;
