import React from "react"
import Slider, { Range, createSliderWithTooltip, Handle } from "rc-slider"
import Tooltip from "rc-tooltip"
import "rc-slider/assets/index.css"
import "rc-tooltip/assets/bootstrap.css"

const TTRange = createSliderWithTooltip(Range)

const handle = props => {
  const { value, dragging, index, ...restProps } = props
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  )
}
const wrapperStyle = { width: 400, margin: 50 }

function ChartTimeSlider() {
  return (
    <div style={wrapperStyle}>
      <p>landing times</p>
      <TTRange
        min={0}
        max={20}
        defaultValue={[3, 10]}
        tipFormatter={value => (
          <div
            style={{ fontSize: "2rem", height: "3rem", width: "3rem" }}
          >{`${value}!`}</div>
        )}
      />
    </div>
  )
}

export default ChartTimeSlider
