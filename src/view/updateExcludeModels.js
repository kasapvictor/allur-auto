/**
 * Если не выбран бренд,
 * то все модели доступны для выбора
 *
 * Если бренд выбран,
 * то прячет все модели не соответствующие выбранной модели
 * @param filterForm
 */
function updateExcludeModels ( filterForm ) {
	const brands = filterForm.querySelectorAll ( '[data-filter="brand"]' );
	const models = filterForm.querySelectorAll ( '[data-filter="model"]' );

	/**
	 * Сбрасывает все overlay для моделей
	 */
	if ( models.length > 0 ) {
		models.forEach ( model => {
			const parent = model.parentNode;
			const overlay = parent.querySelector('.option-overlay');

			overlay.classList.remove ( 'active' );
		} );
	}

	/**
	 * Обходит все марки
	 * проверяет выбрана ли какая-то из марок
	 * если выбрана, то обходит все модели
	 * в моделях проверяет скрытое поле с названием марки
	 * если нет совпадений то для overlay добавляет класс active
	 * overlay.active становится z-index:20 и блокирует выбор модели
	 * которая не соответствует выбранной марке
	 */
	brands.forEach ( brand => {
		const input = brand.querySelector ( 'input[type="radio"]' );

		if ( input.checked === true ) {
			const brandChecked = brand.querySelector ( '.filter-text-choice' ).textContent;

			models.forEach ( model => {
				const brandModel = model.querySelector ( '[data-filter="brand-model"]' ).textContent;
				if ( brandChecked !== brandModel ) {
					const parent = model.parentNode;
					const div = model.querySelector('div.w-radio-input');
					const input = model.querySelector ( 'input[type="radio"]' );

					div.classList.remove ( 'w--redirected-checked' );
					div.classList.remove ( 'w--redirected-focus' );
					input.checked = false;

					const overlay = parent.querySelector('.option-overlay');
					if (overlay) overlay.classList.add ( 'active' );
				}
			} );
		}
	} );
}

export default updateExcludeModels;