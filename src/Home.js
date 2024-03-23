import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './components/Button';


function Home() {
  const navigate = useNavigate();

  const navigateToRoulette = () => {
    navigate('/roulette'); // '/roulette'へ遷移
  };

  return (
  <div
    style={{
      textAlign: 'center',
      backgroundColor: '#fff9d9',
      width: '100%',
      height: '100vh',
      position: 'relative',
    }}
  >
    <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '70vh',
          flexDirection: 'column',
        }}
      >
    <div>
      <img
        src="image1.png"
        alt="自分、なに飲むん？"
        style={{ maxWidth: '100%', marginBottom: '25px' }}
      />
      <p
        style={{
          fontFamily: 'Sawarabi Mincho',
          color: '#071e3e',
        }}
      >
        次の1杯は運命（ルーレット）に任せてみませんか?
        <br />
        外食時に何を飲もうか迷った時の強い味方です。
        <br />
        ルーレットで普段は飲まないドリンクを楽しもう！
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '40vh'
        }}>
        <img src="favicon.png" alt="アイコン" style={{ maxWidth: '100%' }} />
      </div>
      <p
        style={{
          fontFamily: 'Sawarabi Mincho',
          position: 'absolute',
          bottom: '50px',
          textAlign: 'center',
          marginLeft: '15px',
        }}
      >
        ※本アプリはスマホでの使用を推奨しています。
      </p>
      <div
        style={{
          position: 'absolute',
          bottom: '200px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Button onClick={navigateToRoulette}>乾杯する</Button>
      </div>
    </div>
  </div>
  </div>
);
}

export default Home;