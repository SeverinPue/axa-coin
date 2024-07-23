import React, { useEffect, useState } from "react";
import "./stylesheets/editProduct.css";
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function EditProdukte() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    getALLProducts();
  }, []);

  function getALLProducts() {
    fetch("http://localhost:8080/api/products", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
  }

  function handleDelete(productId: string) {
    setProducts(products.filter((p) => p.id !== productId));
  }
  return (
    <>
      <div className="product-list">
        <h2>Edit Products</h2>

        <div className="card-container">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <div className="card-buttons">
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
