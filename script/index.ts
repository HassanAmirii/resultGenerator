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

  if (!resultForm || !resultTemplate || !inputBar) {
    console.log("missing crucial element in dom");
    if (resultTemplate) {
      resultTemplate.innerHTML =
        "<p>Sorry, the application could not load correctly. Please contact support.</p>";
    }
  }
  return;
});
