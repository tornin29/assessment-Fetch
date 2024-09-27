export const calculatePoints = (receipt) => {
  let points = 0;

  // Rule 1: One point for every alphanumeric character in the retailer name.
  if (receipt.retailer) {
    const retailer = receipt.retailer.replace(/[^a-z0-9]/gi, "");
    points += retailer.length;
  } else {
    console.error("Error: Missing retailer field in receipt.");
  }

  // Rule 2: 50 points if the total is a round dollar amount with no cents.
  const total = parseFloat(receipt.total);
  if (!isNaN(total)) {
    if (total % 1 === 0) {
      points += 50;
    }

    // Rule 3: 25 points if the total is a multiple of 0.25
    if (total % 0.25 === 0) {
      points += 25;
    }
  } else {
    console.error("Error: Invalid total in receipt.");
  }

  // Rule 4: 5 points for every two items on the receipt
  if (Array.isArray(receipt.items) && receipt.items.length > 0) {
    const itemCount = receipt.items.length;
    points += Math.floor(itemCount / 2) * 5;

    // Rule 5: If the item description length is a multiple of 3, apply specific logic
    receipt.items.forEach((item) => {
      if (item.shortDescription && typeof item.shortDescription === "string") {
        const descriptionLength = item.shortDescription.trim().length;
        if (descriptionLength % 3 === 0) {
          const additionalPoints = Math.ceil(parseFloat(item.price) * 0.2);
          points += additionalPoints;
        }
      } else {
        console.error("Error: Missing or invalid shortDescription in an item.");
      }
    });
  } else {
    console.error("Error: Items array is missing or empty in receipt.");
  }

  // Rule 6: 6 points if the purchase date day is odd
  const purchaseDate = new Date(receipt.purchaseDate);
  if (!isNaN(purchaseDate.getTime())) {
    if (purchaseDate.getDate() % 2 !== 0) {
      points += 6;
    }
  } else {
    console.error("Error: Invalid purchase date in receipt.");
  }

  // Rule 7: 10 points if the purchase time is between 2:00 pm and 4:00 pm
  const purchaseTime = new Date(`1970-01-01T${receipt.purchaseTime}`);
  if (!isNaN(purchaseTime.getTime())) {
    const hour = purchaseTime.getHours();
    if (hour >= 14 && hour < 16) {
      points += 10;
    }
  } else {
    console.error("Error: Invalid purchase time in receipt.");
  }

  console.log(`Total points: ${points}`);
  return points;
};
