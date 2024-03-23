import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from './components/Modal';
import Button from './components/Button';
import { Link } from 'react-router-dom';

// ルーレットの背景色
const colors = [
  '#E74C3C', // 明るいレッド
  '#E67E22', // 明るいオレンジ
  '#F1C40F', // 明るいイエロー
  '#2ECC71', // 明るいグリーン
  '#3498DB', // 明るいブルー
  '#9B59B6', // 明るいパープル
];

// ドリンクのアイコン
const itemIcons = {
  'レモンサワー': '🍋',
  'ビール': '🍺',
  '日本酒': '🍶',
  'ハイボール': '🥂',
  'ウイスキー': '🥃',
  'ワイン': '🍷',
  '水': '🧊',
  'お茶':'🍵',
  'コーヒー':'☕️',
  'ソフトドリンク':'🧃',
  'カクテル':'🍸'
};

function Roulette() {
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
  const [items, setItems] = useState(['レモンサワー', 'ビール', '日本酒', 'ハイボール', 'ウイスキー', 'ワイン']); // アイテム名の初期値
  const [editIndex, setEditIndex] = useState(null); // 編集中のアイテムのインデックス
  const [editText, setEditText] = useState(''); // 編集中のテキスト
  const [stockedItems, setStockedItems] = useState([]);

  // 画面サイズに合わせてキャンバスサイズを動的に調整するuseCallback
  const updateCanvasSize = useCallback(() => {
    const size = window.innerWidth < 450 ? window.innerWidth * 0.7 : Math.min(500, window.innerWidth * 0.6);
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

    if (!isSpinning) {
      setIsSpinning(true);
      // 一瞬で停止させることで、描画を更新
      setTimeout(() => setIsSpinning(false), 10);
    }
  };

  const draw = useCallback((timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;

    // deltaTimeを使用してアニメーションの状態を更新
    const rotationIncrement = rotationSpeed.current * deltaTime * 0.1;
    rotationRef.current += rotationIncrement * (Math.PI / 180);

    const canvas = canvasRef.current;
    if (!canvas) return;
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
      context.font = '14px "Sawarabi Mincho"';
      context.fillText(items[i], radius - 10, 0);
      context.restore();
    });

    lastTimeRef.current = timestamp;

    if (isSpinning) {
      requestAnimationFrame(draw);
    }
  }, [isSpinning, items]);

  useEffect(() => {
    const animate = (time) => {
      if (isSpinning) {
        draw(time);
      }
    };
    requestAnimationFrame(animate);
  }, [isSpinning, draw]);

  const startSpin = () => {
    rotationSpeed.current = 9; // 回転速度を調整
    setIsSpinning(true);
    setIsStartButtonPressed(true);
    setTimeout(() => setIsStartButtonPressed(false), 200);
  };

  const stopSpin = () => {
    setIsStopButtonPressed(true);
    setTimeout(() => setIsStopButtonPressed(false), 200);
    const decelerate = () => {
        if (rotationSpeed.current > 0.01) {
            rotationSpeed.current *= 0.985; // 緩やかに停止させる
            requestAnimationFrame(decelerate);
        } else {
            rotationSpeed.current = 0;
            setIsSpinning(false);

            // ルーレットが停止した時点での角度を設定
            const finalAngleAdjustment = 30 * (Math.PI / 180);
            const adjustedFinalAngle = (rotationRef.current + finalAngleAdjustment) % (2 * Math.PI); // 調整された最終角度を計算
            const itemsCount = items.length; // アイテムの数
            // 調整された角度を使用して12時の位置にあるアイテムのインデックスを計算
            let selectedIndex = Math.floor(((2 * Math.PI - adjustedFinalAngle) / (2 * Math.PI)) * itemsCount) % itemsCount;
            selectedIndex = (selectedIndex + itemsCount / 1.2) % itemsCount;

            setSelectedItem(items[selectedIndex]);
            setStockedItems(prev => [...prev, items[selectedIndex]]);
            setIsModalOpen(true);
        }
    };
    decelerate();
};

  return (
    <div>
      {/* ルーレット */}
      <div className="canvas-container"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <div>
        <Link to="/">
          <img src="image1.png" alt="自分、なに飲むん？" style={{ maxWidth: '100%', marginBottom: '30px' }} />
        </Link>
        </div>

        {/* 矢印のスタイル */}
        <div style={{
          position: 'relative'
          }}>
          <div style={{
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderTop: '50px solid red',
            position: 'absolute',
            bottom: '93%',
            left: '50%',
            transform: 'translateX(-50%)' }} />

          {/* ルーレットを描画 */}
          <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
        </div>

        {/* 飲んだドリンクのストックのスタイル */}
        <div style={{ marginTop: '20px', display: 'flex' }}>
          {stockedItems.map((item, index) => (
            <div key={index}
              style={{marginRight: '10px'}}>
              {itemIcons[item] || '🚫'}{/* デフォルトアイコン */}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex' }}>
          <Button onClick={startSpin} isPressed={isStartButtonPressed}>START</Button>
          <Button onClick={stopSpin} isPressed={isStopButtonPressed}>STOP</Button>
        </div>

        <img src="image2.png" alt="ほかになに飲むん？" style={{ maxWidth: '100%' }}/>

        <Modal isOpen={isModalOpen} item={selectedItem} onClose={() => setIsModalOpen(false)} stockedItems={stockedItems} />
        </div>

        {/* 編集ボタン全体のスタイル */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="items-list"
            style={{ fontFamily: 'Sawarabi Mincho', display: 'flex', flexWrap: 'wrap' }}>

            {/* 編集ボタンのスタイル */}
            {items.map((item, index) => (
              <div key={index} style={{ width: '50%' }}>

                {/* 編集時のテキストボックスのスタイル */}
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                    style={{ boxSizing: 'border-box' }}
                  />
                ) : (
                  <span style={{ color: '#071e3e' }}>{item}</span>
                )}

                {/* 編集&完了ボタン */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={() => editIndex === index ? updateItem(index, editText) : setEditIndex(index) || setEditText(item)}>
                    {editIndex === index ? '完 了' : '編 集'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default Roulette;