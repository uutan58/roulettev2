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

  const updateCanvasSize = useCallback(() => {
    const size = window.innerWidth < 600 ? window.innerWidth * 0.9 : 300;
    setCanvasSize({ width: size, height: size });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;
    const rotation = rotationRef.current;

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
      context.restore();
    });

    if (isSpinning) {
      rotationRef.current += rotationSpeed.current * (Math.PI / 180);
      requestAnimationFrame(draw);
    }
  }, [isSpinning]);

  useEffect(() => {
    if (isSpinning) {
      requestAnimationFrame(draw);
    }
  }, [isSpinning, draw]);

  const startSpin = () => {
    rotationSpeed.current = 2.5; // 回転速度を調整
    setIsSpinning(true);
    setIsStartButtonPressed(true); // ボタン押下状態を設定
    setTimeout(() => setIsStartButtonPressed(false), 200); // 押下状態をリセット
  };

  const stopSpin = () => {
    setIsStopButtonPressed(true); // ボタン押下状態を設定
    setTimeout(() => setIsStopButtonPressed(false), 200); // 押下状態をリセット
    const decelerate = () => {
        if (rotationSpeed.current > 0.01) { // 減速開始の閾値を調整
            rotationSpeed.current *= 0.99; // 減速率をより小さくして緩やかに停止
            requestAnimationFrame(decelerate);
        } else {
            rotationSpeed.current = 0; // 回転速度を0に設定して完全に停止
            setIsSpinning(false); // スピニングを停止
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
    backgroundColor: isPressed ? '#3e8e41' : '#4CAF50', // 押下時と非押下時の背景色を変更
    boxShadow: isPressed ? '0 2px #666' : '0 4px #888', // 押下時と非押下時のボックスシャドウを変更
    transform: isPressed ? 'translateY(4px)' : 'none', // 押下時にボタンを下に移動
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ position: 'relative', width: canvasSize.width, height: canvasSize.height, marginBottom: '20px' }}>
      <div style={{ width: '0', height: '0', borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderTop: '50px solid red', position: 'absolute', bottom: '90%', left: '50%', transform: 'translateX(-50%)', zIndex: '10' }}></div>
        <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', maxWidth: '300px' }}>
        <button
          onClick={startSpin}
          style={getButtonStyle(isStartButtonPressed)}
        >
          START
        </button>
        <button
          onClick={stopSpin}
          style={getButtonStyle(isStopButtonPressed)}
        >
          STOP
        </button>
      </div>
    </div>
  );
}

export default App;
