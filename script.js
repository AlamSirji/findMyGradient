const p = document.getElementById("cssStyle");

window.addEventListener("keypress",function(e){
    if (e.keyCode === 32) {
        randomGradient();
    }
    if (e.keyCode === 67 || e.keyCode === 99) {
        if (typeof Navigator.clipboard != undefined) {
            const textArea = document.createElement("TEXTAREA");
            textArea.value = p.innerHTML;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            textArea.remove();
        } else {
            Navigator.clipboard.writeText(p.innerHTML);
        }
    }
});

window.addEventListener("touchstart",randomGradient);

function randomGradient(){

        var colorStops = [];
        var degree;
        var percentages = [];
        var cssStyleValue;
        var gradientType = Math.floor(Math.random()*(1 - 0 + 1) + 0);

        colorStops.push(findRandom());
        colorStops.push(findRandom());
        
        degree = Math.floor(Math.random()*(360 - 0 + 1) + 0);

        percentages = [];
        percentages.push(Math.floor(Math.random()*(100 - 0 + 1) + 0) + "%");
        percentages.push(Math.floor(Math.random()*(100 - 0 +
         1) + 0) + "%");

        if (gradientType === 1) {
            cssStyleValue = `linear-gradient(${degree}deg,#${colorStops[0]} ${percentages[0]},#${colorStops[1]} ${percentages[1]})`;
        } else {
            cssStyleValue = `radial-gradient(#${colorStops[0]} ${percentages[0]},#${colorStops[1]} ${percentages[1]})`;
        }


        // Update Self Body & Paragraph
        p.innerHTML = `background-image: ${cssStyleValue};`;
        document.body.style.backgroundImage = cssStyleValue;

}

function findRandom(){
    const indices = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
    const code = [];
    code.push(indices[Math.floor(Math.random()*(indices.length - 0))]);
    code.push(indices[Math.floor(Math.random()*(indices.length - 0))]);
    code.push(indices[Math.floor(Math.random()*(indices.length - 0))]);
    code.push(indices[Math.floor(Math.random()*(indices.length - 0))]);
    code.push(indices[Math.floor(Math.random()*(indices.length - 0))]);
    code.push(indices[Math.floor(Math.random()*(indices.length - 0))]);
    return code.join("");

}