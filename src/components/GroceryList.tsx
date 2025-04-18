import React, { useEffect, useState } from "react";
import { Product } from "../models/types";

interface Props {
  addToBasket: (product: Product) => void;
}

export const GroceryList: React.FC<Props> = ({ addToBasket }) => {
  const [groceries, setGroceries] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then(setGroceries);
  }, []);

  const handleAdd = (product: Product) => {
    const qty = quantities[product.id] || 1;
    addToBasket({ ...product, quantity: qty });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Groceries</h2>
      {groceries.map((item) => (
        <div key={item.id} className="mb-2">
          <p>
            {item.name} - £{item.price} ({item.description})
          </p>
          <input
            type="number"
            value={quantities[item.id] || 1}
            onChange={(e) =>
              setQuantities({ ...quantities, [item.id]: parseInt(e.target.value) })
            }
            min={1}
            className="border p-1 w-16"
          />
          <button
            onClick={() => handleAdd(item)}
            className="ml-2 px-2 py-1 bg-blue-500 text-white"
          >
            Add to basket
          </button>
        </div>
      ))}
    </div>
  );
};