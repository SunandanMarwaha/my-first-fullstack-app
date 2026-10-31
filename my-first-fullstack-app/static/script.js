const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");


calculateBtn.addEventListener("click", async function () {

    const num1 = num1Input.value;
    const num2 = num2Input.value;

    // Check whether both inputs are provided
    if (num1.trim() === "" || num2.trim() === "") {
        resultDiv.textContent = "Please enter both numbers.";
        return;
    }

    calculateBtn.disabled = true;
    resultDiv.textContent = "Calculating...";

    try {

        // Send the numbers to the Python back-end
        const response = await fetch("/api/add", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                num1: num1,
                num2: num2
            })
        });

        // Read the back-end response
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Calculation failed.");
        }

        // Display the answer returned by Python
        resultDiv.textContent = "Result: " + data.result;

    } catch (error) {

        resultDiv.textContent = "Error: " + error.message;

    } finally {

        calculateBtn.disabled = false;

    }

});