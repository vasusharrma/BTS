fetch("randomapi.com", {
  headers: {
    Authorization: "Bearer" + localStorage.getItem("token")
  }
})
