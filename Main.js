const songs = [
    { title: "QUÍMICA MAYOR-MON LAFERTE", src: "Química Mayor.mp4", cover: "IMAG1.jpeg" },
    { title: "SABES-REIK", src: "Sabes.mp4", cover: "IMAG2.jpeg" },//revision 
    { title: "HASTA ESE DÍA- LASSO", src: "Hasta.mp4", cover: "IMAG3.jpeg" }
];

let currentSongIndex = 0;
const audio = document.getElementById("audio");
const songTitle = document.getElementById("song-title");
const cover = document.getElementById("cover");
const playBtn = document.querySelector(".play-btn");

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSong();
}

function updateSong() {
    audio.src = songs[currentSongIndex].src;
    cover.src = songs[currentSongIndex].cover;
    songTitle.textContent = songs[currentSongIndex].title;
    audio.play();
    playBtn.textContent = "⏸";
}

//////////
// FONDO DE FLORESSSSS

// Modified version of random-normal
function normalPool(o) {
    var r = 0;
    do {
        var a = Math.round(normal({ mean: o.mean, dev: o.dev }));
        if (a < o.pool.length && a >= 0) return o.pool[a];
        r++;
    } while (r < 100);
  }
  
  function randomNormal(o) {
    if ((o = Object.assign({ mean: 0, dev: 1, pool: [] }, o)), Array.isArray(o.pool) && o.pool.length > 0) return normalPool(o);
    var r, a, n, e, l = o.mean, t = o.dev;
    do {
        r = (a = 2 * Math.random() - 1) * a + (n = 2 * Math.random() - 1) * n;
    } while (r >= 1);
    return e = a * Math.sqrt(-2 * Math.log(r) / r), t * e + l;
  }
  
  const NUM_FLOWERS = 400; // Number of flowers
  const FLOWER_SIZE = 1.0; // Size of flowers
  const SPEED = 20000; // Duration of flower movement in milliseconds
  
  let flowers = []; // Array to hold flower objects
  let flowerImage = new Image(); // Image object for the flower
  
  flowerImage.src = 'amor.png'; // Path to your flower image
  
  function rand(low, high) {
    return Math.random() * (high - low) + low;
  }
  
  function createFlower(canvas) {
    const colour = {
        r: 255,
        g: randomNormal({ mean: 125, dev: 20 }),
        b: 50,
        a: rand(0, 1),
    };
    return {
        x: -2,
        y: -2,
        diameter: Math.max(0, randomNormal({ mean: FLOWER_SIZE, dev: FLOWER_SIZE / 2 })),
        // Random duration for movement
        duration: randomNormal({ mean: SPEED, dev: SPEED * 0.2 }), // Increased variability
        amplitude: randomNormal({ mean: 16, dev: 2 }),
        offsetY: randomNormal({ mean: 0, dev: 10 }),
        arc: Math.PI * 2,
        startTime: performance.now() - rand(0, SPEED),
        colour: `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`,
    }
  }
  
  function moveFlower(flower, canvas, time) {
    // Calculate the progress using the current time and a randomly selected duration
    const progress = ((time - flower.startTime) % flower.duration) / flower.duration;
    
    // Ensure progress loops between 0 and 1
    const progressNormalized = Math.min(progress, 1);
  
    return {
        ...flower,
        x: progressNormalized,
        y: ((Math.sin(progressNormalized * flower.arc) * flower.amplitude) + flower.offsetY),
    };
  }
  
  function drawFlowerImage(flower, canvas, ctx) {
    const vh = canvas.height / 100;
  
    // Scale and position the flower image
    const centerX = flower.x * canvas.width;
    const centerY = flower.y * vh + (canvas.height / 2);
    const flowerSize = flower.diameter * vh * 4;  // Adjust size as needed
  
    // Draw the image of the flower
    ctx.drawImage(flowerImage, centerX - flowerSize / 2, centerY - flowerSize / 2, flowerSize, flowerSize);
  }
  
  function draw(time, canvas, ctx) {
    // Move flowers
    flowers.forEach((flower, index) => {
        flowers[index] = moveFlower(flower, canvas, time);
    });
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw the flowers
    flowers.forEach((flower) => {
        drawFlowerImage(flower, canvas, ctx); // Use the image drawing function
    });
  
    // Schedule next frame
    requestAnimationFrame((time) => draw(time, canvas, ctx));
  }
  
  function initializeCanvas() {
    let canvas = document.getElementById('flower-canvas');
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    let ctx = canvas.getContext("2d");
  
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx = canvas.getContext("2d");
    });
  
    return [canvas, ctx];
  }
  
  function startAnimation() {
    const [canvas, ctx] = initializeCanvas();
  
    // Create a bunch of flowers
    for (let i = 0; i < NUM_FLOWERS; i++) {
        flowers.push(createFlower(canvas));
    }
  
    requestAnimationFrame((time) => draw(time, canvas, ctx));
  }
  
  // Start animation when document is loaded
  (function () {
    if (document.readyState !== 'loading') {
        startAnimation();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            startAnimation();
        });
    }
  }());
  
  