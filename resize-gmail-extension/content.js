// Content script to apply dynamic line height styles to Gmail
(function() {
  'use strict';

  // Default line height multiplier
  let lineHeightMultiplier = 1;

  // Load saved settings
  chrome.storage.sync.get(['lineHeight'], function(result) {
    if (result.lineHeight !== undefined) {
      lineHeightMultiplier = parseFloat(result.lineHeight);
    }
    applyLineHeight(lineHeightMultiplier);
  });

  // Listen for storage changes
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.lineHeight) {
      lineHeightMultiplier = parseFloat(changes.lineHeight.newValue);
      applyLineHeight(lineHeightMultiplier);
    }
  });

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updateLineHeight') {
      lineHeightMultiplier = parseFloat(request.value);
      applyLineHeight(lineHeightMultiplier);
      sendResponse({ success: true });
    }
    return true;
  });

  function applyLineHeight(multiplier) {
    // Calculate font-size multiplier (increases slightly faster than line-height)
    // Font-size increases by only 20% of the line-height increase (e.g., 1.5 line-height = 1.1 font-size)
    // This keeps font-size much smaller than line-height
    const fontSizeMultiplier = 1 + (multiplier - 1) * 0.2;
    
    // Remove existing style tag if present
    const existingStyle = document.getElementById('gmail-line-enlarger-style');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new style element
    const style = document.createElement('style');
    style.id = 'gmail-line-enlarger-style';
    
    // Apply line height to Gmail email content
    style.textContent = `
      /* Email thread content */
      .ii.gt,
      .ii.gt *,
      .Am,
      .Am *,
      .a3s,
      .a3s * {
        line-height: ${multiplier} !important;
        font-size: calc(1em * ${fontSizeMultiplier}) !important;
      }

      /* Email list items */
      .zA,
      .zA * {
        line-height: ${multiplier} !important;
        font-size: calc(1em * ${fontSizeMultiplier}) !important;
      }

      /* Compose window */
      .Ar,
      .Ar *,
      .Ar.editable {
        line-height: ${multiplier} !important;
        font-size: calc(1em * ${fontSizeMultiplier}) !important;
      }

      /* Read pane email body */
      .a3s {
        line-height: ${multiplier} !important;
        font-size: calc(1em * ${fontSizeMultiplier}) !important;
      }

      /* Individual email lines */
      div[role="main"] div[role="main"] div[data-message-id] {
        line-height: ${multiplier} !important;
        font-size: calc(1em * ${fontSizeMultiplier}) !important;
      }
    `;

    document.head.appendChild(style);

    // Also apply to dynamically loaded content
    observeGmailChanges();
  }

  // Observe Gmail's dynamic content loading
  function observeGmailChanges() {
    const observer = new MutationObserver(function(mutations) {
      // Reapply styles if needed (Gmail uses dynamic loading)
      const style = document.getElementById('gmail-line-enlarger-style');
      if (!style) {
        applyLineHeight(lineHeightMultiplier);
      }
    });

    // Start observing when DOM is ready
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      });
    }
  }

  // Initial observation setup
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeGmailChanges);
  } else {
    observeGmailChanges();
  }
})();
