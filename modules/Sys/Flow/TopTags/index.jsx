import React, { Component } from 'react'
import style from './style.less'
import Search from '../../../../components/public/Search'


export class FlowTopTags extends Component {
    constructor (props) {
        super (props) 
        this.state = {

        }
    }

    render () {
        return (
            <div className={style.main}>
                 <div className={style.search}>
                    <Search />
                </div>
            </div>
        )
        
    }
}
export default FlowTopTags