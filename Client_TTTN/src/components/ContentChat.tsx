import React from 'react'

type Props = {
  message:string;
  css:string;
  textLeftOrRight:string;
}

export default function ContentChat({message,css,textLeftOrRight}: Props) {
  return (
    <div className={textLeftOrRight}>
      <div className={css}>{message}</div>
    </div>
  )
}