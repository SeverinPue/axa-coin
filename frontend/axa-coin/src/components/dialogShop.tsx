import React from 'react';
import "./stylesheets/dialogShop.css"

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}
interface MyDialogProps {
  showDialog: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedProduct: Product | null;
}

function MyDialog({ showDialog, onClose, onConfirm, selectedProduct }: MyDialogProps) {
  return (
    showDialog && (
      <div className="dialog-overlay">
        <div className="dialog-content">
          {selectedProduct ? (
            <>
              <p className='text'>Bist du sicher das dau das Kaufen willst "{selectedProduct.name}"?</p>
              <p className="dialog-price">Preis: {selectedProduct.price.toFixed(2)}</p>
            </>
          ) : (
            <p>Kein Produkt ausgewählt.</p>
          )}
          <div className="dialog-buttons">
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
}

export default MyDialog;
