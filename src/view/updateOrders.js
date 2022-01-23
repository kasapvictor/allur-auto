import updateList from "./updateList";

/**
 * Собирает новый список машин
 * в зависимости от выбранной сортировки
 */
function updateOrders ( config, carsArr ) {

	const orders = config.wrp.querySelectorAll ( '[data-order]' );

	if ( orders.length > 0 ) {

		orders.forEach ( order => order.addEventListener ( 'click', () => {

			orders.forEach ( order => order.classList.remove ( 'active' ) );

			const orderType = order.dataset.order;

			order.classList.add ( 'active' );

			config.order = orderType;

			if ( carsArr.length !== 0 ) {
				updateList ( config, carsArr, `${ orderType }` );
			} else {
				updateList ( config, null, `${ orderType }` );
			}
		} ) );
	}
}

export default updateOrders;