import React, { useRef, useEffect } from 'react';

const EditNode = ({ value, onChange }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (value !== ref.current.innerHTML) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  const handleInputChange = () => {
    const html = ref.current.innerHTML;
    if (onChange && html !== value) {
      onChange(html);
    }
  };

  return (
    <div
      contentEditable={true}
      style={{ border: '1px solid #ccc', minHeight: '100px', padding: '10px' }}
      ref={ref}
      dangerouslySetInnerHTML={{ __html: value }}
      onInput={handleInputChange}
      onBlur={handleInputChange}
    />
  );
};

export default EditNode;
