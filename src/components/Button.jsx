import React, { useState } from 'react';

const Button = ({ children, onClick }) => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [isPressed, setIsPressed] = useState(false);

  const getRandomColor = () => {
    const colors = [
      '#ff8989', '#ff89c4', '#ff89ff', '#c489ff', '#8989ff', 
      '#89c4ff', '#89ffff', '#89ffc4', '#89ff89', '#c4ff89',
      '#ffff89', '#ffc489'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // ボタンクリック時の処理
  const handleClick = (e) => {
    setBackgroundColor(getRandomColor());
    onClick && onClick(e); // 親コンポーネントから渡されたonClickイベントを呼び出す
  };

  // ボタンのスタイル
  const style = {
    width: '80px',
    height: '60px',
    fontFamily: 'Sawarabi Mincho',
    fontSize: '15px',
    color: '#071e3e',
    borderRadius: '10px',
    cursor: 'pointer',
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
    boxShadow: '0 4px #888',
    transform: isPressed ? 'translateY(2px)' : 'translateY(-2px)', // 押されている状態に応じて変更
  };

  return (
    <button
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;