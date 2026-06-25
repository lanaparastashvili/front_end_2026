import { useState } from 'react'
import FaqItem from './FaqItem'
import styles from './FaqList.module.css'

const faqs = [
  {
    question: 'How many team members can I invite?',
    answer: 'You can invite up to 10 team members on the free plan. Upgrade to Pro for unlimited invites.',
  },
  {
    question: 'What is the maximum file upload size?',
    answer: 'No more than 2GB. All files in your account must fit your allotted storage space.',
  },
  {
    question: 'How do I reset my password?',
    answer: 'Go to the login page and click "Forgot password". We\'ll send a reset link to your email address.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel anytime from your account settings. No cancellation fees apply.',
  },
  {
    question: 'Do you provide additional support?',
    answer: 'Yes! Pro and Enterprise plans include priority support with guaranteed response times.',
  },
]

function FaqList() {
  const [openIndex, setOpenIndex] = useState(null)

  function handleClick(index) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>FAQ</h1>

      {faqs.map((faq, index) => (
        <FaqItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  )
}

export default FaqList