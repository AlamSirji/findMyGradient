class gradient {

    container;
    style;

    constructor(containerName) {
        this.container = document.getElementById(containerName);
        this.style = this.getRandomStyle();
        this.setStyle(this.container, this.style);
    }

    setStyle(container, cssStyleValue) {
        container.style.backgroundImage = cssStyleValue;
    }

    getStyle(container) {
        return container.style.backgroundImage;
    }

    getRandomStyle() {
        let cssStyleValue;
        const maxColorStop = 5;
        const minColorStop = 2;

        var colorStops = [];
        var degree;
        var percentages = [];
        var gradientType = Math.floor(Math.random() * (1 - 0 + 1) + 0);
        var totalColorStops = Math.floor(Math.random() * (maxColorStop - minColorStop + 1) + minColorStop);
        for (let index = 0; index < totalColorStops; index++) {
            colorStops.push(this.getRandomColor());
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

        return cssStyleValue;
    }

    getRandomColor() {
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

    randomize() {
        let style = this.getRandomStyle();
        this.setStyle(this.container,style);
        this.printLogs(style);
    }

    printLogs(cssStyleValue) {
        const logOL = document.querySelector("#logContainer ol");
        const newLi = document.createElement("LI");
        newLi.innerHTML = `background-image: ${cssStyleValue};`;
        newLi.setAttribute("data-gradient-code", `${cssStyleValue};`);
        newLi.setAttribute("title", "Click to Copy");
        logOL.appendChild(newLi);
        logOL.scrollTo(0, logOL.scrollHeight);
        newLi.addEventListener("mouseenter", (e) => {
            // apply style to current body
            myGradient.container.style.backgroundImage = cssStyleValue;
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

}

var myGradient = new gradient("colorContainer");

window.addEventListener("touchstart", myGradient.randomize());
window.addEventListener("keypress", (e) => {
    // 32 spacebar
    if (e.keyCode === 32) {
        myGradient.randomize();
    }
});

function changeView(){
    const ids = ["logContainer"];
    for (let index = 0; index < ids.length; index++) {
        const e = document.getElementById(`${ids[index]}`);
        if (e.classList.contains("hide")) {
            e.classList.remove("hide");
        } else {
            e.classList.add("hide");
        }
    }
}
