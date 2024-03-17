import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateをimport
import Button from './components/Button'; // Buttonコンポーネントのパスは適宜調整してください

function Home() {
  const navigate = useNavigate();

  const navigateToRoulette = () => {
    navigate('/roulette'); // '/roulette'へ遷移
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img src="image.png" alt="自分、なに飲むん？" style={{ maxWidth: '100%', marginBottom: '30px' }} />
      <p>居酒屋やバーで、どのお酒を飲むか悩んでいるそこのあなたへ</p>
      <button onClick={navigateToRoulette}>ルーレットに決めてもらう</button>
    </div>
  );
}

export default Home;