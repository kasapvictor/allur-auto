/**
 * Если опция фильтра активная
 * при повторном нажатии отменяет выбранный элемент
 * удаляет класс w--redirected-checked
 * меняет input checked на false
 * @param filterForm
 */
import updateExcludeModels from "./updateExcludeModels";

function updateOptionsByClick ( filterForm ) {
	const labels = filterForm.querySelectorAll ( 'label.w-radio' );

	labels.forEach ( label => label.addEventListener ( 'click', ( e ) => {

		const div = label.querySelector('.w-radio-input');
		const input = label.querySelector ( 'input[type="radio"]' );

		if ( div.classList.contains ( 'w--redirected-checked' ) ) {
			setTimeout ( () => {
				div.classList.remove ( 'w--redirected-checked' );
				div.classList.remove ( 'w--redirected-focus' );
				input.checked = false;
			}, 200 );
		}

		/* деактивирует все модели которые не соответствуют бренду */
		setTimeout( () => {
			updateExcludeModels ( filterForm );
		}, 400)


	} ) );
}

export default updateOptionsByClick;