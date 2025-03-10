let url = "";

function getText(element) {
    url = element.value;
}

const input = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', async () => {
    getText(input);
    const scrapedString = await fetchScrapedData(url);
    downloadFile(scrapedString, "scraped_data.txt");
});

async function fetchScrapedData(url) {
    const response = await fetch("https://scrape-email-avkg.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
    });

    // Expecting plain text, not JSON, so we use response.text() instead of response.json()
    const text = await response.text();
    return text;
}

function downloadFile(content, filename) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
