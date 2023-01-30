import React from 'react';

import classes from './Loader.module.scss'

const Loader = ({children}) => {
  return (
    <div className={classes.loader}>
         {children}
    </div>
  )
}

export default Loader
