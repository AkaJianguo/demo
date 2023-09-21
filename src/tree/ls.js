const data=[
    {
        id: 546,
        name: 'AA',
        status: 1,
        parentId: 0,
        children: null
    },
    {
        id: 547,
        name: 'EO/EG',
        status: 1,
        parentId: 0,
        children: null
    },
    {
        id: 548,
        name: 'UG',
        status: 1,
        parentId: 0,
        children: null
    },
    {
        id: 549,
        name: 'GAA!',
        status: 1,
        parentId: 546,
        children: null
    },
    {
        id: 888,
        name: 'aaaAA!',
        status: 1,
        parentId: 549,
        children: null
    },
    {
        id: 306,
        name: 'aaqwer!',
        status: 1,
        parentId: 888,
        children: null
    },
    {
        id: 307,
        name: 'adw!',
        status: 1,
        parentId: 888,
        children: null
    },
    {
        id: 999,
        name: 'QAwA!',
        status: 1,
        parentId: 549,
        children: null
    },
    {
        id: 550,
        name: 'GAA2',
        status: 1,
        parentId: 546,
        children: null
    },
    {
        id: 551,
        name: 'nBA',
        status: 1,
        parentId: 546,
        children: null
    },
    {
        id: 552,
        name: '2-EHA',
        status: 1,
        parentId: 546,
        children: null
    },
    {
        id: 553,
        name: 'EO/EG',
        status: 1,
        parentId: 547,
        children: null
    },
    {
        id: 554,
        name: 'SPG',
        status: 1,
        parentId: 548,
        children: null
    }
]


function formatTreeSelectData(arrayList) {
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

console.log(formatTreeSelectData(data));