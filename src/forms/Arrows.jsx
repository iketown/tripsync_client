import React from "react"
import { ArcherElement } from "react-archer"

export function RightArrowElement({ children, id, pointTo }) {
  return (
    <ArcherElement
      id={id}
      relations={
        pointTo && [
          {
            targetId: pointTo,
            targetAnchor: "left",
            sourceAnchor: "right"
          }
        ]
      }
      style={{ display: "inline-block" }}
    >
      <div style={{ padding: "5px" }}>{children}</div>
    </ArcherElement>
  )
}
