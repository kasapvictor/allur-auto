import formatCost from "../helpers/formatCost";
import isByOnline from "../helpers/isByOnline"; // проверка на покупку онлайн

/**
 * Собирает все автомобили в объект {машины}->{марки}->{модели}->[комплектации]
 * Сортирует по марке
 * Каждая марка - отдельный объект с моделями
 * Каждая модель содержи массив со всеми комплектациями
 * Для каждого автомобиля добавляются параметры отбора
 * @param cars
 * @return {*}
 */
function itemsList ( cars ) {

	return [ ...cars ].reduce ( function ( prev, item, index ) {
		const node = item.cloneNode ( true );
		const brand = item.querySelector ( '[data-car="brand"]' ).textContent;
		const model = item.querySelector ( '[data-car="model"]' ).textContent;
		const body = item.querySelector ( '[data-car="body"]' ).textContent;
		const equipment = item.querySelector ( '[data-car="equipment"]' ).textContent;
		const engine = item.querySelector ( '[data-car="engine-volume"]' ).textContent;
		const transmission = item.querySelector ( '[data-car="transmission"]' ).textContent;
		const drive = item.querySelector ( '[data-car="drive"]' ).textContent;
		const cost = item.querySelector ( '.result-card-cost' ).textContent;
		const order = item.querySelector ( '[data-car="order"]' ).textContent;
		const enginetype = item.querySelector ( '[data-car="enginetype"]' ).textContent;

		// для Chevrolet + KIA
		// проверка можно ли купить онлайн
		// если можно то отобразить блок с покупкой
		// удали лишнее из условия
		let isOnline = isByOnline ( node, 'chevrolet' ) || isByOnline ( node, 'kia' ) || isByOnline ( node, 'jac');
		//let isOnline = isByOnline ( node, 'chevrolet' );

		if ( isOnline ) {
			node.querySelector ( '[data-car="online"]' ).style.display = 'flex';
		}

		const el = {
			brand, // марка
			model, // модель
			body, // тип кузова
			equipment, // комплектация
			engine, // объем двигателя
			enginetype, // тип двигателя
			transmission, // тип коробки
			drive, // типа привода
			cost: formatCost ( cost ), // строка цены переведена в числовой формат
			node, // html верстка карточки авто
			hide: '1', // 1 - скрыть, 0 - показать
			order, // порядковый номер для отбора по умолчанию
			isOnline // можно ли купить онлайн
		}



		if ( prev[brand] === undefined ) {
			prev[brand] = {};
		}

		if ( prev[brand][model] === undefined ) {
			prev[brand][model] = [];
		}

		prev[brand][model].push ( el );

		/* сортировка от меньшей к большей цене*/
		const _unsort = prev[brand][model];
		_unsort.sort ( ( a, b ) => {
				return a.cost - b.cost;
			} );

		_unsort.sort( (a, b) => {
			return !a.isOnline && b.isOnline ? 0 : -1;
		} );

		return prev;

	}, {} );
}

export default itemsList;
