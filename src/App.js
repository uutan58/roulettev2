import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [colors] = useState(['red', 'orange', 'yellow', 'green', 'blue', 'purple']);
  const items = ['ビール', 'レモンサワー', 'ハイボール', 'ウイスキー', '日本酒', 'チューハイ'];
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  let rotationSpeed = useRef(0.2); // 初期回転速度をより遅く設定
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < colors.length; i++) {
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, (i * 2 * Math.PI) / colors.length + rotation, ((i + 1) * 2 * Math.PI) / colors.length + rotation);
        context.closePath();
        context.fillStyle = colors[i];
        context.fill();

        context.save();
        context.translate(centerX, centerY);
        context.rotate((i * 2 * Math.PI) / colors.length + rotation + Math.PI / colors.length);
        context.textAlign = 'right';
        context.fillStyle = 'white';
        context.font = '16px Arial';
        context.fillText(items[i], radius - 10, 0);
        context.restore();
      }

      if (isSpinning) {
        setRotation((prev) => prev + rotationSpeed.current * (Math.PI / 180));
        requestAnimationFrame(draw);
      }
    };

    draw();
  }, [isSpinning, colors, items, rotation]);

  const startSpin = () => {
    rotationSpeed.current = 0.01; // スピン開始時の回転速度をリセット
    setIsSpinning(true);
  };

  const stopSpin = () => {
    const decelerate = () => {
      if (rotationSpeed.current > 0.001) { // 減速の条件をより滑らかに
        rotationSpeed.current *= 0.95; // 減速をより緩やかに
        requestAnimationFrame(decelerate);
      } else {
        setIsSpinning(false);
      }
    };

    decelerate();
  };

  return (
    <div>
      <div style={{ position: 'relative', width: '300px', margin: 'auto' }}>
        {/* 矢印を描画する要素 */}
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '30px solid transparent',
          borderRight: '30px solid transparent',
          borderTop: '80px solid red', // 矢印の色
          position: 'absolute',
          top: '-30px', // キャンバスより30px上
          left: '115px', // キャンバスの中心に配置
          zIndex: '10',
        }}></div>
        <canvas ref={canvasRef} width={300} height={300} />
      </div>
      <div>
        <button onClick={startSpin}>スタート</button>
        <button onClick={stopSpin}>ストップ</button>
      </div>
    </div>
  );
}

export default App;