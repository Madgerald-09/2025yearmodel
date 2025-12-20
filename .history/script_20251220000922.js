document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const notification = document.getElementById("notification");
    const imageSide = document.getElementById("imageSide");

    // Set target date to January 4, 2025 at 00:00:00
    const targetDate = new Date('January 4, 2025 00:00:00').getTime();

    // Countdown function
    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            // Countdown finished - January 4th has arrived
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            
            // Update notification message
            if (!document.querySelector('.countdown-finished-message')) {
                const countdownMessage = document.createElement('p');
                countdownMessage.className = 'countdown-finished-message';
                countdownMessage.textContent = "🎉 January 4th has arrived! The event is live!";
                countdownMessage.style.color = '#d4b996';
                countdownMessage.style.fontWeight = 'bold';
                countdownMessage.style.marginTop = '10px';
                countdownMessage.style.textAlign = 'center';
                countdownMessage.style.fontSize = '1.1rem';
                
                const countdownContainer = document.querySelector('.countdown-container');
                if (countdownContainer) {
                    countdownContainer.appendChild(countdownMessage);
                }
            }
            return;
        }

        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Update display with leading zeros
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');

        // Add animation class for last 10 seconds
        if (days === 0 && hours === 0 && minutes === 0 && seconds <= 10) {
            secondsEl.classList.add('pulse');
        } else {
            secondsEl.classList.remove('pulse');
        }
    }

    // Show notification
    function showNotification(message, type = 'info') {
        notification.querySelector("p").textContent = message;
        notification.classList.add("show");

        // Remove after 4 seconds
        setTimeout(() => {
            notification.classList.remove("show");
        }, 4000);
    }

    // Check and load background image
    function checkBackgroundImage() {
        const img = new Image();
        img.onload = function() {
            console.log('✅ Background image loaded successfully');
            imageSide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('images/award-image1.png')`;
            imageSide.classList.remove('fallback-bg');
            
            // Remove any fallback text
            const fallbackText = imageSide.querySelector('.fallback-text');
            if (fallbackText) {
                fallbackText.remove();
            }
        };
        
        img.onerror = function() {
            console.warn('⚠️ Background image not found - using fallback');
            imageSide.classList.add('fallback-bg');
            imageSide.style.backgroundImage = 'none';
            
            // Add fallback text
            if (!imageSide.querySelector('.fallback-text')) {
                const fallbackText = document.createElement('div');
                fallbackText.className = 'fallback-text';
                fallbackText.textContent = 'MODEL AWARD 2025';
                imageSide.appendChild(fallbackText);
            }
        };
        
        img.src = 'images/award-image1.png';
    }

    // Initialize countdown display with correct date
    function initializeCountdownDisplay() {
        const now = new Date();
        const target = new Date(targetDate);
        
        // Calculate total days until January 4th
        const daysUntil = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
        
        if (daysUntil > 365) {
            // If more than a year away, show years instead
            const years = Math.floor(daysUntil / 365);
            document.querySelector('.countdown-title').textContent = `Launching On January 4th, ${target.getFullYear()}:`;
            showNotification(`Countdown to January 4, ${target.getFullYear()} has started!`);
        } else if (daysUntil > 30) {
            document.querySelector('.countdown-title').textContent = `Launching On January 4th (${daysUntil} days):`;
            showNotification(`${daysUntil} days until January 4, ${target.getFullYear()}!`);
        } else if (daysUntil > 7) {
            const weeks = Math.floor(daysUntil / 7);
            showNotification(`${weeks} weeks until the big event!`);
        } else if (daysUntil > 0) {
            showNotification(`Only ${daysUntil} days to go!`);
        } else if (daysUntil === 0) {
            showNotification("🎉 Today is the day! January 4th is here!");
        } else {
            showNotification("🎉 January 4th has passed! Welcome to the event!");
        }
    }

    // Initialize everything
    function initialize() {
        // Start countdown
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Check background image
        checkBackgroundImage();
        
        // Initialize countdown display with date info
        initializeCountdownDisplay();
        
        // Check for image changes periodically (less frequent to save resources)
        setInterval(checkBackgroundImage, 60000); // Check every minute
        
        // Show welcome notification after a short delay
        setTimeout(() => {
            showNotification("Countdown to January 4, 2025 is running! 🎉");
        }, 1500);
        
        // Add CSS for pulse animation
        const style = document.createElement('style');
        style.textContent = `
            .pulse {
                animation: pulse 1s infinite;
                color: #ff6b6b !important;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    // Start the application
    initialize();
    
    // Handle window resize for responsive adjustments
    window.addEventListener('resize', function() {
        // Re-check background image on resize
        checkBackgroundImage();
    });
});