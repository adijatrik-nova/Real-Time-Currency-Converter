const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdownFrom = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".display");

// append options dynamically
for (let select of dropdownFrom) {
    for (let currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currencyCode;
        if (currencyCode === "USD" && select.name === "from") {
            newOption.selected = true;
        } else if (currencyCode === "INR" && select.name === "to") {
            newOption.selected = true;
        }
        newOption.innerText = currencyCode;
        select.appendChild(newOption);

        // event listener
        select.addEventListener("change", (et) => {
            updateFlag(et.target);
        });
    }
}

// update flag
const updateFlag = (element) => {
    let currencyCode = element.value;
    let countrycode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Exchange Rate
const getExchangeRate = async () => {

    let amount = document.querySelector("input");
    let amountValue = amount.value;
    if (amountValue === "" || amountValue === "0" || amountValue < 1) {
        amount.value = 1;
        amountValue = 1;
    }

    // Use new API
    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    // Extract correct rate
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];

    let finalAmount = (amountValue * rate).toFixed(2);
    msg.innerText = `${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
};

// preventing changing is not allowed
button.addEventListener("click", (et) => {
    et.preventDefault();
    getExchangeRate();
});

document.addEventListener("click", () => {
    getExchangeRate();
});