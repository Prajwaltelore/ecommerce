import { Link } from "react-router-dom";
import { Product } from "../types";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: Props) => {
  return (
    <div className="card h-100 position-relative overflow-hidden border-0">
      <div className="position-relative">
        <img
          src={product.images[0]}
          className="card-img-top"
          alt={product.title}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="btn btn-light position-absolute"
          style={{ top: "10px", right: "10px", borderRadius: "50%" }}
        >
          +
        </button>
        <Link
          to={`#`}
          className="btn btn-light position-absolute"
          style={{ bottom: "10px", left: "10px" }}
        >
          {product.category.name}
        </Link>
      </div>

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-text mb-0 fs-5 fw-light">{product.title}</h5>
          <span className="fw-bold text-dark fs-4">${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
