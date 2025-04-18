import React, { useState } from "react";
import { Basket } from "./components/Basket";
import { Checkout } from "./components/Checkout";
import { GroceryList } from "./components/GroceryList";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { Product, Order } from "./models/types";

const App: React.FC = () => {
  const [basket, setBasket] = useState<Product[]>([]);
  const [checkout, setCheckout] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const addToBasket = (product: Product) => {
    setBasket([...basket, product]);
  };

  return (
    <div className="p-6">
      {!checkout && !order && (
        <>
          <GroceryList addToBasket={addToBasket} />
          <Basket basket={basket} onCheckout={() => setCheckout(true)} />
        </>
      )}
      {checkout && !order && (
        <Checkout
          basket={basket}
          onConfirmOrder={(newOrder) => setOrder(newOrder)}
        />
      )}
      {order && <OrderConfirmation order={order} />}
    </div>
  );
};
export default App;