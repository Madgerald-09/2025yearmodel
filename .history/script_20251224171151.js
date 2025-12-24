document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const notification = document.getElementById("notification");
    const imageBackground = document.getElementById("imageBackground");
    const mainContainer = document.getElementById("mainContainer");
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

    // Load and set background image
    function setBackgroundImage() {
        const imagePaths = [
            'images/award-image1.png',
            'images/first_pic.jpeg',
            'images/model-award.jpg',
            'images/award.jpg',
            'https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        ];
        
        let currentTry = 0;
        
        function tryNextImage() {
            if (currentTry >= imagePaths.length) {
                // All images failed, show fallback
                showFallbackBackground();
                return;
            }
            
            const img = new Image();
            img.onload = function() {
                // Set the background image
                imageBackground.style.backgroundImage = `url('${imagePaths[currentTry]}')`;
                imageBackground.style.backgroundSize = 'cover';
                imageBackground.style.backgroundPosition = 'center center';
                imageBackground.style.backgroundRepeat = 'no-repeat';
                
                // Adjust background size for mobile
                if (window.innerWidth <= 768) {
                    imageBackground.style.backgroundSize = 'contain';
                }
                
                console.log('Background image loaded successfully:', imagePaths[currentTry]);
            };
            
            img.onerror = function() {
                console.log('Background image failed to load:', imagePaths[currentTry]);
                currentTry++;
                setTimeout(tryNextImage, 100);
            };
            
            img.src = imagePaths[currentTry];
        }
        
        // Start trying images
        tryNextImage();
    }
    
    // Show fallback background
    function showFallbackBackground() {
        // Remove any existing fallback content
        const existingFallback = document.querySelector('.fallback-content');
        if (existingFallback) {
            existingFallback.remove();
        }
        
        // Create fallback content
        const fallbackContent = document.createElement('div');
        fallbackContent.className = 'fallback-content';
        fallbackContent.innerHTML = `
            <h3>MODEL OF THE YEAR</h3>
            <p>AWARD 2025</p>
            <div class="fallback-icon">
                <i class="fas fa-trophy"></i>
            </div>
        `;
        
        // Add fallback to the background
        imageBackground.classList.add('fallback-bg');
        imageBackground.appendChild(fallbackContent);
        
        console.log('Using fallback background');
    }
    
    // Adjust background for different screen sizes
    function adjustBackgroundForScreen() {
        if (window.innerWidth <= 768) {
            // Mobile - use contain to show full image
            imageBackground.style.backgroundSize = 'contain';
            imageBackground.style.backgroundPosition = 'center center';
        } else {
            // Desktop - use cover for better appearance
            imageBackground.style.backgroundSize = 'cover';
            imageBackground.style.backgroundPosition = 'center center';
        }
    }

    // Initialize
    function initialize() {
        // Set background image
        setBackgroundImage();
        
        // Start countdown immediately
        updateCountdown();
        
        // Update countdown every second
        setInterval(updateCountdown, 1000);
        
        // Show welcome notification
        setTimeout(() => {
            showNotification("48-hour countdown to January 4th has started!");
        }, 1000);
        
        // Adjust background on resize
        window.addEventListener('resize', adjustBackgroundForScreen);
        
        // Adjust background initially
        setTimeout(adjustBackgroundForScreen, 100);
        
        // Check image periodically (every 10 minutes)
        setInterval(setBackgroundImage, 600000);
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .countdown-item {
                transition: all 0.3s ease;
            }
            
            .countdown-item span {
                transition: all 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .image-background {
                animation: fadeIn 1.5s ease forwards;
            }
            
            .award-card {
                animation: slideUp 1s ease forwards;
            }
            
            @keyframes slideUp {
                from { 
                    opacity: 0;
                    transform: translateY(30px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Start the application
    initialize();
});