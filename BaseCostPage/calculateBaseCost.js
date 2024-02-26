document.addEventListener("DOMContentLoaded", function () {
  const projectTypeSelect = document.getElementById("projectType");
  const complexitySelect = document.getElementById("complexity");
  const additionalViewContainer = document.getElementById("additionalViewContainer");
  const additionalOptionContainer = document.getElementById("additionalOptionContainer");
  const radioButtonInputContainer = document.getElementById(
    "radioButtonInputContainer"
  );
  const animationInputContainer = document.getElementById(
    "animationInputContainer"
  );
  const btnAdditionalView = document.getElementById("btnAdditionalView");
  btnAdditionalView.addEventListener("click", btnAddViewOnClick);
  const btnAdditionalOption = document.getElementById("btnAdditionalOption");
  btnAdditionalOption.addEventListener("click", btnAddOptionOnClick);
  updateRadioInput(projectType.value);
  projectTypeSelect.addEventListener("change", function () {
    updateOptions(projectTypeSelect.value);
    updateAnimationInput(projectTypeSelect.value);
    updateRadioInput(projectTypeSelect.value);
  });

  function updateOptions(projectType) {
    const isModeling =
      projectType === "Modeling" || projectType === "AR Modeling";
    complexitySelect.innerHTML = "";
    const options = isModeling
      ? ["Simple", "Medium", "Complex", "Ultra Complex"]
      : ["Simple", "Medium", "Complex"];

    options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option.toLowerCase().replace(/\s+/g, "_");
      opt.textContent = option;
      complexitySelect.appendChild(opt);
    });

    if (projectType === "Animation") {
      complexitySelect.innerHTML = `
                <option value="promo">Promo Animation</option>
                <option value="vfx">VFX Animation</option>
                <option value="installation">Installation Animation</option>
                <option value="architectural">Architectural Animation</option>
                <option value="motion">Motion Design</option>
            `;
    }
  }

  function updateAnimationInput(projectType) {
    animationInputContainer.innerHTML = ""; // Очищуємо контейнер

    if (projectType === "Animation") {
      const secondsInput = document.createElement("input");
      secondsInput.type = "number";
      secondsInput.id = "animationSeconds";
      secondsInput.placeholder = "Enter number of seconds";
      secondsInput.className = "form-control mt-3";
      animationInputContainer.appendChild(secondsInput);
      btnAddOption.style.display = "none";
      btnAddView.style.display = "none";
    } else {
      btnAddOption.style.display = "block";
      btnAddView.style.display = "block";
    }
    // Додаємо контейнер до DOM, якщо він ще не доданий
    // if (!secondsInputContainer.parentNode) {
    //     projectTypeSelect.parentNode.insertBefore(animationInputContainer, projectTypeSelect.nextSibling);
    // }
  }

  function updateRadioInput(projectType) {
    const radioWrapper = document.createElement("div");
    radioWrapper.classList.add("form-check");
    radioButtonInputContainer.innerHTML = "";

    if (projectType === "Interior" || projectType === "Exterior") {
      const residentialRadio = document.createElement("input");
      residentialRadio.type = "radio";
      residentialRadio.id = "residential";
      residentialRadio.name = "propertyType";
      residentialRadio.value = "Residential";
      residentialRadio.classList.add("form-check-input");

      const residentialLabel = document.createElement("label");
      residentialLabel.htmlFor = "residential";
      residentialLabel.textContent = "Residential";
      residentialLabel.classList.add("form-check-label");

      // Створюємо і додаємо RadioButton для Commercial
      const commercialRadio = document.createElement("input");
      commercialRadio.type = "radio";
      commercialRadio.id = "commercial";
      commercialRadio.name = "propertyType";
      commercialRadio.value = "Commercial";
      commercialRadio.classList.add("form-check-input");

      const commercialLabel = document.createElement("label");
      commercialLabel.htmlFor = "commercial";
      commercialLabel.textContent = "Commercial";
      commercialLabel.classList.add("form-check-label");

      let wrapperClone = radioWrapper.cloneNode(); // Клонуємо обгортку для другої кнопки
      radioWrapper.appendChild(residentialRadio);
      radioWrapper.appendChild(residentialLabel);
      radioButtonInputContainer.appendChild(radioWrapper);

      // Додаємо другу радіокнопку до клонованої обгортки і потім обгортку до контейнера
      wrapperClone.appendChild(commercialRadio);
      wrapperClone.appendChild(commercialLabel);
      radioButtonInputContainer.appendChild(wrapperClone);
    }
  }

  const btnCalculateBaseCost = document.getElementById("btnCalculateBaseCost");
  btnCalculateBaseCost.addEventListener("click", calculateBaseCost);
  });

  function btnAddOptionOnClick (event) {
    event.preventDefault();
    var newSelect = document.createElement('select');
        newSelect.className = 'form-control mt-3';
        newSelect.innerHTML = `
            <option>Props</option>
            <option>Colors</option>
            <option>Finishes</option>
            <option>Lighting</option>
            <option>Landscape</option>
            <option>Architecture</option>
            <option>Hi-res</option>
        `;
        additionalOptionContainer.appendChild(newSelect);
  };
 function btnAddViewOnClick(event) {
    event.preventDefault();
    var newSelect = document.createElement('select');
        newSelect.className = 'form-control mt-3';
        newSelect.innerHTML = `
            <option>Additional render(existing space)</option>
            <option>Ratio change</option>
            <option>Zoom In</option>
            <option>Zoom Out(up to 20%)</option>
            <option>Opposite elevation</option>
            <option>Side elevation</option>
        `;
        additionalViewContainer.appendChild(newSelect);
    };
async function fetchXlsxData() {
  try {
    const response = await fetch("../data/Prices.xlsx");
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    return jsonData; // Повертаємо дані
  } catch (error) {
    console.error("Error while downloading or reading .xlsx file: ", error);
    return null; // Повертаємо null у випадку помилки
  }
}

async function getCostByName(itemName) {
  try {
    const jsonData = await fetchXlsxData(); // Отримуємо дані асинхронно
    // Find the item in the array
    const item = jsonData.find((service) => service.SOW_Name === itemName);
    // If the item is found, return its cost, otherwise return a message indicating it's not found
    return item ? item.Cost : "Item not found";
  } catch (error) {
    console.error("Error in calculateBaseCost: ", error);
  }
}

async function calculateBaseCost() {
    let totalCost = 0;
  try {
    const cost = await getCostByName("Simple Residential Exterior");
    console.log(cost);
    totalCost += cost;
  } catch (error) {
    console.error("Error in calculateBaseCost: ", error);
  }
  
  document.getElementById("result").textContent = `Total Cost: $${totalCost}`;
}
