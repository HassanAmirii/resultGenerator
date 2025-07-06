document.addEventListener("DOMContentLoaded", () => {
  /* TODO: 
1. user post id
2. fetch result from json
3. display in app.innerHTML 
*/
  fetch("/data/result.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`http error: ${res.status}`);
      }
    })

    .then((data) => {
      console.log(data);
    })

    .catch((error) => {
      console.error("error:", error);
    });
});
