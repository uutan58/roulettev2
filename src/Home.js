import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './images/favicon.png'; // 背景画像のパスをインポート

function Home() {
  const navigate = useNavigate();

  const navigateToRoulette = () => {
    navigate('/roulette'); // '/roulette'へ遷移
  };

  return (
    <div style={{
      textAlign: 'center',
      // marginTop: '50px',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: '100%', // 背景画像をカバーするように設定
      backgroundPosition: 'center', // 背景画像を中央に配置
      backgroundRepeat: 'no-repeat', // 画像を繰り返さない
      width: '100%',
      height: '100vh' }}>
    <div style={{
      backgroundColor: '#fff9d9',
      }}>
    <div>
      <img src="image.png" alt="自分、なに飲むん？" style={{ maxWidth: '100%', marginBottom: '25px' }} />
      <p style={{fontFamily: 'Sawarabi Mincho', color: '#071e3e', backgroundColor: '#fff9d9'}}>居酒屋やバーで、どのお酒を飲むか悩んでいるそこのあなたへ</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={navigateToRoulette}
          style={{
            fontFamily: 'Sawarabi Mincho',
            color: '#071e3e',
            padding: '10px',
            margin: '20px',
            borderRadius: '5px',
            }}>
            飲み始める
        </button>
      </div>
      <p style={{
        fontFamily: 'Sawarabi Mincho',
        position: 'absolute',
        bottom: '0px',
        textAlign: 'center',
        marginLeft: '15px',
        backgroundColor: 'white'
        }}>
        ※本アプリはスマホでの使用を推奨しています。
      </p>
      </div>
    </div>
    </div>
  );
}

export default Home;