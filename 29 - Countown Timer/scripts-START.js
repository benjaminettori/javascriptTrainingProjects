let clockCountDown;
const displayTimer = document.querySelector('.display__time-left');
function time(seconds) {
	// in milliseconds
	const date = Date.now();
	const then = date + seconds * 1000;

	// clear any other interval count down before starting a new one
	clearInterval(clockCountDown);

	displayTimeLeft(seconds);

	clockCountDown = setInterval(function() {
		const secondsLeft = Math.round((then - Date.now()) / 1000);

		if(secondsLeft < 0) {
			clearInterval(clockCountDown);
			return;
		}

		displayTimeLeft(secondsLeft);

	}, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const secondsLeft = seconds % 60;

	const displayTime = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
	document.title = displayTime;
	displayTimer.textContent = displayTime;
}

const buttons = document.querySelectorAll('[data-time]');

buttons.forEach(button => button.addEventListener('click', function () {
	const seconds = this.dataset.time;
	time(seconds);
}));

// can use document.<name> to get element with name attribute
document.customForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const minutes = this.minutes.value;
	time(minutes * 60);
	// reset the value on the button
	this.reset();
})