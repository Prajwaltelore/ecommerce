import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/Card";
import ProductDrawer from "../components/ProductDrawer";
import CartDrawer from "../components/CartDrawer";
import { Product } from "../types";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [searchTerm, categoryId, sortOrder]);

  const fetchCategories = async () => {
    const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
    setCategories(res.data);
  };

  const fetchProducts = async () => {
    const params: any = {
      offset: 0,
      limit: 20,
    };

    if (searchTerm) params.title = searchTerm;
    if (categoryId) params.categoryId = categoryId;

    let url = "https://api.escuelajs.co/api/v1/products";

    const response = await axios.get(url, { params });
    let products = response.data;


    if (sortOrder === "asc") {
      products.sort((a: Product, b: Product) => a.price - b.price);
    } else if (sortOrder === "desc") {
      products.sort((a: Product, b: Product) => b.price - a.price);
    }

    setProducts(products);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    setShowCart(true);
  };

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    navigate("/orders", { state: { cart } });
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h5>Home</h5>
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Search a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        <select
          className="form-select w-auto"
          onChange={(e) => setCategoryId(Number(e.target.value) || null)}
        >
          <option value="">All Categories</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          className="form-select w-auto"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="row">
        {products.map((product) => (
          <div
            className="col-md-3 mb-4"
            key={product.id}
            onClick={() => handleCardClick(product)}
            style={{ cursor: "pointer" }}
          >
            <ProductCard onAddToCart={handleAddToCart} product={product} />
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductDrawer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {showCart && (
        <CartDrawer
          cart={cart}
          onRemove={handleRemove}
          onClose={() => setShowCart(false)}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default Home;
