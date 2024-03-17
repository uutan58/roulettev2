import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// messages配列をコンポーネントの外部に配置
const messages = [
  '【{item}】ください！これ何杯目なん？飲み過ぎ注意やで〜。',
  '【{item}】ください！お酒と同じだけの水飲んだほうがええで。',
  '【{item}】ください！お前は明日を一日無駄にする覚悟ができているのか…？',
  '【{item}】ください！これを飲んだ人は、お酒で失敗したエピソードを発表してや〜。',
  '【{item}】ください！'
];

function Modal({ isOpen, item, onClose }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const [selectedMessage, setSelectedMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)].replace('{item}', item);
      setSelectedMessage(randomMessage);
    }
  }, [isOpen, item]); // messagesは静的なので依存配列に含める必要はありません

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}>
      <div style={{
        padding: '50px',
        backgroundColor: '#fff',
        borderRadius: '5px',
      }}>
        <p>{selectedMessage}</p>
        <button onClick={onClose} style={{ padding: '5px', marginRight: '30px' }}>おかわりっ！</button>
        <button onClick={handleCheckout} style={{ padding: '5px', marginLeft: '30px' }}>お会計！</button>
      </div>
    </div>
  );
}

export default Modal;