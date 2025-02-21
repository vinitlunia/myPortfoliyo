// window.addEventListener('scroll', () => {
//     const sec1 = document.getElementById('sec1');
//     const sec2 = document.getElementById('sec2');
    
//     const scrollPosition = window.scrollY;
//     const windowHeight = window.innerHeight;

//     // Hide `sec1` once scrolled past
//     if (scrollPosition >= windowHeight) {
//         // sec1.classList.add('hidden'); // Apply the hidden class
//         sec1.style.transform = `translateY(-100vh)`;
//         sec2.style.transform = `translateY(0)`;
//     }
// });

document.getElementById("scrollArrow").addEventListener("click", function () {
    const nextSection = document.getElementById("sec2");
    nextSection.scrollIntoView({ behavior: "smooth" });
});





// let isScrolling = false;

// window.addEventListener('wheel', (event) => {
   

//     if (!isScrolling) {
//         isScrolling = true;

//         // Check if scrolling down (event.deltaY > 0) or up (event.deltaY < 0)
//         if (event.deltaY > 0) {
//             // Scroll down: move sec1 up to reveal sec2
//             document.getElementById('sec1').style.transform = 'translateY(-100vh)';
//         } 
       

//         // Allow another scroll after the transition is complete
//         setTimeout(() => {
//             isScrolling = false;
//         }, 500); // The delay matches the transition time (0.5s)
//     }
// });







const container = document.querySelector('.banner');
const canvas = document.getElementById('dotsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

const dots = [];
let dotCount, maxSpeed, connectionDistance;

// Function to set parameters based on screen size
function setParameters() {
    const width = window.innerWidth;

    if (width < 768) { // Mobile
        dotCount = 80;
        maxSpeed = 0.9;
        connectionDistance = 150;
    } else if (width < 1024) { // Tablet
        dotCount = 70;
        maxSpeed = 0.8;
        connectionDistance = 200;
    } else { // Desktop
        dotCount = 150;
        maxSpeed = 0.8;
        connectionDistance = 250;
    }
}

// Initialize dots with random properties, including depth for 3D effect
function initDots() {
    dots.length = 0; // Clear existing dots
    for (let i = 0; i < dotCount; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            baseSize: Math.random() * 3 + 2,
            dx: (Math.random() - 0.5) * maxSpeed,
            dy: (Math.random() - 0.5) * maxSpeed,
            dz: (Math.random() - 0.5) * maxSpeed * 0.5,
            opacity: Math.random(),
            blinkRate: Math.random() * 0.02 + 0.01,
            pulseRate: Math.random() * 0.1 + 0.05,  // Added pulse rate for glow
        });
    }
}

// Set initial parameters
setParameters();
initDots();

let mousePosition = { x: null, y: null };

function drawDots() {
    dots.forEach(dot => {
        // Adjust opacity for blinking
        dot.opacity += dot.blinkRate;
        if (dot.opacity > 1 || dot.opacity < 0) {
            dot.blinkRate *= -1;
        }

        // Create a pulsing effect with sine function
        const pulse = Math.sin(dot.opacity * Math.PI) * dot.pulseRate;
        const size = ((dot.baseSize + pulse) * (canvas.width - dot.z)) / canvas.width;
        const alpha = dot.opacity * ((canvas.width - dot.z) / canvas.width);

        // Draw the dot with a glowing effect
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(5, 55, 255, ${alpha})`;
        ctx.shadowBlur = 10; // Adjust for more glow
        ctx.shadowColor = `rgba(5, 55, 255, ${alpha * 0.8})`; // Apply a light shadow color
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow blur after each dot
    });
}

function connectDots() {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const dz = dots[i].z - dots[j].z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < connectionDistance) {
                ctx.strokeStyle = `rgba(55, 55, 255, ${1 - distance / connectionDistance})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.stroke();
            }
        }
    }
}

function connectDotsToMouse() {
    dots.forEach(dot => {
        if (mousePosition.x !== null && mousePosition.y !== null) {
            const dx = mousePosition.x - dot.x;
            const dy = mousePosition.y - dot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.strokeStyle = `rgba(255, 0, 0, ${1 - distance / connectionDistance})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(mousePosition.x, mousePosition.y);
                ctx.stroke();
            }
        }
    });
}

function updateDots() {
    dots.forEach(dot => {
        dot.x += dot.dx;
        dot.y += dot.dy;
        dot.z += dot.dz;

        if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
        if (dot.z < 0 || dot.z > canvas.width) dot.z = Math.random() * canvas.width;
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    connectDots();
    connectDotsToMouse();
    updateDots();
    requestAnimationFrame(animate);
}

animate();

// Update mouse position relative to the container on mousemove
container.addEventListener('mousemove', (event) => {
    const rect = container.getBoundingClientRect();
    mousePosition.x = event.clientX - rect.left;
    mousePosition.y = event.clientY - rect.top;
});

// Clear mouse position when leaving the container
container.addEventListener('mouseout', () => {
    mousePosition.x = null;
    mousePosition.y = null;
});

// Adjust canvas size and reinitialize dots on window resize
window.addEventListener('resize', () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    setParameters();
    initDots();
});



// ===============sideMenu=================

var sidemenu = document.getElementById('sidemenu')

function openmenu(){
    sidemenu.style.right = "0"
}

function closemenu(){
    sidemenu.style.right = "-200px"
}


// JavaScript to toggle gradient change
document.getElementById('sec2').addEventListener('click', function() {
    this.classList.toggle('active');
});





// contact me page.....abt-edu

const scriptURL = 'https://script.google.com/macros/s/AKfycbxUuIeC9uKGYFXI3kv9S-Q_b76JvXwJuz4g-imbIsOxZY18gV1k-CWbeD9qcBvQKCoHbQ/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response =>{
        msg.innerHTML = "Message sent successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        },5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})


