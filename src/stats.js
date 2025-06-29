"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStatLogic = setupStatLogic;
function setupStatLogic() {
    const statInputs = document.querySelectorAll('#stats input');
    const pointsLeftDisplay = document.getElementById("pointsLeft");
    const MAX_POINTS = 27;
    const resetBtn = document.getElementById("resetBtn");
    resetBtn.addEventListener("click", () => {
        statInputs.forEach(input => input.value = "8");
        updatePoints();
    });
    const costTable = {
        8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
    };
    function updatePoints() {
        let totalCost = 0;
        const currentValues = [];
        statInputs.forEach(input => {
            var _a;
            const val = parseInt(input.value);
            currentValues.push(val);
            totalCost += (_a = costTable[val]) !== null && _a !== void 0 ? _a : 0;
        });
        const pointsLeft = MAX_POINTS - totalCost;
        pointsLeftDisplay.textContent = pointsLeft.toString();
        pointsLeftDisplay.style.color = pointsLeft < 0 ? "red" : "black";
        statInputs.forEach((input, i) => {
            var _a, _b;
            const current = currentValues[i];
            const next = current + 1;
            const canIncrease = pointsLeft >= (((_a = costTable[next]) !== null && _a !== void 0 ? _a : 999) - ((_b = costTable[current]) !== null && _b !== void 0 ? _b : 0));
            input.max = canIncrease ? "15" : current.toString();
        });
    }
    statInputs.forEach(input => {
        input.addEventListener("input", updatePoints);
    });
    updatePoints();
}
