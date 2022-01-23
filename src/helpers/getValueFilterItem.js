/**
 * Находит параметр (input type="radio") в фильтре
 * Если он выбран (checked) то возвращает значение из span содержащий название параметра
 * Если выбранных элементов нет, то возвращает пустую строку
 * @param form
 * @param el
 * @return {string}
 */
function getValueFilterItem ( form, el ) {
	const inputs = form.querySelectorAll ( `input[data-name="${ el }"` );
	let out = '';

	inputs.forEach ( input => {
		if ( input.checked ) {
			out = input.nextSibling.textContent;
		}
	} );

	return out;
}

export default getValueFilterItem;