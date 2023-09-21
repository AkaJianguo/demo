import React, { useState, useEffect, useMemo } from 'react';
import { Tree, message, Input } from 'antd';
const { DirectoryTree } = Tree;
import { formatTreeSelectData, buildTree } from './utils';

import res from './data.json';

const { Search } = Input;

const DeptTree = props => {
	// let { getBindings } = props.options;

	const [treeData, setTreeData] = useState([]);
	const [treeList, setTreeList] = useState([]);
	const [expandedKeys, setExpandedKeys] = useState([]);
	const [autoExpandParent, setAutoExpandParent] = useState(true);
	const [searchValue, setSearchValue] = useState('');

	const exKeys = [];

	/*   const fetchNodeList = async () => {
    const hide = message.loading('Inquiring');
    const params = { treeType: 'fmhc', templateType: 'fmhc', tenentId: '1313590' };
    try {
      await getNodeTree(params).then((res) => {
        console.log(res, 'Tree');
        setTreeList(res);
        setTreeData(formatTreeSelectData(res));
        exKeys.push('1');
        exKeys.push(treeData[0]?.children[0].id);
        setExpandedKeys(exKeys);
        props.onSelect(treeData[0]?.id);
      });
      hide();
      message.success('Success');
      return true;
    } catch (error) {
      hide();
      message.error(error.message);
      return false;
    }
  }; */
	const nodeList = () => {
		setTreeList(res);
		// setTreeData(formatTreeSelectData(res));

		setTreeData(buildTree(res));
	};
	useEffect(() => {
		nodeList();
	}, [searchValue]);

	const onSelect = (keys, info) => {
		console.log(keys, info, '70');
		// props.onSelect(info.node.id);
	};

	const onExpand = expandedKeysValue => {
		setExpandedKeys(expandedKeysValue);
		setAutoExpandParent(false);
	};
	const getParentKey = (key, tree) => {
		let parentKey;
		for (let i = 0; i < tree.length; i++) {
			const node = tree[i];
			if (node.children) {
				if (node.children.some(item => item.key === key)) {
					parentKey = node.key;
				} else if (getParentKey(key, node.children)) {
					parentKey = getParentKey(key, node.children);
				}
			}
		}
		return parentKey;
	};
	// 搜索
	const onChange = e => {
		const { value } = e.target;
		const newExpandedKeys = treeList
			.map(item => {
				if (item.name.includes(value)) {
					console.log(getParentKey(item.id, treeData), 'getParentKey');
					return getParentKey(item.id, treeData);
				}
				return null;
			})
			.filter((item, i, self) => item && self.indexOf(item) === i);
		console.log(newExpandedKeys, 'newExpandedKeys');
		setExpandedKeys(newExpandedKeys);
		setSearchValue(value);
		setAutoExpandParent(true);
	};

	return (
		<div>
			<Search
				style={{ marginBottom: 8 }}
				placeholder="
      Search node name
      "
				onChange={onChange}
			/>
			<Tree
				defaultExpandAll
				// defaultSelectedKeys={['0']} //默认选中的树节点
				onExpand={onExpand}
				// expandedKeys={['0-1','0-2']}
				expandedKeys={expandedKeys}
				autoExpandParent={autoExpandParent}
				onSelect={onSelect}
				treeData={treeData}
			/>
		</div>
	);
};

export default DeptTree;
