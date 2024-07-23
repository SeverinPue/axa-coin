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
  const [trainers, setTrainers] = useState<Array<any>>();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
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
    setShowCreateDialog(false);
    setEditingProduct(null);
  }

  function handleSaveEdit() {
    if (
      !editingProduct ||
      !nameInputRef.current ||
      !descriptionInputRef.current ||
      !priceInputRef.current
    ) {
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

  const fetchTrainers = () => {
    fetch("http://localhost:8080/api/trainers", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTrainers(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  };

  function handleCreate() {
    fetchTrainers();
    setShowCreateDialog(true);
  }

  function handleSaveNewProduct() {
    if (
      !nameInputRef.current ||
      !descriptionInputRef.current ||
      !priceInputRef.current
    ) {
      return;
    }

    const newProduct = {
      name: nameInputRef.current.value,
      description: descriptionInputRef.current.value,
      price: parseFloat(priceInputRef.current.value),
    };

    fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create new product.");
        }
        return response.json();
      })
      .then(getALLProducts)
      .catch((error) => {
        console.error("Error creating product:", error);
      })
      .finally(() => {
        handleCloseDialog();
        setShowCreateDialog(false);
      });
  }

  return (
    <>
      <div className="product-list">
        <h2>Produkte Bearbeiten</h2>
        <div className="button-erstellen">
          <button className="newButton" onClick={handleCreate}>
            Neue Aufgabe erstellen
          </button>
        </div>
        <div className="card-container">
          {products.map((product) => (
            <div key={product.id} className="product-card-edit">
              <p>{product.name}</p>
              <div className="card-buttons">
                <button className="button" onClick={() => handleEdit(product)}>
                  Bearbeiten
                </button>
                <button
                  className="button deleteButton"
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
            <h2>Produkt Bearbeiten</h2>
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
              <button className="button" onClick={handleSaveEdit}>
                Speichern
              </button>
              <button className="button" onClick={handleCloseDialog}>
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateDialog && (
        <div className="dialog-overlay">
          <div className="edit-dialog">
            <h2>Neues Produkt erstellen</h2>
            <label>
              Name:
              <input type="text" ref={nameInputRef} />
            </label>
            <label>
              Beschreibung:
              <textarea ref={descriptionInputRef} />
            </label>

            <label>
              Berufsbildner:
              <select id="dropdown">
                <option>Bitte wählen</option>
                {trainers?.map((trainerprov) => (
                  <option key={trainerprov.id} value={trainerprov.id}>
                    {trainerprov.user.username}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Preis:
              <input type="number" ref={priceInputRef} />
            </label>
            <div className="dialog-buttons">
              <button className="button" onClick={handleSaveNewProduct}>
                Erstellen
              </button>
              <button className="button" onClick={handleCloseDialog}>
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
