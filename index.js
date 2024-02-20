document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateBtn').addEventListener('click', calculateTotalCost);
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('click', toggleRadioButton);
        document.getElementById('baseCost').addEventListener('input', checkBaseCost);

        // Перевірка і встановлення стану кнопки при завантаженні сторінки
        checkBaseCost();
    });
    document.getElementById('addVariableExtra').addEventListener('click', addVariableExtraField);
    document.getElementById('btnCalculateBaseCost').addEventListener('click', baseCostCalculationPageRedirection);
});
let lastCheckedRadio = null;



function baseCostCalculationPageRedirection(){
    window.location.href = "./BaseCostPage/calculate-base-cost.html"
}

function calculateDeadlineMultiplier(baseCost, multiplier) {
    switch (multiplier) {
        case 'x2': return baseCost * 0.3;
        case 'x3': return baseCost * 0.6;
        default: return 0;
    }
}

function calculateSOWAdjustment(baseCost, sow) {
    switch (sow) {
        case 'Perfect': return -baseCost * 0.1;
        case 'Not as per example': return baseCost * 0.1;
        default: return 0;
    }
}

function calculateRevisionsCost(baseCost, revisions) {
    return revisions === 'More' ? baseCost * 0.1 : 0;
}

function calculateDiscount(baseCost, discountRate) {
    return baseCost * (parseFloat(discountRate) / 100);
}

function calculateFixedExtras(fixedExtras) {
    return parseFloat(fixedExtras) || 0;
}

function calculateVariableExtras(baseCost) {
    let sum = 0;
    Array.from(document.querySelectorAll('#variableExtrasContainer input')).forEach(input => {
        const value = parseFloat(input.value) || 0;
        sum += baseCost * (value / 100);
    });
    return sum;
}

function calculateTeamLeadCost(baseCost) {
const tlPercentage = (parseFloat(document.getElementById('tlPercentageInput').value) / 100) || 0;
const tlHours = parseFloat(document.getElementById('tlHoursInput').value) || 0;
const tlRate = parseFloat(document.getElementById('tlRateInput').value) || 0;


    if (document.getElementById('tlConsulting').checked && tlHours > 0 && tlRate > 0) {
        return tlHours * tlRate;
    } else if (document.getElementById('tlPercentage').checked && tlPercentage > 0) {
        return baseCost * tlPercentage;
    }
    return 0;
}

function calculatePMCost() {
    const pmHours = parseFloat(document.getElementById('pmHours').value) || 0;
    const pmRate = parseFloat(document.getElementById('pmRate').value) || 0;
    if(pmHours > 0 && pmRate > 0)
    {
        return pmHours * pmRate;
    }
    else return 0;
}

function calculatePaymentTermRisks(baseCost, paymentTerms) {
    switch (paymentTerms) {
        case "net30":
            return baseCost * 0.03;
        case "net60":
            return baseCost * 0.06;
        default:
            return 0;
    }
}
function calculateTotalCost() {
    const baseCost = parseFloat(document.getElementById('baseCost').value) || 0;
    const deadlineMultiplier = document.getElementById('deadlineMultiplier').value;
    const sow = document.getElementById('sow').value;
    const revisions = document.querySelector('input[name="revisions"]:checked') ? document.querySelector('input[name="revisions"]:checked').value : '';
    const discounts = document.querySelector('input[name="discounts"]:checked') ? document.querySelector('input[name="discounts"]:checked').value : '0%';
    const fixedExtras = document.getElementById('fixedExtras').value;
    const paymentTerms = document.getElementById('paymentTerms').value;

    let finalCost = baseCost;
    finalCost += calculateDeadlineMultiplier(baseCost, deadlineMultiplier);
    finalCost += calculateSOWAdjustment(baseCost, sow);
    finalCost += calculateRevisionsCost(baseCost, revisions);
    finalCost -= calculateDiscount(baseCost, discounts);
    finalCost += calculateFixedExtras(fixedExtras);
    finalCost += calculateVariableExtras(baseCost);
    finalCost += calculateTeamLeadCost(baseCost);
    finalCost += calculatePMCost();
    finalCost += calculatePaymentTermRisks(baseCost, paymentTerms);

    document.querySelector('.result-label').innerText = `Result: ${finalCost.toFixed(2)}`;
}
//Additional functionality to magnify user experience
function checkBaseCost() {
    const baseCostInput = document.getElementById('baseCost');
    const calculateBtn = document.getElementById('calculateBtn');

    // Отримання числового значення з поля BaseCost
    const baseCostValue = parseFloat(baseCostInput.value);

    // Перевірка, чи число в полі BaseCost є додатнім
    const isBaseCostValid = !isNaN(baseCostValue) && baseCostValue > 0;

    // Встановлення активності кнопки Calculate залежно від коректності вводу
    calculateBtn.disabled = !isBaseCostValid;
}
function toggleRadioButton(e) {
    if (e.target === lastCheckedRadio) {
        e.target.checked = false;
        lastCheckedRadio = null;
    } else {
        lastCheckedRadio = e.target;
    }
}

function addVariableExtraField() {
    const container = document.getElementById('variableExtrasContainer');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'form-control mt-2';
    newInput.placeholder = '% of project';
    container.appendChild(newInput);
}