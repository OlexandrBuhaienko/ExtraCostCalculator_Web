document.addEventListener("DOMContentLoaded", function () {
  //Declaring all constants which will be using to get an access to the objects inside the HTML
  const projectTypeSelect = document.getElementById("projectTypeSelect");
  const complexitySelect = document.getElementById("complexitySelect");
  const complexityLabel = document.getElementById("complexityLabel");
  const radioButtonInputContainer = document.getElementById(
    "radioButtonInputContainer"
  );
  const animationInputContainer = document.getElementById(
    "animationInputContainer"
  );
  const peopleCustomInputContainer = document.getElementById(
    "peopleCustomInputContainer"
  );
  const btnAdditionalView = document.getElementById("btnAdditionalView");
  const btnAdditionalOption = document.getElementById("btnAdditionalOption");

  //Adding event Listeners for objects in HTML
  btnAdditionalView.addEventListener("click", btnAddViewOnClick);
  btnAdditionalOption.addEventListener("click", btnAddOptionOnClick);
  //Adding event listener to the calculation button and assigning here the method which will handle this behavior
  //after clicking on this button
  const btnCalculateBaseCost = document.getElementById("btnCalculateBaseCost");
  btnCalculateBaseCost.addEventListener("click", calculateBaseCost);
  //Declaring default behavior after changing dropdown list input for project Type
  projectTypeSelect.addEventListener("change", function () {
    //updateOptions(projectTypeSelect.value);
    updateProjectType(projectTypeSelect.value);
    updateAnimationInput(projectTypeSelect.value);
    updateRadioInput(projectTypeSelect.value);
  });
  complexitySelect.addEventListener("change", function () {
    // updateComplexityOptions(projectTypeSelect.value);
    if (complexitySelect.value === "custom") {
      peopleCustomSelected();
    }
    else {
      peopleCustomInputContainer.innerHTML = "";
    }
    updateAnimationInput(projectTypeSelect.value);
    updateRadioInput(projectTypeSelect.value);
  });
  //Updating options in the projectType input after changing selection

  function updateProjectType(projectType) {
    const elements = document.querySelectorAll(".container > *"); // Вибираємо всі дочірні елементи контейнера
    elements.forEach(function (element) {
      element.style.display = "block";
    });

    updateComplexityOptions(projectType);
  }
  function updateComplexityOptions(projectType) {
    complexitySelect.innerHTML = ""; // Спочатку очищаємо вміст
    let options = []; // Ініціалізуємо масив опцій тут, щоб він був доступний у всій функції
    complexityLabel.textContent = "Complexity";
    switch (projectType) {
      case "Animation": {
        options = [
          { value: "promo", text: "Promo Animation" },
          { value: "vfx", text: "VFX Animation" },
          { value: "installation", text: "Installation Animation" },
          { value: "architectural", text: "Architectural Animation" },
          {value: "motionDesign", text: "Motion Design"}
        ];
        break;
      }
      case "Texture/Material Creation": {
        options = [
          { value: "simple", text: "Simple" },
          { value: "complex", text: "Complex" },
        ];
        break;
      }
      case "Template Lifestyle": {
        complexitySelect.style.display = "none";
        complexityLabel.style.display = "none";
        break;
      }
      case "Silo": {
        complexitySelect.style.display = "none";
        complexityLabel.style.display = "none";
        break;
      }
      case "360 view (60 images)": {
        complexitySelect.style.display = "none";
        complexityLabel.style.display = "none";
        break;
      }
      case "People Adding": {
        complexityLabel.textContent = "Number";
        options = [
          { value: "1-2 people", text: "1-2 people" },
          { value: "3-5 people", text: "3-5 people" },
          { value: "6-10 people", text: "6-10 people" },
          { value: "custom", text: "People Custom (hourly rate)" },
        ];
        break;
      }
      case "Other": {
        complexityLabel.textContent = "Other Services";
        options = [
          { value: "floorPlan3D", text: "Floor Plan 3D" },
          { value: "dollhouse", text: "Dollhouse" },
          { value: "virtualTour", text: "Virtual Tour" },
          { value: "moodBoard", text: "Mood Board" },
          { value: "postProduction", text: "Post-Production" },
          { value: "printDesign", text: "Print Design" },
        ];
        break;
      }
      default: {
        const isModeling =
          projectType === "Modeling" || projectType === "AR Modeling";
        options = isModeling
          ? ["Simple", "Medium", "Complex", "Ultra Complex"]
          : ["Simple", "Medium", "Complex"];
      }
    }

    peopleCustomInputContainer.style.display = "none";
    // Тепер використовуємо змінну options для додавання елементів у select
    options.forEach((option) => {
      const value =
        typeof option === "string"
          ? option.toLowerCase().replace(/\s+/g, "_")
          : option.value;
      const text = typeof option === "string" ? option : option.text;
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = text;
      complexitySelect.appendChild(opt);
    });
  }

  //Updating animation input after changing option in the projectType input
  function updateAnimationInput(projectType) {
    animationInputContainer.innerHTML = ""; // Очищуємо контейнер

    if (projectType === "Animation") {
      const secondsInput = document.createElement("input");
      secondsInput.type = "number";
      secondsInput.id = "animationSeconds";
      secondsInput.placeholder = "Enter number of seconds";
      secondsInput.className = "form-control mt-3";
      animationInputContainer.appendChild(secondsInput);
      secondsInput.oninput = function () {
        validatePositiveNumber(this);
      };
      btnAdditionalOption.style.display = "none";
      btnAdditionalView.style.display = "none";
    } else {
      btnAdditionalOption.style.display = "block";
      btnAdditionalView.style.display = "block";
    }
  }
  function updateRadioInput(projectType) {
    const radioWrapper = document.createElement("div");
    radioWrapper.classList.add("form-check");
    radioButtonInputContainer.innerHTML = "";

    if (
      projectType === "Interior" ||
      projectType === "Exterior" ||
      (projectType === "Other" && complexitySelect.value === "dollhouse") ||
      (projectType === "Other" && complexitySelect.value === "floorPlan3D")
    ) {
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
  function peopleCustomSelected() {
    //Creating the first text field
    if (complexitySelect.value === "custom") {
      const inputHourRate = document.createElement("input");
      inputHourRate.type = "text";
      inputHourRate.classList.add("mt-3");
      inputHourRate.placeholder = "Hour Rate";
      inputHourRate.style.opacity = "0.5"; // Setting half opacity
      inputHourRate.oninput = function () {
        validatePositiveNumber(inputHourRate);
      };
      //Creating the second text field
      const inputHours = document.createElement("input");
      inputHours.type = "text";
      inputHours.classList.add("mt-3");
      inputHours.placeholder = "Hours";
      inputHours.style.opacity = "0.5"; // Setting half opacity
      inputHours.oninput = function () {
        validatePositiveNumber(this);
      };
      peopleCustomInputContainer.appendChild(inputHourRate);
      peopleCustomInputContainer.appendChild(inputHours);
    }
  }
  function validatePositiveNumber(input) {
    const value = input.value;
    const valid =
      /^\d*\.?\d*$/.test(value) && (value === "" || parseFloat(value) > 0);
    if (!valid) {
      input.value = value.substring(0, value.length - 1);
    }
  }
});

async function calculateBaseCost() {
  let totalCost = 0;
  const projectType = projectTypeSelect.value;
  const complexity =
    complexitySelect.options[complexitySelect.selectedIndex].text;
  const propertyType = document.querySelector(
    'input[name="propertyType"]:checked'
  )?.value;

  if (projectType === "Exterior" || projectType === "Interior") {
    let baseItemName = `${complexity} ${propertyType} ${projectType}`;
    try {
      const baseCost = await getCostByName(baseItemName);
      if (typeof baseCost === "number") {
        // Ensuring that the cost is number
        totalCost += baseCost;
      } else {
        console.error(baseCost); // Logging error
      }
    } catch (error) {
      console.error("Error in calculateBaseCost: ", error);
    }
  } else if (projectType === "Modeling" || projectType === "AR Modeling") {
    let baseItemName = `${complexity} ${projectType}`;
    try {
    
      const baseCost = await getCostByName(baseItemName);
      if (typeof baseCost === "number") {
        // Ensuring that the cost is number
        totalCost += baseCost;
      } else {
        console.error(baseCost); // Logging error
      }
    } catch (error) {
      console.error("Error in calculateBaseCost: ", error);
    }

  }
  else if (projectType === "Animation") {
    let baseItemName = `${complexity}`;
    const container = document.querySelector('#animationInputContainer');
    const secondsInput = container.querySelector('#animationSeconds');
    let numberOfSeconds = parseFloat(secondsInput.value);
    try {
      const baseCost = await getCostByName(baseItemName);
      if (typeof baseCost === "number") {
        // Ensuring that the cost is number
        totalCost += (baseCost * numberOfSeconds);
      } else {
        console.error(baseCost); // Logging error
      }
    } catch (error) {
      console.error("Error in calculateBaseCost: ", error);
    }
  }
  else if (
    projectType === "Other" &&
    (complexity === "Dollhouse" || complexity === "Floor Plan 3D")
  ) {
    let baseItemName = `${complexity} ${propertyType}`;
    try {
      const baseCost = await getCostByName(baseItemName);
      if (typeof baseCost === "number") {
        // Ensuring that the cost is number
        totalCost += baseCost;
      } else {
        console.error(baseCost); // Logging error
      }
    } catch (error) {
      console.error("Error in calculateBaseCost: ", error);
    }
  } else {
    let baseItemName = `${complexity} ${projectType}`;
    try {
      const baseCost = await getCostByName(baseItemName);
      if (typeof baseCost === "number") {
        // Ensuring that the cost is number
        totalCost += baseCost;
      } else {
        console.error(baseCost); // Logging error
      }
    } catch (error) {
      console.error("Error in calculateBaseCost: ", error);
    }
  }

  document.getElementById("result").textContent = `Total Cost: $${totalCost}`;
}

function btnAddOptionOnClick(event) {
  event.preventDefault();
  var newSelect = document.createElement("select");
  newSelect.className = "form-control mt-3";
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
}
function btnAddViewOnClick(event) {
  event.preventDefault();
  var newSelect = document.createElement("select");
  newSelect.className = "form-control mt-3";
  newSelect.innerHTML = `
            <option>Additional render(existing space)</option>
            <option>Ratio change</option>
            <option>Zoom In</option>
            <option>Zoom Out(up to 20%)</option>
            <option>Opposite elevation</option>
            <option>Side elevation</option>
        `;
  additionalViewContainer.appendChild(newSelect);
}
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
