/**
 * Разбивает строку location.search на объект
 * Возвращает объект параметрами отбора
 * @param search
 * @return {{}}
 */
function parseSearch ( search ) {
	const out = {};
	let params = search.replace ( '?', '' );

	params = params.split ( '&' );

	params.forEach ( param => {
		const searchStr = param.split ( '=' );

		if ( searchStr[0] === 'price-min' || searchStr[0] === 'price-max' ) {
			out[searchStr[0].replace ( /price-/g, '' )] = parseInt ( searchStr[1].replace ( /\s|%20|\+/g, '' ), 10 );
		} else {
			out[searchStr[0]] = searchStr[1].replace ( /\s|%20|\+/g, ' ' );
		}
	} );

	return out;
}

export default parseSearch;