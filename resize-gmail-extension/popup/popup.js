// Popup script to control line height settings
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('lineHeight');
  const valueDisplay = document.getElementById('valueDisplay');
  const presetButtons = document.querySelectorAll('.preset-buttons button');

  // Load saved setting
  chrome.storage.sync.get(['lineHeight'], function(result) {
    const savedValue = result.lineHeight || 1.0;
    slider.value = savedValue;
    updateDisplay(savedValue);
    updateActivePreset(savedValue);
  });

  // Update display value
  function updateDisplay(value) {
    valueDisplay.textContent = parseFloat(value).toFixed(2) + 'x';
  }

  // Update active preset button
  function updateActivePreset(value) {
    presetButtons.forEach(button => {
      if (Math.abs(parseFloat(button.dataset.value) - parseFloat(value)) === 0) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  // Slider change handler
  slider.addEventListener('input', function() {
    const value = this.value;
    updateDisplay(value);
    updateActivePreset(value);
    
    // Save setting and apply to Gmail
    chrome.storage.sync.set({ lineHeight: value }, function() {
      // Notify content script by sending message
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0] && tabs[0].url && tabs[0].url.includes('mail.google.com')) {
          chrome.tabs.sendMessage(tabs[0].id, { 
            action: 'updateLineHeight', 
            value: value 
          });
        }
      });
    });
  });

  // Preset button handlers
  presetButtons.forEach(button => {
    button.addEventListener('click', function() {
      const value = this.dataset.value;
      slider.value = value;
      updateDisplay(value);
      updateActivePreset(value);
      
      // Save and apply
      chrome.storage.sync.set({ lineHeight: value }, function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          if (tabs[0] && tabs[0].url && tabs[0].url.includes('mail.google.com')) {
            chrome.tabs.sendMessage(tabs[0].id, { 
              action: 'updateLineHeight', 
              value: value 
            });
          }
        });
      });
    });
  });
});
