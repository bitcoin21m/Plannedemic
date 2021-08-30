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

  const typeHandler = (param) => {
    setSection(() => param.target.parentElement.previousSibling.innerText)
    setType(() => param.target.innerText)
    console.log("setting type: ", param.target.innerText)
    setIsHome(() => false)
  }

  useEffect(() => {
    setDb(() => data)

    return (
      console.log(db)
    )
  },[])

  const goHome = () => {
    setIsHome(() => true)
  }

  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <h4>Plannedemic</h4>
      </div>
      { isHome ?
        <div>
          <div className={styles.intro}>
          Dear Mom, Dad, and Kelly,
          <br/>
          <br/>
          {HomeIntro()}
          <br/>
          <br/>
          Love,
          <br/>
          Brian
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
            <button onClick={goHome} className="btn btn-secondary">Back Home</button>
            <Sections param={type} articles={db.sections.filter(c => c.name == section)[0].types.filter(d => d.type == type)[0].articles}></Sections>
          </div>
        }
      </div>
  );
}

export default App;
