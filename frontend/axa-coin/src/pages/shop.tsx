import React, { useEffect, useState } from "react";
import "./stylesheets/shop.css";
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
    setSelectedProduct(product);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleConfirm = () => {
    if (selectedProduct) {
      const updateFields = {
        productId: selectedProduct.id,
      }
      fetch(
        `http://localhost:8080/api/trainees/purchase/${sessionStorage.getItem(
          "traineeId"
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
          body: JSON.stringify(updateFields),

        }
      )
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
        });
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
                <p className="price">{product.price}</p>
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
