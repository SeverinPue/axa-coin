import React, { useEffect, useState, useRef } from "react";
import "./stylesheets/editProduct.css";
import ConfirmDialog from "../components/confirmDialog.jsx";
import { API_URL } from "../App.js";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  trainerId: string;
}

interface Trainer {
  id: string;
  user: {
    username: string;
  };
}

export default function EditProdukte() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const trainerSelectRef = useRef<HTMLSelectElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<
    (() => void) | null
  >(null);

  useEffect(() => {
    getALLProducts();
    fetchTrainers();
  }, []);

  function getALLProducts() {
    fetch(API_URL + "/api/products", {
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
    setIsConfirmationVisible(true);
    setConfirmationAction(() => () => {
      setProducts(products.filter((p) => p.id !== productId));

      fetch(API_URL + `/api/products/${productId}`, {
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
    });
  }

  function handleConfirm() {
    if (confirmationAction) {
      confirmationAction();
    }
    setIsConfirmationVisible(false);
    setConfirmationAction(null);
  }

  function handleCancel() {
    setIsConfirmationVisible(false);
    setConfirmationAction(null);
  }

  function handleCloseDialog() {
    setError("");
    setShowEditDialog(false);
    setShowCreateDialog(false);
    setEditingProduct(null);
  }

  function handleSaveEdit() {
    
    if (
      !nameInputRef.current?.value ||
      !descriptionInputRef.current?.value ||
      !priceInputRef.current?.value ||
      !editingProduct
    ) {
      setError("Fülle bitte alle felder aus");
      return;
    }
    const updatedProduct: Product = {
      ...editingProduct,
      name: nameInputRef.current.value,
      description: descriptionInputRef.current.value,
      price: parseFloat(priceInputRef.current.value),
    };

    fetch(API_URL + `/api/products/${editingProduct.id}`, {
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
      .catch((error) => setError(error.message))
      .finally(() => {
        handleCloseDialog();
        setError(null);
      });
  }

  const fetchTrainers = () => {
    fetch(API_URL + "/api/trainers", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTrainers(data);
      })
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  };

  function handleCreate() {
    setShowCreateDialog(true);
  }

  function handleSaveNewProduct() {
    if (
      !nameInputRef.current?.value ||
      !descriptionInputRef.current?.value ||
      !priceInputRef.current?.value ||
      !trainerSelectRef.current?.value
    ) {
      setError("Fülle bitte alle felder aus");
      return;
    }

    const newProduct = {
      name: nameInputRef.current.value,
      description: descriptionInputRef.current.value,
      price: parseFloat(priceInputRef.current.value),
      trainerId: trainerSelectRef.current.value,
    };

    fetch(API_URL + "/api/products", {
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
      .catch((error) => setError(error.message))
      .finally(() => {
        handleCloseDialog();
        setShowCreateDialog(false);
        setError(null);
      });
  }

  return (
    <>
      <div className="product-list-edit">
        <h2>Produkte Bearbeiten</h2>
        <div className="button-erstellen">
          <button className="newButton" onClick={handleCreate}>
            Neues Produkt erstellen
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
            <p className="errorMessage">{error}</p>

            <div className="dialog-buttons">
              <button className="button newButton" onClick={handleSaveEdit}>
                Speichern
              </button>
              <button
                className="button deleteButton"
                onClick={handleCloseDialog}
              >
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
              <select id="dropdown" ref={trainerSelectRef}>
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
            <p className="errorMessage">{error}</p>

            <div className="dialog-buttons">
              <button
                className="button newButton"
                onClick={handleSaveNewProduct}
              >
                Erstellen
              </button>
              <button
                className="button deleteButton"
                onClick={handleCloseDialog}
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmDialog
        text="Willst du dieses Produkt wirklich Löschen?"
        onConfirm={handleConfirm}
        visible={isConfirmationVisible}
        onCancel={handleCancel}
      />
    </>
  );
}
