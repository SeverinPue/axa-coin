'use client'

import React, { useEffect, useState } from "react";
import "./stylesheets/transactions.css";
import { API_URL } from "../App.js";

export default function TransactionsAdmin() {
  const [transactions, setTransactions] = useState<Array<any>>([])
  const [showAll, setShowAll] = useState<string>("false")
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(0);

  useEffect(() => {
    loadTransactions()
  }, [])

  function loadTransactions() {
    fetch(API_URL + "/api/transactions/page/" + page, {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then(r => r.json())
      .then((data) => { setTransactions(data.content); setMaxPage(data.totalPages) })
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  }

  function updateTransaction(id) {
    fetch(API_URL + "/api/transactions/" + id, {
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

  function handlePages(count) {

    if (count < 0) {
      if (page > 0) {
        setPage(page - 1);
      }
    } else if (count > 0) {
      if (page < maxPage - 1) {
        setPage(page + 1)
      }
    }

  }

  useEffect(() => { loadTransactions() }, [page]);



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
                ? <tr key={transaction.id}>
                  <td>{transaction.trainee.user.username}</td>
                  <td>{transaction.product.name}</td>
                  <td>{transaction.product.price}</td>
                  <td>{transaction.transactionDate}</td>
                  <td><input type="checkbox" checked={transaction.checked} onChange={() => updateTransaction(transaction.id)} /></td>
                </tr>
                : ""




            )
          }

        </tbody>
      </table>
      <div className="scroll">
        <button onClick={() => handlePages(-1)}>&lt;</button>
        <p>{page+1}</p>
        <button onClick={() => handlePages(1)}>&gt;</button>
      </div>
    </div>
  )
}