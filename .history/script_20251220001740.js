document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const notification = document.getElementById("notification");
    const imageSide = document.getElementById("imageSide");
    const countdownTitle = document.querySelector('.countdown-title');

    // Set target date to January 4, 2025 at 00:00:00
    const targetDate = new Date('January 4, 2025 00:00:00').getTime();

    // Countdown function - shows total hours, minutes, seconds remaining
    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            // Countdown finished - January 4th has arrived
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            
            // Update title and show celebration message
            countdownTitle.textContent = "🎉 January 4th Has Arrived!";
            
            // Update notification message
            if (!document.querySelector('.countdown-finished-message')) {
                const countdownMessage = document.createElement('p');
                countdownMessage.className = 'countdown-finished-message';
                countdownMessage.textContent = "The event is now live!";
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

        // Calculate total hours, minutes, seconds remaining
        const totalHours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const totalMinutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const totalSeconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Format to show hours, minutes, seconds
        // Hours can be more than 24 since we're showing total hours remaining
        hoursEl.textContent = totalHours.toString().padStart(2, '0');
        minutesEl.textContent = totalMinutes.toString().padStart(2, '0');
        secondsEl.textContent = totalSeconds.toString().padStart(2, '0');

        // Add special effects for last hour
        if (totalHours === 0 && totalMinutes <= 60) {
            if (totalMinutes <= 10) {
                // Last 10 minutes - pulse animation
                secondsEl.classList.add('pulse');
                minutesEl.classList.add('pulse');
                
                // Change color to gold for last 10 minutes
                if (totalMinutes <= 10) {
                    secondsEl.style.color = '#ffd700';
                    minutesEl.style.color = '#ffd700';
                    hoursEl.style.color = '#ffd700';
                }
            }
        } else {
            // Reset styles
            secondsEl.classList.remove('pulse');
            minutesEl.classList.remove('pulse');
            secondsEl.style.color = '#d4b996';
            minutesEl.style.color = '#d4b996';
            hoursEl.style.color = '#d4b996';
        }

        // Update countdown title with days if more than 24 hours
        if (totalHours > 24) {
            const days = Math.floor(totalHours / 24);
            const remainingHours = totalHours % 24;
            
            if (days > 0) {
                countdownTitle.textContent = `Launching In: ${days} day${days > 1 ? 's' : ''} ${remainingHours}h ${totalMinutes}m ${totalSeconds}s`;
            }
        } else {
            countdownTitle.textContent = `Launching In: ${totalHours}h ${totalMinutes}m ${totalSeconds}s`;
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

    // Initialize countdown display
    function initializeCountdownDisplay() {
        const now = new Date();
        const target = new Date(targetDate);
        
        // Calculate total hours until January 4th
        const timeUntil = target - now;
        const totalHoursUntil = Math.floor(timeUntil / (1000 * 60 * 60));
        const totalMinutesUntil = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
        
        if (totalHoursUntil > 24) {
            const days = Math.floor(totalHoursUntil / 24);
            const hours = totalHoursUntil % 24;
            showNotification(`⏳ ${days} days ${hours} hours until January 4th!`);
        } else if (totalHoursUntil > 0) {
            showNotification(`⏳ ${totalHoursUntil}h ${totalMinutesUntil}m until January 4th!`);
        } else if (totalHoursUntil <= 0 && timeUntil > 0) {
            // Less than 1 hour remaining
            const minutes = Math.floor(timeUntil / (1000 * 60));
            const seconds = Math.floor((timeUntil % (1000 * 60)) / 1000);
            showNotification(`⏳ ${minutes}m ${seconds}s until January 4th!`);
        } else if (timeUntil <= 0) {
            showNotification("🎉 January 4th has arrived! Welcome!");
        }
    }

    // Initialize everything
    function initialize() {
        // Start countdown
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Check background image
        checkBackgroundImage();
        
        // Initialize countdown display
        initializeCountdownDisplay();
        
        // Check for image changes periodically
        setInterval(checkBackgroundImage, 60000);
        
        // Show welcome notification after a short delay
        setTimeout(() => {
            const now = new Date();
            const target = new Date(targetDate);
            const timeUntil = target - now;
            const totalHours = Math.floor(timeUntil / (1000 * 60 * 60));
            
            if (totalHours > 0) {
                showNotification(`Countdown to January 4th: ${totalHours} hours remaining!`);
            }
        }, 1500);
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .pulse {
                animation: pulse 0.5s infinite alternate;
            }
            
            @keyframes pulse {
                from { transform: scale(1); }
                to { transform: scale(1.1); }
            }
            
            .countdown-item.pulse span {
                color: #ffd700 !important;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            }
        `;
        document.head.appendChild(style);
    }

    // Start the application
    initialize();
    
    // Handle window resize
    window.addEventListener('resize', checkBackgroundImage);
});