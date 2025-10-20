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

setInterval(() => {
  count++;
  counter.innerHTML = `${count} Gems`;
}, 1000);
