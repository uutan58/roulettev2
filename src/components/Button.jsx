import React, { useState } from 'react';

const Button = ({ children, onClick }) => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // 初期背景色
  const [isPressed, setIsPressed] = useState(false); // ボタンが押されているかの状態

  // ランダムな色を生成する関数
  const getRandomColor = () => {
    const colors = [
      '#e6194B', '#3cb44b', '#ffe119', '#0082c8', '#f58231', 
      '#911eb4', '#46f0f0', '#f032e6', '#d2f53c', '#fabebe', 
      '#008080', '#e6beff', '#aa6e28', '#fffac8', '#800000', 
      '#aaffc3', '#808000', '#ffd8b1', '#000080', '#808080', 
      '#ffe4e1', '#b15928'
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
    width: '60px',
    height: '60px',
    fontSize: '16px',
    color: 'black',
    borderRadius: '50%',
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