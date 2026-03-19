document.addEventListener("DOMContentLoaded", function(){
    var selected = localStorage.getItem("selectedChar") || "月";
    var data = characterinfo[selected];
    document.getElementById("character-display").textContent= selected;
    document.getElementById("oracle-script").src= data.oracleImage;
    document.getElementById("bronze-script").src = data.bronzeImage;
    document.getElementById("seal-script").src = data.sealImage;
    document.getElementById("meaning-text").textContent = data.meaning;
    document.getElementById("radical-text").textContent = data.radicalMeaning;
    document.getElementById("strokes-text").textContent = data.strokes;
    document.getElementById("structure-text").textContent = data.structure;
    document.getElementById("pinyin-text").textContent = data.pinyin;
    document.getElementById("stroke-animation").src = data.animation;
})