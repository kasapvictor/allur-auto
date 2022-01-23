import updateRange from "../view/updateRange";
import fillObjectSearch from "../helpers/fillObjectSearch";
import updateOptionsByParams from "../view/updateOptionsByParams";
import updateOptionsByClick from "../view/updateOptionsByClick";
import updateExcludeModels from "../view/updateExcludeModels";

/**
 * Инициализация панели фильтров
 * Блокирует отправку формы по клику на input type="submit"
 * Формирует url с параметрами отбора из выбранных опций
 * Переход по клику input type="submit" на сформированный url
 * @param config
 */
function initFilters ( config ) {
	const wrp = document.querySelector('.wrp-filters');
	const filterForm = wrp.querySelector ( '.wrp-filters form' );
	const reset = wrp.querySelector ( '[data-filter="reset"]' );
	const host = location.host; //allurauto.webflow.io
	const protocol = location.protocol; //https:
	const pathName = location.pathname; // /new-allur/vydacha

	/* блокируем отправку формы */
	filterForm.setAttribute ( 'action', 's' );
	filterForm.addEventListener ( 'submit', ( e ) => {
		e.preventDefault ();
		const search = `?${ fillObjectSearch ( filterForm ) }`; // search: "?brand=Kia&model=Sportage&price-min=5+000+000&price-max=20+000+000"
		location.href = `${ protocol }//${ host }${ pathName }${ search }`;
	} );

	/* минимальная цена максимальная цена для фильтров */
	updateRange ( config );

	/* ставит отметку на выбранных значениях из GET параметра */
	updateOptionsByParams ( filterForm, config );

	/* отменяет выбранный параметр при повторном нажатии */
	updateOptionsByClick(filterForm);

	/* деактивирует все модели которые не соответствуют бренду */
	updateExcludeModels (filterForm)

	/* урл для сброса эта же страница, без параметров */
	reset.href = `${ protocol }//${ host }${ pathName }`;
}

export default initFilters;





