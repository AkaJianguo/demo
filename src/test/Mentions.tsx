import React, { useState, useEffect, useRef } from 'react';
import { Mentions, Button, Tooltip } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import './index.less';
// const MOCK_DATA = {
// 	'R': ['afc163', 'zombiej', 'yesmeck', '1.0', '2.0', '3.0'],
// 	'V': ['afc163', 'zombiej', 'yesmeck', '1.0', '2.0', '3.0']
// };

// type PrefixType = keyof typeof MOCK_DATA;

const Formulas = props => {
	const { value, onChange, id ,cursor,setCursor,tagNames} = props;
	const inputRef = useRef(null);
	const divRef = useRef(null);
	
	//  关键字搜索
	const [prefix, setPrefix] = useState('R');
	// 双向绑定输入
	const [inputValue, setInputValue] = useState(props.value || '');
	// 光标位置
	// const [cursor, setCursor] = useState({ start: 0, end: 0 });
	const { start, end } = cursor;

	const [content, setContent] = useState('');

//   const insertSpan = () => {
//     setContent(content + '<span  contentEditable="false" >New Span</span>');
//   };
	// 提示信息
	const tooltip = (
		<div className="tip">
			<p>Press R：selcet/input real metering point</p>
			<p>Press V：selcet/input Virtual metering point</p>
		</div>
	);
	// 数据双绑
	const handleInputChange = value => {
		setInputValue(value);
		onChange(value); // 通过props将最新的值传递给父组件
		setCursor({
			start: value.length,
			end: value.length
		});
	};

	const onSearch = (_, newPrefix) => {
		setPrefix(newPrefix);
	};

	const handleFocus = () => {
		// console.log('id=>', id);
		// console.log('value=>', value);
		// console.log(inputRef.current, 'selectionStart');
		// console.log(inputRef.current.textarea.selectionEnd, 'selectionEnd');

		// console.log(e.target.selectionStart, 'selectionStart');
		// console.log(e.target.selectionEnd, 'selectionEnd');
		// console.log('start=>', start);
		// console.log('end=>', end);
	};
	// 失去焦点
	const handleBlur = () => {
		// console.log(inputRef.current.textarea.selectionStart, '失去焦点Start');
		// console.log(inputRef.current.textarea.selectionEnd, '失去焦点End');
		props.setFocus(id);
		setCursor({
			start: inputRef.current.textarea.selectionStart,
			end: inputRef.current.textarea.selectionEnd
		});
	};
	// 点击事件 获取光标位置
	const handleClick = e => {
		// console.log(e.target.selectionStart, 'selectionStart');
		// console.log(e.target.selectionEnd, 'selectionEnd');
		// 存储光标位置
		setCursor({
			start: e.target.selectionStart,
			end: e.target.selectionEnd
		});
	};

	// 按钮点击事件 传入运算符
	const handleButtonClick = text => {
		if (text === '+') {
			handleInputChange(`${value.substring(0, start)} + ${value.substring(end)} `);
			setCursor({
				start: start + 2,
				end: end + 2
			});
		} else if (text === '-') {
			// handleInputChange(`${inputValue} - `);
			handleInputChange(`${value.substring(0, start)} - ${value.substring(end)} `);
			setCursor({
				start: start + 2,
				end: end + 2
			});
		} else if (text === '*') {
			handleInputChange(`${value.substring(0, start)} * ${value.substring(end)} `);
			setCursor({
				start: start + 2,
				end: end + 2
			});
		} else if (text === '/') {
			handleInputChange(`${value.substring(0, start)} / ${value.substring(end)} `);
			setCursor({
				start: start + 2,
				end: end + 2
			});
		} else if (text === '()') {
			// 选中了一段文本
			if (start !== end) {
				handleInputChange(
					`${value.substring(0, start)}(${value.substring(
						start,
						end
					)})${value.substring(end)}`
				);
			} else {
				handleInputChange(`${value.substring(0, start)} (  ) ${value.substring(end)} `);
				setCursor({
					start: start + 3,
					end: end + 3
				});
			}
		} else if (text == 'SUM') {
			// 其他按钮操作
			// 选中了一段文本
			if (start !== end) {
				handleInputChange(
					`${value.substring(0, start)}SUM(${value.substring(
						start,
						end
					)})${value.substring(end)}`
				);
			} else {
				handleInputChange(
					`${value.substring(0, start)} SUM(  ) ${value.substring(end)} `
				);
				setCursor({
					start: start + 6,
					end: end + 6
				});
			}
		}
	};

	return (
		<>
			<Mentions
				contentEditable
				notFoundContent="No metering points found"
				autoFocus
				ref={inputRef} // 将inputRef指定为Mentions组件的ref属性
				autoSize={{ minRows: 2 }}
				style={{ width: '100%' }}
				placeholder="input R to mention RTag, V to mention VTag"
				prefix={['R', 'V']}
				// onChange={onChange}
				value={value}
				onChange={handleInputChange}
				onSearch={onSearch}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onSelect={(option,prefix)=>{
					console.log('VALUE=>',value);
					console.log('start=>', start);
					console.log('end=>', end);
					console.log('option=>',option);
					console.log('prefix=>',prefix);
					handleInputChange(`${value.slice(0, (start-searchLength-1))}${option.value}${inputValue.substring(end)}`);
				}}
				// value={value}
				onClick={handleClick}
				options={((tagNames && tagNames[prefix])|| []).map(value => {
					return {
						key: value,
						value: `{${value}}`,
						label: value
					};
				})}
			/>
			{/* <div ref={divRef} contentEditable  style={{border:'1px solid',height:'80px'}} dangerouslySetInnerHTML={{ __html: content }} >
			</div>
				 <button onClick={insertSpan}>点击插入<span>标签</span></button> */}
			<div className="buttonBox">
				<Button
					onClick={() => {
						handleButtonClick('+');
					}}
				>
					+
				</Button>
				<Button
					onClick={() => {
						handleButtonClick('-');
					}}
				>
					-
				</Button>
				<Button
					onClick={() => {
						handleButtonClick('*');
					}}
				>
					*
				</Button>
				<Button
					onClick={() => {
						handleButtonClick('/');
					}}
				>
					/
				</Button>
				<Button
					onClick={() => {
						handleButtonClick('()');
					}}
				>
					( )
				</Button>
				<Button
					onClick={() => {
						handleButtonClick('SUM');
					}}
				>
					SUM
				</Button>
				<Button shape="round">Metering Point Name</Button>
				<Tooltip style={{ width: ' 292px' }} placement="right" title={tooltip}>
					<ExclamationCircleFilled />
				</Tooltip>
			</div>
		</>
	);
};

export default Formulas;
