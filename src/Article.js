import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.refs = React.createRef();
    this.update = this.update.bind(this);

    this.state = {
      opacity: 1
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.update, 200);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  update() {
    const elem = ReactDOM.findDOMNode(this.refs.article);
    const rect = elem.getBoundingClientRect();
    const height = rect.y;
    const windowHeight = window.innerHeight;
    const ratio = height / windowHeight;
    if (ratio > -0.45 && ratio < 0) {
      this.setState({
        opacity: 0.4 + (0.6 - Math.abs(2 * ratio))
      });
    } else if (ratio > 0.6 && ratio < 1.05) {
      this.setState({
        opacity: 0.4 + 0.8 * Math.abs(2 * (1 - ratio))
      });
    } else if (ratio > 0 && ratio < 0.6) {
      this.setState({
        opacity: 1
      });
    }
  }

  render() {
    const divStyle = {
      opacity: this.state.opacity
    };
    return (
      <a
        className="Article"
        target="_blank"
        ref={"article"}
        href={this.props.link}
        style={divStyle}
      >
        <img className="picture" src={this.props.src} />
        <div className="heading">{this.props.heading}</div>
      </a>
    );
  }
}

export default Article;
