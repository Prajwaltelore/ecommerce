import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartCount, onCartClick }: Props) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link to="/" className="navbar-brand">
        MyShop
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {user ? (
            <>
              <li className="nav-item d-flex align-items-center justify-content-center me-2">Hello, {user.name}</li>
              <li className="nav-item">
                <button className="btn btn-light text-danger" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </li>
            </>
          )}
          <li className="nav-item ms-2">
            <button
              className="btn nav-link position-relative"
              onClick={onCartClick}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
