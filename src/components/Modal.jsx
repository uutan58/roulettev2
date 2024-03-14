function Modal({ isOpen, item, onClose }) {
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
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '5px',
      }}>
        <p>{item}が選ばれました！</p>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}

export default Modal;