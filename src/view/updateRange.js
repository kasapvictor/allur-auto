import toMoneyFormat from '../helpers/toMoneyFormat';

/**
 * Функция обновляет показатели range - диапазона цен
 * если есть параметры цен в config.search
 * то устанавливает диапазон мин и макс из этих данных
 * @param config
 */
function updateRange ( config ) {

	$ ( function () {
		const amountStart = config.search.min;
		const amountEnd = config.search.max;

		$ ( ".amount-min" ).text ( toMoneyFormat ( amountStart ) );
		$ ( ".amount-max" ).text ( toMoneyFormat ( amountEnd ) );

		$ ( "#slider-range" ).slider ( {
			range: true,
			min: config.cost.min,
			max: config.cost.max,
			values: [ config.search.min, config.search.max ],
			slide: function ( event, ui ) {
				$ ( ".amount-min" ).text ( toMoneyFormat ( ui.values[0] ) );
				$ ( ".amount-max" ).text ( toMoneyFormat ( ui.values[1] ) );
				$ ( "#amount" ).val ( ui.values[0] + "-" + ui.values[1] );
			}
		} );
		$ ( "#amount" ).val ( "$" + $ ( "#slider-range" ).slider ( "values", 0 ) +
			" - $" + $ ( "#slider-range" ).slider ( "values", 1 ) );
	} );
}

export default updateRange;
