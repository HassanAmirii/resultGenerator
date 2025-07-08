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
