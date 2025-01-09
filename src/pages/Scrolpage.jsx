import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Scrolpage() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=0&limit=5`
        );
        setData((prev) => [...prev, ...res.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [offset]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setOffset((prev) => prev + 6); 
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className="flex flex-row flex-wrap justify-center gap-5 mt-5 mb-5">
        {data.length > 0 &&
          data.map((product, index) => {
            return (
              <div
                key={index}
                className="w-[350px] items-center border rounded-md"
              >
                <img
                  src={product.category.image}
                  className="w-full object-cover"
                  alt=""
                />
                <div className="px-5 py-2">
                  <h1 className="text-2xl">Title: {product.title}</h1>
                  <h1 className="text-2xl">Price: {product.price}</h1>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Scrolpage;