console.log("🚀 [ShortsFlow] SCRIPT IS INJECTED AND RUNNING!");

// --- STATE MANAGEMENT ---
let isAutoScrollEnabled = true;
let scrollDelay = 2;
let currentlyObservedVideo = null;
let navigationInProgress = false;

// --- INITIALIZATION ---
chrome.storage.local.get({ autoScrollEnabled: true, scrollDelay: 2 }, (result) => {
    isAutoScrollEnabled = result.autoScrollEnabled;
    scrollDelay = result.scrollDelay;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local') {
        if (changes.autoScrollEnabled) isAutoScrollEnabled = changes.autoScrollEnabled.newValue;
        if (changes.scrollDelay) scrollDelay = changes.scrollDelay.newValue;
    }
});

// --- CORE LOGIC ---
function scrollToNextShort() {
    let nextButton = document.querySelector('#navigation-button-down button');
    
    if (!nextButton) {
        nextButton = document.querySelector('button[aria-label="Next video"], button[aria-label="Next"]');
    }

    if (nextButton) {
        console.log(`⏭️ [ShortsFlow] Scrolling to next short...`);
        nextButton.click();
    } else {
        console.warn("⚠️ [ShortsFlow] Could not find the Next button.");
    }
    
    setTimeout(() => { navigationInProgress = false; }, 1000);
}

/**
 * NEW: Listens to the video clock instead of waiting for the video to stop.
 */
function handleTimeUpdate(event) {
    if (!isAutoScrollEnabled || navigationInProgress) return; 
    if (event.target !== currentlyObservedVideo) return;

    const video = event.target;
    
    // Check if the video duration is loaded and we are within 0.4 seconds of the end
    if (video.duration > 0 && (video.duration - video.currentTime) <= 0.4) {
        console.log(`⏱️ [ShortsFlow] Video end detected (Time: ${video.currentTime.toFixed(1)} / ${video.duration.toFixed(1)}). Scrolling in ${scrollDelay} seconds.`);
        
        // Lock it immediately so this doesn't fire 20 times in the last half-second
        navigationInProgress = true;

        setTimeout(() => {
            if (isAutoScrollEnabled) {
                scrollToNextShort();
            } else {
                navigationInProgress = false;
            }
        }, scrollDelay * 1000);
    }
}

function attachListenerToActiveVideo() {
    const allVideos = document.querySelectorAll('video');
    let activeVideo = document.querySelector('ytd-reel-video-renderer[is-active] video');

    if (!activeVideo && allVideos.length > 0) {
        activeVideo = Array.from(allVideos).find(v => {
            const rect = v.getBoundingClientRect();
            return rect.top >= -200 && rect.top <= (window.innerHeight / 1.5);
        });
    }

    if (activeVideo) {
        if (activeVideo !== currentlyObservedVideo) {
            if (currentlyObservedVideo) {
                // Remove the old listener
                currentlyObservedVideo.removeEventListener('timeupdate', handleTimeUpdate);
            }
            currentlyObservedVideo = activeVideo;
            
            // Attach the new time-based listener
            currentlyObservedVideo.addEventListener('timeupdate', handleTimeUpdate);
            console.log("✅ [ShortsFlow] SUCCESS! Time tracker attached to the active video.");
        }
    }
}

// --- DOM MUTATION OBSERVER ---
const observer = new MutationObserver((mutations) => {
    if (isAutoScrollEnabled) {
        setTimeout(attachListenerToActiveVideo, 500); 
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true, 
    attributeFilter: ['is-active', 'active'] 
});

setTimeout(attachListenerToActiveVideo, 1000);