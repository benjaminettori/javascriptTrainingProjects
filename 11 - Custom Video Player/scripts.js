// Grab all the elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

// Set up methods

function togglePlay() {
	video[video.paused ? 'play' : 'pause']();
}

function updateButton() {
	const icon = video.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
	console.log(icon);
}

function updateProgress() {
	const progressPercent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${progressPercent}%`;
}

function skip() {
	console.log(this.dataset);
	video.currentTime += parseFloat(this.dataset.skip);
}

function updateSlider() {
	video[this.name] = this.value;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function makeFullScreen() {
	isFullScreen = !isFullScreen;

	if(isFullScreen) {
		video.classList.add('full-screen');
	} else {
		video.classList.remove('full-screen');
	}
}

// Set up event listeners
let mousedown = false;
let isFullScreen = false;


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', updateSlider));
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
fullscreen.addEventListener('click', makeFullScreen);

document.addEventListener('keyup', (e) => {
	if(e.keyCode === 27) {
		video.classList.remove('full-screen');
	}
});

