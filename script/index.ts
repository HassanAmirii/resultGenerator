// blueprint of the json data

// first; the surface level key types
interface studentsResults {
  name: string;
  class: string;
  term: string;
  pdf: string;
}

// second; the key of the whole surface surface level
interface allStudentsResultsMap {
  [key: string]: studentsResults;
}

// third; overall/top level type
interface fetchJsonData {
  results: allStudentsResultsMap[];
}

document.addEventListener("DOMContentLoaded", async () => {
  const resultTemplate = document.getElementById(
    "resultTemplate"
  ) as HTMLDivElement;
  const resultForm = document.getElementById("resultForm") as HTMLFormElement;
  const inputBar = document.getElementById("inputBar") as HTMLInputElement;
  const errorReporter = document.getElementById(
    "errorReporter"
  ) as HTMLParagraphElement;

  if (!resultForm || !resultTemplate || !inputBar || !errorReporter) {
    console.log("missing crucial element in dom");
    if (resultTemplate) {
      resultTemplate.innerHTML =
        "<p>Sorry, the application could not load correctly. Please contact support.</p>";
    }
    return;
  }

  // lets tell ts about the blueprint of result.json in /data
  let data: fetchJsonData;
  try {
    const res = await fetch("/data/result.json");
    if (!res.ok) {
      throw new Error(`http error: ${res.status}`);
    }
    data = await res.json();
    const getDataObject = data.results[0];
    console.log(getDataObject);
    resultForm.addEventListener("submit", (e) => {
      e.preventDefault();
      errorReporter.innerHTML = "";
      const formDataValue = inputBar.value.trim();
      if (!formDataValue) {
        errorReporter.innerHTML =
          "<p>please input an identification code!! </p>";
        return;
      }
      const getDesiredResultObject = getDataObject[formDataValue];
      if (!getDesiredResultObject) {
        errorReporter.innerHTML =
          "<p>No result found for this ID, please try again</p>";
        return;
      }

      resultTemplate.innerHTML = `<p>Dear ${getDesiredResultObject.name}:</p> <p>class: ${getDesiredResultObject.class}</p> <p>result id: ${formDataValue}, </p> <p>term: ${getDesiredResultObject.term}, </p>  <p>Download your result file: <a target="_blank" href="${getDesiredResultObject.pdf}">Exam result download</a> </p> <br><br><br><br><br> <button id="retryInputCode"> Try a new code </button>`;
    });
  } catch (error) {
    console.error("error", error);
    if (resultTemplate) {
      resultTemplate.innerHTML =
        "<p>please try again later, error resolving data, it is not you, it is us!</p>";
    }
    return;
  }
});
