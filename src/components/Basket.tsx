import React from "react";
import { Product } from "../models/types";

interface Props {
  basket: Product[];
  onCheckout: () => void;
}

export const Basket: React.FC<Props> = ({ basket, onCheckout }) => {
    const total = basket.reduce((sum, item) => {
        const price = item.price ?? 0; // Default to 0 if undefined
        const quantity = item.quantity ?? 0; // Default to 0 if undefined
        return sum + price * quantity;
      }, 0);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Basket</h2>
      <ul>
        {basket.map((item, idx) => (
          <li key={idx}>
            {item.name} - Qty: {item.quantity} - £{item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p className="mt-2">Total: £{total.toFixed(2)}</p>
      <button
        className="mt-2 px-3 py-1 bg-green-600 text-white"
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
};