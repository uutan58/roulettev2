import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from './images/checkout-background.jpg';
import Button from './components/Button';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const stockedItems = location.state?.stockedItems || [];

  const goHome = () => {
    navigate('/');
  };

  const post = {
    title: "今日、なに飲んだん？？",
    url: "https://roulettev2.vercel.app/checkout",
  };
  const handleTweet = () => {
    const tweetText = `${post.title}\n${stockedItems.map(
      (item, index) => `${index + 1}杯目: ${item}`
    ).join('\n')}`;

    const twitterUrl = `https://twitter.com/share?url=${encodeURIComponent(
      post.url
    )}&text=${encodeURIComponent(tweetText)}`;

    // 新しいタブでTwitter共有ページを開く
    window.open(twitterUrl, "_blank");
  };

  return (
    <div style={{
      textAlign: 'center',
      // marginTop: '50px',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', // 背景画像をカバーするように設定
      backgroundPosition: 'center', // 背景画像を中央に配置
      backgroundRepeat: 'no-repeat', // 画像を繰り返さない
      width: '100%',
      height: '90vh',
      }}>

      <img src="image3.png" alt="自分、なに飲んだん？" style={{ maxWidth: '100%', marginBottom: '25px' }} />

      <div style={{
        backgroundColor: '#fff9d9',
        padding: '10px',
        borderRadius: '10px',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
        }}>

        <h2 style={{
          fontFamily: 'Sawarabi Mincho',
          color: '#071e3e'
          }}>🍻今日の思い出🍻</h2>

          <div style={{ color: '#071e3e', textAlign: 'left' }}>
            {stockedItems.map((item, index) => (
              <div key={index} style={{ fontFamily: 'Sawarabi Mincho', margin: '10px' }}>{`${index + 1}杯目: ${item}`}</div>
            ))}
          </div>
        <Button onClick={handleTweet}>Xで反省</Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={goHome}>帰宅する</Button>
      </div>
    </div>
  );
}

export default Checkout;