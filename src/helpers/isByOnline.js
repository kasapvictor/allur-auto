/**
 * Функция проверяет есть ли у машины в блоке .by-credit-color контент
 * если есть, то выводить блок "онлайн-покупка"
 * временно только для chevrolet - потом для всех остальных -> удалить проверку на название
 * @param item
 * @param name
 * @return {boolean}
 */

function isByOnline ( item, name = '' ) {
	const brand = item.querySelector ( '[data-car="brand"]' ).textContent;
	const isColor = item.querySelector ( '.by-credit-color' ).textContent;

	if ( isColor ) {
		if ( name !== '' ) { // проверка на конкретную марку если имя не пустое
			return isColor.length > 10  && brand.trim().toLowerCase () === name.trim().toLowerCase ();
		} else { // проверка ну пустоту в блоке .by-credit-color
			return isColor !== '';
		}
	} else {
		return false;
	}
}

export default isByOnline;