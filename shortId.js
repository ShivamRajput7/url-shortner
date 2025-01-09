const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Function to generate a short ID of a specific length
function generateShortId(length) {
  let shortId = "";
  const randomValues = new Uint8Array(length);

  // Fill the array with random values
  crypto.getRandomValues(randomValues);

  // Generate the short ID using the random values
  for (let i = 0; i < length; i++) {
    shortId += ALPHABET[randomValues[i] % 62]; // % 62 ensures the index is within Base62 range
  }

  return shortId;
}

module.exports = { generateShortId };
