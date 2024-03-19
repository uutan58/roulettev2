import React from 'react';
import { useNavigate } from 'react-router-dom';
// import backgroundImage from './images/home-background.png'; // 背景画像のパスをインポート

function Home() {
  const navigate = useNavigate();

  const navigateToRoulette = () => {
    navigate('/roulette'); // '/roulette'へ遷移
  };

  return (
    // <div style={{
    //   textAlign: 'center',
    //   marginTop: '50px',
    //   backgroundImage: `url(${backgroundImage})`,
    //   backgroundSize: 'cover', // 背景画像をカバーするように設定
    //   backgroundPosition: 'center', // 背景画像を中央に配置
    //   backgroundRepeat: 'no-repeat', // 画像を繰り返さない
    //   width: '100%',
    //   height: '90vh' }}>
    <div>
      <img src="image.png" alt="自分、なに飲むん？" style={{ maxWidth: '100%', marginBottom: '25px' }} />
      <p style={{backgroundColor: 'white'}}>居酒屋やバーで、どのお酒を飲むか悩んでいるそこのあなたへ</p>
      <button onClick={navigateToRoulette}>ルーレットで決める</button>
      <p style={{ position: 'absolute', bottom: '0px', textAlign: 'center', marginLeft: '15px', backgroundColor: 'white' }}>
        ※本アプリはスマホでの使用を推奨しています。
      </p>
    {/* // </div> */}
    </div>
  );
}

export default Home;