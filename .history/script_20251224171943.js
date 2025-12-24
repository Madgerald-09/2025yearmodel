document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const notification = document.getElementById("notification");
    const backgroundContainer = document.getElementById("backgroundContainer");
    const countdownTitle = document.getElementById("countdownTitle");
    const countdownNote = document.getElementById("countdownNote");
    const countdownItems = document.querySelectorAll('.countdown-item');

    // Set 48-hour countdown from current time
    let totalSeconds = 48 * 60 * 60; // 48 hours in seconds

    // Countdown function
    function updateCountdown() {
        if (totalSeconds <= 0) {
            // Countdown finished
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            countdownTitle.textContent = "🎉 January 4th Has Arrived!";
            countdownNote.textContent = "Welcome to Model Of The Year Award 2025!";
            
            // Show celebration notification
            if (!window.countdownFinished) {
                showNotification("🎉 January 4th has arrived! Welcome to Model Of The Year Award 2025!");
                window.countdownFinished = true;
            }
            return;
        }

        // Calculate hours, minutes, seconds
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Update display
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');

        // Update note
        if (hours > 24) {
            countdownNote.textContent = `2 days until January 4th announcement`;
        } else if (hours > 0) {
            countdownNote.textContent = `${hours}h ${minutes}m until January 4th announcement`;
        } else {
            countdownNote.textContent = `${minutes}m ${seconds}s until January 4th announcement`;
        }

        totalSeconds--;
    }

    // Show notification
    function showNotification(message) {
        notification.querySelector("p").textContent = message;
        notification.classList.add("show");
        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }

    // Set background image
    function setBackgroundImage() {
        // Try multiple image sources
        const imageSources = [
            'images/award-image1.png',
            'images/first_pic.jpeg',
            'images/model-award.jpg',
            'images/award.jpg',
            'https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ];
        
        let currentImage = 0;
        
        function tryNextImage() {
            if (currentImage >= imageSources.length) {
                // All images failed - use solid color
                backgroundContainer.style.background = 
                    'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))';
                return;
            }
            
            const img = new Image();
            img.onload = function() {
                // Image loaded successfully
                backgroundContainer.style.backgroundImage = 
                    `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                     url('${imageSources[currentImage]}')`;
                backgroundContainer.style.backgroundSize = 'cover';
                backgroundContainer.style.backgroundPosition = 'center center';
                backgroundContainer.style.backgroundRepeat = 'no-repeat';
                console.log('Background image loaded:', imageSources[currentImage]);
            };
            
            img.onerror = function() {
                // Try next image
                currentImage++;
                tryNextImage();
            };
            
            img.src = imageSources[currentImage];
        }
        
        tryNextImage();
    }

    // Initialize
    function initialize() {
        // Set background image
        setBackgroundImage();
        
        // Start countdown
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Show welcome notification
        setTimeout(() => {
            showNotification("48-hour countdown to January 4th has started!");
        }, 1000);
        
        // Handle window resize
        window.addEventListener('resize', function() {
            // Adjust background for mobile
            if (window.innerWidth <= 768) {
                backgroundContainer.style.backgroundSize = 'cover';
            } else {
                backgroundContainer.style.backgroundSize = 'cover';
            }
        });
    }

    // Start everything
    initialize();
});