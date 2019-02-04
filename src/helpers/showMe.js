import React from "react"
import styled from "styled-components"

const TinyObject = styled.pre`
  color: purple;
  font-size: 10px;
  border: 1px dashed purple;
  .objectName {
    font-size: 12px;
    color: orange;
  }
`

export const showMe = (obj, name) => (
  <TinyObject>
    {name && <p className="objectName">{name}</p>}
    {JSON.stringify(obj, 0, 2)}
  </TinyObject>
)
