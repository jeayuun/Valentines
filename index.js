function domReady(fn) {
    document.addEventListener("DOMContentLoaded", fn);
    if (document.readyState === "interactive" || document.readyState === "complete" ) {
      fn();
    }
}
  
domReady(() => {
    document.getElementsByClassName("card").item(0).addEventListener("click", function(){
        document.getElementsByClassName("modal").item(0).classList.add("is-visible");
    })
    document.getElementsByClassName("modal").item(0).addEventListener("click", function(e){
        if(e.target.classList.contains("is-visible")){
            e.target.classList.remove("is-visible");
        }
    })
});

document.addEventListener("DOMContentLoaded", function () {
    const unlockedMessage = document.getElementById("unlocked-message");
    const audio = document.getElementById("background-music");

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains("unlocked") && !mutation.target.classList.contains("hidden")) {
                if (audio.paused) {
                    audio.play().catch((error) => console.log("Autoplay blocked: ", error));
                }
            }
        });
    });

    observer.observe(unlockedMessage, { attributes: true, attributeFilter: ["class"] });
});

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");

    // Save the current time every second
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem("musicTime", audio.currentTime);
        }
    }, 1000);
});

document.querySelector(".elegant-button").addEventListener("click", function () {
    localStorage.setItem("musicTime", document.getElementById("background-music").currentTime);
});

function updateCountdown() {
    const unlockTime = new Date("February 14, 2025 00:00:00").getTime(); 
    const now = new Date().getTime();
    const timeLeft = unlockTime - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        document.getElementById("locked-message").style.display = "none";
        document.getElementById("unlocked-message").classList.remove("hidden");
        clearInterval(countdownTimer);
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);