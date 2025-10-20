import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  owned: number;
  button?: HTMLButtonElement;
}

const itemsAvailable: Item[] = [
  { name: "Hire Miner", cost: 10, rate: 1, owned: 0 },
  { name: "Buy Drill", cost: 100, rate: 5, owned: 0 },
  { name: "Buy Gem Extractor", cost: 1000, rate: 20, owned: 0 },
];

const container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.justifyContent = "center";
container.style.height = "100vh";
document.body.appendChild(container);

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

container.append(button);

const counter = document.createElement("div");
counter.style.fontSize = "32px";
let count: number = 0;
counter.innerHTML = `${count} Gems`;
container.append(counter);

const gemRateDisplay = document.createElement("div");
gemRateDisplay.style.fontSize = "24px";
gemRateDisplay.style.marginTop = "16px";

container.append(gemRateDisplay);

const ownedUpgradesDisplay = document.createElement("div");
ownedUpgradesDisplay.style.fontSize = "24px";
ownedUpgradesDisplay.style.marginTop = "16px";

container.append(ownedUpgradesDisplay);

let gemRate: number = 0;

button.addEventListener("click", () => {
  count++;
  counter.innerHTML = `${count} Gems`;
});

const upgradecontainer = document.createElement("div");
upgradecontainer.style.display = "flex";
upgradecontainer.style.flexDirection = "column";
upgradecontainer.style.alignItems = "center";
upgradecontainer.style.justifyContent = "center";
upgradecontainer.style.marginTop = "16px";
container.append(upgradecontainer);

itemsAvailable.forEach((item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.textContent = `${item.name} (${item.cost.toFixed(2)} Gems)`;
  upgradeButton.disabled = true;
  upgradecontainer.appendChild(upgradeButton);

  upgradeButton.addEventListener("click", () => {
    if (count >= item.cost) {
      count -= item.cost;
      item.owned++;
      gemRate += item.rate;
      item.cost *= 1.15;
      upgradeButton.textContent = `${item.name} (${item.cost.toFixed(2)} Gems)`;
      updateOwnedUpgrades();
    }
  });

  item.button = upgradeButton;
});

function updateOwnedUpgrades() {
  ownedUpgradesDisplay.innerHTML = `Owned Upgrades:<br>${
    itemsAvailable.map((i) => `${i.name}: ${i.owned}`).join("<br>")
  }`;
}

// setInterval(() => {
//   count++;
//   counter.innerHTML = `${count} Gems`;
// }, 1000);

function update(now: number) {
  const delta = (now - lastTime) / 1000;
  count += delta * gemRate;
  counter.innerHTML = `${count.toFixed(2)} Gems`;
  gemRateDisplay.textContent = `Gem Rate: ${gemRate} Gems/sec`;
  itemsAvailable.forEach((item) => {
    if (item.button) {
      item.button.disabled = count < item.cost;
    }
  });
  lastTime = now;
  requestAnimationFrame(update);
}
let lastTime = performance.now();
requestAnimationFrame(update);
updateOwnedUpgrades();
