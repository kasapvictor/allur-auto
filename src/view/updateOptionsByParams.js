/**
 * Если есть параметры поиска в config.search
 * то находит все параметры в фильтре
 * для input добавляет checked,
 * для обертки input добавляет класс w--redirected-checked - выбрано
 * @param form
 * @param config
 */
function updateOptionsByParams ( form, config ) {
	const searchObj = config.search;

	for ( const [ key, value ] of Object.entries ( searchObj ) ) {

		if ( key !== 'min' || key !== 'max' ) {

			const choicesText = form.querySelectorAll ( 'span.filter-text-choice' );

			choicesText.forEach ( choice => {
				const choiceText = choice.textContent;
				const parent = choice.parentNode;
				const input = parent.querySelector ( 'input[type="radio"]' );

				const wrpSpoiler = parent.closest('.wrp-filter-spoiler');
				const spoilerTrigger = wrpSpoiler.querySelector('.spoiler-trigger');

				if ( choiceText.toLowerCase() === decodeURIComponent(value).toLowerCase() ) {
					/* если выбран параметр то спойлер будет открыт */
					openSpoiler(spoilerTrigger);
					input.checked = true;
					input.previousSibling.classList.add ( 'w--redirected-checked' );
				}
			} );
		}
	}
}

export default updateOptionsByParams;

/**
 * Открывает спойлер фильтра опций
 * @param trigger
 */
function openSpoiler (trigger) {
	const evt = new MouseEvent("click", {
		view: window,
		bubbles: true,
		cancelable: true,
		clientX: 20,
	});
	trigger.dispatchEvent(evt);
}