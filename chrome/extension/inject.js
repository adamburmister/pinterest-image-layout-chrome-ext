import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <div style={{ background: 'rgba(0,0,0,0.8)' }}>
        <button onClick={this.buttonOnClick} style={{ position: 'absolute', left: 0, top: 0 }}>
          DEBUG: Show Pinterest Layout
        </button>
        <Dock
          position="bottom"
          dimMode="transparent"
          defaultSize={1}
          isVisible={this.state.isVisible}
          dockStyle={{ background: 'rgba(0,0,0,0.8)' }}
        >
          <button onClick={this.buttonOnClick}>DEBUG: Close dock</button>
          {/*<iframe
            style={{
              width: '100%',
              height: '100%',
            }}
            frameBorder={0}
            allowTransparency="true"
            src={chrome.extension.getURL('inject.html')}
          />*/}
        </Dock>
      </div>
    );
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'pinterest-layout-ext';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(<InjectApp />, injectDOM);
});
