document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const notification = document.getElementById("notification");
    const imageSide = document.getElementById("imageSide");
    const countdownTitle = document.querySelector('.countdown-title');
    const countdownNote = document.querySelector('.countdown-note');

    // Set target date to January 4, 2025 at 00:00:00 Nigerian Time (WAT - UTC+1)
    function getTargetDate() {
        // Create date for January 4, 2025 at midnight Nigerian Time (UTC+1)
        const target = new Date('2025-01-04T00:00:00+01:00'); // Nigerian Time (UTC+1)
        return target.getTime();
    }

    const targetDate = getTargetDate();

    // Get current Nigerian time
    function getNigerianTime() {
        // Nigeria is UTC+1 (West Africa Time)
        const now = new Date();
        // Convert to Nigerian time (UTC+1)
        const nigeriaOffset = 1 * 60; // Nigeria is UTC+1 (60 minutes)
        const localOffset = now.getTimezoneOffset(); // in minutes
        const nigeriaTime = new Date(now.getTime() + (localOffset + nigeriaOffset) * 60000);
        return nigeriaTime.getTime();
    }

    // Countdown function - shows total hours:minutes:seconds remaining
    function updateCountdown() {
        const nowNigerianTime = getNigerianTime();
        const timeRemaining = targetDate - nowNigerianTime;

        // Check if we've reached January 4th in Nigerian time
        if (timeRemaining <= 0) {
            // Countdown finished - January 4th has arrived in Nigeria
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            
            // Update title
            countdownTitle.textContent = "🎉 January 4th Has Arrived in Nigeria!";
            countdownNote.textContent = "The event is now live!";
            
            // Celebration colors
            document.querySelectorAll('.countdown-item').forEach(item => {
                item.classList.add('celebration');
            });
            
            // Show celebration notification once
            if (!window.celebrationShown) {
                showNotification("🎉 January 4th has arrived in Nigeria! The event is now live!", 'celebration');
                window.celebrationShown = true;
            }
            
            return;
        }

        // Calculate total hours, minutes, seconds remaining from NOW
        const totalSecondsRemaining = Math.floor(timeRemaining / 1000);
        const hoursRemaining = Math.floor(totalSecondsRemaining / 3600);
        const minutesRemaining = Math.floor((totalSecondsRemaining % 3600) / 60);
        const secondsRemaining = totalSecondsRemaining % 60;

        // Update display with leading zeros
        hoursEl.textContent = hoursRemaining.toString().padStart(2, '0');
        minutesEl.textContent = minutesRemaining.toString().padStart(2, '0');
        secondsEl.textContent = secondsRemaining.toString().padStart(2, '0');

        // Update the note with exact time left
        const days = Math.floor(hoursRemaining / 24);
        const hoursInDay = hoursRemaining % 24;
        
        if (days > 0) {
            countdownNote.textContent = `Time remaining: ${days} day${days > 1 ? 's' : ''} ${hoursInDay}h ${minutesRemaining}m ${secondsRemaining}s`;
        } else {
            countdownNote.textContent = `Time remaining: ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`;
        }

        // Special effects based on time remaining
        updateCountdownVisuals(hoursRemaining, minutesRemaining);
    }

    // Update visual styles based on time remaining
    function updateCountdownVisuals(hours, minutes) {
        const countdownItems = document.querySelectorAll('.countdown-item');
        
        // Reset all styles first
        countdownItems.forEach(item => {
            item.classList.remove('urgent', 'warning', 'celebration');
        });
        
        // Remove pulse animations
        hoursEl.classList.remove('pulse-fast');
        minutesEl.classList.remove('pulse');
        secondsEl.classList.remove('pulse-fast');

        // Apply styles based on time remaining
        if (hours < 24) {
            // Last 24 hours - warning state
            countdownItems.forEach(item => {
                item.classList.add('warning');
            });
            
            if (hours === 0) {
                // Last hour - urgent state
                countdownItems.forEach(item => {
                    item.classList.add('urgent');
                });
                
                if (minutes <= 10) {
                    // Last 10 minutes - pulse animation
                    secondsEl.classList.add('pulse-fast');
                    minutesEl.classList.add('pulse');
                }
            }
        }
    }

    // Show notification
    function showNotification(message, type = 'info') {
        notification.querySelector("p").textContent = message;
        
        // Different colors based on notification type
        if (type === 'celebration') {
            notification.style.background = 'linear-gradient(135deg, #d4b996, #ffd700)';
            notification.style.color = '#0a0a0a';
            notification.style.borderLeft = '4px solid #ff6b6b';
        } else if (type === 'warning') {
            notification.style.background = 'linear-gradient(135deg, #ff6b6b, #ffa726)';
            notification.style.color = '#ffffff';
            notification.style.borderLeft = '4px solid #ffffff';
        } else {
            notification.style.background = 'linear-gradient(135deg, #5d4c3a, #3d342c)';
            notification.style.color = '#ffffff';
            notification.style.borderLeft = '4px solid #d4b996';
        }
        
        notification.classList.add("show");

        // Remove after appropriate time
        const duration = type === 'celebration' ? 5000 : 4000;
        setTimeout(() => {
            notification.classList.remove("show");
        }, duration);
    }

    // Check and load background image
    function checkBackgroundImage() {
        const img = new Image();
        img.onload = function() {
            imageSide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('images/award-image1.png')`;
            imageSide.classList.remove('fallback-bg');
            
            // Remove any fallback text
            const fallbackText = imageSide.querySelector('.fallback-text');
            if (fallbackText) {
                fallbackText.remove();
            }
        };
        
        img.onerror = function() {
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

    // Display initial time information in Nigerian time
    function displayInitialInfo() {
        const nowNigerian = new Date(getNigerianTime());
        const target = new Date(targetDate);
        const timeRemaining = targetDate - getNigerianTime();
        
        // Calculate time remaining
        const totalSeconds = Math.floor(timeRemaining / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        // Show initial notification
        if (timeRemaining <= 0) {
            showNotification("🎉 January 4th has arrived in Nigeria! Welcome to the event!", 'celebration');
        } else if (hours < 1) {
            showNotification(`⏰ Less than 1 hour until January 4th in Nigeria!`, 'warning');
        } else if (hours < 24) {
            showNotification(`⏰ ${hours}h ${minutes}m until January 4th in Nigeria!`);
        } else {
            const days = Math.floor(hours / 24);
            const hoursInDay = hours % 24;
            showNotification(`⏳ ${days} day${days > 1 ? 's' : ''} ${hoursInDay}h until January 4th in Nigeria!`);
        }
        
        // Log for debugging
        console.log('Current Nigerian Time:', nowNigerian.toLocaleString('en-NG'));
        console.log('Target Time (Nigeria):', target.toLocaleString('en-NG'));
        console.log(`Time remaining: ${hours}h ${minutes}m ${seconds}s`);
    }

    // Initialize everything
    function initialize() {
        // Check background image
        checkBackgroundImage();
        
        // Display initial time information
        displayInitialInfo();
        
        // Start countdown immediately
        updateCountdown();
        
        // Update countdown every second
        const countdownInterval = setInterval(updateCountdown, 1000);
        
        // Check for image changes periodically
        setInterval(checkBackgroundImage, 60000);
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .pulse {
                animation: pulse 1s infinite;
            }
            
            .pulse-fast {
                animation: pulse 0.5s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.8; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            .countdown-item span {
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
        
        // Store interval reference
        window.countdownInterval = countdownInterval;
    }

    // Start the application
    initialize();
    
    // Handle window resize
    window.addEventListener('resize', checkBackgroundImage);
    
    // Handle page visibility change
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            // Tab is visible again - update immediately
            updateCountdown();
        }
    });
});