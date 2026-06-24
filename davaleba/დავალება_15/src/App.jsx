import FaqList from './components/FaqList'
import image from './assets/image.png'
import im from './assets/im.png'
import box from './assets/box.png'



function App() {
  return (
    <div style={styles.card}>
      <div style={styles.leftSide}>
        <img src={image} alt="" style={styles.image}/>
         <img src={im} alt="" style={styles.im}/>
         <img src={box} alt="" style={styles.box}/>
        
      
        
      </div>
       

      <div style={styles.rightSide}>
        <FaqList />
      </div>

    </div>
  )
}

const styles = {
  card: {
    display: 'flex',
    width: '920px',
    height:'509px',

    background: '#ffffff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 40px rgba(124, 111, 205, 0.15)',
  },
  leftSide: {
    
    flex: '0 0 55%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },

  rightSide: {
    width:'350px',
    position:'relative',
    top:'60px',
    left:'-25px',
    flex: 1,
    padding: '2rem 2rem',
    overflowY: 'auto',
  },
  image: {
  position:'absolute',
  width: '964px',
  height: '568px',
  top:'380px',
  left:'400px',
  objectFit: 'contain',
  zIndex: 1,
},
  im: {
  position:'absolute',
  width: '472px',
  height: '359px',
  top:'400px',
  left:'713px',
  objectFit: 'contain',
  zIndex: 2,


  
},  box: {
  position:'absolute',
  width: '170px',
  height: '210px',
  top:'524px',
  left:'657px',
  objectFit: 'contain',
  zIndex: 2,},



}

export default App