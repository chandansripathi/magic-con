// Optimized script.js - Improved performance and maintainability

document.addEventListener("DOMContentLoaded", () => {
    initScript();
});

function initScript() {
    attachEventListeners();
    loadUserSettings();
}

// Attach event listeners
function attachEventListeners() {
    document.getElementById("saveBtn")?.addEventListener("click", saveSettings);
    document.getElementById("resetBtn")?.addEventListener("click", resetSettings);
}

// Load user settings from local storage
function loadUserSettings() {
    try {
        const settings = JSON.parse(localStorage.getItem("userSettings")) || {};
        document.getElementById("username").value = settings.username || "";
        document.getElementById("theme").value = settings.theme || "light";
    } catch (error) {
        console.error("Error loading settings:", error);
    }
}

// Save user settings to local storage
function saveSettings() {
    const settings = {
        username: document.getElementById("username").value.trim(),
        theme: document.getElementById("theme").value
    };

    localStorage.setItem("userSettings", JSON.stringify(settings));
    alert("Settings saved!");
}

// Reset user settings
function resetSettings() {
    localStorage.removeItem("userSettings");
    loadUserSettings();
    alert("Settings reset to default.");
}
