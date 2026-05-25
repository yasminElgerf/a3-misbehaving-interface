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


// Random snack list: every menu interaction adds a new ridiculous option.
const rejectedSnackOptions = [
    'Forbidden snack: one left sock',
    'Premium snack: emotional support crouton',
    'Suspicious snack: wet calculator',
    'Luxury snack: unpaid parking ticket',
    'Royal snack: glitter-covered lettuce',
    'Illegal snack: borrowed Wi-Fi password',
    'Mystery snack: crunchy keyboard crumbs',
    'Fancy snack: one dramatic grape',
    'Emergency snack: tiny traffic cone',
    'Academic snack: overdue assignment'
];


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


/* Utility function: shows a snack rejection message below the snack menu. */
function showSnackWarning(messageText) {
    const oldWarning = document.querySelector('.snackWarning');

    if (oldWarning !== null) {
        oldWarning.remove();
    }

    const snackWarning = document.createElement('p');
    snackWarning.className = 'snackWarning';
    snackWarning.textContent = messageText;

    snackSelect.insertAdjacentElement('afterend', snackWarning);
}


/* Utility function: rearranges words so the essay becomes grammatically chaotic. */
function scrambleEssayWords() {
    const currentWords = gooseEssay.value.split(/\s+/).filter((word) => word.length > 0);

    if (currentWords.length < 5) {
        return;
    }

    const scrambledWords = [...currentWords];

    for (let currentIndex = scrambledWords.length - 1; currentIndex > 0; currentIndex -= 1) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        const temporaryWord = scrambledWords[currentIndex];
        scrambledWords[currentIndex] = scrambledWords[randomIndex];
        scrambledWords[randomIndex] = temporaryWord;
    }

    gooseEssay.value = scrambledWords.join(' ');
}


// ! Behavior 1: name input fights back by partially rewriting the user's name into goose language. The user tries to type normally, but the interface interrupts it by adding a random HONK to the name and it can not be erased.

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


// ! Behavior 2: the politeness slider dramatically tilts the whole page instead of politely adjusting anything. Intention: The slider promises politeness control but actually disrupts the visitor's visual control of the page.

politenessSlider.addEventListener('input', () => {
    const sliderValue = Number(politenessSlider.value);
    politenessLabel.textContent = sliderValue;

    const dramaticTilt = (sliderValue - 50) / 2.8;

    document.body.style.transform = `rotate(${dramaticTilt}deg) scale(${1 + Math.abs(dramaticTilt) / 140})`;

    if (sliderValue > 70) {
        changeGooseMessage('Too polite. The goose suspects you are hiding bread.');
    } else if (sliderValue < 30) {
        changeGooseMessage('Too rude. The goose respects it, but files a complaint.');
    } else {
        changeGooseMessage('Average politeness detected. Boring. Increasing chaos anyway.');
    }

    spawnHonkBadge(`tilt ${Math.round(dramaticTilt)}°`);

    addBehaviorLog('Behavior 2 completed: the politeness slider dramatically tilted the whole page.');

    updateChaosMeter(8);
});

// ! Behavior 3: snack menu rejects the selected snack, then adds a new random weird option. Intention: the visitor is forced to reopen the menu because every choice becomes unacceptable and the menu keeps mutating.

snackSelect.addEventListener('change', () => {
    snackChangeCounter += 1;

    const selectedSnackText = snackSelect.options[snackSelect.selectedIndex].textContent;
    const randomSnackIndex = Math.floor(Math.random() * rejectedSnackOptions.length);
    const randomSnackText = `${rejectedSnackOptions[randomSnackIndex]} #${snackChangeCounter}`;

    const confusingOption = document.createElement('option');
    confusingOption.value = `chaosSnack${snackChangeCounter}`;
    confusingOption.textContent = randomSnackText;

    snackSelect.appendChild(confusingOption); /* DOM addition: menu grows after choices. */

    showSnackWarning(`Joke's on you. The goose does not accept "${selectedSnackText}". Choose again, brave victim.`);

    snackSelect.selectedIndex = 0;

    changeGooseMessage('Snack rejected. The goose has added a worse option to the menu.');
    spawnHonkBadge('snack denied');
    addBehaviorLog('Behavior 3 completed: the snack menu rejected the choice and added a new random option.');
    updateChaosMeter(10);
});

//! Behavior 4: checkbox causes unrelated consequences by erasing the email and adding a misleading apology note. Design intention: the visitor expects to accept terms, but the interface punishes them by deleting an unrelated field.

termsCheckbox.addEventListener('change', () => {
    visitorEmail.value = '';

    if (termsCheckbox.checked) {
        changeGooseMessage('Terms accepted. Email rejected for emotional reasons.');
    } else {
        changeGooseMessage('Terms rejected. Email still gone. The goose is consistent.');
    }

    const apologyNote = document.createElement('span');
    apologyNote.className = 'apologyNote';
    apologyNote.textContent = 'Sorry! Not sorry. The goose needed that email space.';

    honkZone.appendChild(apologyNote); /* DOM addition: creates a fake apology. */

    window.setTimeout(() => {
        apologyNote.remove(); /* DOM removal: apology disappears, adding temporal misbehavior. */
    }, 2500);

    addBehaviorLog('Behavior 4 completed: checking the terms erased an unrelated email field.');
    updateChaosMeter(12);
});


// ! Behavior 5 : the main submit button runs away on hover and becomes harder to click. Intention: the most important button avoids the visitor, turning a normal form submission into a chase.

runawayButton.addEventListener('mouseenter', () => {
    runawayCounter += 1;

    const horizontalJump = Math.floor(Math.random() * 180) - 90;
    const verticalJump = Math.floor(Math.random() * 100) - 50;
    const shrinkAmount = Math.max(0.68, 1 - runawayCounter * 0.04);

    runawayButton.style.transform = `translate(${horizontalJump}px, ${verticalJump}px) scale(${shrinkAmount})`;
    runawayButton.style.opacity = `${Math.max(0.55, 1 - runawayCounter * 0.05)}`;

    changeGooseMessage('The submit button has entered witness protection.');

    spawnHonkBadge('runaway submit');
    addBehaviorLog('Behavior 5 completed: the important button dodged the cursor.');
    updateChaosMeter(10);
});

/* Submit click: rewards persistence with funny feedback and more DOM visualization. */
runawayButton.addEventListener('click', () => {
    changeGooseMessage('Application submitted! Maybe. The goose is reading it upside down.');

    spawnHonkBadge('SUBMITTED?');
    spawnHonkBadge('probably not');

    addBehaviorLog('The visitor clicked submit despite goose interference. Spectatorial mastery briefly restored, then questioned.');
    updateChaosMeter(15);
});

/* Initial setup: makes the page start in a stable state every time it loads. */
updateChaosMeter(0);
addBehaviorLog('Page loaded cleanly: the Goose Chaos Tolerance Test is ready.');

/* Discarded experiment: I first tried to move the entire form on every mousemove, but it made the page too annoying to test. */
/* document.addEventListener('mousemove', () => { document.body.style.rotate = '1deg'; }); */ 