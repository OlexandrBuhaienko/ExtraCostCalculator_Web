document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateBtn').addEventListener('click', calculateResult);
});

function calculateResult() {
    const baseCost = parseFloat(document.getElementById('baseCost').value) || 0;
    const deadlineMultiplier = document.getElementById('deadlineMultiplier').value;
    const sow = document.getElementById('sow').value;
    const revisions = document.querySelector('input[name="revisions"]:checked').value;
    const discounts = document.querySelector('input[name="discounts"]:checked') ? document.querySelector('input[name="discounts"]:checked').value : '0%';
    const fixedExtras = parseFloat(document.getElementById('fixedExtras').value) || 0;
    const variableExtras = parseFloat(document.getElementById('variableExtras').value) || 0;
    const paymentTerms = document.getElementById('paymentTerms').value;

    let finalCost = baseCost;

    // Deadline Multiplier
    switch (deadlineMultiplier) {
        case 'x2':
            finalCost += baseCost * 0.3;
            break;
        case 'x3':
            finalCost += baseCost * 0.6;
            break;
        // No default case needed for 'Flexible'
    }

    // SOW
    switch (sow) {
        case 'Perfect':
            finalCost -= baseCost * 0.1;
            break;
        case 'Not as per example':
            finalCost += baseCost * 0.1;
            break;
        // No default case needed for 'Ok'
    }

    // Revisions
    if (revisions === 'More') {
        finalCost += baseCost * 0.1;
    }

    // Discounts
    const discountRate = parseFloat(discounts) / 100;
    finalCost *= (1 - discountRate);

    // Fixed Extras
    finalCost += fixedExtras;

    // Variable Extras
    finalCost += baseCost * (variableExtras / 100);

    // Payment Term Risks
    switch (paymentTerms) {
        case 'NET30':
            finalCost += baseCost * 0.03;
            break;
        case 'NET60':
            finalCost += baseCost * 0.06;
            break;
        // No default case needed for 'None'
    }

    // Display the result
    document.querySelector('.result-label').innerText = `Result: ${finalCost.toFixed(2)}`;
}
