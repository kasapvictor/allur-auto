/**
 * Получаем минимальную и максимальную цену
 * из всего списка машин
 * @param cars
 */
import formatCost from "./formatCost";

function getMinMaxCost ( cars ) {
	const costArr = [];

	cars.forEach ( ( car, index ) => {
		const cost = car.querySelector ( '.result-card-cost' ).textContent;
		costArr.push(formatCost(cost));
	} );

	/* Сортирует массив от большего к меньшему */
	costArr.sort( (a, b) => {
		return a - b;
	});

	console.log('getMinMaxCost', costArr[0], costArr[costArr.length - 1]);

	return {
		min: costArr[0],
		max: costArr[costArr.length - 1]
	}
}

export default getMinMaxCost;
