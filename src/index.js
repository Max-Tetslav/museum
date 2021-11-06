import './style.scss';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import Swiper, { Navigation, Pagination } from 'swiper';



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!BURGER MENU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!BURGER MENU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!BURGER MENU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const menuBtn = document.querySelector('.menu_btn');
const welcomeInfo = document.querySelector('.welcome_info');
const menu = document.querySelector('.menu-1024-container');
const welcomeImage = document.querySelector('.welcome-bg-img');
const welcomeSlider = document.querySelector('.slider');
const menu768 = document.querySelector('.pictures-media-container');
const menuLink = document.querySelectorAll('.menu_item-1024');

let isOpen = false;

function toOpen() {
	if (window.screen.width <= 420) {
		menu768.style.width = '310px';
		menu.style.width = '297px';
		welcomeInfo.classList.toggle('hide');
		welcomeSlider.style.display = 'none';
		welcomeImage.classList.toggle('hide');
	} else if (window.screen.width <= 768) {
		menu.style.width = '297px';
		welcomeInfo.classList.toggle('hide');
		welcomeImage.classList.toggle('hide');
		welcomeSlider.style.display = 'none';
		menu768.style.width = '658px';
	} else if (window.screen.width <= 1024 && window.screen.width > 768) {
		menu.style.width = '297px';
		welcomeInfo.classList.toggle('hide');
	}
	isOpen = !isOpen;
	menuLink.forEach(item => item.addEventListener('click', openMenu));
}

function toClose() {
	if (window.screen.width <= 420) {
		menu768.style.width = '0px';
		menu.style.width = '0px';
		setTimeout(() => {
			welcomeInfo.classList.toggle('hide');
			welcomeSlider.style.display = 'flex';
			welcomeImage.classList.toggle('hide');
		}, 500);
	} else if (window.screen.width <= 768) {
		menu768.style.width = '0px';
		menu.style.width = '0px';
		setTimeout(() => {
			welcomeInfo.classList.toggle('hide');
			welcomeSlider.style.display = 'flex';
			welcomeImage.classList.toggle('hide');
		}, 500);
	} else if (window.screen.width <= 1024 && window.screen.width > 768) {
		menu.style.width = '0px';
		setTimeout(() => welcomeInfo.classList.toggle('hide'), 500);
	}
	isOpen = !isOpen;
}

function openMenu() {
	menuBtn.classList.toggle('menu_open');

	if (isOpen) {
		toClose();
	} else {
		toOpen();

	}

}
menuBtn.addEventListener('click', openMenu);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!WELCOME SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!WELCOME SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!WELCOME SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const slides = document.querySelectorAll('.slide');
const points = document.querySelectorAll('.point');
const textNumber = document.querySelector('.slider__count__actual');
const nextSlide = document.querySelector('.arrow-right');
const prevSlide = document.querySelector('.arrow-left');
const numbersOfSlides = slides.length;
let slideNumber = 0;
let pointNumber = slideNumber;
let currentDirection = null;

// prevSlide.addEventListener('mouseover', () => {
//     if (slideNumber == 0) {
//         slides[slideNumber].style.clipPath = 'inset(0 0 0 100%)';
//     }
// })

function slideForward() {
	currentDirection = true;
	console.log(currentDirection);
	slides.forEach(slide => {
		slide.classList.remove('prev-slide');
		slide.classList.add('next-slide');
	})
	slides[slideNumber].classList.add('prev-slide');

	slideNumber++;

	slides.forEach(slide => {
		// slide.style.clipPath = 'inset(0 100% 0 0)';
		slide.classList.remove('active-slide');
	});

	if (slideNumber > 4) {
		slideNumber = 0;
		points[slideNumber].classList.add('point-selected');
		points[numbersOfSlides - 1].classList.remove('point-selected');
	} else {
		points[slideNumber - 1].classList.remove('point-selected');
		points[slideNumber].classList.add('point-selected');
	};


	updateTextNumber();
	slides[slideNumber].classList.add('active-slide');
	slides[slideNumber].classList.add('next-slide');
}

function slideBack() {
	// if (slideNumber) {
	// 	slides[slides.length - 1].classList.add('prev-slide');
	// }
	currentDirection = false;
	console.log(currentDirection);
	slides.forEach((slide, index) => {
		slide.classList.add('prev-slide');
		slide.classList.remove('next-slide');
	});



	slides[slideNumber].classList.add('next-slide');
	slides[slideNumber].classList.remove('prev-slide');

	slideNumber--;
	slides.forEach(slide => {
		slide.classList.remove('active-slide');
	});

	if (slideNumber < 0) {
		slideNumber = 4;
		points[slideNumber].classList.add('point-selected');
		points[0].classList.remove('point-selected');
	} else {
		points[slideNumber + 1].classList.remove('point-selected');
		points[slideNumber].classList.add('point-selected');
	}
	updateTextNumber()
	slides[slideNumber].classList.add('active-slide');
	slides[slideNumber].classList.add('prev-slide');
}

function updateTextNumber() {
	textNumber.innerHTML = `0${slideNumber + 1}`;
}


