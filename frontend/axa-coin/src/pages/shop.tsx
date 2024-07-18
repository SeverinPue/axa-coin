import React, { useEffect, useState } from "react";
import "./stylesheets/shop.css";
import MyDialog from "../components/dialogShop.tsx";
import ShopDialog from "../components/dialogShop.tsx";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchShopProducts();
  }, []);

  function fetchShopProducts() {
    fetch("http://localhost:8080/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((r) => r.json())
      .then((data) => setProducts(data));
  }

  const handleOpenDialog = (product: Product) => {
    setSelectedProduct(product); // Store the selected product
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleConfirm = () => {
    if (selectedProduct) {
      // Perform buy logic for the selectedProduct
      console.log(`Bought ${selectedProduct.name}!`);
    }
    handleCloseDialog();
  };

  return (
    <>
      <div className="shop-container">
        <ShopDialog
          showDialog={showDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirm}
          selectedProduct={selectedProduct}
        />
        <h2>Unsere Produkte</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <div className="divPrice">
                <p className="price">{product.price.toFixed(2)}</p>
              </div>
              <div className="divButton">
                <button
                  className="buyButton"
                  onClick={() => handleOpenDialog(product)}
                >
                  Kaufen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
