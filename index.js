const colorInput = document.getElementById("color-input")
const colorSchemeMode = document.getElementById("color-scheme-mode")
const colorScheme = document.getElementById("color-scheme")
const colorHex = document.getElementById("color-hex")
const getBtn = document.getElementById("get-btn")

getBtn.addEventListener("click",  renderColor)

function renderColor () {
    const color = colorInput.value.replace("#", "")
    const colorMode = colorSchemeMode.value.toLowerCase()
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorMode}&count=5`)
    .then(res => res.json())
    .then(data => {
        colorScheme.innerHTML = ""
        colorHex.innerHTML = ""
        data.colors.forEach( colorItem => {
            const hex = colorItem.hex.value

            // Create Color block
            const colorDiv = document.createElement("div")
            colorDiv.classList.add("div-color")
            colorDiv.style.backgroundColor = hex

            // Overlay inside the color block
            const overlay = document.createElement("div")
            overlay.classList.add("copied-overlay")
            overlay.textContent = "✔ Copied"
            colorDiv.appendChild(overlay)

            // Create Hex label
            const hexDiv = document.createElement("div")
            hexDiv.classList.add("div-hex")
            hexDiv.textContent = hex

            // Copy just from hex div
            hexDiv.addEventListener("click", function () {
                navigator.clipboard.writeText(hex).then(() => {
                    hexDiv.textContent = "✔ Copied";
                    hexDiv.classList.add("copied");

                    setTimeout(() => {
                        hexDiv.textContent = hex;
                        hexDiv.classList.remove("copied");
                    }, 1000);
                });
            });

            // Copy just from color block
            colorDiv.addEventListener("click", function () {
                navigator.clipboard.writeText(hex).then(() => {
                    overlay.style.display = "block";

                    setTimeout(() => {
                        overlay.style.display = "none";
                    }, 1000);
                });
            });

            // Add to the page
            colorScheme.appendChild(colorDiv)
            colorHex.appendChild(hexDiv)
        })
    })

    .catch(error => {
        console.log("Error:", error)
        colorScheme.innerHTML = "<p>Error loading colors. Please try again.</p>"
        colorHex.innerHTML = ""
    })

}
renderColor () 