import React, { useEffect, useState, useRef } from "react";
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
  const [showEditDialog, setShowEditDialog] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);

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
    setShowEditDialog(true);
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
        console.error("Error deleting product:", error);
      });
  }

  function handleCloseDialog() {
    setShowEditDialog(false);
    setEditingProduct(null);
  }

  function handleSaveEdit() {
    if (
      !editingProduct ||
      !nameInputRef.current ||
      !descriptionInputRef.current ||
      !priceInputRef.current
    ) {
      // Handle the case where the editing product or input refs are not available
      return;
    }

    const updatedProduct = {
      ...editingProduct,
      name: nameInputRef.current.value,
      description: descriptionInputRef.current.value,
      price: parseFloat(priceInputRef.current.value),
    };

    fetch(`http://localhost:8080/api/products/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update product.");
        }
        return response.json();
      })
      .then(getALLProducts)
      .catch((error) => {
        console.error("Error updating product:", error);
      })
      .finally(() => {
        handleCloseDialog();
      });
  }

  return (
    <>
      <div className="product-list">
        <h2>Edit Products</h2>
        <button>Neue Aufgabe erstellen</button>

        <div className="card-container">
          {products.map((product) => (
            <div key={product.id} className="product-card-edit">
              <p>{product.name}</p>
              <div className="card-buttons">
                <button className="button" onClick={() => handleEdit(product)}>
                  Bearbeiten
                </button>
                <button
                  className="button"
                  onClick={() => handleDelete(product.id)}
                >
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showEditDialog && editingProduct && (
        <div className="dialog-overlay">
          <div className="edit-dialog">
            <h2>Edit Product</h2>
            <label>
              Name:
              <input
                type="text"
                defaultValue={editingProduct.name}
                ref={nameInputRef}
              />
            </label>
            <label>
              Beschreibung:
              <textarea
                defaultValue={editingProduct.description}
                ref={descriptionInputRef}
              />
            </label>
            <label>
              Preis:
              <input
                type="number"
                defaultValue={editingProduct.price}
                ref={priceInputRef}
              />
            </label>
            <div className="dialog-buttons">
              <button className="button" onClick={handleCloseDialog}>
                Abbrechen
              </button>
              <button className="button" onClick={handleSaveEdit}>
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
