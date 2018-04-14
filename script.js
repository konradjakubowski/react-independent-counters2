class StopWatch extends React.Component {
  constructor(display) {

    super(display);
    this.state = {
      running: false,
      display: display,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  reset() {
    this.setState({
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    });
  }

  format(times) {
    return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(
      Math.floor(this.state.miliseconds)
    )}`;
  }

  start() {
    if (!this.running) {
      (this.running = true), (this.watch = setInterval(() => this.step(), 10));
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
  }

  calculate() {
    let { miliseconds, seconds, minutes } = this.state;

    miliseconds += 1;
    if (miliseconds >= 100) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    this.setState({
      miliseconds: miliseconds,
      seconds: seconds,
      minutes: minutes
    });
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  render() {
    return (
      <div>
        <nav className="controls">
          <button className="start button" onClick={() => this.start()}>Start</button>
          <button className="stop button" onClick={() => this.stop()}>Stop</button>
        </nav>
        <div className={"stopwatch"}>{this.format()}</div>
      </div>
    );
  }
}

const stopwatch = new StopWatch(document.querySelector(".stopwatch"));

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

const app = document.getElementById("app");
ReactDOM.render(<StopWatch />, app);