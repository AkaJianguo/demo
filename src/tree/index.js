import React, { useState, useEffect } from 'react';
import { Tree, message, Input } from 'antd';
const { DirectoryTree } = Tree;
import { formatTreeSelectData, buildTree } from './utils';

import res from './data.json';
import './index.css';
const { Search } = Input;

const DeptTree = props => {
	const [treeData, setTreeData] = useState([]);
	const [treeList, setTreeList] = useState([]);
	const [expandedKeys, setExpandedKeys] = useState([]);
	const [autoExpandParent, setAutoExpandParent] = useState(true);
	const [searchValue, setSearchValue] = useState('');

	const exKeys = [];

	const nodeList = () => {
		setTreeList(res);
		setTreeData(buildTree(res));
	};

	useEffect(() => {
		nodeList();
	}, []);

	const onSelect = (keys, info) => {
		console.log(keys, info, '70');
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

	const highlightSearchValue = node => {
		const { title, children } = node;
		const parts = title.split(new RegExp(`(${searchValue})`, 'gi'));
		const highlightedTitle = (
			<span>
				{parts.map((part, index) =>
					part.toLowerCase() === searchValue.toLowerCase() ? (
						<span key={index} className="highlight">
							{part}
						</span>
					) : (
						part
					)
				)}
			</span>
		);

		if (children && children.length > 0) {
			return {
				...node,
				title: highlightedTitle,
				children: children.map(child => highlightSearchValue(child))
			};
		}

		return {
			...node,
			title: highlightedTitle
		};
	};

	const onChange = e => {
		const { value } = e.target;
		setSearchValue(value);
		const newExpandedKeys = treeList
			.map(item => {
				if (item.name.includes(value)) {
					return getParentKey(item.id, treeData);
				}
				return null;
			})
			.filter((item, i, self) => item && self.indexOf(item) === i);

		setExpandedKeys(newExpandedKeys);
		setAutoExpandParent(true);
	};

	return (
		<div>
			<Search style={{ marginBottom: 8 }} placeholder="Search node name" onChange={onChange} />
			<Tree
				defaultExpandAll
				onExpand={onExpand}
				expandedKeys={expandedKeys}
				autoExpandParent={autoExpandParent}
				onSelect={onSelect}
				treeData={treeData.map(node => highlightSearchValue(node))}
			/>
		</div>
	);
};

export default DeptTree;
