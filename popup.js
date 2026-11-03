document.addEventListener('DOMContentLoaded', () => {
    // 1. Get references to our HTML elements
    const toggle = document.getElementById('autoScrollToggle');
    const slider = document.getElementById('delaySlider');
    const delayValueText = document.getElementById('delayValue');
    const statusMessage = document.getElementById('statusMessage');

    // 2. Load saved settings when the popup opens
    // We set default values (enabled: true, delay: 2) in case it's the user's first time
    chrome.storage.local.get({
        autoScrollEnabled: true,
        scrollDelay: 2
    }, (result) => {
        // Update the UI with the loaded settings
        toggle.checked = result.autoScrollEnabled;
        slider.value = result.scrollDelay;
        delayValueText.textContent = result.scrollDelay;
        updateStatusUI(result.autoScrollEnabled);
    });

    // 3. Listen for Toggle Changes
    toggle.addEventListener('change', () => {
        const isEnabled = toggle.checked;
        
        // Save the new state
        chrome.storage.local.set({ autoScrollEnabled: isEnabled });
        
        // Update the status message box visually
        updateStatusUI(isEnabled);
    });

    // 4. Listen for Slider Changes
    slider.addEventListener('input', () => {
        const newDelay = parseInt(slider.value, 10);
        
        // Update the number text next to the slider immediately as they drag
        delayValueText.textContent = newDelay;
        
        // Save the new delay
        chrome.storage.local.set({ scrollDelay: newDelay });
    });

    // 5. Helper function to update the visual status box
    function updateStatusUI(isEnabled) {
        if (isEnabled) {
            statusMessage.textContent = "Auto-scroll is active";
            statusMessage.classList.remove('disabled');
        } else {
            statusMessage.textContent = "Auto-scroll is disabled";
            statusMessage.classList.add('disabled');
        }
    }
});