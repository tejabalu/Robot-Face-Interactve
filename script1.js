/////////////ear movement and eye blink//////////////////

var earright = document.getElementById("ear_right");

const earWiggle = gsap.timeline({ paused: true, repeat: 2 });
earWiggle.set(earright, { transformOrigin: "right bottom" });
earWiggle.to(earright, { duration: 0.1, rotation: -10 });
earWiggle.to(earright, { duration: 0.1, rotation: 0 });

window.setInterval(() => earWiggle.play(0), 2500);

const eyeright = document.getElementById("eyeright");
const eyeleft = document.getElementById("eyeleft");

const eyeblinkright = gsap.timeline({ paused: true, repeat: 0 });
eyeblinkright.to(eyeright, { duration: 0.1, opacity: 0 });
eyeblinkright.to(eyeright, { duration: 0.1, opacity: 1 });

const eyeblinkleft = gsap.timeline({ paused: true, repeat: 0 });
eyeblinkleft.to(eyeleft, { duration: 0.1, opacity: 0 });
eyeblinkleft.to(eyeleft, { duration: 0.1, opacity: 1 });

window.setInterval(() => eyeblinkright.play(0), 3500);
window.setInterval(() => eyeblinkleft.play(0), 3500);

/////////////////eye movement//////////////////////

let svg = document.getElementById("Layer_1");
let rect = svg.getBoundingClientRect();
const eyeleftposx = eyeleft.cx.animVal.value;
const eyerightposx = eyeright.cx.animVal.value;
const eyeleftposy = eyeleft.cy.animVal.value;
const eyerightposy = eyeright.cy.animVal.value;
const bound = svg.getBBox().height;

window.addEventListener("mousemove", (event) => {
	const posx = event.clientX;
	const posy = event.clientY;
	const posxr = (posx / window.innerWidth) * 2 - 1;
	const posyr = (posy / window.innerWidth) * 2 - 1;
	console.log(posyr, posxr);

	eyeright.style.transform =
		"translate(" +
		posxr * (bound / 20) +
		"px, " +
		posyr * (bound / 20) +
		"px)";
	eyeleft.style.transform =
		"translate(" +
		posxr * (bound / 20) +
		"px, " +
		posyr * (bound / 20) +
		"px)";
});

/////////////speech recognition//////////////

var grammar =
	"#JSGF V1.0; grammar emar; public <greeting> = hello | hi; <person> = Wesley | Beck;";
var recognition = new window.webkitSpeechRecognition();
var speechRecognitionList = new window.webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.body.onclick = startRecognition;

function startRecognition() {
	recognition.start();
}

recognition.onresult = processSpeech;

function processSpeech(event) {
	var inputSpeech = event.results[0][0].transcript;
	var textDiv = document.getElementById("span");
	textDiv.innerHTML = "You said: " + inputSpeech + "<br/> Click to Talk";
	recognition.stop();
}

recognition.onend = recognitionEnded;

var i = 0;

function recognitionEnded() {
	console.log("onend happened");
	recognition.stop();

	var textDiv = document.getElementById("speech");
	if (i == 0) {
		textDiv.innerHTML = "> Fair enough! Do you want to continue? <br/>";
	} else {
		textDiv.innerHTML =
			"> Thanks! You can continue to speak if you want. <br/>";
	}
	i = i + 1;

	document.body.onclick = startRecognition;
}
