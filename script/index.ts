interface studentsResults {
  name: string;
  class: string;
  term: string;
  pdf: string;
}

interface allStudentResultMap {
  [key: string]: studentsResults;
}

interface fetchJSonData {
  results: allStudentResultMap[];
}
