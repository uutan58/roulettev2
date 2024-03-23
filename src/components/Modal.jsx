import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const messages = [
'よっしゃ、ルーレットの結果は【{item}】や！',
'さあ、次の一杯は【{item}】に決定やで〜。',
'【{item}】にするわ〜、これはいい選択っ。',
'今度は【{item}】を試してみようかな〜。',
'おっと、ルーレットが指したのは【{item}】やな。',
'【{item}】にしよう。これが運命や！',
'次は【{item}】にしよう。何度でも新しい体験ができるからな。',
'【{item}】, これが次の選択やで。',
'ルーレットの判断は絶対。次は【{item}】や！',
'【{item}】が選ばれたんや。これで行こう！',
'さて、次のラウンドは【{item}】やで。',
'【{item}】が次のお酒や。これがルーレットの選択やね。',
'【{item}】で決まり！これが次の一杯や。',
'ルーレットの選択、【{item}】やな。しゃーない、これでいこう！',
'【{item}】、これが次の飲み物や。楽しみやないか。',
'次の一杯は【{item}】に決まったわ。楽しみやな！',
];

function Modal({ isOpen, item, onClose, stockedItems }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout', { state: { stockedItems } });
  };

  const [selectedMessage, setSelectedMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)].replace('{item}', item);
      setSelectedMessage(randomMessage);
    }
  }, [isOpen, item]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}>
      <div style={{
        fontFamily: 'Sawarabi Mincho',
        padding: '50px',
        backgroundColor: '#fff',
        borderRadius: '5px',
      }}>
        <p>{selectedMessage}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={onClose}>おかわり</Button>
          <Button onClick={handleCheckout}>お会計</Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;