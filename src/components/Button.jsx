import React, { useState } from 'react';

const Button = ({ children, onClick }) => {
  // ランダムな色を生成する関数
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // ボタンの背景色と押されている状態を管理するステート
  const [backgroundColor, setBackgroundColor] = useState('#4CAF50');
  const [isPressed, setIsPressed] = useState(false);

  // ボタンクリック時の処理
  const handleClick = (e) => {
    setBackgroundColor(getRandomColor()); // 背景色を変更
    setIsPressed(!isPressed); // 押された状態を切り替え
    onClick && onClick(e); // 親コンポーネントから渡されたonClickイベントを呼び出す
  };

  // ボタンのスタイル（押されている状態に応じて変更）
  const style = {
    width: '60px',
    height: '60px',
    fontSize: '16px',
    color: 'white',
    borderRadius: '50%',
    cursor: 'pointer',
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
    boxShadow: isPressed ? '0 2px #666' : '0 4px #888',
    transform: isPressed ? 'translateY(2px)' : 'none',
  };

  return (
    <button onMouseDown={() => setIsPressed(true)} onMouseUp={() => setIsPressed(false)} onMouseLeave={() => setIsPressed(false)} onClick={handleClick} style={style}>
      {children}
    </button>
  );
};

export default Button;