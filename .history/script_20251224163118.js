document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const notification = document.getElementById("notification");
    const imageSide = document.getElementById("imageSide");
    const countdownTitle = document.getElementById("countdownTitle");
    const countdownNote = document.getElementById("countdownNote");
    const countdownItems = document.querySelectorAll('.countdown-item');

    // Set 48-hour countdown from current time
    let totalSeconds = 48 * 60 * 60; // 48 hours in seconds

    // Countdown function
    function updateCountdown() {
        if (totalSeconds <= 0) {
            // Countdown finished - Show January 4th message
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            
            // Update title and note
            countdownTitle.textContent = "🎉 January 4th Has Arrived!";
            countdownNote.textContent = "Welcome to Model Of The Year Award 2025!";
            
            // Add celebration styling
            countdownItems.forEach(item => {
                item.classList.add('celebration');
            });
            
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

        // Update visual states
        updateCountdownVisuals(hours, minutes);
        
        // Update note with time left
        if (hours > 24) {
            const days = 2;
            const hoursLeft = hours - 48;
            countdownNote.textContent = `${days} days until January 4th announcement`;
        } else if (hours > 0) {
            countdownNote.textContent = `${hours}h ${minutes}m until January 4th announcement`;
        } else {
            countdownNote.textContent = `${minutes}m ${seconds}s until January 4th announcement`;
        }

        // Decrease total seconds
        totalSeconds--;
    }

    // Update visual styles
    function updateCountdownVisuals(hours, minutes) {
        // Reset all styles
        countdownItems.forEach(item => {
            item.classList.remove('warning', 'urgent', 'celebration');
        });
        
        // Remove animations
        hoursEl.classList.remove('pulse-fast');
        minutesEl.classList.remove('pulse');
        secondsEl.classList.remove('pulse-fast');

        // Apply styles based on time remaining
        if (hours < 24) {
            // Last 24 hours - warning state
            countdownItems.forEach(item => {
                item.classList.add('warning');
            });
            
            if (hours < 1) {
                // Last hour - urgent state
                countdownItems.forEach(item => {
                    item.classList.add('urgent');
                });
                
                if (minutes <= 10) {
                    // Last 10 minutes - pulse animation
                    secondsEl.classList.add('pulse-fast');
                    minutesEl.classList.add('pulse');
                    
                    // Update note for last 10 minutes
                    if (minutes <= 10) {
                        countdownNote.textContent = `Only ${minutes}m ${seconds}s left! Get ready for January 4th!`;
                    }
                }
            }
        }
    }

    // Show notification
    function showNotification(message) {
        notification.querySelector("p").textContent = message;
        notification.classList.add("show");

        // Auto-remove after 5 seconds for celebration, 3 seconds for others
        const duration = message.includes("🎉") ? 5000 : 3000;
        setTimeout(() => {
            notification.classList.remove("show");
        }, duration);
    }

    // Check background image
    function checkBackgroundImage() {
        const img = new Image();
        img.onload = function() {
            imageSide.style.backgroundImage = `linear-gradient(rgba(26, 26, 26, 0.6), rgba(26, 26, 26, 0.6)), url('images/first_pic.jpeg')`;
            imageSide.classList.remove('fallback-bg');
            
            const fallbackText = imageSide.querySelector('.fallback-text');
            if (fallbackText) {
                fallbackText.remove();
            }
        };
        
        img.onerror = function() {
            imageSide.classList.add('fallback-bg');
            imageSide.style.backgroundImage = 'none';
            
            if (!imageSide.querySelector('.fallback-text')) {
                const fallbackText = document.createElement('div');
                fallbackText.className = 'fallback-text';
                fallbackText.textContent = 'MODEL AWARD 2025';
                imageSide.appendChild(fallbackText);
            }
        };
        
        img.src = 'images/first_pic.jpeg';
    }

    // Initialize
    function initialize() {
        // Check background image
        checkBackgroundImage();
        
        // Start countdown immediately
        updateCountdown();
        
        // Update countdown every second
        setInterval(updateCountdown, 1000);
        
        // Show welcome notification
        setTimeout(() => {
            showNotification("48-hour countdown to January 4th has started!");
        }, 1000);
        
        // Check image periodically
        setInterval(checkBackgroundImage, 30000);
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .countdown-item {
                transition: all 0.3s ease;
            }
            
            .countdown-item span {
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Start the application
    initialize();
    
    // Handle window resize
    window.addEventListener('resize', checkBackgroundImage);
});