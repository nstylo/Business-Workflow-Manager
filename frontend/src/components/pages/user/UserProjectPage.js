import React, { Component } from 'react';
import { get } from '../../../utils/baseRequests';
import { Table } from 'antd';

export default class UserProjectPage extends Component {
  state = {
    results: [],
    pagination: {},
    columns: [
      {
        title: 'Title',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
      },
      {
        title: 'File',
        dataIndex: 'file',
        key: 'file',
        render: text => <a href={text.input}>{text}</a>
      },
      {
        title: 'Created',
        dataIndex: 'created',
        key: 'created'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => <span>Download as PDF</span> // TODO
      }
    ]
  };

  async componentDidMount() {
    // fetch initial data from the first page
    const data = await this.getData('/jobs/?page=1');
    // update state
    this.setData(data);
  }

  /**
   * fetches the job-data from the server
   * @param {string} url file resource link
   */
  getData = async url => {
    return await get(url).then(response => response.data);
  };

  /**
   * calls the parsing function on data and updates the state
   * @param {array} data userjobs
   */
  setData = data => {
    const parsedData = this.parseData(data);
    this.setState({
      results: parsedData.results,
      pagination: { onChange: this.handleChange, total: parsedData.total }
    });
  };

  /**
   * parses the the raw api data
   * @param {array} data userjobs
   */
  parseData = data => {
    return {
      total: data.count,
      results: data.results.map(item => {
        return {
          key: item.url,
          name: item.name,
          description: item.description,
          created: this.parseDateTime(item.created),
          estimated: item.estimated,
          file: this.parseFileName(item.project), // TODO: parse file name
          result: item.result
        };
      })
    };
  };

  /**
   * reads filename from server as url and parses into filename
   * @param {string} url to parse url
   */
  parseFileName = url => {
    return url.match(/[\w\-. ]*$/);
  };

  /**
   * Format dateTime for better readability
   * @param {string} dateTime the timestamp of the item
   */
  parseDateTime = dateTime => {
    let time = new Date(dateTime);
    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    let suffix = 'AM';
    if (hours >= 12) {
      suffix = 'PM';
      hours = hours - 12;
    }
    if (hours === 0) {
      hours = 12;
    }

    return time.toDateString() + ' - ' + hours + ':' + minutes + ' ' + suffix;
  };

  /**
   * handles pagination, calls data getter and updates local state
   */
  handleChange = async (page, pageSize) => {
    const data = await this.getData(`/jobs/?page=${page}`);
    this.setData(data);
  };

  render() {
    return (
      <Table
        columns={this.state.columns}
        dataSource={this.state.results}
        pagination={this.state.pagination}
      />
    );
  }
}
