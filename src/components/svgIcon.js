import PropTypes from 'prop-types'
import React from 'react'

import {importAll} from '@/utils'

try{
    console.log('import all assets of svg')
    importAll(require.context('@/assets/svg', false, /\.svg$/))
}catch(error){
    console.error('import all svg ERROR', error.message)
}

const SvgIcon = ({width, height, color, className, style, onClick, filename}) => {
    return (
        <svg width={width || 16}
             height={height || 16}
             fill={color}
             className={className}
             style={style}
             onClick={onClick}
        >
            <use xlinkHref={'#' + filename}/>
        </svg>
    )
}

SvgIcon.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    filename: PropTypes.string.isRequired
}

export default SvgIcon
