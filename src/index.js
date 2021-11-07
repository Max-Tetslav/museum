import './style.scss';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import Swiper, { Navigation, Pagination } from 'swiper';

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!BURGER MENU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!BURGER MENU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!BURGER MENU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const MENU_BTN_EL = document.querySelector('.menu_btn'),
	WELCOME_INFO_EL = document.querySelector('.welcome_info'),
	MENU_CONTAINER_EL = document.querySelector('.menu-1024-container'),
	WELCOME_IMAGE_EL = document.querySelector('.welcome-bg-img'),
	WELCOME_SLIDER_PAGINATION_EL = document.querySelector('.slider'),
	MENU_768_CONTAINER_EL = document.querySelector('.pictures-media-container'),
	MENU_LINK_ELS = document.querySelectorAll('.menu_item-1024');

let isOpen = false;

function openBurger() {
	if (window.screen.width <= 420) {
		MENU_768_CONTAINER_EL.style.width = '310px';
		MENU_CONTAINER_EL.style.width = '297px';
		WELCOME_INFO_EL.classList.toggle('hide');
		WELCOME_SLIDER_PAGINATION_EL.style.display = 'none';
		WELCOME_IMAGE_EL.classList.toggle('hide');
	} else if (window.screen.width <= 768) {
		MENU_CONTAINER_EL.style.width = '297px';
		WELCOME_INFO_EL.classList.toggle('hide');
		WELCOME_IMAGE_EL.classList.toggle('hide');
		WELCOME_SLIDER_PAGINATION_EL.style.display = 'none';
		MENU_768_CONTAINER_EL.style.width = '658px';
	} else if (window.screen.width <= 1024 && window.screen.width > 768) {
		MENU_CONTAINER_EL.style.width = '297px';
		WELCOME_INFO_EL.classList.toggle('hide');
	}
	isOpen = !isOpen;
	MENU_LINK_ELS.forEach(item => item.addEventListener('click', openMenu));
}

function closeBurger() {
	if (window.screen.width <= 420) {
		MENU_768_CONTAINER_EL.style.width = '0px';
		MENU_CONTAINER_EL.style.width = '0px';
		setTimeout(() => {
			WELCOME_INFO_EL.classList.toggle('hide');
			WELCOME_SLIDER_PAGINATION_EL.style.display = 'flex';
			WELCOME_IMAGE_EL.classList.toggle('hide');
		}, 500);
	} else if (window.screen.width <= 768) {
		MENU_768_CONTAINER_EL.style.width = '0px';
		MENU_CONTAINER_EL.style.width = '0px';
		setTimeout(() => {
			WELCOME_INFO_EL.classList.toggle('hide');
			WELCOME_SLIDER_PAGINATION_EL.style.display = 'flex';
			WELCOME_IMAGE_EL.classList.toggle('hide');
		}, 500);
	} else if (window.screen.width <= 1024 && window.screen.width > 768) {
		MENU_CONTAINER_EL.style.width = '0px';
		setTimeout(() => WELCOME_INFO_EL.classList.toggle('hide'), 500);
	}
	isOpen = !isOpen;
}

function openMenu() {
	MENU_BTN_EL.classList.toggle('menu_open');

	if (isOpen) {
		closeBurger();
	} else {
		openBurger();
	}

}

MENU_BTN_EL.addEventListener('click', openMenu);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!WELCOME SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!WELCOME SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!WELCOME SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const WELCOME_SLIDES_ELMS = document.querySelectorAll('.slide'),
	BULLETS_ELEMS = document.querySelectorAll('.point'),
	WELCOME_ACTUAL_SLIDE_EL = document.querySelector('.slider__count__actual'),
	NEXT_SLIDE_BTN_EL = document.querySelector('.arrow-right'),
	PREV_SLIDE_BTN_EL = document.querySelector('.arrow-left'),
	WELCOME_NUMBER_OF_SLIDES = WELCOME_SLIDES_ELMS.length;
let slideNumber = 0;

