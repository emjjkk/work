// Configuration variables
const CONFIG = {
    density: 2.0,
    rotateClockwisePercent: 0.25,
    rotateCounterPercent: 0.15,
    pulsePercent: 0.2,
    baseSpacing: 40,
    animationsEnabled: true,
    performanceMode: true
};

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    createCrossBackground();
    setupDarkMode();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createCrossBackground, 250);
    });
});

// Create the cross background
function createCrossBackground() {
    const container = document.getElementById('cross-bg');
    container.innerHTML = '';

    // Adjust for mobile if performance mode is enabled
    const isMobile = window.innerWidth < 768;
    const density = CONFIG.performanceMode && isMobile ? CONFIG.density * 0.6 : CONFIG.density;

    // Calculate grid
    const spacing = CONFIG.baseSpacing / density;
    const cols = Math.ceil(window.innerWidth / spacing);
    const rows = Math.ceil(window.innerHeight / spacing);

    // Create crosses
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cross = document.createElement('div');
            cross.className = 'cross';
            cross.style.left = `${col * spacing}px`;
            cross.style.top = `${row * spacing}px`;
            cross.style.color = 'var(--cross-color)';

            // Add animations based on config percentages
            if (CONFIG.animationsEnabled) {
                const rand = Math.random();

                if (rand < CONFIG.rotateClockwisePercent) {
                    cross.classList.add('rotate-clockwise');
                    // Randomize animation duration for variety
                    cross.style.animationDuration = `${10 + Math.random() * 8}s`;
                } else if (rand < CONFIG.rotateClockwisePercent + CONFIG.rotateCounterPercent) {
                    cross.classList.add('rotate-counterclockwise');
                    cross.style.animationDuration = `${12 + Math.random() * 10}s`;
                } else if (rand < CONFIG.rotateClockwisePercent + CONFIG.rotateCounterPercent + CONFIG.pulsePercent) {
                    cross.classList.add('pulse');
                    cross.style.animationDuration = `${3 + Math.random() * 4}s`;
                }

                // Random delay for staggered animations
                if (cross.classList.length > 1) {
                    cross.style.animationDelay = `${Math.random() * 5}s`;
                }
            }

            container.appendChild(cross);
        }
    }

    console.log(`Background: ${cols * rows} crosses created`);
}

// Dark mode handling
function setupDarkMode() {
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// Toggle dark mode (example function you can call from your site)
window.toggleDarkMode = function () {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Optional: Expose configuration for easy customization
window.updateBackgroundConfig = function (newConfig) {
    Object.assign(CONFIG, newConfig);
    createCrossBackground();
};

// Optional: Pause/play animations
window.toggleAnimations = function (pause) {
    const crosses = document.querySelectorAll('#cross-bg .cross');
    const action = pause === undefined ? 'toggle' : pause ? 'pause' : 'play';

    crosses.forEach(cross => {
        if (cross.style.animationName) {
            if (action === 'toggle') {
                cross.style.animationPlayState =
                    cross.style.animationPlayState === 'paused' ? 'running' : 'paused';
            } else {
                cross.style.animationPlayState = action === 'pause' ? 'paused' : 'running';
            }
        }
    });
};