points.forEach((point, index) => point.addEventListener('click', () => {
	slides.forEach(slide => {
		slide.classList.remove('active-slide');
	});
	points.forEach(point => {
		point.classList.remove('point-selected');
	})
	slides[index].classList.add('active-slide');
	points[index].classList.add('point-selected');
	slideNumber = index;
	updateTextNumber();
}));

nextSlide.addEventListener('click', slideForward);
prevSlide.addEventListener('click', slideBack);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!EXPLORE SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!EXPLORE SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!EXPLORE SLIDER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const exploreSlider = document.querySelector('.explore-slider');
const afterImage = document.querySelector('.img-compare-after');
const beforeImage = document.querySelector('.img-compare-before');

function compareImages() {
	let clicked = 0;
	let width = afterImage.offsetWidth;
	let heigh = afterImage.offsetHeight;
	afterImage.style.width = (width / 2) + 'px';
	afterImage.style.heigh = (heigh);
	exploreSlider.style.left = (width / 2) - (exploreSlider.offsetWidth / 2) + 'px';
	exploreSlider.addEventListener('mousedown', slideReady);
	window.addEventListener('mouseup', slideFinish);
	exploreSlider.addEventListener('touchstart', slideReady);
	window.addEventListener('touchend', slideFinish);

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

	function getCursorPosition(e) {
		let imgPosition;
		let cursorPosition = 0;
		e = e || window.event;
		imgPosition = afterImage.getBoundingClientRect();
		cursorPosition = window.event.pageX - imgPosition.left;
		cursorPosition = cursorPosition - window.pageXOffset;
		return cursorPosition;
	}

	function slide(cursorPosition) {
		afterImage.style.width = cursorPosition + 'px';
		exploreSlider.style.left = afterImage.offsetWidth - (exploreSlider.width / 2) + 'px';
	}
}

compareImages();

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!VIDEO PLAYER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!VIDEO PLAYER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!VIDEO PLAYER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const video = document.querySelector('.viewer'),
	playBtn = document.querySelector('.toggle'),
	playBtn_img = document.querySelector('.toggle__img'),
	playBtn_big = document.querySelector('.big-play__background'),
	fullScreen = document.querySelector('.fullscreen'),
	fullscreenImg = document.querySelector('.fullscreenImg'),
	player = document.querySelector('.player'),
	mute = document.querySelector('.mute-btn'),
	volumeImg = document.querySelector('.volume-img'),
	progressBar = document.querySelector('.progress'),
	volumeBar = document.querySelector('.volume'),
	nextBtn = document.querySelector('.nextBtn'),
	prevBtn = document.querySelector('.prevBtn');
let notFull = true,
	notMute = true,
	videoNumber = 1;


function togglePlay() {
	if (video.paused) {
		video.play();
		playBtn_big.style.visibility = 'hidden';
		playBtn_img.src = './assets/svg/video-pause.svg';

	} else {
		video.pause();
		playBtn_big.style.visibility = '';
		playBtn_img.src = './assets/svg/video-play.svg';
	}
}

function isEnd() {
	playBtn_big.style.visibility = '';
	playBtn_img.src = 'assets/svg/video-play.svg';
}

function fullSize() {
	if (notFull) {
		player.requestFullscreen();
		notFull = false;
		fullscreenImg.src = './assets/svg/video-fullscreen_exit.svg';
	} else {
		document.exitFullscreen();
		notFull = true;
		fullscreenImg.src = './assets/svg/video-fullscreen.svg';
	}
}

// sessionStorage.setItem('volume', `${volumeBar.value}`);

function isMute() {
	if (volumeBar.value != 0) {
		video.muted = true;
		volumeBar.value = 0;
		volumeImg.src = './assets/svg/video-mute.svg';
		updateVolume();
	} else {
		video.muted = false;
		volumeBar.value = sessionStorage.getItem('volume');
		volumeImg.src = './assets/svg/video-volume.svg';
		updateVolume();
	}
}

function updateProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.background = 'linear-gradient(to right, #710707 0%, #710707 ' + percent + '%, #C4C4C4 ' + percent + '%, #C4C4C4 100%)';
	progressBar.value = percent;
}


function grabTime() {
	const percent = progressBar.value;
	progressBar.style.background = 'linear-gradient(to right, #710707 0%, #710707 ' + percent + '%, #C4C4C4 ' + percent + '%, #C4C4C4 100%)';
	video.currentTime = (video.duration / progressBar.max) * progressBar.value;
}

function updateVolume() {
	volumeBar.style.background = 'linear-gradient(to right, #710707 0%, #710707 ' + volumeBar.value + '%, #C4C4C4 ' + volumeBar.value + '%, #C4C4C4 100%)'
	video.volume = volumeBar.value / 100;
	if (volumeBar.value == 0) {
		volumeImg.src = './assets/svg/video-mute.svg';
	} else {
		volumeImg.src = './assets/svg/video-volume.svg';
	}
}

