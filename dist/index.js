"use strict";
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
        const resultForm = document.getElementById("resultForm");
        if (resultForm) {
            resultForm.addEventListener("submit", (e) => {
                e.preventDefault();
            });
        }
        else {
            console.log("resultform doesnt exist");
        }
        const inputBar = document.getElementById("inputBar").value;
        if (inputBar) {
            const getDataObj = data.results;
            console.log(getDataObj);
            const allResultObject = getDataObj[0];
            console.log(allResultObject);
            var getDesiredResultObj = allResultObject[inputBar];
            console.log(getDesiredResultObj);
        }
        else {
            console.log("cant find formdata");
        }
        if (getDesiredResultObj) {
            var resultTemplate = document.getElementById("resultTemplate");
            if (resultTemplate) {
                resultTemplate.innerHTML = `<p>your results : </p>
        
        
        <p>Name: ${getDesiredResultObj.name}</p>
        <p>Class: ${getDesiredResultObj.class}</p>
        <p>Session: ${getDesiredResultObj.term}</p>
           <p> Download: <a target="_blank" href="${getDesiredResultObj.pdf}"> result file</a>
               </p>
        <br><br><br><br><br> <button id="recheckResult">Recheck result </button>
        
        `;
            }
            else {
                console.log("result template does not exist");
            }
        }
        else {
            // Handle case where formData key is not found in data.results
            resultTemplate.innerHTML = `<p>No results found for ID: ${inputBar}</p>`;
            console.log(`No data found for key: ${inputBar}`);
        }
        const recheckResult = document.getElementById("recheckResult");
        if (recheckResult) {
            recheckResult.addEventListener("click", function (e) {
                window.location.reload();
            });
        }
        else {
            console.log(" var:recheck result does not exist");
        }
    })
        .catch((error) => {
        console.error("error:", error);
    });
});
