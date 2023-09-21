import React, { useState, useEffect, useRef ,useLayoutEffect} from 'react';
import { Button } from 'antd';

function EditNode(props) {
	const { value, onChange, id } = props;
	const [HTML, setHTML] = useState(value);
	const [offset, setOffset] = useState();
	const textRef = useRef();

	useEffect(() => {
		setHTML(value); // 当外部value变化时，更新组件内部的HTML
	}, [value]);

	useLayoutEffect(() => {
		if (offset !== undefined && textRef.current && textRef.current.childNodes[0]) {
			const newRange = document.createRange();
			newRange.setStart(textRef.current.childNodes[0], offset);
			const selection = document.getSelection();
			selection.removeAllRanges();
			selection.addRange(newRange);
		}
	}, [offset]);

	function inputHandler(ev) {
		const range = document.getSelection().getRangeAt(0);
		setOffset(range ? range.startOffset : 0);
		const newValue = ev.target.innerHTML;
		setHTML(newValue);

		// 将新值传递给外部
		if (onChange) {
			onChange(newValue);
		}
	}
 // 获取光标位置的函数
 function getCursorPosition() {
  const selection = document.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const startContainer = range.startContainer;
    const startOffset = range.startOffset;
    console.log('光标位置：', startContainer, startOffset);
  }
}
	 // 处理按钮点击事件，向内容中插入运算符，并获取光标位置
   function handleOperatorClick(operator) {
    const selection = document.getSelection();
    const range = selection ? selection.getRangeAt(0) : null;

    if (range) {
      const newNode = document.createTextNode(operator);
      range.insertNode(newNode);
      range.setStartAfter(newNode);
      range.setEndAfter(newNode);
      range.collapse(false);
      setOffset(range.startOffset);

      // 更新内容并触发onChange
      const newHTML = textRef.current.innerHTML;
      setHTML(newHTML);
      if (onChange) {
        onChange(newHTML);
      }

      // 获取光标位置
      getCursorPosition();
    }

    // 获取焦点以确保光标位于<div>内
    textRef.current.focus();
  }

	// 焦点失去时执行的操作
	function handleBlur() {
		console.log('Editor lost focus');
		// 可以在此处执行失去焦点时的操作
		props.setFocus(id);
	}

	// 焦点获得时执行的操作
	function handleFocus() {
		console.log('Editor got focus');
		// 可以在此处执行获得焦点时的操作
	}

	console.log(textRef, 'textRef');
	return (
		<>
			<div
				contentEditable
				suppressContentEditableWarning
				style={{ border: '1px solid #ccc', minHeight: '100px', padding: '10px' }}
				ref={textRef}
				onInput={inputHandler}
				dangerouslySetInnerHTML={{ __html: HTML }}
				onBlur={handleBlur}
				onFocus={handleFocus}
			></div>
			<div>html: {HTML}</div>
			<div>
				<Button onClick={() => handleOperatorClick('+')}>+</Button>
				<Button onClick={() => handleOperatorClick('-')}>-</Button>
				<Button onClick={() => handleOperatorClick('*')}>*</Button>
				<Button onClick={() => handleOperatorClick('/')}>/</Button>
				<Button onClick={() => handleOperatorClick('()')}>( )</Button>
				<Button onClick={() => handleOperatorClick('SUM()')}>SUM()</Button>
			</div>

			<li>{`tagId: 4789901,
    tagName: '060PM 9080(G)',
    tagType: 1,
    calculationStepName: '1分钟'`}</li>
		</>
	);
}

export default EditNode;
