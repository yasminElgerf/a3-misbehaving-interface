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