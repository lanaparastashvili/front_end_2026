import styles from './FaqItem.module.css'

function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className={styles.item}>

      <button
        onClick={onClick}
        className={`${styles.button} ${isOpen ? styles.open : ''}`}
      >
        <span>{question}</span>
        <span className={`${styles.icon} ${isOpen ? styles.open : ''}`}>
          ▾
        </span>
      </button>

      {isOpen && (
        <p className={styles.answer}>{answer}</p>
      )}

    </div>
  )
}

export default FaqItem