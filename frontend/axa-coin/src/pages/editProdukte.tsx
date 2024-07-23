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

    fetch(`http://localhost:8080/api/products/${productId}`, {
        method: "DELETE",
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
    function openNewUser(): void {
        throw new Error("Function not implemented.");
    }

  return (
    <>
      <div className="product-list">
        <h2>Edit Products</h2>
        <button onClick={openNewUser}>Neuen Benutzer erfassen</button>

        <div className="card-container">
          {products.map((product) => (
            <div key={product.id} className="product-card-edit">
              <p>{product.name}</p>
              <div className="card-buttons">
                <button className="button" onClick={() => handleEdit(product)}>Bearbeiten</button>
                <button className="button" onClick={() => handleDelete(product.id)}>Löschen</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
