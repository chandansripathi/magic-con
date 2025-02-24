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

document.addEventListener("DOMContentLoaded", () => {
    const ipDisplay = document.getElementById("ip");
    const userInput = document.getElementById("user-input");
    const actionBtn = document.getElementById("action-btn");
    const outputText = document.getElementById("output-text");

    // Function to fetch external IP (Optimized)
    async function fetchIP() {
        const ipSources = [
            "https://api64.ipify.org?format=json",
            "https://api.myip.com",
            "https://ipwho.is/"
        ];

        for (const source of ipSources) {
            try {
                const response = await fetch(source);
                if (!response.ok) continue;

                const data = await response.json();
                const ip = data.ip || data.query || data.ip_address;

                if (ip) {
                    ipDisplay.textContent = ip;
                    localStorage.setItem("lastIP", ip);
                    return;
                }
            } catch (error) {
                console.error(`Error fetching from ${source}:`, error);
            }
        }

        ipDisplay.textContent = "IP Not Found";
    }

    // Function to handle user command input
    function handleUserInput() {
        const command = userInput.value.trim().toLowerCase();
        if (!command) return;

        outputText.textContent = `Processing: ${command}`;
        setTimeout(() => {
            outputText.textContent = `Executed: ${command}`;
        }, 1000);
    }

    // Event Listeners
    actionBtn.addEventListener("click", handleUserInput);
    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") handleUserInput();
    });

    // Fetch IP on Load
    fetchIP();
});
