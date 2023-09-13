import React, { useState, useEffect, useRef } from 'react';
import { Mentions, Button, Tooltip } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import './index.less';
const MOCK_DATA = {
	' ': ['afc163', 'zombiej', 'yesmeck', '1.0', '2.0', '3.0'],
	' V': ['afc163', 'zombiej', 'yesmeck', '1.0', '2.0', '3.0']
};

type PrefixType = keyof typeof MOCK_DATA;

const Formulas = props => {
	const inputRef = useRef(null);

	const [prefix, setPrefix] = useState(' R');

	const tooltip = (
		<div className="tip">
			<p>Press R：selcet/input real metering point</p>
			<p>Press V：selcet/input Virtual metering point</p>
		</div>
	);
	let { rowValue, form, allTags, tagNames } = props;

	// console.log(form.getFieldsValue(), 'Formulas');

	const [inputValue, setInputValue] = useState('');

	const handleInputChange = () => {};

	const onSearch = (_, newPrefix) => {
		setPrefix(newPrefix);
	};
	const onChange = (value: string) => {
		console.log('Change:', value);
	};
	const handleFocus = () => {};
	const handleBlur = () => {};
	const handleClick = () => {};
	const handleButtonClick = fix => {};

	return (
		<>
			<Mentions
				notFoundContent="No metering points found"
				autoFocus
				ref={inputRef}
				autoSize={{ minRows: 2 }}
				style={{ width: '100%' }}
				placeholder="input R to mention RTag, V to mention VTag"
				prefix={[' ', ' V']}
				onChange={onChange}
				onSearch={onSearch}
				onFocus={handleFocus}
				onBlur={handleBlur}
				// value={inputValue}
				onClick={handleClick}
				options={(MOCK_DATA[prefix] || []).map(value => {
					return {
						key: value,
						value: `{${value}}`,
						label: value
					};
				})}
				onSelect={(option, prefix) => {
					setTimeout(function () {}, 100);
				}}
			/>
			<div className="buttonBox">
				<Button onClick={() => handleButtonClick('+')}>+</Button>
				<Button onClick={() => handleButtonClick('-')}>-</Button>
				<Button onClick={() => handleButtonClick('×')}>×</Button>
				<Button onClick={() => handleButtonClick('÷')}>÷</Button>
				<Button>( )</Button>
				<Button>SUM</Button>
				<Button shape="round">Metering Point Name</Button>
				<Tooltip style={{ width: ' 292px' }} placement="right" title={tooltip}>
					<ExclamationCircleFilled />
				</Tooltip>
			</div>
		</>
	);
};

export default Formulas;
