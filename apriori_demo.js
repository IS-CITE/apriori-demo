let transactions = {
	'001': ['ขนมปัง', 'ผ้าอ้อม', 'นม'],
	'002': ['เบียร์', 'ผ้าอ้อม', 'ไข่'],
	'003': ['ขนมปัง', 'เบียร์', 'ผ้าอ้อม', 'ไข่'],
	'004': ['เบียร์', 'ไข่']
};
let items = [];
for(let id in transactions) {
	for(let item of transactions[id]) {
		if(!items.includes(item)) items.push(item);
	}
}