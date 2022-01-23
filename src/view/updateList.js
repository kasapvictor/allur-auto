import getLimitCars from "../helpers/getLimitCars";

/**
 * Прячем все карточки машин
 * кроме тех у которых свойство car.hide: 'false'
 * Выводит обновленный список машин
 * @param config
 * @param cars
 * @param sortBy
 */
function updateList ( config, cars = null, sortBy = 'default' ) {
	const items = config.items;
	const wrpList = config.wrp.querySelector ( '.wrp-result-list' );

	/* очищаем контейнер */
	wrpList.innerHTML = '';

	let count = 0;
	let sortList = [];

	/**
	 * Если массив cars !== null
	 * sortList = cars массив машин отобранных по атрибутам
	 */
	if ( !cars ) {
		/**
		 * перебираем все элементы
		 * если свойство el.hide: "0"
		 * то добавляем текущий элемент в новый массив sortList
		 */
		for ( let i in items ) {
			for ( let j in items[i] ) {
				items[i][j].forEach ( el => {
					if ( el.hide !== "1" ) {
						sortList.push ( el );
						count++;
					}
				} );
			}
		}
	} else {
		sortList = cars;
		count = sortList.length;
	}

	/**
	 * Сортируем массив по порядку из атрибута
	 * от меньшей к большей
	 */
	if ( sortBy === 'default' ) {
		sortList.sort ( ( a, b ) => {
			return a.order - b.order;
		} );

		sortList.sort( (a, b) => {
			return !a.isOnline && b.isOnline  ? 0 : -1;
		} );

		sortList.sort( (a, b) => {
			return a.isOnline === b.isOnline  ? a.order - b.order  : 0;
		} );
	}

	console.log('017');

	/**
	 * Сортируем массив по цене
	 * от меньшей к большей
	 */
	if ( sortBy === 'asc' ) {
		sortList.sort ( ( a, b ) => {
			return b.cost - a.cost;
		} );

		sortList.sort( (a, b) => {
			return !a.isOnline && b.isOnline ? 0 : -1;
		} );
	}

	/**
	 * Сортируем массив по цене
	 * от большей к меньшей
	 */
	if ( sortBy === 'desc' ) {
		sortList.sort ( ( a, b ) => {
			return  a.cost - b.cost;
		} );

		sortList.sort( (a, b) => {
			return !a.isOnline && b.isOnline ? 0 : -1;
		} );
	}

	/* загрузить больше */
	const limitCount = config.limit;
	const loadMoreBtn = document.querySelector ( '[data-car="load-more"]' );
	const carsPart = getLimitCars ( sortList, limitCount, loadMoreBtn );
	sortList = carsPart ();

	loadMoreBtn.onclick = ( e ) => loadMore ( e );

	function loadMore ( e ) {
		e.preventDefault ();
		sortList = carsPart ();

		/* Выводим элементы списка в верстку */
		sortList.forEach ( item => {
			wrpList.insertAdjacentElement ( 'beforeend', item.node );
		} );

		/* загрузить больше - обновление цен (Стас) */
		priceOutput ();//
		console.log ( 'загрузить больше - обновление цен (Стас)' );
	}

	/**
	 * Если машин больше чем указано в лимите
	 * то показать кнопку "Загрузить еще"
	 */
	if ( count > limitCount ) {

		loadMoreBtn.parentNode.classList.remove ( 'hide' );
	}

	/* Выводит элементы списка в верстку */
	sortList.forEach ( item => {
		wrpList.insertAdjacentElement ( 'beforeend', item.node );
	} );

	/* выводит количество найденных карточек */
	const wrpNotFound = document.querySelectorAll ( '.wrp-result__nechgo' );
	const outTotalResults = document.querySelectorAll ( '[data-car="total-count-result"]' );
	let wordFindResult = '...';
	let checkCount = count;
	let isHidden = checkCount === 0;


	if ( count > 10 && count !== 0 ) {
		const countStr = checkCount.toString ();
		checkCount = parseInt ( countStr.substr ( 1, 1 ), 10 );
	}

	switch ( true ) {
		case checkCount === 1:
			wordFindResult = `Найден ${ count } автомобиль`;
			break;
		case checkCount > 1 && checkCount < 5:
			wordFindResult = `Найдено ${ count } автомобиля`;
			break;
		case checkCount > 5:
			wordFindResult = `Найдено ${ count } автомобилей`;
			break;
		default:
			wordFindResult = `Найдено ${ count } автомобилей`;
			break;
	}

	/* перезапись результата поиска */
	outTotalResults.forEach ( outResultCount => {
		outResultCount.innerHTML = wordFindResult;
	} );

	/**
	 * в случае если количество = 0 (checkCount)
	 * будет показан блок с текстом "По Вашему запросу ничего не найдено. Попробуйте изменить условия поиска."
	 * */
	if ( isHidden ) {
		wrpNotFound.forEach( el => el.style.display = 'flex');
	} else {
		wrpNotFound.forEach( el => el.style.display = 'none');
	}


	/* обновление списка по умолчанию - скрипт обновление цен (Стас) */
	priceOutput ();

	/* функция Димы */
	localStoragePostKomplect();
}

export default updateList;