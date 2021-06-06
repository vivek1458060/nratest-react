import React, { Component } from 'react';
import { List, Tag, Typography } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import RenderAuthModal from '../../components/RenderAuthModal';
import Countdown from 'react-countdown';
import moment from 'moment';

class Timer extends React.Component {
  state = {}
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <Countdown
        onComplete={this.props.onComplete}
        date={this.props.milliseconds}
        renderer={({ hours, minutes, seconds, completed }) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{marginRight: '10px'}}>Time Left: </span><Typography.Text mark>{hours}:{minutes}:{seconds}</Typography.Text> <span></span>
            </div>
          )
        }}
      />
    );
  }
}

class OnlineTestList extends Component {
  state = {
    tests: [],
    showSigninModal: false,
  }
  getTests = async () => {
    try {
      const res = await axios.get("/test/all");
      this.setState({ tests: res.data.tests });
    } catch (e) {
      console.log(e);
    }
  }
  async componentDidMount() {
    this.getTests();
  }
  setSigninModal = (val) => {
    this.getTests();
    this.setState({ showSigninModal: val })
  }
  onComplete = () => {
    this.forceUpdate();
  };
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center', fontSize: '24px' }}>
          Available Tests
        </h1>
        <List
          className="demo-loadmore-list"
          bordered="true"
          // loading={initLoading}
          itemLayout="vertical"
          // loadMore={loadMore}
          dataSource={this.state.tests}
          renderItem={item => (
            <List.Item
              actions={[
                <div>
                  {
                    (!item.submission || item.submission?.length === 0) && (
                      <div>
                        { moment().valueOf() > moment(item.scheduledTime).add(item.activeDuration, 'hour') && <span style={{color: 'red'}}>Test is Over</span>}
                        { moment().valueOf() < item.scheduledTime && (
                          <div style={{ marginTop: '30px', marginBottom: '10px' }}>
                            <Timer onComplete={this.onComplete} milliseconds={item.scheduledTime} />
                          </div>
                        )}
                        { moment().valueOf() > item.scheduledTime && moment().valueOf() < moment(item.scheduledTime).add(parseInt(item.activeDuration), 'hours') && (
                          <a onClick={(e) => {
                            e.preventDefault();
                            if (!this.props.user) {
                              this.setSigninModal(true);
                            } else {
                              window.open(`/online-test-appear/${item._id}`, "_blank");
                            }
                          }}>Start Test</a>
                        )}
                      </div>
                    )
                  }
                  {item.submission && item.submission?.length > 0 && (
                    <div>
                      <Tag color="green">Submitted</Tag>
                      {
                        item.submission[0]?.score !== null ? <label>Score: {item.submission[0]?.score}</label> : <label>Score: Will be announced shortly</label>
                      }
                    </div>
                  )}
                </div>
              ]}
            >
              {/* <Skeleton avatar title={false} loading={item.loading} active> */}
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
              {/* <div>content</div> */}
              {/* </Skeleton> */}
            </List.Item>
          )
          }
        >
        </List >
        <RenderAuthModal
          show={this.state.showSigninModal}
          onClose={() => this.setSigninModal(false)}
        />
        <br />
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(OnlineTestList);