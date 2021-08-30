import { useEffect, useState } from 'react'

import Types from './Types'
import {GetType} from '../static/Variables/variables'

const Sections = (props) => {
    const [type, setType] = useState(props.param)
    const [content, setContent] = useState()

    useEffect(() => {
        setContent(() => <Types intro={GetType(type)} type={type} articles={props.articles}></Types>)
    }, [])

    return (
        <>
            {content}
        </>
    )
}

export default Sections