window.addEventListener('DOMContentLoaded', () => {
//scroll-to-element

/*
   Функция плавного скролла до элемента,  работает как вверх, так и вниз
   @param element - ссылка на элемент
   @param duration - продолжительность скролла в мс
*/
const scrollToElement = (element, duration) => {
	let Id; //id анимации
	let start = performance.now(); //время старта
	let topPosition = element.getBoundingClientRect().top; //текущая позиция элемента
	let currentDocumentPosition = document.documentElement.scrollTop; //текущая прокрутка документа
	let progress = 0; //прогресс анимации
	let animateScroll = () => {
		let now = performance.now(); //текущее время
		progress = (now - start) / duration; //вычисляем прогресс
		if (progress <= 1) {
			document.documentElement.scrollTop = currentDocumentPosition + topPosition * progress;
			Id = requestAnimationFrame(animateScroll);
		} else {
			document.documentElement.scrollTop = currentDocumentPosition + topPosition;
			cancelAnimationFrame(Id);
		}
	};

	animateScroll();
};

const menuHeader = document.querySelector('.header__nav'),
	  menuFooter = document.querySelector('.footer__nav'),
	  itemHeader = document.querySelectorAll('.header__item'),
	  itemFooter = document.querySelectorAll('.footer__item');

const menuHeaderScroll = () => {
	menuHeader.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.closest('.header__item');
		if (target) {
			const targetBlockId = target.querySelector('a').getAttribute('href').slice(1);
			const targetBlock = document.getElementById(targetBlockId);
			scrollToElement(targetBlock, 300);
			headerMenu.classList.toggle('header__navigation--open');
		mobileBurger.classList.toggle('header__burger-mobile--cross');

//navigation-menu-active
			itemHeader.forEach((item, i) => {
				if (item === target) {
					itemHeader[i].classList.add('header__item--active');
					itemFooter[i].classList.add('footer__item--active');
				} else {
					itemHeader[i].classList.remove('header__item--active');
					itemFooter[i].classList.remove('footer__item--active');
				}
			});
//navigation-menu-active

		}
	});
};

const menuFooterScroll = () => {
	menuFooter.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.closest('.footer__item');
		if (target) {
			const targetBlockId = target.querySelector('a').getAttribute('href').slice(1);
			const targetBlock = document.getElementById(targetBlockId);
			scrollToElement(targetBlock, 300);

//navigation-menu-active
			itemFooter.forEach((item, i) => {
				if (item === target) {
					itemHeader[i].classList.add('header__item--active');
					itemFooter[i].classList.add('footer__item--active');
				} else {
					itemHeader[i].classList.remove('header__item--active');
					itemFooter[i].classList.remove('footer__item--active');
				}
			});
//navigation-menu-active

		}
	});
};

menuHeaderScroll();
menuFooterScroll();

//projects-carts-change

const projectsWrapper = document.querySelector('.projects__wrapper');

projectsWrapper.addEventListener('click', ({ target }) => {
	const cart = target.closest('.cart');

	if (!cart || !target.closest('#demo')) return;
    	document.querySelector('.cart--big').classList.remove('cart--big');
		cart.classList.add('cart--big');
});

//projects-carts-scroll

const cartBtns = document.querySelectorAll('#demo'),
	  innerWidth = window.innerWidth;

const projectsScroll = () => {
	cartBtns.forEach((item, i)=> {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			const target = e.target.closest('.cart__button-link');
			if (target && innerWidth >= 768) {
				const targetBlockId = target.querySelector('a').getAttribute('href').slice(1);
				const targetBlock = document.getElementById(targetBlockId);
				scrollToElement(targetBlock, 300);
			} else {
				const targetBlockId = target.querySelector('a').getAttribute('href').slice(1);
				const targetBlock = document.getElementById(targetBlockId);
			}
		});
	});
};

projectsScroll();

//form

const ajaxSend = async (formData) => { // создаем функцию отправки формы
	const fetchResp = await fetch("telegram.php", { // указываем обработчик формы
		method: "POST", // метод, которым отправляем форму
		body: formData, // что будет внутри формы - содержимое input
	});
	if (!fetchResp.ok) { // если ошибка, то ...
		throw new Error('Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}');
	}
	return await fetchResp.text();// если все хорошо, возвращаем ответ сервера
};

const forms = document.querySelectorAll('form'); // находим все теги form
forms.forEach((form) => { // для каждой формы ...
	form.addEventListener("submit", function (e) { // отслеживаем событие отправки
		e.preventDefault(); // отменить стандартную отправку формы 
		const formData = new FormData(this); // собираем все данные из формы

		ajaxSend(formData) // передаем данные из формы в обработчик
		.then((response) => { // если все успешно, то ...
			this.innerHtml = "Спасибо,<br> заявку получили"; // окно благодарности
			form.reset(); // очищаем поля формы
		})
		.catch((err) => console.error(err)); // если ошибка, выводим ее в консоль
	});
});

//mobile-burger-button

const mobileBurger = document.querySelector('.header__burger-mobile'),
	  headerMenu = document.querySelector('.header__navigation');

	mobileBurger.addEventListener('click', () => {
		headerMenu.classList.toggle('header__navigation--open');
		mobileBurger.classList.toggle('header__burger-mobile--cross');
	});
});