import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from './components/Modal';
import Button from './components/Button';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const rotationRef = useRef(0);
  const rotationSpeed = useRef(1.0);
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  const [isStartButtonPressed, setIsStartButtonPressed] = useState(false);
  const [isStopButtonPressed, setIsStopButtonPressed] = useState(false);
  const lastTimeRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState(['レモンサワー', 'ビール', '日本酒', 'ハイボール', 'ウイスキー', '焼酎']); // アプリ名の状態管理
  const [editIndex, setEditIndex] = useState(null); // 編集中のアイテムのインデックス
  const [editText, setEditText] = useState(''); // 編集中のテキスト

  // 画面サイズに合わせてキャンバスサイズを動的に調整するuseCallback
  const updateCanvasSize = useCallback(() => {
    const size = window.innerWidth < 768 ? window.innerWidth * 0.9 : Math.min(500, window.innerWidth * 0.75);
    setCanvasSize({ width: size, height: size });
  }, []);

  // ウィンドウサイズ変更時のイベントリスナーを設定するuseEffect
  useEffect(() => {
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  // アイテムの名前を更新する関数
  const updateItem = (index, newName) => {
    const updatedItems = items.map((item, i) => i === index ? newName : item);
    setItems(updatedItems);
    setEditIndex(null); // 編集モードを解除
    setEditText(''); // 編集用テキストをクリア
  };

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
      context.font = '20px "MS Mincho", "Hiragino Mincho ProN", serif';
      context.fillText(items[i], radius - 10, 0);
      context.strokeStyle = 'black';
      context.lineWidth = 0.2;
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
            rotationSpeed.current *= 0.995; // 減速率をより小さくして緩やかに停止
            requestAnimationFrame(decelerate);
        } else {
          rotationSpeed.current = 0;
          setIsSpinning(false);

          const selectedAngle = (rotationRef.current % (2 * Math.PI)) + Math.PI / colors.length;
          const selectedIndex = Math.floor(colors.length - (selectedAngle / (2 * Math.PI)) * colors.length) % colors.length;
          setSelectedItem(items[selectedIndex]);
          setIsModalOpen(true);
        }
    };
    decelerate();
  };

  return (
    <div>
      <div className="canvas-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100vh',
          overflow: 'hidden'
        }}>

        <img src="image.png" alt="自分、なに飲むん？" style={{ maxWidth: '100%', marginBottom: '30px' }}/>

        <div style={{
          width: canvasSize.width,
          height: canvasSize.height,
          position: 'relative',
          display: 'flex'}}>

          <div style={{
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderTop: '50px solid red',
            position: 'absolute',
            bottom: '93%',
            left: '50%',
            transform: 'translateX(-50%)' }}></div>

          <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button onClick={startSpin} isPressed={isStartButtonPressed}>START</Button>
          <Button onClick={stopSpin} isPressed={isStopButtonPressed}>STOP</Button>
        </div>
        <Modal isOpen={isModalOpen} item={selectedItem} onClose={() => setIsModalOpen(false)} />
        </div>
        <div className="items-list" style={{ maxWidth: '200px' }}>
        {/* アイテムリストと編集機能を表示 */}
        {items.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {editIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => updateItem(index, editText)}
                autoFocus
                style={{ marginRight: '10px' }}
              />
            ) : (
              <span style={{ marginRight: '10px' }}>{item}</span>
            )}
            <Button onClick={() => { setEditIndex(index); setEditText(item); }}>編集</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
