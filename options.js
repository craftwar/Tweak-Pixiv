async function clearOptions(e) {
    const inputs = document.querySelectorAll("input");
    for (const input of inputs)
        input.value = "";
    await storage.sync.clear();
}

async function saveOptions(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll("input");
    await browser.storage.sync.set({
        buttonText: [inputs[0].value, inputs[1].value]
    });
}

async function restoreOptions() {
    const res = await browser.storage.sync.get('buttonText');
    const inputs = document.querySelectorAll("input");
    inputs[0].value = res.buttonText[0];
    inputs[1].value = res.buttonText[1];
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#clear").addEventListener("click", clearOptions);
document.querySelector("form").addEventListener("submit", saveOptions);