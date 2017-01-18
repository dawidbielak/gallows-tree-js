var passphrases = [
	"When in Rome do as the Romans",
	"People who live in glass houses should not throw stones",
	"Hope for the best but prepare for the worst",
	"Better late than never"
];

// Choosing a random passphrase
var randomPassphrase = Math.floor(Math.random() * passphrases.length);

if (randomPassphrase > passphrases.length - 1)
	randomPassphrase = 1;

var passphrase = passphrases[randomPassphrase];
passphrase = passphrase.toUpperCase();

var passphraseLength = passphrase.length;
var misses = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

// Coding passphrase to "-"
var codedPassphrase = "";
for (var i = 0; i < passphraseLength; i++) {
	if (passphrase.charAt(i) == " ") codedPassphrase = codedPassphrase + " ";
	else codedPassphrase = codedPassphrase + "-";
}

function showPassphrase() {
	document.getElementById("passphrase").innerHTML = codedPassphrase;
}

window.onload = start;

var chars = new Array (
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
);

function start() {

	var content = "";

	for (i = 0; i <= chars.length - 1; i++) {
		var element = "char" + i;
		content = content + '<div class="char" onclick="check(' + i + ')"id="' + element + '">' + chars[i] + '</div>';
		if ((i + 1) % 7== 0) content = content + '<div style="clear: both;"></div>'
	}

	document.getElementById("alphabet").innerHTML = content;

	showPassphrase();
}

String.prototype.setChar = function(place, char) {
	if (place > this.length - 1) {
		return this.toString();
	} else {
		return this.substr(0, place) + char + this.substr(place + 1);
	}
}

function check(number) {
	var charPassed = false;

	for (i = 0; i < passphraseLength; i++) {
		if (passphrase.charAt(i) == chars[number]) {
			codedPassphrase = codedPassphrase.setChar(i, chars[number]);
			charPassed = true;
		}
	}

	if (charPassed == true) {
		yes.play();
		var element = "char" + number;
		document.getElementById(element).classList.add("passed");
		document.getElementById(element).setAttribute("onclick",";");

		showPassphrase();
	} else {
		no.play();
		var element = "char" + number;
		document.getElementById(element).classList.add("failed");
		document.getElementById(element).setAttribute("onclick",";");

		misses++; // how many chars you didn't pass
		var pic = "img/s" + misses + ".jpg";
		document.getElementById("gibbet").innerHTML = '<img src= "' + pic + '"</img>';
		document.getElementById("counter").innerHTML = "<p>You have: " + (9 - misses) + " tries</p>";
	}

	// win
	if (passphrase == codedPassphrase)
		document.getElementById("alphabet").innerHTML = 'You won! You just gave a valid passphrase is: ' + passphrase + '<br><br><span class="reset" onclick="location.reload()">Would you like to play again?"</span>';

	// lose
	if (misses >= 9)
		document.getElementById("alphabet").innerHTML = 'You lost! A valid passphrase is: ' + passphrase + '<br><br><span class="reset" onclick="location.reload()">Would you like to play again?"</span>';

	showPassphrase();
}