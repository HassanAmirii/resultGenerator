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
      return res.json();
    })

    .then((data) => {
      document.getElementById("resultForm").addEventListener("submit", (e) => {
        e.preventDefault();
        var formData = document.getElementById("inputBar").value;
        if (formData) {
          const getDataObj = data.results;
          console.log(getDataObj);
          const allResultObject = getDataObj[0];
          console.log(allResultObject);

          const getDesiredResultObj = allResultObject[formData];
          console.log(getDesiredResultObj);

          if (getDesiredResultObj) {
            resultTemplate.innerHTML = `<p>your results : </p>
        
        
        <p>Name: ${getDesiredResultObj.name}</p>
        <p>Class: ${getDesiredResultObj.class}</p>
        <p>Session: ${getDesiredResultObj.term}</p>
           <p> Download: <a target="_blank" href="${getDesiredResultObj.pdf}"> result file</a>
</p>
        <br><br><br><br><br> <button id="recheckResult">Recheck result </button>
        
        `;
            document
              .getElementById("recheckResult")
              .addEventListener("click", function (e) {
                window.location.reload();
              });
          } else {
            // Handle case where formData key is not found in data.results
            resultTemplate.innerHTML = `<p>No results found for ID: ${formData}</p>`;
            console.log(`No data found for key: ${formData}`);
          }
        } else {
          console.log("cant find formdata");
        }
      });
    })

    .catch((error) => {
      console.error("error:", error);
    });
});
