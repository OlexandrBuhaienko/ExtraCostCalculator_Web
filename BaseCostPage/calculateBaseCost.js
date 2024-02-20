document.addEventListener('DOMContentLoaded', function() {
    const projectTypeSelect = document.getElementById('projectType');
    const complexitySelect = document.getElementById('complexity'); // Переконайтеся, що є елемент з цим id
    const additionalOptionsContainer = document.createElement('div'); // Будемо створювати новий контейнер

    projectTypeSelect.addEventListener('change', function() {
        updateComplexityOptions(projectTypeSelect.value);
        updateAdditionalOptions(projectTypeSelect.value);
    });

    function updateComplexityOptions(projectType) {
        const isModeling = projectType === 'Modeling' || projectType === 'AR Modeling';
        complexitySelect.innerHTML = ''; // Очищаємо опції
        const options = isModeling 
            ? ['Simple', 'Medium', 'Complex', 'Ultra Complex']
            : ['Simple', 'Medium', 'Complex'];

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.toLowerCase().replace(/\s+/g, '_');
            opt.textContent = option;
            complexitySelect.appendChild(opt);
        });

        if (projectType === 'Animation') {
            complexitySelect.innerHTML = `
                <option value="promo">Promo Animation</option>
                <option value="vfx">VFX Animation</option>
                <option value="installation">Installation Animation</option>
                <option value="architectural">Architectural Animation</option>
                <option value="motion">Motion Design</option>
            `;
        }
    }

    function updateAdditionalOptions(projectType) {
        additionalOptionsContainer.innerHTML = ''; // Очищуємо контейнер

        if (projectType === 'Animation') {
            const secondsInput = document.createElement('input');
            secondsInput.type = 'number';
            secondsInput.id = 'animationSeconds';
            secondsInput.placeholder = 'Enter number of seconds';
            secondsInput.className = 'form-control';
            additionalOptionsContainer.appendChild(secondsInput);
        }

        // Додаємо контейнер до DOM, якщо він ще не доданий
        if (!additionalOptionsContainer.parentNode) {
            projectTypeSelect.parentNode.insertBefore(additionalOptionsContainer, projectTypeSelect.nextSibling);
        }
    }
});

function calculateCost() {
    // Тут ваша логіка для обчислення вартості
}
 