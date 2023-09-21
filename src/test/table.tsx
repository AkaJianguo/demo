import { Space, Table, Tag, Button } from 'antd';
import React, { useState } from 'react';
import list from './data/list.json';
import allTags from './data/alltags.json';
import pTags from './data/ptags.json';
import vTags from './data/vtags.json';
import UpdateForm from './edit.tsx';
import { conversionIn } from './utils.ts';
import './index.less';

const App = () => {
	/** 表单加载 */
	const [modalVisible, setModalVisible] = useState(false);
	/** 当前行value */
	const [currentRow, setCurrentRow] = useState<CircleType>();
	//  转换公式
	const convertToTagName = (input, allTagsList) => {
		let output = input;

		// 匹配输入字符串中的标签，并根据tagType类型替换为对应的输出格式
		const regex = /\{(.*?)\}/g;
		// const regex = /{([\w\s()]+)}/g;
		const matches = input.match(regex);
		console.log('matches=>', matches);

		if (!matches) {
			return output;
		}

		matches.forEach(match => {
			const tagName = match.slice(1, -1);
			const tag = allTagsList.find(item => item.tagName === tagName);

			if (tag) {
				const tagTypePrefix = tag.tagType === 1 ? 'ptag' : 'vtag';
				const tagString = '{' + tagTypePrefix + '|' + tag.tagId + '}';

				output = output.replace(match, tagString);
			}
		});

		return output;
	};
	const columns = [
		{
			title: 'utilityType',
			dataIndex: 'utilityType',
			valueType: 'text'
		},
		{
			title: 'balanceCircleName',
			dataIndex: 'balanceCircleName',
			valueType: 'text'
		},
		{
			title: 'code',
			dataIndex: 'code',
			valueType: 'text',
			hideInSearch: true
		},
		{
			title: 'input',
			dataIndex: 'input',
			// valueType: 'text',
			hideInSearch: true,
			render: input => conversionIn(input, allTags)
		},
		{
			title: 'output',
			dataIndex: 'output',
			valueType: 'text',
			hideInSearch: true,
			render: output => conversionIn(output, allTags)
		},
		{
			title: 'Type',
			dataIndex: 'Type',
			valueType: 'text',
			hideInSearch: true
		},
		{
			title: 'threshold',
			dataIndex: 'threshold',
			valueType: 'text',
			hideInSearch: true
		},
		{
			title: 'option',
			dataIndex: 'option',
			width: '220px',
			valueType: 'option',
			hideInSearch: true,
			render: (_, record) => [
				<Button
					type="link"
					size="small"
					key="edit"
					onClick={e => {
						console.log(record, 'edit');
						let output = conversionIn(record.output, allTags);
						let input = conversionIn(record.input, allTags);

						setCurrentRow({ ...record, output, input });
						setModalVisible(true);
						// getBalanceCircleEdit(record.id).then((res: any) => {
						//   if (res.code === 200) {
						//     setModalVisible(true);
						//     setCurrentRow(record);
						//   } else {
						//     message.warn(res.msg);
						//   }
						// });
					}}
				>
					编辑
				</Button>
			]
		}
	];
	return (
		<>
			<Table columns={columns} dataSource={list} />
			<UpdateForm
				visible={modalVisible}
				values={currentRow || {}}
				onSubmit={values => {
					const input = convertToTagName(values.input, allTags);
					const output = convertToTagName(values.output, allTags);
					console.log(input, output);
					setModalVisible(false);
					setCurrentRow(undefined);
				}}
				onCancel={() => {
					setModalVisible(false);
					setCurrentRow(undefined);
				}}
				allTags={allTags}
				pTags={pTags}
				vTags={vTags}
			/>
		</>
	);
};

export default App;
