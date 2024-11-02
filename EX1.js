const fs = require('fs');

// Function to parse the JSON input
function parseInput(jsonData) {
    const n = jsonData.keys.n;
    const k = jsonData.keys.k;
    const points = [];

    // Loop through each root entry in the JSON data
    Object.keys(jsonData).forEach((key) => {
        if (key === 'keys') return; // Skip the 'keys' object

        const x = parseInt(key); // x-coordinate is the key itself
        const base = parseInt(jsonData[key].base);
        const y = BigInt(parseInt(jsonData[key].value, base)); // Convert y to base-10 using its base as BigInt
        points.push([x, y]);
    });

    return { n, k, points };
}

// Function to compute the constant term using Lagrange Interpolation
function lagrangeInterpolation(points, k) {
    let constantTerm = BigInt(0);

    for (let i = 0; i < k; i++) {
        const [x_i, y_i] = points[i];
        let term = y_i;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const [x_j, _] = points[j];
                term *= BigInt(0 - x_j) / BigInt(x_i - x_j); // Use BigInt to avoid overflow for large values
            }
        }
        constantTerm += term;
    }

    return constantTerm; // Return as BigInt
}

// Main function to run the solution
function main() {
    const inputData = {
        "keys": {
            "n": 10,
            "k": 7
        },
        "1": {
            "base": "6",
            "value": "13444211440455345511"
        },
        "2": {
            "base": "15",
            "value": "aed7015a346d63"
        },
        "3": {
            "base": "15",
            "value": "6aeeb69631c227c"
        },
        "4": {
            "base": "16",
            "value": "e1b5e05623d881f"
        },
        "5": {
            "base": "8",
            "value": "316034514573652620673"
        },
        "6": {
            "base": "3",
            "value": "2122212201122002221120200210011020220200"
        },
        "7": {
            "base": "3",
            "value": "20120221122211000100210021102001201112121"
        },
        "8": {
            "base": "6",
            "value": "20220554335330240002224253"
        },
        "9": {
            "base": "12",
            "value": "45153788322a1255483"
        },
        "10": {
            "base": "7",
            "value": "1101613130313526312514143"
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
