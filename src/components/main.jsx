import  React, {useEffect, useRef, useState} from 'react';
import {fetchData, filterData } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Space, Tabs, Statistic, Input, Button, notification} from 'antd';
import Layout from 'antd/lib/layout/layout';
const { TabPane } = Tabs;
const { Search } = Input;
import India from '../new_india.svg';

const Main = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.fetchDataReducer.data);
  const [noif,setNotif]=useState({})
  const loading = useSelector((state) => state.fetchDataReducer.loading);
  const error = useSelector((state) => state.fetchDataReducer.error);
  const ref=useRef();
  const key = 'updatable';
  useEffect(() => {
    dispatch(fetchData());
  }, []);

const searchHandler = (value) =>{
  dispatch(filterData(value))
}

const getNotifDataFunt = (id) => {
  let name;
  name=id.split("__")[1].split("_1_")[0].split("_").join(" ");
  if(id.includes("path")){
    name="jammu"
  }
  console.log(name)
  const temp=users.filter((val) => {return val.state_name.toLowerCase().includes(name.toLowerCase())})
  console.log(temp)
  return temp;
}

const openNotification = (id) => {
 console.log(id)
  const getNotifData=getNotifDataFunt(id)
  const args = {
    key,
    message: <h2>{getNotifData[0].state_name}</h2>,
    description:<div>
     <table>
    <tr>
   
    <th>Active</th>
    <th>Cured</th>
    <th>Death</th>
  </tr>
 
    <tr>
   
   
    <td>{getNotifData[0].active}</td>
    <td>{getNotifData[0].cured}</td>
    <td>{getNotifData[0].death}</td>
  </tr>
  </table>
    </div>,
    duration: 10,
  };
  const conditions = ['foreign','water']
  if(!conditions.some(el => id.includes(el)))
  notification.open(args);
};
const reset = () => {
  ref.current.state.value="";
  dispatch(fetchData());
}

const formatDataSource= () => {
  const temp = [...users].splice(0,users.length-1)
  const data = temp.map((user, i) => {
    return { 
    sno:i+1,
    state_name:user.state_name,
    new_cured:user.new_cured + " ⇧ ⇩",
    new_death:user.new_death,
    new_active:user.new_active
    }
  })

  return data;
}

 const  columns = () =>{
    return [
      {
        title: 'S.no',
        dataIndex: 'sno',
        key: 'sno'
      },
      {
        title: 'State Name',
        dataIndex: 'state_name',
        key: 'state_name',
      },
      {
        title: 'Active',
        dataIndex: 'new_active',
        key: 'new_active',
        sorter: (a, b) => a.new_active - b.new_active,
      },
      {
        title: 'Cured',
        dataIndex: 'new_cured',
        key: 'new_cured',
        sorter: (a, b) => a.cured - b.cured,
      },
      {
        title: 'Death',
        dataIndex: 'new_death',
        key: 'new_death',
        sorter: (a, b) => a.death - b.death,
      },
    ];
  }
  return (

<Layout className='pad-space'>
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

<Row>
  <Col span={3}/>
    <Col span={10}>
<Search ref={ref} placeholder="input search text" enterButton={'Search'} size="large" loading={false} onSearch={searchHandler}/>
    
    </Col>
    <Col offset={9} span={1}>
    <Button size='large' onClick={reset}>Reset </Button>
    </Col>
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
          <Table dataSource={formatDataSource()}  columns={columns()} bordered />;

          </TabPane>
          <TabPane tab="Tab 2" key="2">
          <Table dataSource={formatDataSource()}  columns={columns()} bordered />;

          </TabPane>
          <TabPane tab="Tab 3" key="3">
         
       <India onMouseOver={(value) => openNotification(value.nativeEvent.path[0].id)} />
       
          </TabPane>
        </Tabs>
  </Layout>
  );
}

export default Main;