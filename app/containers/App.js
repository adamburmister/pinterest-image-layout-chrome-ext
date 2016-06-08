import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Header from '../components/Header';
// import MainSection from '../components/MainSection';
import * as ImageActions from '../actions/images';
import style from './App.css';

@connect(
  state => ({
    images: state.images
  }),
  dispatch => ({
    actions: bindActionCreators(ImageActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    images: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    // const { images, actions } = this.props;

    return (
      <div className={style.container}>
        <div class="row center-xs">
            <div class="col-xs-6">
                <div class="box">
                    start
                </div>
            </div>
        </div>
        {/*<Header addTodo={actions.addTodo} />*/}
        {/*<MainSection images={images} actions={actions} />*/}
      </div>
    );
  }
}
