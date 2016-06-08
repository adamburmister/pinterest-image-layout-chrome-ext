import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import Root from '../../app/containers/Root';
import createStore from '../../app/store/configureStore';
import { addImage } from '../../app/actions/images';

let handleExtensionClick = () => {};

class InjectApp extends Component {
  constructor(props) {
    super(props);

    this.store = createStore({ images: [] });
    this.state = { isVisible: false };
    handleExtensionClick = () => this.buttonOnClick();
  }

  populateImagesIntoStore = () => {
    document.querySelectorAll('img').forEach((img) => {
      this.store.dispatch(addImage({
        id: img.src,
        src: img.src,
        width: img.width,
        height: img.height,
      }));
    });
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
    this.populateImagesIntoStore();
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
          <Root store={this.store} />,
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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.toggle) {
      handleExtensionClick();
    }
  });
