import React, {useState, useRef} from 'react';

const replaceCaret = (el) => {
  const cursor = document.createTextNode('');
  el.appendChild(cursor);

  const isFocused = document.activeElement === el;
  if (cursor === null || cursor.nodeValue === null || !isFocused) return;

  const selection = window.getSelection();
  if (selection !== null) {
    const range = document.createRange();
    range.setStart(cursor, cursor.nodeValue.length);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  }

  if (el instanceof HTMLElement) el.focus();
};

const ContentEditable = ({
  tagName,
  value,
  disabled,
  onChange,
  innerRef,
  checkUpdate,
  onBlur,
  onKeyUp,
  onKeyDown,
  children,
  ...passProps
}) => {
  const [lastHtml, setLastHtml] = useState(value || '');
  const elRef =
    typeof innerRef === 'function' ? useRef(null) : innerRef || useRef(null);

  const handleInput = (originalEvent) => {
    const el = elRef.current;

    if (!el) return;

    const html = el.innerHTML;
    if (onChange && html !== lastHtml) {
      const event = {
        ...originalEvent,
        target: {
          ...originalEvent.target,
          value: html || '',
        },
      };
      onChange(event);
    }

    setLastHtml(html);
  };

  const handleBlur = (originalEvent) => {
    if (onBlur) onBlur();
    handleInput(originalEvent);
  };

  const handleKeyUp = (originalEvent) => {
    if (onKeyUp) onKeyUp();
    handleInput(originalEvent);
  };

  const handleKeyDown = (originalEvent) => {
    if (onKeyDown) onKeyDown();
    handleInput(originalEvent);
  };

  const getEl = () => {
    if (!!innerRef && typeof innerRef !== 'function') {
      return innerRef.current;
    }

    return elRef.current;
  };

  const el = getEl();

  if (el) {
    if (checkUpdate) {
      if (!checkUpdate(passProps, passProps)) return null;
    }
    replaceCaret(el);
  }

  return React.createElement(
    tagName || 'div',
    {
      ...passProps,
      ref: elRef,
      contentEditable: !disabled,
      onInput: handleInput,
      onBlur: handleBlur,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      dangerouslySetInnerHTML: {__html: value},
    },
    children
  );
};

export default ContentEditable;