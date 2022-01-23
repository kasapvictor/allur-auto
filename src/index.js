import config from './init/carsListInit';
import sortByDefault from "./view/sortByDefault";
import updateList from "./view/updateList";
import parseSearch from "./helpers/parseSearch";
import initFilters from "./init/initFilters";
import updateOrders from "./view/updateOrders";

let carsArr = [];

if ( location.search === '' ) {
	/**
	 * Отбираем все карточки машин
	 * бренд[марка] по минимальной цене
	 */
	sortByDefault ( config );

	/* прячем все карточки машин с атрибутом hide: "1" */
	updateList ( config );
} else {
	config.search = parseSearch ( location.search );

	/**
	 * Если нет минимальной и максимальной цены
	 * то взять цены из config.cost
	 */
	if ( config.search.min === undefined || config.search.max === undefined ) {
		config.search.min = config.cost.min;
		config.search.max = config.cost.max;
	}

	/**
	 * Разбирает объект параметров на массив [brand, Kia],[model, Rio]...
	 * @type {[string, unknown][]}
	 */
	const params = Object.entries ( config.search );

	/**
	 * На основе объекта config.items создается новый массив для вывода карточек
	 *
	 * Если нет в параметрах модели
	 * то берем одну комплектацию по минимальной цене каждой модели
	 *
	 * Если есть модель, то формируем массив
	 * Бренд->модель и все комплектации
	 */
	if (config.search.model === undefined) {
		carsArr = Object.values ( config.items ).reduce ( ( prev, curr ) => {
			return [ ...prev, ...Object.values ( curr ).reduce((p, c) => {
				return [...p, c[0]];
			}, []) ];
		}, [] );
	} else {
		carsArr = Object.values ( config.items ).reduce ( ( prev, curr ) => {
			return [ ...prev, ...Object.values ( curr ).flat () ];
		}, [] );
	}

	/**
	 * Перебираем все параметры поиска (location.search)
	 * Формируется новый массив в соответствии параметр равный атрибуту машины
	 *
	 * params.model === config.items[brand][model]
	 */
	params.forEach ( ( [ key, value ] ) => {
		if ( key === 'min' || key === 'max' ) return;

		carsArr = carsArr.filter ( ( car ) => {
			return car[`${ key }`] === decodeURIComponent ( value );
		} );
	} );

	/**
	 * Фильтрация по минимальной и максимальной цене
	 * данные берутся из params.min и params.max
	 */
	carsArr = carsArr.filter ( ( car ) => {
		return car['cost'] >= config.search.min && car['cost'] <= config.search.max;
	} );

	/* прячем все карточки машин с атрибутом hide: "1" */
	updateList ( config, carsArr );
}

/* инициализация фильтра */
initFilters ( config );

/**
 * Собирает новый список машин
 * в зависимости от выбранной сортировки
 */
updateOrders(config, carsArr);

console.log ( 'config', config );








