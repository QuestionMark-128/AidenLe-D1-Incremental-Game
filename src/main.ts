import "./style.css";

const button = document.createElement("button");

button.style.fontSize = "32px";
button.style.borderRadius = "10%";
button.style.width = "128px";
button.style.height = "128px";
button.style.display = "flex";
button.style.alignItems = "center";
button.style.justifyContent = "center";
button.style.cursor = "pointer";

button.textContent = `💎Mine Gems`;

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
  growthRateDisplay.textContent = `Gem Rate: ${growthRate} Gems/sec`;
  upgrade1.disabled = count < cost1;
  upgrade2.disabled = count < cost2;
  upgrade3.disabled = count < cost3;
  lastTime = now;
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

const growthRateDisplay = document.createElement("div");
growthRateDisplay.style.fontSize = "24px";
growthRateDisplay.style.marginTop = "16px";

growthRateDisplay.textContent = `Gem Rate: ${growthRate} Gems/sec`;
document.body.append(growthRateDisplay);

const upgrade1 = document.createElement("button");
let ownedUpgrade1 = 0;
let cost1 = 10;

upgrade1.textContent = "Hire Miner (10 Gems)";
upgrade1.disabled = true;

upgrade1.addEventListener("click", () => {
  if (count >= cost1) {
    count -= cost1;
    growthRate += 1;
    ownedUpgrade1++;
    cost1 *= 1.15;
    upgrade1.textContent = `Hire Miner (${cost1.toFixed(2)} Gems)`;
    growthRateDisplay.textContent = `Growth Rate: ${growthRate} Gems/sec`;
    updateOwnedUpgrades();
  }
});

const upgrade2 = document.createElement("button");
let ownedUpgrade2 = 0;
let cost2 = 100;

upgrade2.textContent = "Buy Drill(100 Gems)";
upgrade2.disabled = true;

upgrade2.addEventListener("click", () => {
  if (count >= cost2) {
    count -= cost2;
    growthRate += 5;
    ownedUpgrade2++;
    cost2 *= 1.15;
    upgrade2.textContent = `Buy Drill(${cost2.toFixed(2)} Gems)`;
    growthRateDisplay.textContent = `Growth Rate: ${growthRate} Gems/sec`;
    updateOwnedUpgrades();
  }
});

const upgrade3 = document.createElement("button");
let ownedUpgrade3 = 0;
let cost3 = 1000;

upgrade3.textContent = `Buy Gem Extractor (${cost3} Gems)`;
upgrade3.disabled = true;

upgrade3.addEventListener("click", () => {
  if (count >= cost3) {
    count -= cost3;
    growthRate += 20;
    ownedUpgrade3++;
    cost3 *= 1.15;
    upgrade3.textContent = `Buy Gem Extractor (${cost3.toFixed(2)} Gems)`;
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
    Miners: ${ownedUpgrade1}<br>
    Drills: ${ownedUpgrade2}<br>
    Gem Extractors: ${ownedUpgrade3}`;
}
updateOwnedUpgrades();

document.body.append(ownedUpgradesDisplay);
