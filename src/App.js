import React, { useState, useEffect, useRef, useCallback } from 'react';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
const items = ['ビール', 'レモンサワー', 'ハイボール', 'ウイスキー', '日本酒', '焼酎'];

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const rotationRef = useRef(0);
  const rotationSpeed = useRef(1.0); // 初期回転速度を調整
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  const [isStartButtonPressed, setIsStartButtonPressed] = useState(false);
  const [isStopButtonPressed, setIsStopButtonPressed] = useState(false);
  const lastTimeRef = useRef(null);

  // 画面サイズに合わせてキャンバスサイズを動的に調整
  const updateCanvasSize = useCallback(() => {
    const size = window.innerWidth < 768 ? window.innerWidth * 0.9 : Math.min(600, window.innerWidth * 0.75);
    setCanvasSize({ width: size, height: size });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  const draw = useCallback((timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;

    // deltaTimeを使用してアニメーションの状態を更新
    const rotationIncrement = rotationSpeed.current * deltaTime * 0.1;
    rotationRef.current += rotationIncrement * (Math.PI / 180);

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;

    context.clearRect(0, 0, width, height);
    colors.forEach((color, i) => {
      const startAngle = (i * 2 * Math.PI) / colors.length + rotationRef.current;
      const endAngle = ((i + 1) * 2 * Math.PI) / colors.length + rotationRef.current;
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

    lastTimeRef.current = timestamp;

    if (isSpinning) {
      requestAnimationFrame(draw);
    }
  }, [isSpinning]);

  // `useEffect`で`draw`関数を初期化する際に、`requestAnimationFrame`を呼び出します。
  useEffect(() => {
    const animate = (time) => {
      if (isSpinning) {
        draw(time);
      }
    };
    requestAnimationFrame(animate);
  }, [isSpinning, draw]);

  const startSpin = () => {
    rotationSpeed.current = 8; // 回転速度を調整
    setIsSpinning(true);
    setIsStartButtonPressed(true);
    setTimeout(() => setIsStartButtonPressed(false), 200);
  };

  const stopSpin = () => {
    setIsStopButtonPressed(true);
    setTimeout(() => setIsStopButtonPressed(false), 200);
    const decelerate = () => {
        if (rotationSpeed.current > 0.01) {
            rotationSpeed.current *= 0.99; // 減速率をより小さくして緩やかに停止
            requestAnimationFrame(decelerate);
        } else {
            rotationSpeed.current = 0;
            setIsSpinning(false);
        }
    };
    decelerate();
  };

  const getButtonStyle = (isPressed) => ({
    padding: '10px',
    width: '60px',
    height: '60px',
    fontSize: '16px',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.1s ease, box-shadow 0.1s ease, background-color 0.3s ease',
    backgroundColor: isPressed ? '#3e8e41' : '#4CAF50',
    boxShadow: isPressed ? '0 2px #666' : '0 4px #888',
    transform: isPressed ? 'translateY(4px)' : 'none',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', maxWidth: '100%', margin: '0 auto', padding: '20px', overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: canvasSize.width, height: canvasSize.height, marginBottom: '20px' }}>
      <div style={{ width: '0', height: '0', borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderTop: '50px solid red', position: 'absolute', bottom: '93%', left: '50%', transform: 'translateX(-50%)', zIndex: '10' }}></div>
        <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', maxWidth: '300px' }}>
        <button onClick={startSpin} style={getButtonStyle(isStartButtonPressed)}>START</button>
        <button onClick={stopSpin} style={getButtonStyle(isStopButtonPressed)}>STOP</button>
      </div>
    </div>
  );
}

export default App;

