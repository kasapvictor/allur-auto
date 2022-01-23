import getMinMaxCost from "../helpers/getMinMaxCost";
import itemsList from "../storage/itemsList";

/**
 * Формирует объект конфигурации
 * Конфигурация содержит обертку блока со списком машин
 * Объект со всеми машинами {машины}->{марки}->{модели}->[комплектации]
 * Стоимость от и до
 * Порядок сортировки / по приоритету / от большей к меньшей/ от меньшей к большей
 * Параметры отбора
 * @return {boolean|{search: {min: *, max: *}, cost: {min: *, max: *}, wrp: Element, items: *, order: string}}
 */
function carsListInit () {

	const wrp = document.querySelector ( '[data-car="wrapper"]' );
	const cars = wrp.querySelectorAll ( '[data-car="card"]' );

	if ( cars.length === 0 ) return false;

	const cost = getMinMaxCost ( cars );

	return {
		wrp, // обертка списка карточек
		items: itemsList ( cars ), // все автомобили {машины}->{марки}->{модели}->[комплектации]
		cost, // минимальная и максимальная цена
		order: 'order', // порядок сортировки
		limit: 6,
		search: { // параметры отбора
			min: cost.min,
			max: cost.max,
		}
	};
}

export default carsListInit ();
