document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const notification = document.getElementById("notification");
    const imageSide = document.getElementById("imageSide");
    const awardImage = document.getElementById("awardImage");
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

    // Check and load image properly
    function checkBackgroundImage() {
        if (!awardImage) return;
        
        const imagePaths = [
            'images/award-image1.png',
            'images/first_pic.jpeg',
            'images/model-award.jpg',
            'images/award.jpg',
            'https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' // Fallback high-quality image
        ];
        
        let currentTry = 0;
        
        function tryNextImage() {
            if (currentTry >= imagePaths.length) {
                // All images failed, show fallback
                imageSide.classList.add('fallback-bg');
                awardImage.style.display = 'none';
                
                if (!imageSide.querySelector('.fallback-text')) {
                    const fallbackText = document.createElement('div');
                    fallbackText.className = 'fallback-text';
                    fallbackText.innerHTML = `
                        <h3>MODEL OF THE YEAR</h3>
                        <p>AWARD 2025</p>
                        <div class="fallback-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                    `;
                    imageSide.querySelector('.image-area').appendChild(fallbackText);
                }
                return;
            }
            
            const img = new Image();
            img.onload = function() {
                // Update the src of the awardImage
                awardImage.src = imagePaths[currentTry];
                awardImage.classList.add('loaded');
                awardImage.style.display = 'block';
                imageSide.classList.remove('fallback-bg');
                
                // Remove any existing fallback text
                const fallbackText = imageSide.querySelector('.fallback-text');
                if (fallbackText) {
                    fallbackText.remove();
                }
                
                console.log('Image loaded successfully:', imagePaths[currentTry]);
                
                // Ensure image fills container properly
                setTimeout(() => {
                    if (awardImage.naturalHeight > awardImage.naturalWidth) {
                        awardImage.style.objectFit = 'contain';
                        awardImage.style.height = '100%';
                        awardImage.style.width = 'auto';
                    } else {
                        awardImage.style.objectFit = 'contain';
                        awardImage.style.width = '100%';
                        awardImage.style.height = 'auto';
                    }
                }, 100);
            };
            
            img.onerror = function() {
                console.log('Image failed to load:', imagePaths[currentTry]);
                currentTry++;
                setTimeout(tryNextImage, 100);
            };
            
            img.src = imagePaths[currentTry];
        }
        
        // First, try the current image source
        if (awardImage.src && awardImage.src !== window.location.href) {
            const testImg = new Image();
            testImg.onload = function() {
                awardImage.classList.add('loaded');
                console.log('Current image loaded successfully');
                
                // Adjust image based on dimensions
                if (awardImage.naturalHeight > awardImage.naturalWidth) {
                    awardImage.style.objectFit = 'contain';
                    awardImage.style.height = '100%';
                    awardImage.style.width = 'auto';
                } else {
                    awardImage.style.objectFit = 'contain';
                    awardImage.style.width = '100%';
                    awardImage.style.height = 'auto';
                }
            };
            testImg.onerror = function() {
                console.log('Current image failed, trying alternatives');
                tryNextImage();
            };
            testImg.src = awardImage.src;
        } else {
            // No image source set, start trying
            tryNextImage();
        }
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
        
        // Check image periodically (every 5 minutes)
        setInterval(checkBackgroundImage, 300000);
        
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
                from { opacity: 0; transform: scale(0.98); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .award-image.loaded {
                animation: fadeIn 1.5s ease forwards;
            }
            
            @keyframes imagePulse {
                0% { box-shadow: 0 0 0 0 rgba(212, 185, 150, 0.4); }
                70% { box-shadow: 0 0 0 20px rgba(212, 185, 150, 0); }
                100% { box-shadow: 0 0 0 0 rgba(212, 185, 150, 0); }
            }
            
            .image-container {
                animation: imagePulse 3s infinite;
            }
        `;
        document.head.appendChild(style);
        
        // Add image optimization
        awardImage.onload = function() {
            this.classList.add('loaded');
            console.log('Image dimensions:', this.naturalWidth, 'x', this.naturalHeight);
        };
    }

    // Start the application
    initialize();
});