// src/pages/OrderPage.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../types";

const OrderPage = () => {
  const location = useLocation();
  const cart: Product[] = location.state?.cart || [];

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mt-5">
      <h2>Order Details</h2>
      <ul className="list-group mb-3">
        {cart.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <img
                src={item.images[0]}
                width="50"
                height="50"
                style={{ objectFit: "cover" }}
                alt={item.title}
              />
              <span className="ms-2">{item.title}</span>
            </div>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <h4>Total: ${total.toFixed(2)}</h4>
    </div>
  );
};

export default OrderPage;
