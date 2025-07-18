export function setupStatLogic(validateForm: () => void) {
  const statInputs = document.querySelectorAll<HTMLInputElement>('#stats input');
  const pointsLeftDisplay = document.getElementById("pointsLeft")!;
  const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
  const MAX_POINTS = 30;
  const MIN = 8;
  const MAX = 15;

  const costTable: { [score: number]: number } = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
  };

  function calculatePoints(): number {
    let totalCost = 0;
    statInputs.forEach(input => {
      const val = parseInt(input.value);
      if (!isNaN(val) && costTable[val] !== undefined) {
        totalCost += costTable[val];
      }
    });
    return MAX_POINTS - totalCost;
  }

  function updatePointsPreview() {
    const pointsLeft = calculatePoints();
    pointsLeftDisplay.textContent = pointsLeft.toString();
    pointsLeftDisplay.style.color = pointsLeft < 0 ? "red" : "black";

    validateForm();
  }

  function updatePoints() {
    let totalCost = 0;
    let hasCustomStats = false;
    const currentValues: number[] = [];

    statInputs.forEach(input => {
      let val = parseInt(input.value);
      if (isNaN(val) || val < MIN) val = MIN;
      if (val > MAX) val = MAX;
      input.value = val.toString();

      currentValues.push(val);
      totalCost += costTable[val] ?? 0;

      if (val !== 8) {
        hasCustomStats = true;
      }
    });

    const pointsLeft = MAX_POINTS - totalCost;
    pointsLeftDisplay.textContent = pointsLeft.toString();
    pointsLeftDisplay.style.color = pointsLeft < 0 ? "red" : "black";
    resetBtn.disabled = !hasCustomStats;

    statInputs.forEach((input, i) => {
      const current = currentValues[i];
      const next = current + 1;
      const canIncrease = pointsLeft >= ((costTable[next] ?? 999) - (costTable[current] ?? 0));
      input.max = canIncrease ? "15" : current.toString();
    });

    validateForm(); 
  }

  resetBtn.addEventListener("click", () => {
    statInputs.forEach(input => input.value = "8");
    updatePoints();
  });

  statInputs.forEach(input => {
    input.addEventListener("input", updatePointsPreview); 
    input.addEventListener("blur", updatePoints);  
  });

  updatePoints();
}
