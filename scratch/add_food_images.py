import re

file_path = "c:\\Users\\USER3\\Desktop\\양구군청\\index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# We need to find each month-card in the #restaurants section and inject the image.
# The #restaurants section starts at id="restaurants" and ends at id="map".

restaurants_start = content.find('<section class="section dark-bg" id="restaurants">')
map_start = content.find('<section class="map-section section" id="map">')

restaurants_content = content[restaurants_start:map_start]

images = [
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
]

# We will split by <div class="month-card" and insert the image div right after it.
parts = restaurants_content.split('<div class="month-card" style="width: 100%;">')

new_content = parts[0]
for i in range(1, len(parts)):
    img_src = images[i-1] if (i-1) < len(images) else "images/food_siraegi.png"
    img_html = f'\n                    <div style="height: 180px; overflow: hidden;">\n                        <img src="{img_src}" style="width: 100%; height: 100%; object-fit: cover;">\n                    </div>'
    new_content += '<div class="month-card" style="width: 100%;">' + img_html + parts[i]

# Write back
final_content = content[:restaurants_start] + new_content + content[map_start:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(final_content)

print("Images injected successfully.")
