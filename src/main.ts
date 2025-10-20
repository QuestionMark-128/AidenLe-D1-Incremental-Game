import "./style.css";

const button = document.createElement("button");

button.style.fontSize = "64px";
button.style.borderRadius = "10%";
button.style.width = "128px";
button.style.height = "128px";
button.style.display = "flex";
button.style.alignItems = "center";
button.style.justifyContent = "center";
button.style.cursor = "pointer";

button.textContent = "💎";

document.body.append(button);

const counter = document.createElement("div");
counter.style.fontSize = "32px";
let count: number = 0;
counter.innerHTML = `${count} Gems`;
document.body.append(counter);

button.addEventListener("click", () => {
  count++;
  counter.innerHTML = `${count} Gems`;
});

// setInterval(() => {
//   count++;
//   counter.innerHTML = `${count} Gems`;
// }, 1000);
let growthRate: number = 0;
let lastTime = performance.now();
function update(now: number) {
  const delta = (now - lastTime) / 1000;
  count += delta * growthRate;
  counter.innerHTML = `${count.toFixed(2)} Gems`;
  growthRateDisplay.textContent = `Growth Rate: ${growthRate} Gems/sec`;
  upgrade1.disabled = count < 10;
  upgrade2.disabled = count < 100;
  upgrade3.disabled = count < 1000;
  lastTime = now;
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

const growthRateDisplay = document.createElement("div");
growthRateDisplay.style.fontSize = "24px";
growthRateDisplay.style.marginTop = "16px";

growthRateDisplay.textContent = `Growth Rate: ${growthRate} Gems/sec`;
document.body.append(growthRateDisplay);

const upgrade1 = document.createElement("button");
let ownedUpgrade1 = 0;

upgrade1.textContent = "Buy Upgrade 1 (10 Gems)";
upgrade1.disabled = true;

upgrade1.addEventListener("click", () => {
  if (count >= 10) {
    count -= 10;
    growthRate += 1;
    ownedUpgrade1++;
    growthRateDisplay.textContent = `Growth Rate: ${growthRate} Gems/sec`;
    updateOwnedUpgrades();
  }
});

const upgrade2 = document.createElement("button");
let ownedUpgrade2 = 0;

upgrade2.textContent = "Buy Upgrade 2 (100 Gems)";
upgrade2.disabled = true;

upgrade2.addEventListener("click", () => {
  if (count >= 100) {
    count -= 100;
    growthRate += 5;
    ownedUpgrade2++;
    growthRateDisplay.textContent = `Growth Rate: ${growthRate} Gems/sec`;
    updateOwnedUpgrades();
  }
});

const upgrade3 = document.createElement("button");
let ownedUpgrade3 = 0;

upgrade3.textContent = "Buy Upgrade 3 (1000 Gems)";
upgrade3.disabled = true;

upgrade3.addEventListener("click", () => {
  if (count >= 1000) {
    count -= 1000;
    growthRate += 20;
    ownedUpgrade3++;
    growthRateDisplay.textContent = `Growth Rate: ${growthRate} Gems/sec`;
    updateOwnedUpgrades();
  }
});
document.body.append(upgrade1, upgrade2, upgrade3);

const ownedUpgradesDisplay = document.createElement("div");
ownedUpgradesDisplay.style.fontSize = "24px";
ownedUpgradesDisplay.style.marginTop = "16px";

function updateOwnedUpgrades() {
  ownedUpgradesDisplay.innerHTML = `Owned Upgrades:<br>
    Upgrade 1: ${ownedUpgrade1}<br>
    Upgrade 2: ${ownedUpgrade2}<br>
    Upgrade 3: ${ownedUpgrade3}`;
}
updateOwnedUpgrades();

document.body.append(ownedUpgradesDisplay);
