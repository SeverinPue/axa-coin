'use client'

import React, { useEffect, useState } from "react";
import "./stylesheets/transactions.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Array<any>>([])
  let id = sessionStorage.getItem("id");

  useEffect(() => {

    fetch("http://localhost:8080/api/transactions/" + id, {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then(r => r.json())
      .then((data) => { setTransactions(data); console.log(data) })
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });

  }, [])



  return (
    <div className="flex">
      <table>
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Preis</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>

          {
            transactions?.map(transaction => 
            
            <tr key={transaction.id}>
              <td>{transaction.product.name}</td>
              <td>{transaction.product.price}</td>
              <td>{transaction.transactionDate}</td>
            </tr>
          
          )
          }

        </tbody>
      </table>





      <ul>

      </ul>

    </div>
  )
}