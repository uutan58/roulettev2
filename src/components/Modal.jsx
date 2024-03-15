import React, { useState, useEffect } from 'react';

function Modal({ isOpen, item, onClose }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const messages = [
    '【{item}】ください！これ何杯目なん？飲み過ぎ注意やで〜。',
    '【{item}】ください！お酒と同じだけの水飲んだほうがええで。',
    '【{item}】ください！お前は明日を一日無駄にする覚悟ができているのか…？',
    '【{item}】ください！これを飲んだ人は、お酒で失敗したエピソードを発表してや〜。',
    '【{item}】ください！'
  ];

  // 状態として選択されたメッセージを保持
  const [selectedMessage, setSelectedMessage] = useState('');

  // モーダルが開かれるたびにランダムなメッセージを選択
  useEffect(() => {
    if (isOpen) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)].replace('{item}', item);
      setSelectedMessage(randomMessage);
    }
  }, [isOpen, item, messages]);

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
        <button onClick={onClose}>おかわりっ！</button>
      </div>
    </div>
  );
}

export default Modal;