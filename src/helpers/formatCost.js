/**
 * Удаляет пробелы и символ валюты
 * @param cost
 * @return {*}
 */
function formatCost (cost) {
	const pattern = /\s/gi;
	return parseInt(cost.replace(pattern, ''), 10);
}

export default formatCost;