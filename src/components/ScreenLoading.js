import React from 'react'
import { makeStyles } from '@mui/styles'
import { Spin } from 'antd';

const useStyles = makeStyles({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 10,
    }
  
})

export default function ScreenLoading(props) {
  const classes = useStyles()
  const { text, color } = props;

  return (
    <span className={classes.container}>
      <p className={classes.title}>{text}</p>
      <Spin  size="large" />
    </span>
  ) 
}

ScreenLoading.defaultProps = {
    text: "Cargando...",
    color: "primary"
}

