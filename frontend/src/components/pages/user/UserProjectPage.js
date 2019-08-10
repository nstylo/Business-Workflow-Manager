import React, { Component } from 'react';
import { get } from '../../../utils/requests';
import { Table } from 'antd';

export default class UserProjectPage extends Component {
  state = {
    results: [],
    pagination: {},
    columns: [
      {
        title: 'Title',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: 'Description',
        dataIndex: 'desc',
        key: 'desc'
      },
      {
        title: 'File',
        dataIndex: 'file',
        key: 'file'
      },
      {
        title: 'Created',
        dataIndex: 'created',
        key: 'created'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => <span>Download as PDF</span>
      }
    ]
  };

  getData = async url => {
    return await get(url).then(response => response.data);
  };

  setData = data => {
    const parsedData = this.parseData(data);
    this.setState({
      results: parsedData.results,
      pagination: { onChange: this.handleChange, total: parsedData.total }
    });
  };

  parseData = data => {
    return {
      total: data.count,
      results: data.results.map(item => {
        return {
          key: item.url,
          name: item.name,
          description: item.description,
          created: item.created, // TODO: parse datetime
          estimated: item.estimated,
          file: item.project,
          result: item.result,
          filename: null // TODO: parse file name
        };
      })
    };
  };

  handleChange = async (page, pageSize) => {
    const data = await this.getData(`/jobs/?page=${page}`);
    this.setData(data);
  };

  async componentDidMount() {
    const data = await this.getData('/jobs/?page=1');
    this.setData(data);
  }

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
