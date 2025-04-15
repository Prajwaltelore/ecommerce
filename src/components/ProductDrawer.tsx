import React from "react";
import { Product } from "../types";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const ProductDrawer: React.FC<Props> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div
      className="position-fixed top-0 end-0 h-100 bg-white p-4"
      style={{ width: "400px", zIndex: 1, transition: "all 0.3s ease-in-out" }}
    >
      <button className="btn btn-sm btn-secondary mb-3" onClick={onClose}>
        Close
      </button>
      <img
        src={product.images[0]}
        alt={product.title}
        className="img-fluid mb-3"
      />
      <h5 className="text-dark fw-bold text-center">${product.price}</h5>
      <h4 className="text-center">${product.title}</h4>
      <p className="text-muted">{product.description}</p>
    </div>
  );
};

export default ProductDrawer;
