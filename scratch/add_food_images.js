const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

const restaurantsStart = content.indexOf('<section class="section dark-bg" id="restaurants">');
const mapStart = content.indexOf('<section class="map-section section" id="map">');

if (restaurantsStart === -1 || mapStart === -1) {
    console.error("Could not find section boundaries");
    process.exit(1);
}

const restaurantsContent = content.substring(restaurantsStart, mapStart);

const images = [
    "images/food_jjamppong1.png",
    "images/food_jjamppong2.png",
    "images/food_jjukkumi.png",
    "images/food_steak.png",
    "images/food_pasta.png",
    "images/food_noodles.png",
    "images/food_noodles.png",
    "images/food_siraegi.png",
    "images/food_chicken.png",
    "images/food_chicken.png",
    "images/food_siraegi.png",
    "images/food_noodles.png",
];

const parts = restaurantsContent.split('<div class="month-card" style="width: 100%;">');

let newContent = parts[0];
for (let i = 1; i < parts.length; i++) {
    const imgSrc = images[i-1] || "images/food_siraegi.png";
    const imgHtml = `\n                    <div style="height: 180px; overflow: hidden;">\n                        <img src="${imgSrc}" style="width: 100%; height: 100%; object-fit: cover;">\n                    </div>`;
    newContent += '<div class="month-card" style="width: 100%;">' + imgHtml + parts[i];
}

const finalContent = content.substring(0, restaurantsStart) + newContent + content.substring(mapStart);

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log("Images injected successfully!");
