import React from "react";
import ProductCard from "./ProductCard";
import appleImage from "../assets/apple_image.png";
import AmulImage from "../assets/amul_milk_image.png";
import PannerImage from "../assets/paneer_image.png";
import wheatFlourImage from "../assets/wheat_flour_image.png";
import cheeseImage from "../assets/cheese_image.png";

const Products = () => {
  const products = [
    { productId: 1, productName: "Apple", image: appleImage, description: "Fresh and juicy apples.", price: 999, discount: 10, specialPrice: 899 },
    { productId: 2, productName: "Amul Milk", image: AmulImage, description: "Delicious and nutritious milk from Amul.", price: 799, discount: 5, specialPrice: 759 },
    { productId: 3, productName: "Paneer", image: PannerImage, description: "Rich flavor and smooth texture.", price: 399, discount: 15, specialPrice: 339 },
    { productId: 4, productName: "Wheat Flour", image: wheatFlourImage, description: "Finely milled wheat flour.", price: 299, discount: 10, specialPrice: null },
    { productId: 5, productName: "Cheese", image: cheeseImage, description: "Soft, creamy, and delicious cheese.", price: 499, discount: 12, specialPrice: 439 },
    { productId: 6, productName: "Butter", image: AmulImage, description: "Smooth and rich butter for your recipes.", price: 399, discount: 8, specialPrice: 369 },
  ];

  return (
    <div className="bg-gray-50 py-20 px-6 sm:px-10 lg:px-16 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Our Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center">
        {products.map((item) => (
          <ProductCard key={item.productId} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
