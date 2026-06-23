// Test file for code review - contains intentionally reviewable issues
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

const userInput = process.argv[2];
const result = calculateTotal(userInput);
console.log(result);