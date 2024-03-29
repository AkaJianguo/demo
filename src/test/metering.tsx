import { Space, Table, Tag, Button } from 'antd';
import React, { useState } from 'react';
import allTags from './data/tags.json';

const Metering = props => {
	const { setTagName } = props;

	const onRowClick = (record) => {
		// 在这里处理行点击事件，record 包含了当前行的数据
		console.log('Clicked row:', record);
	  };
	const columns = [
		{
			title: 'tagName',
			dataIndex: 'tagName',
			valueType: 'text',
			onCell: () => {
				return {
					onClick: e => {
						// setTagName(e.target.innerText);
						// props.form.setFieldsValue({ output: e.target.innerText })
						props.handleLiClick(`{${e.target.innerText}}`)
						
						// if(left!==right){
						//   if (!left) {
						//     setLeftValue(`{${e.target.innerText}}`);
						//   }else if (!right) {
						//     setRightValue(`{${e.target.innerText}}`);
						//   }else{
						//     setLeftValue();
						//     setLeftValue();
						//   }
						// }
					}
				};
			}
		},
		{
			title: 'tagCode',
			dataIndex: 'tagCode',
			valueType: 'text'
		},
		{
			title: 'gatewayName',
			dataIndex: 'gatewayName',
			valueType: 'text',
			hideInSearch: true
		},
		{
			title: 'ActivityType',
			dataIndex: 'ActivityType',
			valueType: '',
			hideInSearch: true
		},
		{
			title: 'Unit',
			dataIndex: 'uomName',
			valueType: 'text',
			hideInSearch: true
		}
	];
	return <Table columns={columns} dataSource={allTags} 
	onRow={(record) => ({
        onClick: () => {
          onRowClick(record);
        },
      })}
	
	
	
	/>;
};
export default Metering;
