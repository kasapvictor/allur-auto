/**
 * Переводит числовой формат цены в денежный
 * 1000 /-> 1 000
 * 10000 /-> 10 000
 * 100000 /-> 100 000
 * 1000000 /-> 1 000 000
 * @param num
 * @return {string}
 */
function toMoneyFormat (num) {
	// num = num.toFixed(2); //-> 1 000.00

	switch (true) {

		case num <= 999 :
			num = `${num}`;
			break;

		case num <= 9999 :
			num = `${num}`;
			num = num.replace(/(^\d{1})/, "$1 ");
			break;

		case num <= 99999 :
			num = `${num}`;
			num = num.replace(/(^\d{2})/, "$1 ");
			break;

		case num <= 999999 :
			num = `${num}`;
			num = num.replace(/(^\d{3})/, "$1 ");
			break;

		case num <= 9999999 :
			num = `${num}`;
			num = num.replace(/(^\d{1})(\d{3})/, "$1 $2 ");
			break;

		case num <= 99999999 :
			num = `${num}`;
			num = num.replace(/(^\d{2})(\d{3})/, "$1 $2 ");
			break;

		case num <= 999999999 :
			num = `${num}`;
			num = num.replace(/(^\d{3})(\d{3})/, "$1 $2 ");
			break;

		case num <= 9999999999 :
			num = `${num}`;
			num = num.replace(/(^\d{1})(\d{3})(\d{3})/, "$1 $2 $3 ");
			break;
	}
	return num;
}

export default toMoneyFormat;
