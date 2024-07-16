function authService() {

    fetch("http://localhost:8080/api/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) {
            setError("Falsches Password oder Benuzername!");
          }
          return response.json();
        })
        .then((data) => {
          sessionStorage.setItem("jwtToken", JSON.stringify(data.token));
        })
        .catch((error) => {
          console.error("Fehler beim Fetschen: ", error);
        });
}