function slideForward() {
	WELCOME_SLIDES_ELMS.forEach(slide => {
		slide.classList.remove('prev-slide');
		slide.classList.add('next-slide');
	})
	WELCOME_SLIDES_ELMS[slideNumber].classList.add('prev-slide');

	slideNumber++;

	WELCOME_SLIDES_ELMS.forEach(slide => {
		slide.classList.remove('active-slide');
	});

	if (slideNumber > 4) {
		slideNumber = 0;
		BULLETS_ELEMS[slideNumber].classList.add('point-selected');
		BULLETS_ELEMS[WELCOME_NUMBER_OF_SLIDES - 1].classList.remove('point-selected');
	} else {
		BULLETS_ELEMS[slideNumber - 1].classList.remove('point-selected');
		BULLETS_ELEMS[slideNumber].classList.add('point-selected');
	};

	updateTextNumber();
	WELCOME_SLIDES_ELMS[slideNumber].classList.add('active-slide');
	WELCOME_SLIDES_ELMS[slideNumber].classList.add('next-slide');
}

function slideBack() {
	WELCOME_SLIDES_ELMS.forEach(slide => {
		slide.classList.add('prev-slide');
		slide.classList.remove('next-slide');
	});

	WELCOME_SLIDES_ELMS[slideNumber].classList.add('next-slide');
	WELCOME_SLIDES_ELMS[slideNumber].classList.remove('prev-slide');

	slideNumber--;

	WELCOME_SLIDES_ELMS.forEach(slide => {
		slide.classList.remove('active-slide');
	});

	if (slideNumber < 0) {
		slideNumber = 4;
		BULLETS_ELEMS[slideNumber].classList.add('point-selected');
		BULLETS_ELEMS[0].classList.remove('point-selected');
	} else {
		BULLETS_ELEMS[slideNumber + 1].classList.remove('point-selected');
		BULLETS_ELEMS[slideNumber].classList.add('point-selected');
	}
	updateTextNumber()
	WELCOME_SLIDES_ELMS[slideNumber].classList.add('active-slide');
	WELCOME_SLIDES_ELMS[slideNumber].classList.add('prev-slide');
}

function updateTextNumber() {
	WELCOME_ACTUAL_SLIDE_EL.innerHTML = `0${slideNumber + 1}`;
}

BULLETS_ELEMS.forEach((bullet, index) => bullet.addEventListener('click', () => {
	WELCOME_SLIDES_ELMS.forEach(slide => {
		slide.classList.remove('active-slide');
	});
	BULLETS_ELEMS.forEach(bullet => {
		bullet.classList.remove('point-selected');
	})
	WELCOME_SLIDES_ELMS[index].classList.add('active-slide');
	BULLETS_ELEMS[index].classList.add('point-selected');
	slideNumber = index;
	updateTextNumber();
}));

NEXT_SLIDE_BTN_EL.addEventListener('click', slideForward);
PREV_SLIDE_BTN_EL.addEventListener('click', slideBack);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!EXPLORE SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!EXPLORE SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!EXPLORE SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const EXPLORE_COMPARE_SLIDER_EL = document.querySelector('.explore-slider'),
	COMPARE_IMAGE = document.querySelector('.img-compare-after');

function compareImages() {
	let clicked = 0,
		width = COMPARE_IMAGE.offsetWidth,
		heigh = COMPARE_IMAGE.offsetHeight;
	COMPARE_IMAGE.style.width = (width / 2) + 'px';
	COMPARE_IMAGE.style.heigh = (heigh);
	EXPLORE_COMPARE_SLIDER_EL.style.left = (width / 2) - (EXPLORE_COMPARE_SLIDER_EL.offsetWidth / 2) + 'px';
	EXPLORE_COMPARE_SLIDER_EL.addEventListener('mousedown', slideReady);
	window.addEventListener('mouseup', slideFinish);
	EXPLORE_COMPARE_SLIDER_EL.addEventListener('touchstart', slideReady);
	window.addEventListener('touchend', slideFinish);


	function getCursorPosition(e) {
		let imgPosition,
			cursorPosition = 0;
		e = e || window.event;
		imgPosition = COMPARE_IMAGE.getBoundingClientRect();
		cursorPosition = window.event.pageX - imgPosition.left;
		cursorPosition = cursorPosition - window.pageXOffset;
		return cursorPosition;
	}

	function slideReady(e) {
		e.preventDefault();
		clicked = 1;
		window.addEventListener('mousemove', slideMove);
		window.addEventListener('touchmove', slideMove);
	}

	function slideFinish() {
		clicked = 0;
	}

	function slideMove(e) {
		let position;
		if (clicked == 0) {
			return false;
		}
		position = getCursorPosition(e);

		if (position < 0) { position = 0; };
		if (position > width) { position = width };

		slide(position);
	}

	function slide(cursorPosition) {
		COMPARE_IMAGE.style.width = cursorPosition + 'px';
		EXPLORE_COMPARE_SLIDER_EL.style.left = COMPARE_IMAGE.offsetWidth - (EXPLORE_COMPARE_SLIDER_EL.width / 2) + 'px';
	}
}

