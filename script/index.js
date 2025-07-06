document.addEventListener("DOMContentLoaded", () => {
  /* TODO: 
1. user post id
2. fetch result from json
3. display in app.innerHTML 
*/

  //   const inputBar = document.getElementsById("inputBar");
  //   const resultTemplate = document.getElementById("resultTemplate");
  const getResult = inputBar.innerHTML;
  fetch("/data/result.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`http error: ${res.status}`);
      }
      return res.json();
    })

    .then((data) => {
      const getDataObj = data.results;
      console.log(getDataObj);
      const getDesiredResult = getDataObj.find(function (resultItem) {
        return resultItem.getResult;
      });
      console.log(getDesiredResult);

      //   const getResultObj = getDataObj[getResult];

      //   resultTemplate.innerHTML = `<p>your results : ${getDataObj[getResult]}</p>`;
    })

    .catch((error) => {
      console.error("error:", error);
    });
});
