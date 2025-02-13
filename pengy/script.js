
let noClickedCounter = 0; 

const bonfireFrames = [
    'assets/bonfire/bonfire-1.png',
    'assets/bonfire/bonfire-2.png',
    'assets/bonfire/bonfire-3.png',
    'assets/bonfire/bonfire-4.png'
];
let currentbonfireFrame = 0;

const bubbleAsk = [
'assets/speech-bubbles/bubble-ask1.png',
'assets/speech-bubbles/bubble-ask2.png',
'assets/speech-bubbles/bubble-ask3.png',
'assets/speech-bubbles/bubble-ask4.png'
];

const bubbleNo = 'assets/speech-bubbles/bubble-no.png';
const bubbleYes = 'assets/speech-bubbles/bubble-yes.png';
let bubbleAskIndex = 0; 

// 
const paxAnimFrames = [
    'assets/pax/pax1.png',
    'assets/pax/pax2.png',
];

const pollyAnimFrames1 = [
'assets/polly-first-click/pink1-1.png',
'assets/polly-first-click/pink1-2.png',
'assets/polly-first-click/pink1-3.png',
'assets/polly-first-click/pink1-4.png',
'assets/polly-first-click/pink1-5.png',
'assets/polly-first-click/pink1-6.png',
'assets/polly-first-click/pink1-7.png',
'assets/polly-first-click/pink1-8.png'
];
const pinkAnimFrameDurations1 = [100,150,100,100,100,100,100,150]; 

const pollyAnimFrames2 = [
'assets/polly-second-click/pink2-1.png',
'assets/polly-second-click/pink2-2.png',
'assets/polly-second-click/pink2-3.png',
'assets/polly-second-click/pink2-4.png',
'assets/polly-second-click/pink2-5.png',
'assets/polly-second-click/pink2-6.png',
'assets/polly-second-click/pink2-7.png',
'assets/polly-second-click/pink2-8.png'
];
const pinkAnimFrameDurations2 = [100,150,100,100,100,100,100,150]; 

const pollyAnimFrames3 = [
'assets/polly-third-click/pink3-1.png',
'assets/polly-third-click/pink3-2.png',
'assets/polly-third-click/pink3-3.png',
'assets/polly-third-click/pink3-4.png',
'assets/polly-third-click/pink3-5.png',
'assets/polly-third-click/pink3-6.png',
'assets/polly-third-click/pink3-7.png',
'assets/polly-third-click/pink3-8.png'
];
const pinkAnimFrameDurations3 = [100,150,100,100,100,100,100,150]; 
const noBlockPhases = [
[ 'assets/blocks/block-click1-1.png', 'assets/blocks/block-click1-2.png', 'assets/blocks/block-click1-3.png', 'assets/blocks/block-click1-4.png' ],
[ 'assets/blocks/block-click2-1.png', 'assets/blocks/block-click2-2.png', 'assets/blocks/block-click2-3.png' ],
[ 'assets/blocks/block-click3-1.png', 'assets/blocks/block-click3-2.png', 'assets/blocks/block-click3-3.png' ]
];
const noBlockFrameDuration = 100;

const iceCrackPhases = [
[ 'assets/cracks/ice1-1.png', 'assets/cracks/ice1-2.png', 'assets/cracks/ice1-3.png', 'assets/cracks/ice1-4.png' ],
[ 'assets/cracks/ice2-1.png', 'assets/cracks/ice2-2.png', 'assets/cracks/ice2-3.png', 'assets/cracks/ice2-4.png' ],
[ 'assets/cracks/ice3-1.png', 'assets/cracks/ice3-2.png', 'assets/cracks/ice3-3.png', 'assets/cracks/ice3-4.png' ]
];
const iceCrackFrameDuration = 100;

const blueHappyFrames = [
'assets/pax-happy/pax-happy1.png',
'assets/pax-happy/pax-happy2.png',
'assets/pax-happy/pax-happy3.png'
];
const pinkHappyFrames = [
'assets/polly-happy/polly-happy1.png',
'assets/polly-happy/polly-happy2.png',
'assets/polly-happy/polly-happy3.png'
];
const happyFrameDelay = 330;   

