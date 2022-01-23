/**
 * Возвращает часть массива элементов
 * для ограниченного отображения списка
 * @param cars
 * @param limitCount
 * @param loadMoreBtn
 * @return {function(): *}
 */
function getLimitCars ( cars, limitCount, loadMoreBtn ) {

	let currentPos = 0;

	return function () {
		const part = cars.slice ( currentPos, currentPos + limitCount );

		currentPos += limitCount;

		if ( currentPos >= cars.length ) {
			loadMoreBtn.parentNode.classList.add ( 'hide' );
		}

		return part;
	}
}

export default getLimitCars;