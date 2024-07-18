import React, { useEffect, useState } from "react";
import "./stylesheets/shop.css";
import ShopDialog from "../components/dialogShop.tsx";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Trainee {
  points: number;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [trainee, setTrainee] = useState<Trainee>();
  const [points, setPoints] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  

  useEffect(() => {
    fetchShopProducts();
    fetchPoints();
  }, []);

  useEffect(() => {
    if (trainee) { 
      setPoints(trainee.points);
    }
  }, [trainee]);

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
  function fetchPoints() {
    fetch(`http://localhost:8080/api/trainees/${sessionStorage.getItem("traineeId")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((r) => r.json())
      .then(data => {
        setTrainee(data); 
      })  }


  const handleOpenDialog = (product: Product) => {
    setSelectedProduct(product); 
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleConfirm = () => {
    if (selectedProduct) {
      setPoints(points - selectedProduct.price)
      console.log(`Bought ${selectedProduct.name}!`);
    }

    fetch(`http://localhost:8080/api/trainees/${sessionStorage.getItem("traineeId")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        "points": points 
      })
    })

    handleCloseDialog();
  };

  return (
    <>
      <div className="shop-container">
      <p>{points}</p>
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
