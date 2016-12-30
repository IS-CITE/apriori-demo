const transaction = [
	['ขนมปัง', 'ผ้าอ้อม', 'นม'],
	['เบียร์', 'ผ้าอ้อม', 'ไข่'],
	['ขนมปัง', 'เบียร์', 'ผ้าอ้อม', 'ไข่'],
	['เบียร์', 'ไข่']
];
const support = 0.5;

const support_count = support * transaction.length;
const match = (a, b)=>{
	for(let i of b) {
		if(!a.includes(i)) return false;
	}
	return true;
};
const filter_supported = (c_itemset)=>{
	return c_itemset.filter((e)=>{
		let count = 0;
		for(let t of transaction) {
			if(match(t, e.item)) e.count++;
		}
		return e.count >= support_count;
	});
};
let c_itemset = [];
let f_itemset = [];
let item = [];
let size = 1;

for(let t of transaction) {
	for(let i of t) {
		if(!item.includes(i)) {
			item.push(i);
			c_itemset.push({item: [i], count: 0});
		}
	}
}
f_itemset[size] = filter_supported(c_itemset);
while(f_itemset[size].length > 1) {
	c_itemset = [];
	for(let i = 0, s = size - 1; i < f_itemset[size].length; i++) {
		let a = f_itemset[size][i].item;
		for(let j = i + 1; j < f_itemset[size].length; j++) {
			let b = f_itemset[size][j].item;
			if(match(a.slice(0, s), b.slice(0, s))) {
				let tmp = a.concat(b[s]);
				(()=>{
					let m = j;
					for(let k = s - 1; k >= 0; k--) {
						let c = [...tmp];
						c.splice(k, 1);
						while(++m < f_itemset[size].length) {
							if(match(c, f_itemset[size][m].item)) break;
						}
						if(m == f_itemset[size].length) return;
					}
					c_itemset.push({item: tmp, count: 0});
				})();
			}
			else {
				break;
			}
		}
	}
	f_itemset[++size] = filter_supported(c_itemset);
}
console.log(JSON.stringify(f_itemset));