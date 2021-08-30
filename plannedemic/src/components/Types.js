import styles from '../App.module.css'

const Types = props => {

    let {type, articles, intro} = props;

    return (
        <div className={styles['type-m']}>
            <h4 className={styles['type-heading']}>{type}</h4>
            <p className={styles['type-intro']}>
                {intro}
            </p>
            <div>
                {
                    articles !== undefined && articles.map(c => {
                        return (
                            <div className={styles['m-t-b-lg']}>
                                <p className={styles['content-date']}>{c.date}</p>
                                <p className={styles['content-title']}>{c.title}</p>
                                {
                                    c.subTitle.map(e => {
                                        return (<p className={styles['content-subTitle']}>- {e}</p>)
                                    })
                                }
                                {c.content.map(d => {
                                    return (<p className={styles['content-url']}><a href={d}>{d}</a></p>)
                                })}
                                {/* <p className={styles['content-url']}><a href={c.url}>{c.url}</a></p> */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Types;