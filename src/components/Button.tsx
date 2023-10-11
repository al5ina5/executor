import React from "react";
import classNames from 'class-names'

export default function Button({ onClick, disabled, icon, children }) {
    return (<button className={classNames(disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-80 hover:opacity-100', ' bg-accent px-2 py-1')} {...{ onClick, disabled }}>
        <span className={classNames(icon && 'mr-2')}>{children}</span>
        {icon}
    </button>);
}

