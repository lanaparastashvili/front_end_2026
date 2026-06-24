

function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div style={styles.item}>

      <button
        onClick={onClick}
        style={{
          ...styles.button,
          fontWeight: isOpen ? '600' : '400',
        }}
      >
        <span>{question}</span>
        <span style={{
          ...styles.icon,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          ▾
        </span>
      </button>

      {isOpen && (
        <p style={styles.answer}>{answer}</p>
      )}

    </div>
  )
}

const styles = {
  item: {
    borderBottom: '1px solid #e8e4f5',
  },
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'left',
    transition: 'color 0.2s',
  },
  icon: {
    fontSize: '18px',
    color: 'red',
    flexShrink: 0,
    transition: 'transform 0.2s',
    display: 'inline-block',
  },
  answer: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.6',
    paddingBottom: '14px',
  },
}

export default FaqItem