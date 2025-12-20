document.addEventListener("DOMContentLoaded", function () {
    const hours24El = document.getElementById("hours24");
    const minutes60El = document.getElementById("minutes60");
    const seconds60El = document.getElementById("seconds60");
    const notification = document.getElementById("notification");
    const imageSide = document.querySelector('.image-side');

    let totalSeconds = 24 * 60 * 60;

    function update24HourCountdown() {
        if (totalSeconds <= 0) {
            hours24El.textContent = "00";
            minutes60El.textContent = "00";
            seconds60El.textContent = "00";
            return;
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        hours24El.textContent = hours.toString().padStart(2, "0");
        minutes60El.textContent = minutes.toString().padStart(2, "0");
        seconds60El.textContent = seconds.toString().padStart(2, "0");

        totalSeconds--;
    }

    function showNotification(message) {
        notification.querySelector("p").textContent = message;
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }

    function checkBackgroundImage() {
        const img = new Image();
        img.onload = function() {
            console.log('Background image loaded successfully');
        };
        img.onerror = function() {
            console.warn('Background image not found');
            imageSide.style.background = 'linear-gradient(135deg, #2a241f 0%, #1a1a1a 100%)';
            imageSide.innerHTML = '<div class="fallback-text">Background Image Placeholder</div>';
            
            const fallbackStyle = document.createElement('style');
            fallbackStyle.textContent = `
                .fallback-text {
                    color: rgba(255, 255, 255, 0.2);
                    font-size: 24px;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    text-align: center;
                }
            `;
            document.head.appendChild(fallbackStyle);
        };
        img.src = 'images/award-image1.png';
    }

    function initialize() {
        update24HourCountdown();
        setInterval(update24HourCountdown, 1000);
        
        checkBackgroundImage();
        
        setTimeout(() => {
            showNotification("Click 'Watch Show' to go to Services Page");
        }, 1500);
        
        setInterval(checkBackgroundImage, 30000);
    }

    initialize();
});