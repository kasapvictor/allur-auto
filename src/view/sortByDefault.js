/**
 * Отбор по умолчанию
 * Если не переданы никакие параметры отбора
 * или нажата кнопка сброса в панели фильтров
 * Отбор машин каждой марки бренда по минимальной цене
 * @param config
 */
function sortByDefault ( config ) {
	const items = config.items;

	for ( let i in items ) {
		for ( let j in items[i] ) {
			items[i][j].forEach ( ( el, index ) => {
				if ( index === 0 ) {
					el.hide = "0";
				} else {
					el.hide = "1";
				}
			} );
		}
	}
}

export default sortByDefault;