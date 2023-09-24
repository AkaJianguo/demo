import './metering.css';
import { useEffect, useState ,useLayoutEffect,useRef} from 'react';
import { Button, Dropdown } from 'antd';
// import ReactHtmlParser from 'react-html-parser';
function Metering(props) {
	console.log(props, 'props');
	const { value, onChange, id } = props;
	const [inputText, setInputText] = useState(''); //输入框
	const [showInput, setShowInput] = useState(false); //是否显示输入框
	const [showOpen, setShowOpen] = useState(false); //是否显示下拉菜单
	const [resultText, setResultText] = useState(''); //选中的结果
	const [resultList, setResultList] = useState(value); //最终结果
	const [resultStyle, setResultStyle] = useState('resultText'); //结果样式

	const [offset, setOffset] = useState();
	const textRef = useRef();

	const [itemList, setItemList] = useState([
		{
			key: 'nofound',
			label: 'No metering points found '
		}
	]);
    useLayoutEffect(() => {
		if (offset !== undefined && textRef.current && textRef.current.childNodes[0]) {
			const newRange = document.createRange();
			newRange.setStart(textRef.current.childNodes[0], offset);
			const selection = document.getSelection();
			selection.removeAllRanges();
			selection.addRange(newRange);
		}
	}, [offset]);

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

	function inputHandler(ev) {
		const range = document.getSelection().getRangeAt(0);
		setOffset(range ? range.startOffset : 0);
		const newValue = ev.target.innerHTML;
		setResultList(newValue);

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
			...resultList,
			<div
				data-index={resultList.length}
				className={resultStyle}
				contentEditable="false"
				suppressContentEditableWarning
			>
				{e.key} &nbsp;
			</div>
		];
		console.log(arr, 'arr');
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
					dangerouslySetInnerHTML={{ __html: resultList }}
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
		</>
	);
}
export default Metering;
