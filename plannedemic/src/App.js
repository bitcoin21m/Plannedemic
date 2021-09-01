import styles from './App.module.css'
import { useEffect, useState } from 'react';
import data from './db/db.json';
import Sections from './components/Sections';
import {HomeIntro} from './static/Variables/variables'

function App() {

  const [section, setSection] = useState();
  const [type, setType] = useState();
  const [db, setDb] = useState()
  const [isHome, setIsHome] = useState(true)
  const [headerFixed, setHeaderFixed] = useState(false)

  const typeHandler = (param) => {
    setSection(() => param.target.parentElement.previousSibling.innerText)
    setType(() => param.target.innerText)
    setIsHome(() => false)
  }

  useEffect(() => {
    setDb(() => data)
    setHeaderFixed(() => window.pageYOffset > 10)
  },[])

  useEffect(() => {
    window.scrollTo(0,0)
  }, [isHome])

  const goHome = () => {
    setIsHome(() => true)
  }

  const scrollUp = () => window.scrollTo(0,0)

  document.addEventListener("scroll", (event) => setHeaderFixed(() => window.pageYOffset > 10))

  return (
    <div className={styles.App}>
      {
        headerFixed 
        ? (
            <div className={styles.header, styles['fixed-header']}>
              <h4 onClick={isHome ? scrollUp : goHome} className={styles['fixed-header-content']}>Plannedemic</h4>
              { !isHome && <button onClick={goHome} className={`btn btn-sm btn-dark ${styles['fixed-header-button']}`}>Go Back Home</button>}
            </div>
          )
        :
          (
            <div className={styles.header}>
              <h4 className={styles['header-content']} onClick={isHome ? scrollUp : goHome} >Plannedemic</h4>
              { !isHome && <button onClick={goHome} className={`btn btn-sm btn-dark ${styles['fixed-header-button']}`}>Go Back Home</button>}
            </div>
          )

      }      
      { isHome ?
        <div>
          <div className={styles.intro}>
            {HomeIntro()}
          </div>
        <hr></hr>
        <div className={styles.links}>
          {
            db != undefined && data.sections.map(c => {
              return (
                <div key={c.id}><p className={styles['link-header']} key={c.id}>{c.name}</p>
                  <div className="">
                      { db.sections.filter(d => d.name == c.name)[0] != undefined &&
                        db.sections.filter(d => d.name == c.name)[0].types.map((t) => {
                          return <button onClick={(event) => typeHandler(event)} className={`btn btn-sm btn-secondary ${styles['button-mt']} ${styles['button-mr']}`} key={t.id}>{t.type}</button>
                        })
                      }
                  </div>
                  <br/>
                </div>
              )
            })
          }
        </div>
        </div>
        :
          <div className={styles['section-container']}>
            <Sections param={type} articles={db.sections.filter(c => c.name == section)[0].types.filter(d => d.type == type)[0].articles}></Sections>
          </div>
        }
      </div>
  );
}

export default App;
