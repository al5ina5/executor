import React from "react";
import classNames from 'class-names'

export default function Button({ onClick, icon, children }) {
    return (<button className='opacity-80 hover:opacity-100 bg-accent px-2 py-1' {...{ onClick }}>
        <span className={classNames(icon && 'mr-2')}>{children}</span>
        {icon}
    </button>);
}

