function apriori(transaction, support) {
	const support_count = support * transaction.length;
	const match = (a, b)=>{
		for(let i of b) if(!a.includes(i)) return false;
		return true;
	};
	const filter_supported = (c_itemset)=>{
		return c_itemset.filter((e)=>{
			e.count = 0;
			for(let t of transaction) if(match(t, e.item)) e.count++;
			return e.count >= support_count;
		});
	};
	let size = 0;
	let item = [];
	let large_itemset = [];
	let c_itemset = [];
	let f_itemset;
	for(let t of transaction) {
		for(let i of t) {
			if(!item.includes(i)) {
				item.push(i);
				c_itemset.push({item: [i]});
			}
		}
	}
	f_itemset = filter_supported(c_itemset);
	while(f_itemset.length > 0) {
		size++;
		large_itemset.push({k: size, candidate: c_itemset, itemset: f_itemset});
		c_itemset = [];
		for(let i = 0, s = size - 1; i < f_itemset.length; i++) {
			let a = f_itemset[i].item;
			for(let j = i + 1; j < f_itemset.length; j++) {
				let b = f_itemset[j].item;
				if(match(a.slice(0, s), b.slice(0, s))) {
					let tmp = a.concat(b[s]);
					(()=>{
						let m = j;
						for(let k = s - 1; k >= 0; k--) {
							let c = [...tmp];
							c.splice(k, 1);
							while(++m < f_itemset.length) {
								if(match(c, f_itemset[m].item)) break;
							}
							if(m == f_itemset.length) return;
						}
						c_itemset.push({item: tmp});
					})();
				}
				else break;
			}
		}
		f_itemset = filter_supported(c_itemset);
	}
	return large_itemset;
}

const transaction = [
	['ขนมปัง', 'ผ้าอ้อม', 'นม'],
	['เบียร์', 'ผ้าอ้อม', 'ไข่'],
	['ขนมปัง', 'เบียร์', 'ผ้าอ้อม', 'ไข่'],
	['เบียร์', 'ไข่']
];
let large_itemset = apriori(transaction, 0.5);
for(let i of large_itemset) {
  console.log(JSON.stringify(i));
}
