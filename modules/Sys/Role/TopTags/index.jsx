
import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Search from '../../../../components/public/Search'
import style from './style.less'
import axios from '../../../../api/axios'
import { orgSearch } from '../../../../api/api'

export class SysRoleTopTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roleBtnData: [
                {
                    id: 1,
                    name: 'ValidTopBtn',
                    aliasName: '有效'
                },
                {
                    id: 2,
                    name: 'ImportTableTopBtn',
                    aliasName: '导入表格'
                },
                {
                    id: 3,
                    name: 'ExportTableTopBtn',
                    aliasName: '导出表格'
                },
            ]
        }
    }

    search = (val) => {
        axios.get(orgSearch + `?searcher=${val}`).then(res => {
            this.props.search(res.data.data)
        })
    }

    render() {
        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(import('../../../../components/public/TopTags/' + v.name))
        })
        return (
            <div className={style.main}>
                <div className={style.search}>
                    <Search search={this.search} />
                </div>
                <div className={style.tabMenu}>
                    {
                        topTags.map((Component, i) => {
                            return <Component key={i} />
                        })
                    }
                </div>

            </div>
        )
    }
}

export default SysRoleTopTags



