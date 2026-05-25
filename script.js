/* Global element references: all names use camelCase for the Assignment 3 requirement. */
const visitorName = document.querySelector('#visitorName');
const visitorEmail = document.querySelector('#visitorEmail');
const politenessSlider = document.querySelector('#politenessSlider');
const politenessLabel = document.querySelector('#politenessLabel');
const snackSelect = document.querySelector('#snackSelect');
const termsCheckbox = document.querySelector('#termsCheckbox');
const gooseEssay = document.querySelector('#gooseEssay');
const runawayButton = document.querySelector('#runawayButton');
const resetChaosButton = document.querySelector('#resetChaosButton');
const gooseSpeech = document.querySelector('#gooseSpeech');
const gooseStage = document.querySelector('#gooseStage');
const behaviorLog = document.querySelector('#behaviorLog');
const chaosMeter = document.querySelector('#chaosMeter');
const honkZone = document.querySelector('#honkZone');

/* State variables: these reset cleanly every browser reload because nothing is saved in localStorage. */
let chaosLevel = 10;
let nameEditCounter = 0;
let snackChangeCounter = 0;
let runawayCounter = 0;
let essayCounter = 0;
let originalEssayWords = [];


/* Utility function: records design-visible events in the page so the misbehavior feels intentional. */
function addBehaviorLog(messageText) {
    const newLogItem = document.createElement('li');
    newLogItem.textContent = messageText;
    behaviorLog.prepend(newLogItem);

    if (behaviorLog.children.length > 6) {
        behaviorLog.removeChild(behaviorLog.lastElementChild);
    }
}

/* Utility function: makes the duck/goose message jump around the page whenever it changes message. */
function moveGooseMessage() {
    gooseStage.classList.add('isFloating');

    const maxLeft = window.innerWidth - 360;
    const maxTop = window.innerHeight - 160;

    const randomLeft = Math.max(20, Math.floor(Math.random() * maxLeft));
    const randomTop = Math.max(20, Math.floor(Math.random() * maxTop));
    const randomRotation = Math.floor(Math.random() * 30) - 15;

    gooseStage.style.left = `${randomLeft}px`;
    gooseStage.style.top = `${randomTop}px`;
    gooseStage.style.transform = `rotate(${randomRotation}deg)`;
}

/* Utility function: changes the bird message and also moves it around as a distraction. */
function changeGooseMessage(newMessage) {
    gooseSpeech.textContent = newMessage;
    moveGooseMessage();
}

/* Utility function: updates the chaos meter and dynamically changes CSS properties through JavaScript. */
function updateChaosMeter(amountChanged) {
    chaosLevel = Math.max(0, Math.min(100, chaosLevel + amountChanged));

    chaosMeter.style.width = `${chaosLevel}%`; /* Dynamic CSS change 1: width. */
    document.body.style.letterSpacing = `${chaosLevel / 150}px`; /* Dynamic CSS change 2: letter spacing. */

    if (chaosLevel > 70) {
        document.body.style.filter = 'saturate(1.6) contrast(1.15)'; /* Dynamic CSS change 3: filter. */
    } else {
        document.body.style.filter = 'none';
    }
}

/* Utility function: adds a generated badge to the DOM, then sometimes removes an older one. */
function spawnHonkBadge(labelText) {
    const honkBadge = document.createElement('span');
    honkBadge.className = 'honkBadge';
    honkBadge.textContent = labelText;
    honkZone.appendChild(honkBadge); /* DOM addition 1+: badges are added as the user interacts. */

    if (honkZone.querySelectorAll('.honkBadge').length > 9) {
        const firstBadge = honkZone.querySelector('.honkBadge');
        firstBadge.remove(); /* DOM removal 1+: old badges are removed to keep the page from breaking. */
    }
}


// ! Behavior 1: name input fights back by partially rewriting the user's name into goose language. 

visitorName.addEventListener('input', () => {
    nameEditCounter += 1;

    if (nameEditCounter % 3 === 0 && visitorName.value.length > 1) {
        visitorName.value = `${visitorName.value.slice(0, 2)}-HONK-${nameEditCounter}`;

        changeGooseMessage('Your name has been improved by the Chaos Department. You are welcome.');
        spawnHonkBadge('identity honk');
        addBehaviorLog('Behavior 1 completed: the name field rewrote the visitor identity into goose language.');
        updateChaosMeter(9);
    }
});


/* Initial setup: makes the page start in a stable state every time it loads. */
updateChaosMeter(0);
addBehaviorLog('Page loaded cleanly: the Goose Chaos Tolerance Test is ready.');

/* Discarded experiment: I first tried to move the entire form on every mousemove, but it made the page too annoying to test. */
/* document.addEventListener('mousemove', () => { document.body.style.rotate = '1deg'; }); */ 