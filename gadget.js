// Optimized gadget.js for better performance and maintainability

document.addEventListener("DOMContentLoaded", () => {
    initGadget();
});

// Initialize gadget
function initGadget() {
    updateStatus();
    if (autoeip === 1) {
        setInterval(getIP, seteiptimer * 60000);
    }
}

// Fetch external IP using fetch API
async function getIP() {
    if (showextip !== 2) {
        const ipSources = [
            'https://checkip.amazonaws.com',
            'https://api.ipify.org',
            'https://ifconfig.me/ip',
            'https://ipinfo.io/ip'
        ];

        for (const source of ipSources) {
            try {
                const response = await fetch(source);
                if (response.ok) {
                    const ip = await response.text();
                    document.getElementById('ip').textContent = `Ext. IP: ${ip.trim()}`;
                    saveIPLog(ip.trim());
                    return;
                }
            } catch (error) {
                console.warn(`Failed to fetch IP from ${source}`);
            }
        }
        document.getElementById('ip').textContent = 'Ext. IP: Not found';
    }
}

// Save IP to local storage
function saveIPLog(ip) {
    console.log(`Logging IP: ${ip}`);
    localStorage.setItem('lastIP', ip);
}

// Update status display
function updateStatus() {
    document.getElementById('status').textContent = "Gadget Running...";
}

// Event Listeners
document.getElementById("refreshBtn")?.addEventListener("click", getIP);
