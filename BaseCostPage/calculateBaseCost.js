document.addEventListener('DOMContentLoaded', function() {
    const projectTypeSelect = document.getElementById('projectType');
    const complexitySelect = document.getElementById('complexity');
    const additionalInputsContainer = document.getElementById('additionalInputsContainer');
    const additionalViewSelect = document.getElementById('additionalViewSelect');
    const additionalOptionSelect = document.getElementById('additionalOptionSelect');
    const animationInputContainer = document.getElementById('animationInputContainer');
    const btnAddView = document.getElementById('btnAdditionalView');
    const btnAddOption = document.getElementById('btnAdditionalOption');
    

    projectTypeSelect.addEventListener('change', function() {
        updateOptions(projectTypeSelect.value);
        updateAnimationInput(projectTypeSelect.value);
        
    });



    function updateOptions(projectType) {
        const isModeling = projectType === 'Modeling' || projectType === 'AR Modeling';
        complexitySelect.innerHTML = ''; 
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
    function updateAnimationInput(projectType) {
        animationInputContainer.innerHTML = ''; // Очищуємо контейнер

        if (projectType === 'Animation') {
            const secondsInput = document.createElement('input');
            secondsInput.type = 'number';
            secondsInput.id = 'animationSeconds';
            secondsInput.placeholder = 'Enter number of seconds';
            secondsInput.className = 'form-control mt-3';
            animationInputContainer.appendChild(secondsInput);
            btnAddOption.style.display = 'none';
            btnAddView.style.display = 'none';

        }
        else{
            btnAddOption.style.display = 'block';
            btnAddView.style.display = 'block';
        }
        // Додаємо контейнер до DOM, якщо він ще не доданий
        if (!secondsInputContainer.parentNode) {
            projectTypeSelect.parentNode.insertBefore(animationInputContainer, projectTypeSelect.nextSibling);
        }

    }

    btnAddView.addEventListener('click', function() {
        additionalViewSelect.innerHTML= '';
        const options = ['Additional render(existing space)', 'Ratio change', 'Zoom In', 'Zoom Out(up to 20%)', 
    'Opposite elevation', 'Side elevation'];
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.toLowerCase().replace(/\s+/g, '_');
        opt.textContent = option;
        additionalViewSelect.appendChild(opt);
    });

    });
    
    btnAddOption.addEventListener('click', function() {
       // additionalOptionSelect.style.display = 'block';
    });
});




function calculateCost() {
   
}
 