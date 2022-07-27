(function () {
  "use strict";
  console.log(neighbourhoods);
  console.log(neighbourhoods.neighbourhoods);
  const districtSelect = document.getElementById("district-select");
  const neighbourhoodSelect = document.getElementById("neighbourhood-select");
  districtSelect.addEventListener("change", (e) => {
    if (districtSelect.selectedIndex !== 0) {
      neighbourhoodSelect.disabled = false;
      neighbourhoodSelect.innerHTML = `<option value="">Elige un barrio</option>`;
      neighbourhoods[districtSelect.selectedIndex - 1].neighbourhoods.forEach(
        (el) =>
          (neighbourhoodSelect.innerHTML += `<option name="neighbourhood" value="${el}">${el}</option>`)
      );
    } else if (districtSelect.selectedIndex == 0) {
      neighbourhoodSelect.disabled = true;
    }
  });
})();
