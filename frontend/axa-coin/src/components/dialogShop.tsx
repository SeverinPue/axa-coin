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
              <p className='text'>Bist du sicher das du "{selectedProduct.name}" das Kaufen willst?</p>
              <p className="dialog-price">Preis: {selectedProduct.price}</p>
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
