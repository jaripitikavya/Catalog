const fs = require('fs');

// Parse the input directly from the JSON object or JSON file
function parseInput(jsonData) {
    const n = jsonData.keys.n;
    const k = jsonData.keys.k;
    const points = [];
    
    // Loop through the points based on the keys in JSON
    Object.keys(jsonData).forEach((key) => {
        if (key === 'keys') return; // Skip the 'keys' object
        const x = parseInt(key); // x-coordinate is the key itself
        const base = parseInt(jsonData[key].base);
        const y = parseInt(jsonData[key].value, base); // Convert y to base-10 using its base
        points.push([x, y]);
    });

    return { n, k, points };
}

// Function to compute the constant term using Lagrange Interpolation
function lagrangeInterpolation(points, k) {
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        const [x_i, y_i] = points[i];
        let term = y_i;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const [x_j, _] = points[j];
                term *= (0 - x_j) / (x_i - x_j); // Multiply to find constant term `c`
            }
        }
        constantTerm += term;
    }

    return Math.round(constantTerm); // Rounding for integer result
}

// Main function to run the solution
function main() {
    const inputData = {
        "keys": {
            "n": 4,
            "k": 3
        },
        "1": {
            "base": "10",
            "value": "4"
        },
        "2": {
            "base": "2",
            "value": "111"
        },
        "3": {
            "base": "10",
            "value": "12"
        },
        "6": {
            "base": "4",
            "value": "213"
        }
    };

    // Parse and decode input
    const { k, points } = parseInput(inputData);

    // Calculate the constant term
    const constant = lagrangeInterpolation(points, k);

    console.log(`The secret constant term (c) is: ${constant}`);
}

// Run the program
main();
