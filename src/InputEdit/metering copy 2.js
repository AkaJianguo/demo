/*
 * @Author: yuhaiyangz@163.com
 * @Date: 2023-09-22 14:51:24
 * @LastEditors: yuhayangz@163.com yuhayangz@163.com
 * @LastEditTime: 2023-09-23 23:01:26
 * @FilePath: \test\src\view\metering.js
 * @Description:
 */
import './metering.css';
import { useEffect, useState } from 'react';
import { Button, Dropdown } from 'antd';
function Metering() {
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
	]); //下拉菜单列表
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
	const handleMenuClick = e => {
		console.log(e);
		setResultText('dadasd');
		setShowOpen(false);
		setTimeout(() => {
			setShowInput(false);
		}, 100);
		const arr = [
			...resultList,
			<p
				data-index={resultList.length}
				className={resultStyle}
				contentEditable="false"
				suppressContentEditableWarning
			>
				{e.key} &nbsp;
			</p>
		];
		setResultList(arr);
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
		} else if (str == 'Vr') {
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
		<div>
			<div className="metering">
				<div
					className="contentEditable"
					id="contentEditable"
					contentEditable={true}
					suppressContentEditableWarning
				>
					{resultList.map(item => {
						return item;
					})}
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
			<p
				onClick={() => {
					setShowInput(true);
					setInputText('');
				}}
			>
				name
			</p>
		</div>
	);
}
export default Metering;
