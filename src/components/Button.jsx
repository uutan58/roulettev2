const Button = ({ isPressed, children, onClick }) => {
  const style = {
    width: '60px',
    height: '60px',
    fontSize: '16px',
    color: 'white',
    borderRadius: '50%',
    cursor: 'pointer',
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isPressed ? '#3e8e41' : '#4CAF50',
    boxShadow: isPressed ? '0 2px #666' : '0 4px #888',
    transform: isPressed ? 'translateY(4px)' : 'none',
  };

  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;