import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './images/checkout-background.jpg';

function Checkout() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '50px',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', // 背景画像をカバーするように設定
      backgroundPosition: 'center', // 背景画像を中央に配置
      backgroundRepeat: 'no-repeat', // 画像を繰り返さない
      width: '100%',
      height: '90vh',
      }}>

      <h1 style={{backgroundColor: 'white'}}>集計ページ</h1>
      <p style={{backgroundColor: 'white'}}>今日も一日お疲れ様でした。　　　　　　　　　　家まで気をつけて帰ろう。</p>
      <button onClick={goHome}>ホームに戻る</button>
    </div>
  );
}

export default Checkout;