compareImages();

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!VIDEO PLAYER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!VIDEO PLAYER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!VIDEO PLAYER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const VIDEO_EL = document.querySelector('.viewer'),
	PLAY_BTN_EL = document.querySelector('.toggle'),
	BIG_PLAY_IMG_EL = document.querySelector('.toggle__img'),
	BIG_PLAY_CONTAINER_EL = document.querySelector('.big-play__background'),
	FULLSCREEN_BTN_EL = document.querySelector('.fullscreen'),
	FULLSCREEN_IMG_EL = document.querySelector('.fullscreenImg'),
	PLAYER_CONTAINER_EL = document.querySelector('.player'),
	VOLUME_BTN_EL = document.querySelector('.mute-btn'),
	VOLUME_IMG_EL = document.querySelector('.volume-img'),
	PROGRESS_BAR_EL = document.querySelector('.progress'),
	VOLUME_BAR_EL = document.querySelector('.volume');
let isFull = false;


function togglePlay() {
	if (VIDEO_EL.paused) {
		VIDEO_EL.play();
		BIG_PLAY_CONTAINER_EL.style.visibility = 'hidden';
		BIG_PLAY_IMG_EL.src = './assets/svg/video-pause.svg';

	} else {
		VIDEO_EL.pause();
		BIG_PLAY_CONTAINER_EL.style.visibility = '';
		BIG_PLAY_IMG_EL.src = './assets/svg/video-play.svg';
	}
}

function isEnd() {
	BIG_PLAY_CONTAINER_EL.style.visibility = '';
	BIG_PLAY_IMG_EL.src = 'assets/svg/video-play.svg';
}

function fullSize() {
	if (!isFull) {
		PLAYER_CONTAINER_EL.requestFullscreen();
		isFull = true;
		FULLSCREEN_IMG_EL.src = './assets/svg/video-fullscreen_exit.svg';
	} else {
		document.exitFullscreen();
		isFull = false;
		FULLSCREEN_IMG_EL.src = './assets/svg/video-fullscreen.svg';
	}
}

sessionStorage.setItem('volume', `${VOLUME_BAR_EL.value}`);

function isMute() {
	if (VOLUME_BAR_EL.value != 0) {
		VIDEO_EL.muted = true;
		VOLUME_BAR_EL.value = 0;
		VOLUME_IMG_EL.src = './assets/svg/video-mute.svg';
		updateVolume();
	} else {
		VIDEO_EL.muted = false;
		VOLUME_BAR_EL.value = sessionStorage.getItem('volume');
		VOLUME_IMG_EL.src = './assets/svg/video-volume.svg';
		updateVolume();
	}
}

function updateProgress() {
	const percent = (VIDEO_EL.currentTime / VIDEO_EL.duration) * 100;
	PROGRESS_BAR_EL.style.background = 'linear-gradient(to right, #710707 0%, #710707 ' + percent + '%, #C4C4C4 ' + percent + '%, #C4C4C4 100%)';
	PROGRESS_BAR_EL.value = percent;
}


function grabTime() {
	const percent = PROGRESS_BAR_EL.value;
	PROGRESS_BAR_EL.style.background = 'linear-gradient(to right, #710707 0%, #710707 ' + percent + '%, #C4C4C4 ' + percent + '%, #C4C4C4 100%)';
	VIDEO_EL.currentTime = (VIDEO_EL.duration / PROGRESS_BAR_EL.max) * PROGRESS_BAR_EL.value;
}

function updateVolume() {
	VOLUME_BAR_EL.style.background = 'linear-gradient(to right, #710707 0%, #710707 ' + VOLUME_BAR_EL.value + '%, #C4C4C4 ' + VOLUME_BAR_EL.value + '%, #C4C4C4 100%)'
	VIDEO_EL.volume = VOLUME_BAR_EL.value / 100;
	if (VOLUME_BAR_EL.value == 0) {
		VOLUME_IMG_EL.src = './assets/svg/video-mute.svg';
	} else {
		VOLUME_IMG_EL.src = './assets/svg/video-volume.svg';
	}
}

