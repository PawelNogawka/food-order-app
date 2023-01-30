import React from 'react'
import classes from './Error.module.scss';
const Error = ({children}) => {
  return (
    <div className={classes.error}>
      {children}
    </div>
  )
}

export default Error