function preloadImages(imageArray, callback) {
    let loadedCount = 0;
    const totalImages = imageArray.length;

    imageArray.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === totalImages && callback) {
                callback();
            }
        };
        img.onerror = () => {
            console.warn(`Failed to load image: ${src}`); 
            loadedCount++;
            if (loadedCount === totalImages && callback) {
                callback();
            }
        };
    });
}

const allFrames = [
    ...bonfireFrames, 
    ...bubbleAsk, bubbleNo, bubbleYes,
    ...paxAnimFrames, 
    ...pollyAnimFrames1, ...pollyAnimFrames2, ...pollyAnimFrames3,
    ...noBlockPhases[0], ...noBlockPhases[1], ...noBlockPhases[2],
    ...iceCrackPhases[0], ...iceCrackPhases[1], ...iceCrackPhases[2],
    ...blueHappyFrames, ...pinkHappyFrames,
    'assets/misc/snowflake-1.png'
];

document.body.classList.add("loading");

const loadingScreen = document.createElement("div");
loadingScreen.id = "loadingScreen";
loadingScreen.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0, 0, 0, 0.8); color: white; font-size: 20px;
    z-index: 9999;
`;
loadingScreen.innerHTML = "Loading assets...";
document.body.appendChild(loadingScreen);

preloadImages(allFrames, () => {
    console.log("All images loaded!");

    document.body.classList.remove("loading");

    loadingScreen.style.display = "none";
});

window.onload = function () {
    document.body.classList.remove("loading"); 
};



function animateBonfire() {
  document.getElementById('bonfire').src = bonfireFrames[currentbonfireFrame];
  currentbonfireFrame = (currentbonfireFrame + 1) % bonfireFrames.length;
  setTimeout(() => requestAnimationFrame(animateBonfire), 200);
}

requestAnimationFrame(animateBonfire);

function animatepollyCharacter(frames, durations, onComplete) {
const pollyCharacter = document.getElementById('pollyCharacter');
let frameIndex = 0;
function showFrame() {
    if (frameIndex < frames.length) {
        pollyCharacter.src = frames[frameIndex];
        const delay = durations[frameIndex] || 150;
        frameIndex++;
        setTimeout(showFrame, delay);
    } else {
        pollyCharacter.src = 'assets/polly-first-click/pink0.png';
        if (onComplete) onComplete();
    }
}
showFrame();
}
    
function animateBlockPhase(phaseFrames, callback) {
    const noBlock = document.getElementById('noBlock');
    let frameIndex = 0;
    function showFrame() {
        if (frameIndex < phaseFrames.length - 1) {
            noBlock.src = phaseFrames[frameIndex];
            frameIndex++;
            setTimeout(showFrame, noBlockFrameDuration);
        } else {
            noBlock.src = phaseFrames[frameIndex];
            if (callback) {
                callback();
            }
        }
    }
    showFrame();
}
    
function animateIceCrackPhase(phaseFrames, callback) {
const iceCrack = document.getElementById('iceCrack');
let frameIndex = 0;
function showFrame() {
    if (frameIndex < phaseFrames.length - 1) {
    iceCrack.src = phaseFrames[frameIndex];
    frameIndex++;
    setTimeout(showFrame, iceCrackFrameDuration);
    } else {
    iceCrack.src = phaseFrames[frameIndex];
    if (callback) {
        callback();
    }
    }
}
showFrame();
}

function animateIceCrack(clickCount, callback) {
    if (clickCount === 1) {
        animateIceCrackPhase(iceCrackPhases[0], callback);
    } else if (clickCount === 2) {
        animateIceCrackPhase(iceCrackPhases[1], callback);
    } else if (clickCount === 3) {
        animateIceCrackPhase(iceCrackPhases[2], callback);
    }
}
    
function animateBlock(clickCount, callback) {
if (clickCount === 1) {
    animateBlockPhase(noBlockPhases[0], callback);
} else if (clickCount === 2) {
    animateBlockPhase(noBlockPhases[1], callback);
} else if (clickCount === 3) {
    animateBlockPhase(noBlockPhases[2], () => {
    const noBlock = document.getElementById('noBlock');
    noBlock.classList.add('disabled');
    const overlay = document.getElementById('image-overlay');
    if (overlay) {
    overlay.parentNode.removeChild(overlay);
    }
    if (callback) callback();
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
        }
    });
}
}
    
document.getElementById('noBlock').addEventListener('click', (e) => {
    if (e.target.classList.contains('disabled')) return; 
    noClickedCounter++;
    noBlock.classList.add('disabled'); 

    const paxCharacter = document.getElementById('paxCharacter');
    paxCharacter.src = paxAnimFrames[1];

    let animationsCompleted = 0;
    function checkCompletion() {
        animationsCompleted++;
        if (animationsCompleted === 2) {
            bubbleAskIndex = Math.min(bubbleAskIndex + 1, bubbleAsk.length - 1);
            document.getElementById('speechBubble').className = 'askBubble bubble-ask' + (bubbleAskIndex + 1);
            paxCharacter.src = paxAnimFrames[0];

            if (noClickedCounter !== 3) {
                noBlock.classList.remove('disabled');
            }
        }
    }
    if (noClickedCounter === 1) {
        animatepollyCharacter(pollyAnimFrames1, pinkAnimFrameDurations1, () => {
            animateBlock(noClickedCounter, checkCompletion);
            animateIceCrack(noClickedCounter, checkCompletion);
        });
    } else if (noClickedCounter === 2) {
        animatepollyCharacter(pollyAnimFrames2, pinkAnimFrameDurations2, () => {
            animateBlock(noClickedCounter, checkCompletion);
            animateIceCrack(noClickedCounter, checkCompletion);
        });
    } else if (noClickedCounter === 3) {
        animatepollyCharacter(pollyAnimFrames3, pinkAnimFrameDurations3, () => {
            animateBlock(noClickedCounter, checkCompletion);
            animateIceCrack(noClickedCounter, checkCompletion);
        });
    }
});

let happyAnimationStarted = false;
document.getElementById('yesBlock').addEventListener('click', () => {
    const messageEl = document.getElementById('message'); 
    messageEl.style.display = 'block';
    messageEl.innerHTML = '<img src="assets/misc/happy-message.png" style="width:100%; height:auto; object-fit:contain;">';

    document.getElementById('speechBubble').style.display = 'none';
    const noBlock = document.getElementById('noBlock');
    noBlock.classList.add('disabled');

    if (!happyAnimationStarted) {
        happyAnimationStarted = true;
        let blueHappyIndex = 0;
        let pinkHappyIndex = 0;

        setInterval(() => {
            document.getElementById('paxCharacter').src = blueHappyFrames[blueHappyIndex];
            blueHappyIndex = (blueHappyIndex + 1) % blueHappyFrames.length;
        }, happyFrameDelay);

        setInterval(() => {
            document.getElementById('pollyCharacter').src = pinkHappyFrames[pinkHappyIndex];
            pinkHappyIndex = (pinkHappyIndex + 1) % pinkHappyFrames.length;
        }, happyFrameDelay);
    }
});


const body = document.getElementById('body');

function createSnowflake() {
  const snowflake = document.createElement('img');
  snowflake.src = 'assets/misc/snowflake-1.png';
  snowflake.classList.add('snowflake');
  
  const size = Math.random() * 20 + 10;
  snowflake.style.width = `${size}px`;
  snowflake.style.left = `${Math.random() * window.innerWidth}px`;
  
  const duration = Math.random() * 5 + 5;
  snowflake.style.animationDuration = `${duration}s`;
  const delay = Math.random() * 5;
  snowflake.style.animationDelay = `${delay}s`;
  body.appendChild(snowflake);
  
  setTimeout(() => {
    snowflake.remove();
  }, (duration + delay) * 1000);
}

setInterval(createSnowflake, 350);