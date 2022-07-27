const checkboxFuncionality = function () {
  const checkboxCollections = [];

  for (let i = 0; i < 8; i++) {
    checkboxCollections.push(
      document.getElementsByClassName(`districtCheckbox${i}`)
    );
  }

  for (let i = 0; i < 8; i++) {
    for (let c of checkboxCollections[i]) {
      c.addEventListener("change", () => {
        if (c.checked == true) {
          const subBoxes = document.getElementsByClassName(`nbCheckbox${i}`);
          const siblingBoxes = document.getElementsByClassName(
            `districtCheckbox${i}`
          );
          for (let subBox of subBoxes) {
            subBox.checked = true;
          }
          for (let siblingBox of siblingBoxes) {
            siblingBox.checked = true;
          }
        } else if (c.checked == false) {
          const subBoxes = document.getElementsByClassName(`nbCheckbox${i}`);
          const siblingBoxes = document.getElementsByClassName(
            `districtCheckbox${i}`
          );
          for (let subBox of subBoxes) {
            subBox.checked = false;
          }
          for (let siblingBox of siblingBoxes) {
            siblingBox.checked = false;
          }
        }
      });
    }
  }
};

const searchFunctionality = function () {
  const searchButton = document.getElementById("nbSearch");
};
// Execute
(function () {
  "use strict";
  checkboxFuncionality();
  searchFunctionality();
})();
