// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerMin: 25,
      timerSec: 0,
      limit: 25,
      isTimerOn: false,
    }
  }

  onClickStartTimer = () => {
    this.changeTimer()
    this.timerId = setInterval(
      (this.seconds = () => {
        this.setState(prevState => ({
          timerSec: prevState.timerSec === 0 ? 59 : prevState.timerSec - 1,
          timerMin:
            prevState.timerSec === 0
              ? prevState.timerMin - 1
              : prevState.timerMin,
        }))
      }),
      1000,
    )
  }

  changeTimer = () => {
    this.setState(prevState => ({
      isTimerOn: !prevState.isTimerOn,
    }))
  }

  onClickPauseTimer = () => {
    clearInterval(this.timerId)
    this.setState(prevState => ({
      isTimerOn: !prevState.isTimerOn,
    }))
  }

  onClickResetTimer = () => {
    this.onClickPauseTimer()
    this.setState({
      timerMin: 25,
      timerSec: 0,
      limit: 25,
      isTimerOn: false,
    })
  }

  onIncreaseTimerLimit = () => {
    const {isTimerOn} = this.state
    if (isTimerOn === false) {
      this.setState(prevState => ({
        timerMin: prevState.timerMin + 1,
        limit: prevState.limit + 1,
      }))
    }
  }

  onDecreaseTimerLimit = () => {
    const {isTimerOn} = this.state
    if (isTimerOn === false) {
      this.setState(prevState => ({
        timerMin: prevState.timerMin - 1 < 0 ? 0 : prevState.timerMin - 1,
        limit: prevState.limit - 1 < 0 ? 0 : prevState.limit - 1,
      }))
    }
  }

  render() {
    const {isTimerOn, timerMin, timerSec, limit} = this.state
    const newSec = '0'.concat(String(timerSec))
    const newMin = '0'.concat(String(timerMin))
    // console.log(`timerMin ${timerMin}`)
    // console.log(`timerSec ${timerSec}`)
    if (timerMin === 0 && timerSec === 0 && isTimerOn === true) {
      this.onClickPauseTimer()
    }
    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="content-container">
          <div className="timer-container">
            <div className="timer">
              <h1 className="timer-text">{`${
                String(timerMin).length === 1 ? newMin : timerMin
              }:${String(timerSec).length === 1 ? newSec : timerSec}`}</h1>
              <p className="timer-status">{isTimerOn ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="timer-controller-container">
            <div className="start-pause-reset-container">
              <div className="start-pause-button-container">
                <button
                  type="button"
                  className="play-pause-reset-button"
                  onClick={
                    isTimerOn ? this.onClickPauseTimer : this.onClickStartTimer
                  }
                >
                  <img
                    src={
                      isTimerOn
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isTimerOn ? 'pause icon' : 'play icon'}
                    className="play-pause-reset-image"
                  />
                  {isTimerOn ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="reset-button-container">
                <button
                  type="button"
                  className="play-pause-reset-button"
                  onClick={this.onClickResetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="play-pause-reset-image"
                  />
                  Reset
                </button>
              </div>
            </div>

            <div className="increment-decrement-control-container">
              <p className="set-timer-limit">Set Timer Limit</p>
              <div className="increment-decrement-button-container">
                <button
                  className="increment-decrement-buttons"
                  type="button"
                  onClick={this.onDecreaseTimerLimit}
                >
                  -
                </button>
                <p className="timer-limit">{limit}</p>
                <button
                  className="increment-decrement-buttons"
                  type="button"
                  onClick={this.onIncreaseTimerLimit}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer


