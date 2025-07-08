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

  // lets tell ts about the blueprint of result.json in /data
  let data: fetchJsonData;
  try {
    const res = await fetch("/data/result.json");
    if (!res.ok) {
      throw new Error(`http error: ${res.status}`);
    }
    data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("error", error);
    if (resultTemplate) {
      resultTemplate.innerHTML =
        "<p>please try again later, error resolving data, it is not you, it is us!</p>";
    }
  }
});
