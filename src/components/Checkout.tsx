import React, { useState } from "react";
import { Product, ShippingInfo, Order } from "../models/types";

interface Props {
  basket: Product[];
  onConfirmOrder: (order: Order) => void;
}

export const Checkout: React.FC<Props> = ({ basket, onConfirmOrder }) => {
  const [shipping, setShipping] = useState<ShippingInfo>({ name: "", address: "", city: "" });
  const [includeMembership, setIncludeMembership] = useState(false);

  const handleSubmit = async () => {
    let updatedBasket = [...basket];
    if (includeMembership) {
      updatedBasket.push({
        id: 999,
        name: "EasyGroceries Loyalty Membership",
        description: "20% discount",
        price: 5,
        quantity: 1,
        isMembership: true,
      });
    }
    
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: 35496,
        items: updatedBasket,
        shippingInfo: shipping,
      }),
    });
    const data = await response.json();
    onConfirmOrder(data);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Checkout</h2>
      <div>
        <label>Name: </label>
        <input className="border p-1" onChange={(e) => setShipping({ ...shipping, name: e.target.value })} />
      </div>
      <div>
        <label>Address: </label>
        <input className="border p-1" onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
      </div>
      <div>
        <label>City: </label>
        <input className="border p-1" onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
      </div>
      <div>
        <label>
          <input type="checkbox" onChange={(e) => setIncludeMembership(e.target.checked)} /> Add Loyalty Membership (£5)
        </label>
      </div>
      <button onClick={handleSubmit} className="mt-2 px-3 py-1 bg-blue-500 text-white">Place Order</button>
    </div>
  );
};