function hotKey(e) {
	switch (e.code) {
		case 'KeyK':
			togglePlay();
			break;
		case 'KeyM':
			isMute();
			break;
		case 'KeyF':
			fullSize();
			break;
		case 'KeyJ':
			video.currentTime -= 5;
			break;
		case 'KeyL':
			video.currentTime += 5;
			break;
		case 'Comma':
			if (video.playbackRate != 0.25) {
				video.playbackRate -= 0.25;
			}
			break;
		case 'Period':
			if (video.playbackRate <= 2) {
				video.playbackRate += 0.25;
			}
			break;
		case 'Space':
			togglePlay();
			break;
	}
}

// function stopSpaceScroll() {
//     document.addEventListener(('keypress', (e) => {
//         if (e.code == 'Space') {
//             e.preventDefault();
//             return false;
//         };
//     }))
// }

// function sliderNext() {
//     if (video.played) {
//         togglePlay();
//         progressBar.style.background = 'linear-gradient(to right,  #C4C4C4 0%, #C4C4C4 100%)';
//     }

//     videoNumber++;

//     if (videoNumber > 5) {
//         videoNumber = 1;
//     }

//     video.src = `assets/video/Sea` + videoNumber + `.mp4`;
// }

// function sliderPrev() {
//     if (video.played) {
//         togglePlay();
//         progressBar.style.background = 'linear-gradient(to right,  #C4C4C4 0%, #C4C4C4 100%)';
//     }

//     videoNumber--;

//     if (videoNumber < 1) {
//         videoNumber = 5;
//     }

//     video.src = `assets/video/Sea` + videoNumber + `.mp4`;
// }

// video.addEventListener('timeupdate', updateProgress);
// progressBar.addEventListener('input', grabTime);
// video.addEventListener('ended', isEnd);
// video.addEventListener('click', togglePlay);
// playBtn.addEventListener('click', togglePlay);
// playBtn_big.addEventListener('click', togglePlay);
// fullScreen.addEventListener('click', fullSize);
// mute.addEventListener('click', isMute)
// volumeBar.addEventListener('input', updateVolume);
// window.addEventListener('keypress', hotKey);
// prevBtn.addEventListener('click', sliderPrev);
// nextBtn.addEventListener('click', sliderNext);

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

const pictureContainer = document.querySelector('.picture-inner-container');

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
	// img.classList.add('slide-down');
	// img.classList.add('slide-in');
	img.src = name;
	img.alt = `galery${index}`;
	pictureContainer.append(img);
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

// function debounce(func, wait = 20, immediate = true) {
//     let timeout;
//     return function() {
//         let context = this,
//             args = arguments;

//         let later = function() {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         };
//         let callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//     };
// }

const sliderImages = document.querySelectorAll(".gallery-img");

if (sliderImages.length > 0) {
	window.addEventListener('scroll', checkSlide);
}

function checkSlide() {
	sliderImages.forEach(image => {
		const imageHeight = image.offsetHeight;
		const imageOffset = offset(image).top;

		const animStart = 4;

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
	const rect = element.getBoundingClientRect();
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop };
}

// checkSlide();

// const halfImg = (window.scrollY + window.innerHeight) - image.height / 2;
// console.log(halfImg);



// const imageBotton = (image.offsetTop + image.height);
// console.log(image.offsetTop);
// const isHalfShown = image.offsetTop < halfImg;
// // console.log(image.offsetTop);

// // console.log(isHalfShown);
// const isNotScrolledPast = window.scrollY < imageBotton;
// // console.log(isNotScrolledPast);


// if (isHalfShown && isNotScrolledPast) {
//     image.classList.add('active');
// } else {
//     image.classList.remove('active');
// }


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

function closeForm() {
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
	seniorNumber.value = Number(sessionStorage.getItem('senior'));
	basicNumber.value = Number(sessionStorage.getItem('basic'));
	// totalPrice.innerHTML = Number(sessionStorage.getItem('totalPrice'));
	totalPrice.innerHTML = (Number(sessionStorage.getItem('price')) * Number(basicNumber.value)) + ((Number(sessionStorage.getItem('price')) / 2) * Number(seniorNumber.value));
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
let isTypeChecked;

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
			sessionStorage.setItem('totalPrice', totalPrice.textContent);
			sessionStorage.setItem('basic', basicNumber.value);
			sessionStorage.setItem('senior', seniorNumber.value);
		}
	});
}

plusSenior.addEventListener('click', countTotalPrice);
minusSenior.addEventListener('click', countTotalPrice);
minusBasic.addEventListener('click', countTotalPrice);
plusBasic.addEventListener('click', countTotalPrice);

ticketTypes.forEach(type => type.addEventListener('input', selectPrice));

// function countTotalPrice() {
//     ticketTypes.forEach(type => type.checked ? isTypeChecked = true : 0);

//     if (isTypeChecked) {
//         totalPrice.innerHTML = (Number(price) * Number(basicNumber.value)) + (Number(price) / 2 * Number(seniorNumber.value));
//         sessionStorage.setItem('totalPrice', totalPrice.textContent);
//         sessionStorage.setItem('basic', basicNumber.value);
//         sessionStorage.setItem('senior', seniorNumber.value);
//     }
// }

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