function hotKey(e) {
	// switch (e.code) {
	// 	case 'KeyK':
	// 		togglePlay();
	// 		break;
	// 	case 'KeyM':
	// 		isMute();
	// 		break;
	// 	case 'KeyF':
	// 		fullSize();
	// 		break;
	// 	case 'KeyJ':
	// 		VIDEO_EL.currentTime -= 5;
	// 		break;
	// 	case 'KeyL':
	// 		VIDEO_EL.currentTime += 5;
	// 		break;
	// 	case 'Comma':
	// 		if (VIDEO_EL.playbackRate != 0.25) {
	// 			VIDEO_EL.playbackRate -= 0.25;
	// 		}
	// 		break;
	// 	case 'Period':
	// 		if (VIDEO_EL.playbackRate <= 2) {
	// 			VIDEO_EL.playbackRate += 0.25;
	// 		}
	// 		break;
	// 	case 'Space':
	// 		e.preventDefault();
	// 		togglePlay();
	// 		break;
	// }
}

VIDEO_EL.addEventListener('timeupdate', updateProgress);
PROGRESS_BAR_EL.addEventListener('input', grabTime);
VIDEO_EL.addEventListener('ended', isEnd);
VIDEO_EL.addEventListener('click', togglePlay);
PLAY_BTN_EL.addEventListener('click', togglePlay);
BIG_PLAY_CONTAINER_EL.addEventListener('click', togglePlay);
FULLSCREEN_BTN_EL.addEventListener('click', fullSize);
VOLUME_BTN_EL.addEventListener('click', isMute)
VOLUME_BAR_EL.addEventListener('input', updateVolume);
window.addEventListener('keypress', hotKey);


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!VIDEO PLAYLIST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!VIDEO PLAYLIST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!VIDEO PLAYLIST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Swiper.use([Navigation, Pagination]);

