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
  const [notif,setNotif]=useState({})
  const loading = useSelector((state) => state.fetchDataReducer.loading);
  const error = useSelector((state) => state.fetchDataReducer.error);
  const ref=useRef();
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
  setNotif(temp);
  return temp;
}

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
    new_cured:user.new_cured,
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
        sorter: (a, b) => a.new_cured - b.new_cured,
      },
      {
        title: 'Death',
        dataIndex: 'new_death',
        key: 'new_death',
        sorter: (a, b) =>  a.new_death - b.new_death,
      },
    ];
  }
  return (

<Layout className='pad-space'>
  <div class="heading">
  <h1>Covid Dashboard using React-Redux</h1>

  </div>

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

  <br/>
    {error && !loading && <h2>{error}</h2>}

<Tabs tabPosition={"left"}>


          <TabPane tab="Active" key="1">
          <Row>
  
    <Col span={21}>
<Search ref={ref} placeholder="input search text" enterButton={'Search'} size="large" loading={false} onSearch={searchHandler}/>
    
    </Col>
    <Col offset={1} span={1}>
    <Button size='large' onClick={reset}>Reset </Button>
    </Col>
</Row>
<br/>
          <Table dataSource={formatDataSource()}  columns={columns()} bordered loading={loading} />
          </TabPane>
          <TabPane tab="Map view" key="2">
         <Row>
      <Col span={14} offset={3}>
      <India onMouseOver={(value) => getNotifDataFunt(value.nativeEvent.path[0].id)} />
     
      </Col>
      <Col>
      
      <p>{notif.length && notif[0].state_name || "Select a state"}</p>
      <table>
      
    <tr>
    <th>Active</th>
    <th>Cured</th>
    <th>Death</th>
  </tr>
 
    <tr>
    <td>{notif.length && notif[0].active || 0 }</td>
    <td>{notif.length && notif[0].cured || 0}</td>
    <td>{notif.length && notif[0].death || 0 }</td>
  </tr>
  </table>
  

      </Col>

         </Row>
       
       
          </TabPane>
        </Tabs>
  </Layout>
  );
}

export default Main;