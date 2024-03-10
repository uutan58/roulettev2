import React, { useState, useEffect } from 'react';
import './index.css';

const RouletteApp = () => {
  const items = ['ビール', 'レモンサワー', 'ハイボール', 'ウイスキー', '日本酒', 'チューハイ'];
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [decelerationTime, setDecelerationTime] = useState(0);

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        setRotation(prevRotation => prevRotation + 10);
      }, 10 + decelerationTime);

      return () => clearInterval(interval);
    }
  }, [isSpinning, decelerationTime]);

  const startSpin = () => {
    setIsSpinning(true);
    setDecelerationTime(0); // 回転開始時に減速時間をリセット
  };

  const stopSpin = () => {
    const decelerate = () => {
      setDecelerationTime(prevTime => {
        const newTime = prevTime + 3; // 減速を徐々に増加
        if (newTime > 100) { // 減速が一定の閾値に達したら停止
          setIsSpinning(false);
        }
        return newTime;
      });
    };

    const decelerationInterval = setInterval(decelerate, 100);
    return () => clearInterval(decelerationInterval); // クリーンアップ
  };

  return (
    <div className="roulette relative">
      <div className="roulette-pointer"></div>
      <div
        className="roulette-wheel"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'none' : `transform ${3 + decelerationTime / 50}s ease-out`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="roulette-item"
            style={{
              transform: `rotate(${index * (360 / items.length)}deg) translate(100px)`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <button className="btn-start" onClick={startSpin}>スタート</button>
      <button className="btn-stop" onClick={stopSpin}>ストップ</button>
    </div>
  );
};

export default RouletteApp;
