


export function formatTreeSelectData(arrayList) {
	console.log(arrayList);
	let newArr = [];
	arrayList.forEach(item => {
		if (item.parentId === 0) {
			newArr.push({
				id: item.id,
				title: item.name,
				status: item.status,
				parentId: item.parentId,
				children: []
			});
		} else {
			let parent = newArr.find(parentItem => parentItem.id === item.parentId);
			if (parent) {
				if (!parent.children) {
					parent.children = [];
				}
				parent.children.push({
					id: item.id,
					title: item.name,
					status: item.status,
					parentId: item.parentId,
					children: []
				});
			}
		}
	});
	return newArr;
}

 export function buildTree(data, parentId = 0) {
	const result = [];
	for (let item of data) {
	  if (item.parentId === parentId) {
		const children = buildTree(data, item.id);
		if (children.length > 0) {
		  item.children = children;
		} else {
		  item.children = [];
		}
		result.push({
		  key: item.id,
		  title: item.name,
		  status: item.status,
		  parentId: item.parentId,
		  children: item.children
		});
	  }
	}
	return result;
  }