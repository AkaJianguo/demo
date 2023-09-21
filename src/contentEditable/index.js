import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'antd';

function App() {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const divRef = useRef(null);
  const mutationObserver = useRef(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    console.log(divRef.current.innerText);
  };

  const handleInput = (event) => {
    setContent(event.target.innerText);
    setCursorPosition(getCursorPosition());
  };
  
  const insertText = (text) => {
    const divElement = divRef.current;
    const cursor = window.getSelection();
  
    if (cursor && cursor.rangeCount > 0) {
      const range = cursor.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
      range.collapse();
      cursor.removeAllRanges();
      cursor.addRange(range);
      setCursorPosition(getCursorPosition());
    }
  };

  const getCursorPosition = () => {
    const cursor = window.getSelection();
    if (cursor && cursor.rangeCount > 0) {
      const range = cursor.getRangeAt(0);
      const clonedRange = range.cloneRange();
      clonedRange.selectNodeContents(divRef.current);
      clonedRange.setEnd(range.startContainer, range.startOffset);
      return clonedRange.toString().length;
    }
    return 0;
  };

  const observerCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        setCursorPosition(getCursorPosition());
        return;
      }
    }
  };

  useEffect(() => {
    if (divRef && divRef.current) {
      mutationObserver.current = new MutationObserver(observerCallback);

      const observerConfig = {
        attributes: false,
        childList: true,
        subtree: true,
        characterData: true,
        characterDataOldValue: true,
      };

      mutationObserver.current.observe(divRef.current, observerConfig);
    }

    return () => {
      if (mutationObserver.current) {
        mutationObserver.current.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        打开Modal
      </Button>
      <Modal
        title="Modal 标题"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleCancel}>
            确定
          </Button>,
        ]}
      >
        <div
					className="inner"
					suppressContentEditableWarning
					onBlur={e => setValue('valueObj', 'value1', e.target.innerHTML)}

          ref={divRef}
          contentEditable
          style={{ border: '1px solid', height: '80px' }}
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <Button onClick={() => insertText('插入文字')}>点击插入文字</Button>
        <p>光标位置：{cursorPosition}</p>
      </Modal>
    </div>
  );
}

export default App;