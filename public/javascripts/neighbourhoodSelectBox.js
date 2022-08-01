function toggleNeighbourhoods(districtSelect, neighbourhoodSelect) {
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
}

(function () {
  "use strict";
  const districtSelect = document.getElementById("district-select");
  const neighbourhoodSelect = document.getElementById("neighbourhood-select");
  districtSelect.addEventListener(
    "focus",
    (e) => {
      toggleNeighbourhoods(districtSelect, neighbourhoodSelect);
    },
    { once: true }
  );

  districtSelect.addEventListener("change", (e) => {
    toggleNeighbourhoods(districtSelect, neighbourhoodSelect);
  });
})();
