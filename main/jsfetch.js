document.getElementById("fetch-btn").addEventListener("click", async () => {
    const apiUrl = document.getElementById("api-url").value;
    const responseBox = document.getElementById("response");

    if (!apiUrl) {
        responseBox.innerHTML = `<code class="json">Please enter an API URL</code>`;
        return;
    }

    try {
        responseBox.innerHTML = `<code class="json">Loading ⏳</code>`;
        
        const res = await fetch(`/api/fetch?url=${encodeURIComponent(apiUrl)}`);
        const data = await res.json();

        // Pretty-print JSON response
        responseBox.innerHTML = `<code class="json">${JSON.stringify(data, null, 4)}</code>`;
    } catch (error) {
        responseBox.innerHTML = `<code class="json">Error fetching</code>`;
    }
});

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const modeText = document.getElementById("mode-text");

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.checked = true;
    modeText.textContent = "☀️";
}

themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        modeText.textContent = "☀️";
    } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        modeText.textContent = "🌙";
    }
});
