import {Flex, Image} from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

import './index.less'

const ResourceCom = ({list}) => {
    return (
        list.map((m, index) =>
            <div key={index} className='resource-group'>
                <h3>{m.title}</h3>
                <Flex wrap='wrap' gap='middle'>
                    {m.site.map(site =>
                        <div key={site.link} className='item' onClick={() => window.open(site.link)}>
                            <Image className='site-img' src={site.logo} preview={false} height={48} width={48}/>
                            <div className='title'>
                                <p>{site.title}</p>
                                <div>{site.desc || site.title}</div>
                            </div>
                        </div>
                    )}
                </Flex>
            </div>
        )
    )
}

ResourceCom.propTypes = {
    list: PropTypes.array.isRequired
}

export default ResourceCom
