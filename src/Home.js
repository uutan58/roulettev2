import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './images/home-background.jpg'; // 背景画像のパスをインポート

function Home() {
  const navigate = useNavigate();

  const navigateToRoulette = () => {
    navigate('/roulette'); // '/roulette'へ遷移
  };

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '50px',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', // 背景画像をカバーするように設定
      backgroundPosition: 'center', // 背景画像を中央に配置
      width: '100vw',
      height: '100vh' }}>

      <img src="image.png" alt="自分、なに飲むん？" style={{ maxWidth: '100%', marginBottom: '30px' }} />
      <p>居酒屋やバーで、どのお酒を飲むか悩んでいるそこのあなたへ</p>
      <button onClick={navigateToRoulette}>ルーレットに決めてもらう</button>
    </div>
  );
}

export default Home;