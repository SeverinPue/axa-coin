'use client'

import React, { useEffect, useState } from "react"

export default function Transactions (){
    const [transactions, setTransactions] = useState<Array<any>>([])

    useEffect(() => {

        fetch("http://localhost:8080/api/transactions/trainee/", {
            headers: {
              "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          })
            .then(r => r.json())
            .then((data) => {setTransactions(data); console.log(data)})
            .catch((error) => {
              console.error("Fehler beim Fetchen: " + error);
            });

    }, [])

    return(
        <>
        
        </>
    )
}