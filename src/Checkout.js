import React from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>お会計ページ</h1>
      <p>こちらでお会計を行ってください。</p>
      <button onClick={goHome}>ホームに戻る</button>
    </div>
  );
}

export default Checkout;