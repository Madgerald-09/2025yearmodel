document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById("awardVideo");
    const videoPlaceholder = document.getElementById("videoPlaceholder");
    const videoOverlay = document.getElementById("videoOverlay");
    const overlayBtn = document.getElementById("videoOverlayBtn");
    const dmButton = document.getElementById("dmButton");
    const notification = document.getElementById("notification");
    const schoolImageContainer = document.getElementById("schoolImageContainer");

    function showNotification(message) {
        notification.querySelector("p").textContent = message;
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }

    function loadVideo() {
        const videoUrl = "videos/award-video1.mp4";
        
        console.log("Loading video from:", videoUrl);
        
        const xhr = new XMLHttpRequest();
        xhr.open("HEAD", videoUrl, true);
        
        xhr.onload = function () {
            if (xhr.status === 200) {
                let source = videoElement.querySelector("source");
                if (!source) {
                    source = document.createElement("source");
                    source.type = "video/mp4";
                    videoElement.appendChild(source);
                }
                source.src = videoUrl;
                videoElement.load();
                
                videoElement.muted = true;
                const tryPlay = videoElement.play();
                
                if (tryPlay !== undefined) {
                    tryPlay
                        .then(() => {
                            videoElement.classList.add("show-video");
                            videoPlaceholder.classList.add("hide-placeholder");
                            if (videoOverlay) videoOverlay.classList.remove("hidden");
                            showNotification("Video playing");
                        })
                        .catch((err) => {
                            console.warn("Autoplay blocked:", err);
                            videoPlaceholder.querySelector("p").textContent = "Click to play the video";
                            if (videoOverlay) videoOverlay.classList.remove("hidden");
                        });
                }
                
                videoElement.addEventListener("error", function (e) {
                    console.error("Video error:", e);
                    videoPlaceholder.querySelector("p").textContent = "Error playing video";
                    videoPlaceholder.classList.remove("hide-placeholder");
                });
            } else {
                console.warn("Video not found:", videoUrl);
                videoPlaceholder.querySelector("p").textContent = "Video not found";
                videoPlaceholder.innerHTML += '<p style="font-size:12px;margin-top:10px;">Place award-video1.mp4 in videos folder</p>';
            }
        };
        
        xhr.onerror = function () {
            console.error("XHR error checking video");
            videoPlaceholder.querySelector("p").textContent = "Video file not found";
            videoPlaceholder.innerHTML += '<p style="font-size:12px;margin-top:10px;">Add award-video1.mp4 to videos folder</p>';
        };
        
        xhr.send();
    }

    function checkSchoolImage() {
        const img = new Image();
        img.onload = function() {
            console.log('School image loaded successfully');
            schoolImageContainer.style.backgroundImage = `url('images/school-image.png')`;
            const placeholder = schoolImageContainer.querySelector('.placeholder-text');
            if (placeholder) placeholder.style.display = 'none';
        };
        img.onerror = function() {
            console.warn('School image not found');
            const placeholder = schoolImageContainer.querySelector('.placeholder-text');
            if (placeholder) placeholder.textContent = 'School Image Placeholder';
        };
        img.src = 'images/school-image.png';
    }

    if (overlayBtn) {
        overlayBtn.addEventListener("click", function () {
            if (videoElement) {
                videoElement.muted = false;
                videoElement.play()
                    .then(() => {
                        if (videoOverlay) videoOverlay.classList.add("hidden");
                        showNotification("Sound enabled");
                    })
                    .catch((playErr) => {
                        console.error("Failed to play after unmute:", playErr);
                    });
            }
        });
    }

    if (dmButton) {
        dmButton.addEventListener("click", function () {
            showNotification("Contact us on Instagram @modelaward for our services");
            
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 150);
        });
    }

    function initialize() {
        loadVideo();
        checkSchoolImage();
        
        setTimeout(() => {
            showNotification("Welcome to our Services Page!");
        }, 1000);
        
        setInterval(checkSchoolImage, 30000);
    }

    initialize();
});