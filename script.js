let canvas, ctx;

function initCanvas() {
    const img = document.getElementById('map');
    canvas = document.getElementById('overlay-canvas');
    ctx = canvas.getContext('2d');


    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;


    canvas.style.position = 'absolute';
    canvas.style.top = img.offsetTop + 'px';
    canvas.style.left = img.offsetLeft + 'px';
    canvas.style.pointerEvents = 'none';
}


function highlightZone(coords, shape) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    const coordArray = coords.split(',').map(Number);

    if (shape === 'rect') {
        ctx.strokeRect(coordArray[0], coordArray[1], coordArray[2] - coordArray[0], coordArray[3] - coordArray[1]);
    } else if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(coordArray[0], coordArray[1], coordArray[2], 0, 2 * Math.PI);
        ctx.stroke();
    } else if (shape === 'poly') {
        ctx.beginPath();
        ctx.moveTo(coordArray[0], coordArray[1]);
        for (let i = 2; i < coordArray.length; i += 2) {
            ctx.lineTo(coordArray[i], coordArray[i + 1]);
        }
        ctx.closePath();
        ctx.stroke();
    }
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function showInfo(zoneId) {
    const zoneName = document.getElementById('zone-name');
    const zoneDescription = document.getElementById('zone-description');

    const zoneData = {
        'zone1': {
            name: '',
            description: ''
        },
        'zone2': {
            name: 'Collège',
            description: 'Ceci est la zone où se trouve le collège.'
        },
        
    };

    
    if (zoneData[zoneId]) {
        zoneName.textContent = zoneData[zoneId].name;
        zoneDescription.textContent = zoneData[zoneId].description;
    }
}

function redirectToPage(url) {
    window.location.href = url;
}

function showTooltip(event, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'block';
    tooltip.textContent = text;

  
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY + 10 + 'px';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}


const paragraphe = document.getElementById("monParagraphe");

const areas = document.querySelectorAll('area'); 

areas.forEach(area => {
    area.addEventListener("mouseover", (event) => {
        const zoneId = area.alt; 
        highlightZone(area.coords, area.shape); 
        showInfo(zoneId); 
        paragraphe.style.display = "block"; 
    });

    area.addEventListener("mouseout", () => {
        clearCanvas(); 
        paragraphe.style.display = "none"; 
    });
});
