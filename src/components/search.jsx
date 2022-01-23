import  React, {useEffect, useRef, useState} from 'react';
import {fetchData, filterData } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Space, Tabs, Statistic, Input, Button} from 'antd';
import Layout from 'antd/lib/layout/layout';
const { TabPane } = Tabs;
const { Search } = Input;
import { formatDataSource, columns } from './common/common';

const SearchData = ({value}) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.filterDataReducer.data);
  const loading = useSelector((state) => state.filterDataReducer.loading);
  const error = useSelector((state) => state.filterDataReducer.error);


  useEffect(() => {
    dispatch(filterData(value));
  }, [value]);



  return (

<div>

<h1 >Data for Today</h1>

<Row gutter={1} style={{textAlign:'center'}}>
  <Col span={7} />
<Col span={4}>
<Statistic title="Active Cases" value={users && users.length && users[users.length-1].new_active} />
</Col>
<Col span={4}>
<Statistic title="Discharged Cases" value={ users && users.length && users[users.length-1].new_cured}/>

</Col>
<Col span={4}>
<Statistic title="Deaths" value={users && users.length && users[users.length-1].new_death}/>

</Col>
<Col span={5} />
</Row>
<br/>
 
    {error && !loading && <h2>{error}</h2>}

    {/* <table>
    <tr>
    <th>S. no</th>
    <th>State</th>
    <th>Active</th>
    <th>Cured</th>
    <th>Death</th>
  </tr>
 
    {users && users.map((user, i) => <tr>
    <td>{i}</td>
    <td>{user.state_name}</td>
    <td>{user.active}</td>
    <td>{user.cured}</td>
    <td>{user.death}</td>
  </tr>)}

    
  
</table> */}

<Tabs tabPosition={"left"}>
          <TabPane tab="Active" key="1">
          <Table dataSource={formatDataSource(users)}  columns={columns()} bordered />;

          </TabPane>
          <TabPane tab="Tab 2" key="2">
          <Table dataSource={formatDataSource(users)}  columns={columns()} bordered />;

          </TabPane>
          <TabPane tab="Tab 3" key="3">
          <Table dataSource={formatDataSource(users)} columns={columns()} bordered />;

          </TabPane>
        </Tabs>
        </div>
  );
}

export default SearchData;