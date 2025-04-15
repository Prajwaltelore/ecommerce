import { Product } from "../types";

interface CartDrawerProps {
  cart: Product[];
  onRemove: (id: number) => void;
  onClose: () => void;
  onCheckout: () => void;
}

const CartDrawer = ({
  cart,
  onRemove,
  onClose,
  onCheckout,
}: CartDrawerProps) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      className="position-fixed top-0 end-0 bg-white shadow p-3"
      style={{ width: "300px", height: "100vh", zIndex: 999 }}
    >
      <h5 className="text-center">Cart</h5>
      <button
        className="btn-close position-absolute top-0 end-0 m-3"
        onClick={onClose}
      ></button>
      <ul className="list-group list-group-flush">
        {cart.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <img
                src={item.images[0]}
                width="40"
                height="40"
                style={{ objectFit: "cover" }}
              />
              <span className="ms-2">{item.title}</span>
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onRemove(item.id)}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-3 text-center">
        <p className="fw-bold">Total: ${total.toFixed(2)}</p>
        <button className="btn btn-primary w-100" onClick={onCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;
