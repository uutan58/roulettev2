import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// messages配列をコンポーネントの外部に配置
const messages = [
  '【{item}】にするわ〜。これ何杯目なん？飲み過ぎ注意やで〜。',
  '【{item}】にするわ〜。お酒と同じだけの水飲んだほうがええで。',
  '【{item}】にするわ〜。お前は明日を一日無駄にする覚悟ができているのか…？',
  '【{item}】にするわ〜。これを飲んだ人は、お酒で失敗したエピソードを発表してや〜。',
  '【{item}】にするわ〜。'
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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={onClose} style={{ padding: '5px', margin: '0 15px' }}>おかわりっ！</button>
          <button onClick={handleCheckout} style={{ padding: '5px', margin: '0 15px' }}>もういいかな…</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;