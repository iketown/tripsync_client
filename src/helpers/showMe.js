import React from "react"
import styled from "styled-components"

const TinyObject = styled.pre`
  color: purple;
  font-size: 10px;
  border: 1px dashed purple;
`

export const showMe = (obj, name) => (
  <TinyObject>{JSON.stringify(obj, 0, 2)}</TinyObject>
)
