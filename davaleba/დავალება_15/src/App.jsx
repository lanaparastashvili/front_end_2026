import styles from './App.module.css'
import FaqList from './components/FaqList'
import image from './assets/image.png'
import im from './assets/im.png'
import box from './assets/box.png'
import image1 from './assets/image1.png'
import cover from './assets/cover.png'
import line from './assets/line.svg'
import line_copy from './assets/line_copy.svg'


function App() {
  return (
    <div className={styles.wrapper}>
      <img src={box} alt="" className={styles.imageBox}/>
      
      <div className={styles.card}>
        <div className={styles.leftSide}>
          <div className={styles.imageWrapper}>
            <img src={image} alt="" className={styles.imageBg}/>
            <img src={im} alt="" className={styles.imageIm}/>
            <img src={image1} alt="" className={styles.image1}/>
            <img src={cover} alt="" className={styles.cover}/>
            <img src={line} alt="" className={styles.line}/>
            <img src={line_copy} alt="" className={styles.line_copy}/>
          </div>
        </div>
        <div className={styles.rightSide}>
          <FaqList />
        </div>
      </div>
    </div>
  )
}

export default App