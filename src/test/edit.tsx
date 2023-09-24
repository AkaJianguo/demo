import React, { useEffect, useState, useRef } from 'react';
import { Form, Modal, Row, Col, Tree, Button, Input, Radio } from 'antd';
import ProForm, {
	ProFormDigit,
	ProFormText,
	ProFormRadio,
	ProFormCheckbox,
	ProFormTextArea
} from '@ant-design/pro-form';
import Formulas from './Mentions.tsx';
import Metering from './metering.tsx';
import EditNode from '../edit/index.jsx';
import InputEdit from '../InputEdit/metering.js';

import './index.less';
const Edit = props => {
	const [form] = Form.useForm();
	const inputRef = useRef(null);
	const outputRef = useRef(null);

	// 光标插入位置
	const [cursor, setCursor] = useState({ start: 0, end: 0 });
	const { start, end } = cursor;

	// 选中的标签
	const [tagName, setTagName] = useState('');
	// 获取焦点
	const [focus, setFocus] = useState('');
	console.log(tagName, 'tagName');
	console.log(focus, 'focus');
	console.log(cursor, 'cursor');

	const { allTags, pTags, vTags } = props;
	const tagNames = {
		R: pTags.map(item => item.tagName),
		V: vTags.map(item => item.tagName),
		'~': allTags.map(item => item.tagName)
	};
	useEffect(() => {
		form.resetFields();
		// console.log(props, 'p55555');
		console.log(form.getFieldsValue(), 'p55555');

		form.setFieldsValue({
			id: props.values.id,
			utilityType: props.values.utilityType,
			balanceCircleName: props.values.balanceCircleName,
			types: props.values.types,
			threshold: props.values.threshold,
			input: props.values.input,
			output: props.values.output
		});
	}, [form, props, props.values.id]);

	const handleOk = () => {
		form.submit();
	};
	const handleCancel = () => {
		props.onCancel();
	};
	console.log(props);

	const handleFinish = (values: Record<string, any>) => {
		// setMenuIds(menuCheckedKeys);
		console.log(values, 'handleFinish11111111111111111');
		props.onSubmit({ ...values });
	};
	const handleLiClick = value => {
		// 根据焦点判断要传递值的目标组件
		if (focus === 'input') {
			const inputValue = form.getFieldValue('input') || '';
			// const newValue = `${inputValue.slice(
			// 	0,
			// 	start
			// )}${value}${inputValue.slice(end)}`;
			const newValue = `${inputValue}<span contentEditable='false' style="color:red">${value}</span>`;
			form.setFieldsValue({ input: newValue });
			// 将光标移动到插入的值之后
			// setCursor({
			// 	start: start + value.length,
			// 	end: end + value.length
			// });
		} else if (focus === 'output') {
			const outputValue = form.getFieldValue('output') || '';
			const newValue = `${outputValue.slice(0, start)}${value}${outputValue.slice(end)}`;
			form.setFieldsValue({ output: newValue });
			// 将光标移动到插入的值之后
			setCursor({
				start: start + value.length,
				end: end + value.length
			});
		}
	};
	return (
		<Modal
			maskClosable={false}
			width={1300}
			visible={props.visible}
			destroyOnClose
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<Form form={form} onFinish={handleFinish} initialValues={props.values}>
				<Row gutter={[24, 40]}>
					{/* Input */}
					<Col span={12} order={1}>
						<Form.Item name="input" label="input" rules={[{}]}>
							{/* <EditNode
								ref={inputRef}
								value={form.getFieldValue('input')}
								onChange={value => form.setFieldsValue({ input: value })}
								setFocus={setFocus} // 获取焦点name
							></EditNode> */}
							
							<InputEdit
							ref={inputRef}
							value={form.getFieldValue('input')}
							onChange={value => form.setFieldsValue({ input: value })}
							setFocus={setFocus} // 获取焦点name
							form={form}
							></InputEdit>
						</Form.Item>
					</Col>
					{/* Output */}
					<Col span={12} order={1}>
						<Form.Item name="output" label="output" rules={[{}]}>
							<EditNode></EditNode>
							<Formulas
								ref={outputRef}
								value={form.getFieldValue('output')}
								onChange={value => form.setFieldsValue({ output: value })}
								setCursor={setCursor} // 光标位置
								cursor={cursor}
								tagNames={tagNames}
								setFocus={setFocus} // 获取焦点name
							/>
						</Form.Item>
					</Col>
				</Row>
				{/* <ul>
					<li onClick={() => handleLiClick('789')}>789</li>
					<li onClick={() => handleLiClick('654')}>654</li>
				</ul> */}
				<Metering handleLiClick={handleLiClick} form={form} />
			</Form>
		</Modal>
	);
};
export default Edit;
