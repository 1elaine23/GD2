document.addEventListener("DOMContentLoaded", function(){
    var selected = localStorage.getItem("selectedChar")

    const content = document.getElementById("learn-content")
    const selector = document.getElementById("learn-select")

    if (!selected){ // if selected is false show the selection grid
        content.style.display = "none";
        selector.style.display = "block";
        return;
    }   content.style.display = "block";
        selector.style.display = "none";

    var data = characterinfo[selected]; //get the information for the selected word
    document.getElementById("character-display").textContent= selected; // replacing each section with the information based on selected word 
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