import React, { useRef, useState, useEffect } from "react";

const Chat = () => {
  const inputEl = useRef(null);
  const [selection, setSelection] = useState(null);
  const [lastRange, setLastRange] = useState(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  // ...处理编辑器信息
  const surrounds = () => {
    setTimeout(function () {
      //chrome
      let sel = window.getSelection();
      let anchorNode = sel.anchorNode;
      if (!anchorNode) return;
      if (
        sel.anchorNode === inputEl.current ||
        (sel.anchorNode.nodeType === 3 &&
          sel.anchorNode.parentNode === inputEl.current)
      ) {
        let range = sel.getRangeAt(0);
        let p = document.createElement("p");
        range.surroundContents(p);
        range.selectNodeContents(p);
        range.insertNode(document.createElement("br")); //chrome
        sel.collapse(p, 0);
        (function clearBr() {
          let elems = [].slice.call(inputEl.current.children);
          for (let i = 0, len = elems.length; i < len; i++) {
            let el = elems[i];
            if (el.tagName.toLowerCase() === "br") {
              inputEl.removeChild(el);
            }
          }
          elems.length = 0;
        })();
      }
    }, 10);
  };

  const getLastRange = () => {
    surrounds();
    // 定义最后光标位置
    setSelection(window.getSelection());

    console.log(selection);
    if (selection && selection.rangeCount > 0) {
      setLastRange(selection.getRangeAt(0));
    } else {
      setLastRange(null);
    }
  };
  const insertEmoji = (e) => {
    const img = e.currentTarget.cloneNode(true);
    // 判断是否有最后光标对象存在
    if (lastRange) {
      // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
      selection.removeAllRanges();
      selection.addRange(lastRange);
    }
    //定义图片节点--》插入到光标所在位置-----》完成！下面4行是关键。直接在光标位置处插入节点。
    const range = selection.getRangeAt(0);
    range.insertNode(img);
    range.collapse(false);
    setLastRange(range); //记录插入图片后当前光标位置 (否则光标会跑到表情前面)
  };
  const getChat = () => {
    for (let item of inputEl.current.children) {
      console.log(item.innerHTML);
    }
  };
  const insertParentheses = (e) => {
  
    const selection = window.getSelection();
    const selectedText = selection.focusNode.innerHTML
    // "<button contenteditable=\"false\" style=\"width: 30px; height: 30px;\">+</button><button contenteditable=\"false\" style=\"width: 30px; height: 30px;\">+</button><button contenteditable=\"false\" style=\"width: 30px; height: 30px;\">+</button><button contenteditable=\"false\" style=\"width: 30px; height: 30px;\">+</button><br>"

    console.log(selection);
    if (selectedText) {
      const range = selection.getRangeAt(0);
      const wrappedText = `(${selectedText})`;
      range.deleteContents();
      const textNode = document.createTextNode(wrappedText);
      range.insertNode(textNode);
      range.collapse(false);
    } else {
      const range = lastRange ? lastRange.cloneRange() : selection.getRangeAt(0);
      const parentheses = document.createTextNode("()");
      range.insertNode(parentheses);
      range.collapse(false);
      setLastRange(range);
    }
  };
  return (
    <>
      <div
        className="w-100 h-100"
        contentEditable="true"
        onClick={getLastRange}
        onInput={getLastRange}
        onFocus={getLastRange}
        ref={inputEl}
        suppressContentEditableWarning  // 去除 contentEditable="true" 时react警告
      ></div>
      <button
        contentEditable="false"
        style={{ width: 30, height: 30 }}
        onClick={insertEmoji}
      >+</button>
      <button onClick={insertParentheses}>()</button>
      <button > click me</button>
    </>
  );
};

export default Chat;
