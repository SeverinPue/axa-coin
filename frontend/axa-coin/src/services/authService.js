function AuthService() {

    fetch("http://localhost:8080/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`  
        }
      })    
}