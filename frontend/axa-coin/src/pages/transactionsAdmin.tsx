'use client'

import React, { useEffect, useState } from "react";
import "./stylesheets/transactions.css";

export default function TransactionsAdmin() {
  const [transactions, setTransactions] = useState<Array<any>>([])
  const [showAll, setShowAll] = useState<string>("false")

  useEffect(() => {
    loadTransactions()
  }, [])

  function loadTransactions(){
    fetch("http://localhost:8080/api/transactions", {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then(r => r.json())
      .then((data) => { setTransactions(data);})
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  }

  function updateTransaction(id){
    console.log(id)
    fetch("http://localhost:8080/api/transactions/"+id, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then(() => loadTransactions())
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  }



  return (
    <div className="flex">
      <select value={showAll} onChange={e => setShowAll(e.target.value)}>
        <option value={"false"}>Nur offene anzeigen</option>
        <option value={"true"}>Alle anzeigen</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Lernende/r</th>
            <th>Produkt</th>
            <th>Preis</th>
            <th>Datum</th>
            <th>Geliefert</th>
          </tr>
        </thead>
        <tbody>

          {
            transactions?.map(transaction => 

              
                transaction.checked === false || showAll === "true"
                ?<tr key={transaction.id}>
                <td>{transaction.trainee.user.username}</td>
                <td>{transaction.product.name}</td>
                <td>{transaction.product.price}</td>
                <td>{transaction.transactionDate}</td>
                <td><input type="checkbox" checked={transaction.checked} onChange={() => updateTransaction(transaction.id)}/></td>
              </tr>
              :""
              
            
            
          
          )
          }

        </tbody>
      </table>
    </div>
  )
}