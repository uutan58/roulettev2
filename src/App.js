import React, { useState, useEffect, useRef } from 'react';

// コンポーネント外で静的データを定義
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
const items = ['ビール', 'レモンサワー', 'ハイボール', 'ウイスキー', '日本酒', 'チューハイ'];

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const rotationSpeed = useRef(0.2); // 初期回転速度
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  const [isStartButtonPressed, setIsStartButtonPressed] = useState(false); // スタートボタンの状態
  const [isStopButtonPressed, setIsStopButtonPressed] = useState(false); // ストップボタンの状態

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      colors.forEach((color, i) => {
        const startAngle = (i * 2 * Math.PI) / colors.length + rotation;
        const endAngle = ((i + 1) * 2 * Math.PI) / colors.length + rotation;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.closePath();
        context.fillStyle = color;
        context.fill();

        context.save();
        context.translate(centerX, centerY);
        context.rotate(startAngle + Math.PI / colors.length);
        context.textAlign = 'right';
        context.fillStyle = 'white';
        context.font = '18px Arial';
        context.fillText(items[i], radius - 10, 0);
        context.strokeStyle = 'black';
        context.lineWidth = 0.3;
        context.strokeText(items[i], radius - 10, 0);
        context.restore();
      });

      if (isSpinning) {
        setRotation(prev => prev + rotationSpeed.current * (Math.PI / 180));
        requestAnimationFrame(draw);
      }
    };

    draw();
  }, [isSpinning, rotation]);

  useEffect(() => {
    const updateCanvasSize = () => {
      const size = window.innerWidth < 600 ? window.innerWidth * 0.9 : 300;
      setCanvasSize({ width: size, height: size });
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const startSpin = () => {
    rotationSpeed.current = 0.01;
    setIsSpinning(true);
  };

  const stopSpin = () => {
    const decelerate = () => {
      if (rotationSpeed.current > 0.001) {
        rotationSpeed.current *= 0.95;
        requestAnimationFrame(decelerate);
      } else {
        setIsSpinning(false);
      }
    };

    decelerate();
  };

  // ボタンのベーススタイル
  const buttonStyle = {
    padding: '10px', // パディングを調整してボタンの大きさを調整
  width: '60px', // 円形ボタンの幅
  height: '60px', // 円形ボタンの高さ
  fontSize: '16px',
  color: 'white',
  border: 'none',
  borderRadius: '50%', // ボタンを完全に丸くする
  cursor: 'pointer',
  margin: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.1s ease, box-shadow 0.1s ease, background-color 0.3s ease',
};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ position: 'relative', width: canvasSize.width, height: canvasSize.height, marginBottom: '20px' }}>
        <div style={{ width: '0', height: '0', borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderTop: '50px solid red', position: 'absolute', bottom: '90%', left: '50%', transform: 'translateX(-50%)', zIndex: '10' }}></div>
        <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', maxWidth: '300px' }}>
        <button
          onMouseDown={() => setIsStartButtonPressed(true)}
          onMouseUp={() => setIsStartButtonPressed(false)}
          onMouseLeave={() => setIsStartButtonPressed(false)}
          onClick={startSpin}
          style={{
            ...buttonStyle,
            backgroundColor: isStartButtonPressed ? '#45a049' : '#4CAF50',
            boxShadow: isStartButtonPressed ? '0 2px 4px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.2)',
            transform: isStartButtonPressed ? 'translateY(4px)' : 'none',
          }}
        >
          START
        </button>

        <button
          onMouseDown={() => setIsStopButtonPressed(true)}
          onMouseUp={() => setIsStopButtonPressed(false)}
          onMouseLeave={() => setIsStopButtonPressed(false)}
          onClick={stopSpin}
          style={{
            ...buttonStyle,
            backgroundColor: isStopButtonPressed ? '#d32f2f' : '#f44336',
            boxShadow: isStopButtonPressed ? '0 2px 4px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.2)',
            transform: isStopButtonPressed ? 'translateY(4px)' : 'none',
          }}
        >
          STOP
        </button>
      </div>
    </div>
  );
}

export default App;