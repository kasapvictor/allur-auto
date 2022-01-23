import getValueFilterItem from "./getValueFilterItem";

/**
 * Формирует ( location.search ) строку запроса из выбранных параметров в фильтре
 * @param form
 * @return {string}
 */
function fillObjectSearch ( form ) {
	const min = form.querySelector ( '.amount-min' ).textContent;
	const max = form.querySelector ( '.amount-max' ).textContent;
	const searchObj = {
		brand: getValueFilterItem ( form, 'brand' ), /* марка */
		model: getValueFilterItem ( form, 'model' ), /* модель */
		body: getValueFilterItem ( form, 'body-type' ), /* тип кузова */
		transmission: getValueFilterItem ( form, 'transmission' ), /* тип коробки */
		drive: getValueFilterItem ( form, 'drive-unit' ), /* тип привода */
		engine: getValueFilterItem ( form, 'engine-volume' ), /* объем двигателя */
		enginetype: getValueFilterItem ( form, 'enginetype' ),
		'price-min': min.replace ( /\s+/g, '' ),
		'price-max': max.replace ( /\s+/g, '' ),
	};

	let searchStr = '';
	for ( const [ key, value ] of Object.entries ( searchObj ) ) {
		if ( value !== '' ) {
			searchStr += `${ key }=${ value }&`;
		}
	}

	return searchStr.replace ( /&$/g, '' );
}

export default fillObjectSearch;