new Swiper(".swiper", {
	navigation: {
		prevEl: '.video-slider__arrow-left',
		nextEl: '.video-slider__arrow-right'
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	simulateTouch: false,
	loop: true,
	slideToClickedSlide: true,
	breakpoints: {
		769: {
			slidesPerView: 3,
			simulateTouch: false,
		},
		320: {
			slidesPerView: 2,
			simulateTouch: false,
		}
	},
	spaceBetween: 40,
})

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!GALERY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!GALERY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!GALERY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const PICTURES_CONTAINER_EL = document.querySelector('.picture-inner-container');

let images = [];

for (let i = 1;i <= 15;i++) {
	images.push(`./assets/img/gallery/galery${i}.jpeg`)
}

function shuffle(array) {
	for (let i = array.length - 1;i > 0;i--) {
		let j = Math.floor(Math.random() * (i + 1));

		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

let randomImages = shuffle(images);

function createImg(name, index) {
	const img = document.createElement('img');
	img.classList.add('gallery-img');
	img.src = name;
	img.alt = `galery${index}`;
	PICTURES_CONTAINER_EL.append(img);
	if (index == 0) {
		img.style.marginTop = '50px';
	}
	if (window.screen.width > 768 && index == 10) {
		img.style.marginTop = '50px';
	}
}

function addImages() {
	randomImages.map((item, index) => createImg(item, index));
}

addImages();

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!GALERY ANIMATION ON SCROLL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const IMAGE_ELEMS = document.querySelectorAll(".gallery-img");

if (IMAGE_ELEMS.length > 0) {
	window.addEventListener('scroll', checkSlide);
}

function checkSlide() {
	IMAGE_ELEMS.forEach(image => {
		const imageHeight = image.offsetHeight,
			imageOffset = offset(image).top,
			animStart = 4;

		let animPoint = window.innerHeight - imageHeight / animStart;

		if (imageHeight > window.innerHeight) {
			animPoint = window.innerHeight - window.innerHeight / animStart;
		}

		if ((window.scrollY > imageOffset - animPoint) && window.scrollY < (imageOffset + imageHeight)) {
			image.classList.add('slide-active');
		}
	});
}

function offset(element) {
	const rect = element.getBoundingClientRect(),
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop };
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TICKETS SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TICKETS SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TICKETS SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const ticketsSlides = document.querySelectorAll('.tickets-slide');
const ticketsSlider = document.querySelector('.tickets-slider');
let playSlider;
let ticketsNumberOfSlides = ticketsSlides.length;
let ticketsSlideNumber = 0;

function repeater() {
	playSlider = setInterval(function () {
		ticketsSlides.forEach((slide) => {
			slide.classList.remove("tickets-active");
		});

		ticketsSlideNumber++;

		if (ticketsSlideNumber > (ticketsNumberOfSlides - 1)) {
			ticketsSlideNumber = 0;
		}
		ticketsSlides[ticketsSlideNumber].classList.add("tickets-active");
	},
		2000)
}

//stop autoplay on mouseover

ticketsSlider.addEventListener("mouseover", () => {
	repeater();
});

//start autoplay after mouseout

ticketsSlider.addEventListener("mouseout", () => {
	clearInterval(playSlider);
})

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!BOOKING FORM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!BOOKING FORM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!BOOKING FORM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!OPEN FORM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const openBtn = document.querySelector('.submit-btn');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.booking_close');
const form = document.querySelector('.booking');
const firstForm = document.querySelector('.tickets_select-form')

function openForm() {
	overlay.style.visibility = 'visible';
	form.style.visibility = 'visible';
}

function closeForm(e) {
	// e.stopPropagation()
	overlay.style.visibility = 'hidden';
	form.style.visibility = 'hidden';
}


openBtn.addEventListener('click', openForm);
// overlay.addEventListener('click', closeForm);
closeBtn.addEventListener('click', closeForm);

function mySubmitFunction(e) {
	e.preventDefault();
}

firstForm.addEventListener('submit', mySubmitFunction);



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!HOME PAGE FORM DATA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

window.onload = function () {
	ticketTypes[Number(sessionStorage.getItem('typeIndex'))].checked = true;
	price = Number(sessionStorage.getItem('price'));
	seniorNumber.value = Number(sessionStorage.getItem('senior'));
	basicNumber.value = Number(sessionStorage.getItem('basic'));
	totalPrice.innerHTML = Number(sessionStorage.getItem('totalPrice'));
};

const ticketTypes = document.querySelectorAll('.radio-btn');
const basicNumber = document.querySelector('.basic-number');
const seniorNumber = document.querySelector('.senior-number');
const totalPrice = document.querySelector('.amount-box_sum');
const minusBasic = document.querySelector('.basic-minus');
const plusBasic = document.querySelector('.basic-plus');
const plusSenior = document.querySelector('.senior-plus');
const minusSenior = document.querySelector('.senior-minus');

let price;

function selectPrice() {
	price = this.getAttribute('price');
	sessionStorage.setItem('price', price);
	ticketTypes.forEach((type, index) => {
		if (type.checked) {
			sessionStorage.setItem('typeIndex', index);
		}
	});
	countTotalPrice();
}

function countTotalPrice() {
	ticketTypes.forEach(type => {
		if (type.checked) {
			totalPrice.innerHTML = (Number(price) * Number(basicNumber.value)) + (Number(price) / 2 * Number(seniorNumber.value));
			sessionStorage.setItem('totalPrice', Number(totalPrice.textContent));
			// console.log(typeof totalPrice.textContent);
			sessionStorage.setItem('basic', Number(basicNumber.value));
			sessionStorage.setItem('senior', Number(seniorNumber.value));
		}
	});
}

ticketTypes.forEach(type => type.addEventListener('input', selectPrice));
plusSenior.addEventListener('click', countTotalPrice);
minusSenior.addEventListener('click', countTotalPrice);
minusBasic.addEventListener('click', countTotalPrice);
plusBasic.addEventListener('click', countTotalPrice);


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!SYNCRONIZE HOME PAGE FORM DATA AND BOOKING FORM!!!!!!!!!!!!!!!!!!!!!!!



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!MAP MAP MAP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!MAP MAP MAP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!MAP MAP MAP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


mapboxgl.accessToken = 'pk.eyJ1IjoidGVjbGF2LW12IiwiYSI6ImNrdWs2cWg4eDFhOWYybm5tdHc0OXh3eTEifQ.qj_U4FGJrkYnVz3BpPul7w';
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/light-v10',
	center: [2.3364, 48.86091],
	zoom: 16
});

const marker1 = new mapboxgl.Marker({ color: 'grey' })
	.setLngLat([2.3333, 48.8602])
	.addTo(map);

const marker2 = new mapboxgl.Marker({ color: 'grey' })
	.setLngLat([2.3397, 48.8607])
	.addTo(map);

const marker3 = new mapboxgl.Marker({ color: 'black' })
	.setLngLat([2.3364, 48.86091])
	.addTo(map);

const marker4 = new mapboxgl.Marker({ color: 'grey' })
	.setLngLat([2.3330, 48.8619])
	.addTo(map);

const marker5 = new mapboxgl.Marker({ color: 'grey' })
	.setLngLat([2.3365, 48.8625])
	.addTo(map);

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');
