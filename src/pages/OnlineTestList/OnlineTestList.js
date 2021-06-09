import React, { Component } from 'react';
import { Button, List, Tag, Typography, Descriptions, Card, PageHeader, Alert } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import RenderAuthModal from '../../components/RenderAuthModal';
import Countdown from 'react-countdown';
import moment from 'moment';
import styled from 'styled-components';
import SEO from '../../components/SEO';

const OnlineTestListWrapper = styled.div`
  .example-link {
    margin-right: 16px;
    line-height: 24px;
  };
  .example-link-icon {
    margin-right: 8px;
  };
  .ant-page-header-heading-title {
    white-space: normal;
  };
  .ant-page-header-heading-sub-title {
    white-space: normal;
  }
  @media(max-width: 992px) {
    .ant-page-header-heading-left {
      flex-direction: column;
      align-items: initial;
    }
  }
`

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
            <Typography.Text mark>{hours}:{minutes}:{seconds}</Typography.Text>
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
      const res = await axios.get("/test/all", { params: { type: 'ONLINETEST' } });
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
      <OnlineTestListWrapper>
        <SEO title="Online test series" />
        <h1 style={{ textAlign: 'center', fontSize: '24px' }}>
          Available Tests
        </h1>
        {
          this.state.tests.map((test) => {
            const hasSubmitted = test.submission && test.submission?.length > 0;
            const currentTimeGreaterThanLive = moment().isSameOrAfter(test.liveDate, 'second')
            const currentTimeLessThanLive = moment().isBefore(test.liveDate, 'second')
            return (
              <div className="site-page-header-ghost-wrapper" style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
                <PageHeader
                  ghost={false}
                  // onBack={() => window.history.back()}
                  title={test.title}
                  subTitle={test.description}
                  extra={[]}
                >
                  {/* <Typography.Paragraph>{test.description}</Typography.Paragraph> */}
                  <Descriptions size="small" column={{ sm: 2, xs: 1 }}>
                    <Descriptions.Item label="Total Question">{test.totalQuestion}</Descriptions.Item>
                    <Descriptions.Item label="Duration">{test.testDuration} mins</Descriptions.Item>
                  </Descriptions>
                  {currentTimeLessThanLive && (
                    <Descriptions size="small" column={{ sm: 2, xs: 1 }}>
                      <Descriptions.Item label="Live Date">
                        {moment().isSame(test.liveDate, 'day') ? (
                          <Timer onComplete={this.onComplete} milliseconds={test.liveDate} />
                        ) : <Typography.Text mark>{moment(test.liveDate).calendar()}</Typography.Text>}
                      </Descriptions.Item>
                    </Descriptions>
                  )}
                  <div style={{ margin: "15px 0px" }}>
                    {!hasSubmitted && currentTimeGreaterThanLive && (
                      <a
                        className="example-link"
                        onClick={(e) => {
                          e.preventDefault();
                          if(!this.props.user) return this.setState({ showSigninModal: true });
                          window.open(`/online-test-appear/${test._id}`, "_blank");
                        }}
                      >
                        <img className="example-link-icon" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" alt="Start" />
                          Start Test
                      </a>
                    )}
                    {hasSubmitted && (
                      <a
                        className="example-link"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(`/online-test-appear/${test._id}`, "_blank");
                        }}
                      >
                        <img className="example-link-icon" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" alt="Start" />
                        View Answer
                      </a>
                    )}
                  </div>
                  {hasSubmitted && (
                    <div>
                      <Alert
                        type="info"
                        showIcon
                        banner
                        message={test.submission[0]?.score !== null ? `Your Score is ${test.submission[0]?.score}` : 'Score: Will be announced shortly'}
                      />
                    </div>
                  )}
                </PageHeader>
              </div>
            )
          })
        }
        <RenderAuthModal
          show={this.state.showSigninModal}
          onClose={() => this.setSigninModal(false)}
        />
        <br />
      </OnlineTestListWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(OnlineTestList);