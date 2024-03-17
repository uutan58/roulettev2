import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './images/checkout-background.jpg';

function Checkout() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div
      style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', // 背景画像をカバーするように設定
      backgroundPosition: 'center', // 背景画像を中央に配置
      width: '100vw',
      height: '100vh'
      }}>
      <h1>お会計ページ</h1>
      <p>こちらでお会計を行ってください。</p>
      <button onClick={goHome}>ホームに戻る</button>
    </div>
  );
}

export default Checkout;