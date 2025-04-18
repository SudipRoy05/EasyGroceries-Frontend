import React from "react";
import { Order } from "../models/types";

export const OrderConfirmation: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Order Confirmation</h2>
      <p>Customer: {order.customerId}</p>
      <p>Order Number: {order.orderNumber}</p>
      <ul>
        {order.items.filter((item) => !item.isMembership).map((item, idx) => (
          <li key={idx}>
            {item.name} – Qty: {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: £{order.total.toFixed(2)}</p>
    </div>
  );
};
