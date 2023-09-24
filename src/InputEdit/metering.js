// EditNode 组件
import React, { useState, useLayoutEffect, useRef ,useEffect} from 'react';
import { Button, Dropdown } from 'antd';

import './metering.css';

function EditNode(props) {
	const {form, value, onChange } = props;
	const [HTML, setHTML] = useState(value);
	const textRef = useRef();
	const [inputText, setInputText] = useState(''); //输入框
	const [showInput, setShowInput] = useState(false); //是否显示输入框
	const [showOpen, setShowOpen] = useState(false); //是否显示下拉菜单
	const [resultText, setResultText] = useState(''); //选中的结果
	const [resultList, setResultList] = useState([]); //最终结果
	const [resultStyle, setResultStyle] = useState('resultText'); //结果样式
    const [itemList, setItemList] = useState([
		{
			key: 'nofound',
			label: 'No metering points found '
		}
	]);
    useEffect(() => {
		setHTML(value); // 当外部value变化时，更新组件内部的HTML
	}, [value]);

	//下拉菜单列表
	useEffect(() => {
		if (!inputText) return;
		getDate();
		const span = document.querySelector('.inputTextWidth');
		if (!span) return;
		const width = span.clientWidth + 8 || 12;
		const input = document.querySelector('.inputText');
		input.style.width = width + 'px';
		console.log(width);
	}, [inputText]);
	useEffect(() => {
		if (showInput) {
			const input = document.querySelector('.inputText'); //点击获取焦点
			input && input.focus();
		}
	}, [showInput]);

	//   useLayoutEffect(() => {
	//     if (offset !== undefined && textRef.current && textRef.current.childNodes[0]) {
	//       const newRange = document.createRange();
	//       newRange.setStart(textRef.current.childNodes[0], offset);
	//       const selection = document.getSelection();
	//       selection.removeAllRanges();
	//       selection.addRange(newRange);
	//     }
	//   }, [offset]);

	function inputHandler(ev) {
		// const range = document.getSelection().getRangeAt(0);
		// setOffset(range.startOffset);
		const newValue = ev.target.innerHTML;
		setHTML(newValue);

		// 将新值传递给外部
		if (onChange) {
			onChange(newValue);
		}
	}

    const handleMenuClick = e => {
		console.log(e);
		setResultText('dadasd');
		setShowOpen(false);
		setTimeout(() => {
			setShowInput(false);
		}, 100);
		const arr = [
			resultList,
			<div
				data-index={resultList.length}
				className={resultStyle}
				contentEditable="false"
				suppressContentEditableWarning
			>
				{e.key} &nbsp;
			</div>
		];
		console.log(...resultList, 'resultList');
		setResultList(arr);
        setHTML(HTML,arr);
		//setSelectionRange
		setTimeout(() => {
			const divElement = document.getElementById('contentEditable');
			// console.log(id);
			// 创建一个Range对象
			var range = document.createRange();

			// 将Range的起始位置设置为div的第一个子节点
			range.setStart(divElement, 0);

			// 将光标设置到Range中
			var sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);

			// 让div获取焦点
			divElement.focus();
		}, 500);
	};
	const menuProps = {
		items: itemList,
		onClick: handleMenuClick
	};
	const getDate = str => {
		if (str == 'R') {
			return;
		} else if (str == 'V') {
			return;
		} else if (str == 'r') {
			return;
		} else if (str == 'v') {
			return;
		}
		const getList = [1, 2, 3];
		let items = [];
		getList.forEach((item, index) => {
			items.push({
				key: index,
				label: <span> {item}asdas</span>
			});
		});
		if (items.length) {
			setShowOpen(true);
		} else {
			setShowOpen(false);
		}
		setItemList(items);
	};
	const enterKey = e => {
		console.log(itemList);
		if (e.key !== 'Enter') return;
		if (itemList.length == 0) {
			setResultStyle('resultTextNofound');
			setResultText(inputText);
			setTimeout(() => {
				setShowInput(false);
			}, 100);
			setShowOpen(false);
			return;
		}
		setResultText('2');
		setShowOpen(false);
		setTimeout(() => {
			setShowInput(false);
		}, 100);
		setResultStyle('resultText');
	};
	const aa = [
		<p key="1" className={resultStyle} contentEditable="false" suppressContentEditableWarning>
			{resultText}
		</p>
	];
	return (
		<>
			<div className="metering">
				<div
				ref={textRef}
					className="contentEditable"
					id="contentEditable"
					contentEditable={true}
					suppressContentEditableWarning
					dangerouslySetInnerHTML={{ __html: HTML }}
					onInput={inputHandler}
				>
					{/* {resultList.map(item => {
                        console.log(item,'item');
						return item;
					})} */}
				</div>
				{showInput ? (
					<div className="inputCustom">
						<span className="inputTextWidth">{inputText}</span>
						<Dropdown menu={menuProps} placement="bottom" open={showOpen}>
							<input
								className="inputText"
								value={inputText}
								onInput={e => setInputText(e.target.value)}
								onKeyDown={e => enterKey(e)}
							/>
						</Dropdown>
					</div>
				) : null}
			</div>
			
			{/* <div>html: {HTML}</div> */}
			<div>
					
			<Button onClick={() => handleOperatorClick('+')}>+</Button>
			<Button onClick={() => handleOperatorClick('-')}>-</Button>
			<Button onClick={() => handleOperatorClick('*')}>*</Button>
			<Button onClick={() => handleOperatorClick('/')}>/</Button>
			<Button onClick={() => handleOperatorClick('()')}>( )</Button>
			<Button onClick={() => handleOperatorClick('SUM()')}>SUM()</Button>
			<Button
				shape="round"
				onClick={() => {
					setShowInput(true);
					setInputText('');
				}}
			>
				Metering Point Name
			</Button>
			</div>
		</>
	);
}

export default EditNode;
