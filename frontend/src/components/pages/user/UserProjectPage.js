import React, { Component } from 'react';
import { get } from '../../../utils/baseRequests';
import {
  parseFileName,
  parseAlphaNumeric,
  parseDateTime
} from '../../../utils/helpers';
import { Table } from 'antd';
import { Line } from 'rc-progress';
import { Link } from 'react-router-dom';
import download_pdf from '../../../res/download_pdf.svg';
import view_details from '../../../res/view_details.svg';

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
        title: 'File',
        dataIndex: 'file',
        key: 'file',
        render: text => (
          <a href={text.input} download>
            {text}
          </a>
        )
      },
      {
        title: 'Created',
        dataIndex: 'created',
        key: 'created',
        render: (text, record, index) => text.datetime
        // sorter: (a, b) => b.created.milliseconds - a.created.milliseconds
        // TODO: sorting and searching
      },
      {
        title: 'Progress',
        dataIndex: 'progress',
        key: 'progress',
        // TODO: gradient, see https://www.npmjs.com/package/rc-progress
        // TODO: make percentage representation nicer
        render: progress => (
          <div>
            <Line percent={progress} strokeWidth="5" trailWidth="5" />
            {progress}%
          </div>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: data => (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <a href={data.result} download>
              <img
                style={{ height: '35px', width: '35px' }}
                src={download_pdf}
                alt="download as pdf"
              />
            </a>
            <Link to={`/user/projects/${data.key}`}>
              <img
                style={{ height: '38px', width: '35px' }}
                src={view_details}
                alt="view job details"
              />
            </Link>
          </div>
        )
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
          key: parseAlphaNumeric(item.url),
          name: item.name,
          description: item.description,
          created: {
            datetime: parseDateTime(item.created),
            milliseconds: Date.parse(item.created)
          },
          estimated: item.estimated,
          file: parseFileName(item.project),
          progress: item.progress,
          result: item.result
        };
      })
    };
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
