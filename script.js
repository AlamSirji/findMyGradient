// var timer = setInterval(generateRandomGradient, 150);
// window.addEventListener("mousemove",() => {
//     clearInterval(timer);
// });
generateRandomGradient();

function generateRandomGradient() {

    const maxColorStop = 5;
    const minColorStop = 2;

    var colorStops = [];
    var degree;
    var percentages = [];
    var gradientType = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    var totalColorStops = Math.floor(Math.random() * (maxColorStop - minColorStop + 1) + minColorStop);
    for (let index = 0; index < totalColorStops; index++) {
        colorStops.push(findRandomColor());
    }
    degree = Math.floor(Math.random() * (360 - 0 + 1) + 0);

    percentages = [];
    for (let index = 0; index < totalColorStops + 10; index++) {
        percentages.push(Math.floor(Math.random() * (100 - 0 + 1) + 0) + "%");
    }

    if (gradientType === 1) {
        // linear gradient
        switch (totalColorStops) {
            case 3:
                cssStyleValue = `linear-gradient(
                        ${degree}deg, 
                        #${colorStops[0]} ${percentages[0]}, 
                        #${colorStops[1]} ${percentages[1]}, 
                        #${colorStops[2]} ${percentages[2]})`;
                break;

            case 4:
                cssStyleValue = `linear-gradient(
                        ${degree}deg, 
                        #${colorStops[0]} ${percentages[0]}, 
                        #${colorStops[1]} ${percentages[1]},
                        #${colorStops[2]} ${percentages[2]}, 
                        #${colorStops[3]} ${percentages[3]})`;
                break;

            case 5:
                cssStyleValue = `linear-gradient(
                        ${degree}deg, 
                        #${colorStops[0]} ${percentages[0]}, 
                        #${colorStops[1]} ${percentages[1]},
                        #${colorStops[2]} ${percentages[2]}, 
                        #${colorStops[3]} ${percentages[3]}, 
                        #${colorStops[4]} ${percentages[4]})`;
                break;

            default:
                cssStyleValue = `linear-gradient(
                        ${degree}deg, 
                        #${colorStops[0]} ${percentages[0]}, 
                        #${colorStops[1]} ${percentages[1]})`;
                break;
        }

    } else {
        // radial gradient
        const shapes = ["ellipse", "circle"]; // default ellipse
        const sizes = ["farthest-corner", "farthest-side", "closest-corner", "closest-side"]; // default farthest-corner
        // const positions = "center"; // default
        const shape = shapes[Math.floor(Math.random() * ((shapes.length - 1) - 0 + 1) + 0)];
        const size = sizes[Math.floor(Math.random() * ((sizes.length - 1) - 0 + 1) + 0)];
        const shapeType = Math.floor(Math.random() * (1 - 0 + 1) + 0);
        if (shapeType === 1) {
            // by shape only
            cssStyleValue = `radial-gradient(
                    ${shape} at ${percentages[0]}, 
                    #${colorStops[0]} ${percentages[1]}, 
                    #${colorStops[1]} ${percentages[2]})`;
        } else {
            // by size only
            cssStyleValue = `radial-gradient(
                    ${size} at ${percentages[0]} ${percentages[1]}, 
                    #${colorStops[0]} ${percentages[2]}, 
                    #${colorStops[1]} ${percentages[3]})`;
        }
    }


    // Update Self Body & Paragraph
    document.body.style.backgroundImage = cssStyleValue;

    // logs of generated gradients
    printLogs(cssStyleValue);

}

function findRandomColor() {
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    const code = [];
    code.push(indices[Math.floor(Math.random() * (indices.length - 0))]);
    code.push(indices[Math.floor(Math.random() * (indices.length - 0))]);
    code.push(indices[Math.floor(Math.random() * (indices.length - 0))]);
    code.push(indices[Math.floor(Math.random() * (indices.length - 0))]);
    code.push(indices[Math.floor(Math.random() * (indices.length - 0))]);
    code.push(indices[Math.floor(Math.random() * (indices.length - 0))]);
    return code.join("");

}

function printLogs(cssStyleValue) {
    const logOL = document.getElementById("logOL");
    const newLi = document.createElement("LI");
    newLi.innerHTML = `background-image: ${cssStyleValue};`;
    newLi.setAttribute("data-gradient-code", `${cssStyleValue};`);
    newLi.setAttribute("title", "Click to Copy");
    logOL.appendChild(newLi);
    logOL.scrollTo(0, logOL.scrollHeight);
    newLi.addEventListener("mouseenter", (e) => {
        // apply style to current body
        document.body.style.backgroundImage = cssStyleValue;
    });
    newLi.addEventListener("click", (e) => {
        // copy style to clipboard
        let cssStyleValue = e.target.innerHTML;
        if (typeof Navigator.clipboard != undefined) {
            const textArea = document.createElement("TEXTAREA");
            textArea.value = cssStyleValue;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            textArea.remove();
        } else {
            Navigator.clipboard.writeText(cssStyleValue);
        }
    })
}

window.addEventListener("touchstart", generateRandomGradient);
window.addEventListener("keypress", (e) => {
    // 32 spacebar
    if (e.keyCode === 32) {
        generateRandomGradient();
    }
});

const clearViewBtn = document.getElementById("clearViewBtn");
clearViewBtn.addEventListener("click",() => {
    const ids = ["cssStyle","logBar"];
    for (let index = 0; index < ids.length; index++) {
        const element = document.getElementById(`${ids[index]}`);
        if (element.style.display === "none") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    }
});
