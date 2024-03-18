import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from './images/checkout-background.jpg';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const stockedItems = location.state?.stockedItems || [];

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

      <img src="image3.png" alt="自分、なに飲んだん？" style={{ maxWidth: '100%', marginBottom: '25px' }} />
      {/* <p style={{backgroundColor: 'white'}}>今日も一日お疲れ様でした。　　　　　　　　　　家まで気をつけて帰ろう。</p> */}
      <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px', margin: '20px' }}>
        <h2>🍻今日の思い出たち🍻</h2>
        {stockedItems.length > 0 ? (
          <div style={{ textAlign: 'left', marginLeft: '90px' }}>
            {stockedItems.map((item, index) => (
              <div key={index} style={{ margin: '10px 0' }}>{`${index + 1}杯目: ${item}`}</div>
            ))}
          </div>
        ) : (
          <p>アイテムが選択されていません。</p>
        )}
      </div>
      <button onClick={goHome} style={{ padding: '10px', margin: '20px' }}>お家に帰る</button>
    </div>
  );
}

export default Checkout;