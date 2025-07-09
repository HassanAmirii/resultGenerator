"use strict";
// blueprint of the json data
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const resultTemplate = document.getElementById("resultTemplate");
    const resultForm = document.getElementById("resultForm");
    const inputBar = document.getElementById("inputBar");
    const errorReporter = document.getElementById("errorReporter");
    if (!resultForm || !resultTemplate || !inputBar || !errorReporter) {
        console.log("missing crucial element in dom");
        if (resultTemplate) {
            resultTemplate.innerHTML =
                "<p>Sorry, the application could not load correctly. Please contact support.</p>";
        }
        return;
    }
    // lets tell ts about the blueprint of result.json in /data
    let data;
    try {
        const res = yield fetch("/data/result.json");
        if (!res.ok) {
            throw new Error(`http error: ${res.status}`);
        }
        data = yield res.json();
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
            const retryInputCode = document.getElementById("retryInputCode");
            retryInputCode.addEventListener("click", function (e) {
                window.location.reload();
            });
        });
    }
    catch (error) {
        console.error("error", error);
        if (resultTemplate) {
            resultTemplate.innerHTML =
                "<p>please try again later, error resolving data, it is not you, it is us!</p>";
        }
        return;
    }
}));
