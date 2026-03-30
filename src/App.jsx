import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Layout,
  Menu,
  Breadcrumb,
  Tabs,
  Button,
  Input,
  DatePicker,
  Table,
  Tag,
  Space,
  Pagination,
  Badge,
  Dropdown,
  Avatar
} from 'antd';
import { UserOutlined, BellOutlined, DownOutlined, ShopOutlined, HomeOutlined, DollarOutlined, CalendarOutlined, FileTextOutlined, SettingOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import CreateActivity from './CreateActivity';

const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

// 模拟数据
const activityData = [
  {
    key: '1',
    activityId: '601',
    orderNo: 'A1D26S0304001000005',
    activityName: '首单活动3m',
    activityType: '根据新会员首单奖励',
    activityTime: '2026-03-04 15:14:44 → 2026-05-31 15:41...',
    reward: '¥1.58',
    createTime: '2026-03-04 15:41:45',
    status: '进行中'
  }
];

// 状态标签映射
const statusMap = {
  '待提交': <Tag color="blue">待提交</Tag>,
  '审核中': <Tag color="processing">审核中</Tag>,
  '审核不通过': <Tag color="error">审核不通过</Tag>,
  '未开始': <Tag color="default">未开始</Tag>,
  '进行中': <Tag color="success">进行中</Tag>,
  '已终止': <Tag color="warning">已终止</Tag>,
  '已结束': <Tag color="default">已结束</Tag>
};

// 首单活动列表页面
function ActivityList() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('3'); // 首单活动标签
  const [activeStatus, setActiveStatus] = useState('进行中');

  // 处理菜单点击
  const handleMenuClick = (e) => {
    console.log('clicked key:', e.key);
  };

  // 处理标签页切换
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // 处理状态筛选
  const handleStatusClick = (status) => {
    setActiveStatus(status);
  };

  // 处理新增活动
  const handleCreateActivity = () => {
    navigate('/create-activity');
  };

  // 表格列定义
  const columns = [
    {
      title: <input type="checkbox" />,
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 40,
      render: () => <input type="checkbox" />
    },
    {
      title: '活动名称',
      dataIndex: 'activityName',
      key: 'activityName',
      width: 120
    },
    {
      title: '活动类型',
      dataIndex: 'activityType',
      key: 'activityType',
      width: 120
    },
    {
      title: '活动时间',
      dataIndex: 'activityTime',
      key: 'activityTime',
      width: 200
    },
    {
      title: '奖励佣金',
      dataIndex: 'reward',
      key: 'reward',
      width: 80
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: () => (
        <Space size="small">
          <a>编辑</a>
          <a>终止佣金规则</a>
          <a>规则说明</a>
          <a>配置导出</a>
        </Space>
      )
    }
  ];

  // 用户下拉菜单
  const userMenu = (
    <Menu>
      <Menu.Item key="1">个人中心</Menu.Item>
      <Menu.Item key="2">退出登录</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', marginRight: '24px' }}>全员带货后台管理系统-SIT</span>
          <Breadcrumb style={{ margin: 0 }}>
            <Breadcrumb.Item>活动</Breadcrumb.Item>
            <Breadcrumb.Item>首单活动</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Badge count={5} style={{ marginRight: '16px' }}>
            <BellOutlined style={{ fontSize: '18px', color: '#666' }} />
          </Badge>
          <Dropdown overlay={userMenu} trigger={['click']}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar size="small" icon={<UserOutlined />} style={{ marginRight: '8px' }} />
              <span style={{ marginRight: '4px' }}>苏曼</span>
              <DownOutlined style={{ fontSize: '12px' }} />
            </div>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['4-2']}
            style={{ height: '100%', borderRight: 0, background: '#fff' }}
            onClick={handleMenuClick}
            theme="light"
            defaultOpenKeys={['4']}
          >
            <Menu.SubMenu key="1" icon={<ShopOutlined />} title="商品">
              <Menu.Item key="1-1">商品列表</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="2" icon={<HomeOutlined />} title="门店">
              <Menu.Item key="2-1">门店列表</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="3" icon={<DollarOutlined />} title="佣金">
              <Menu.Item key="3-1">佣金列表</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="4" icon={<CalendarOutlined />} title="活动" defaultOpenKeys={['4-2']}>
              <Menu.Item key="4-1">拉新活动</Menu.Item>
              <Menu.Item key="4-2">首单活动</Menu.Item>
              <Menu.Item key="4-3">万家商城活动</Menu.Item>
              <Menu.Item key="4-4">地推拉新活动</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="5" icon={<FileTextOutlined />} title="任务">
              <Menu.Item key="5-1">任务列表</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="6" icon={<FileTextOutlined />} title="报表">
              <Menu.Item key="6-1">报表列表</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="7" icon={<SettingOutlined />} title="系统设置">
              <Menu.Item key="7-1">设置项1</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '24px', background: '#f0f2f5', minHeight: 280 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}>
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
              <TabPane tab="门店列表" key="1">
                <p>门店列表内容</p>
              </TabPane>
              <TabPane tab="拉新活动" key="2">
                <p>拉新活动内容</p>
              </TabPane>
              <TabPane tab="首单活动" key="3">
                <div style={{ marginBottom: '12px' }}>
                  <h3 style={{ marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>首单奖励活动</h3>
                  <p style={{ color: '#666', marginBottom: '12px', fontSize: '12px' }}>若万家超市下单用户为新用户，则给与对应引导新用户下单的促销员首单奖励</p>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <Space size="small">
                      <Button size="small" type={activeStatus === '待提交' ? 'primary' : 'default'} onClick={() => handleStatusClick('待提交')}>待提交</Button>
                      <Button size="small" type={activeStatus === '审核中' ? 'primary' : 'default'} onClick={() => handleStatusClick('审核中')}>审核中</Button>
                      <Button size="small" type={activeStatus === '审核不通过' ? 'primary' : 'default'} onClick={() => handleStatusClick('审核不通过')}>审核不通过</Button>
                      <Button size="small" type={activeStatus === '未开始' ? 'primary' : 'default'} onClick={() => handleStatusClick('未开始')}>未开始</Button>
                      <Button size="small" type={activeStatus === '进行中' ? 'primary' : 'default'} onClick={() => handleStatusClick('进行中')}>进行中</Button>
                      <Button size="small" type={activeStatus === '已终止' ? 'primary' : 'default'} onClick={() => handleStatusClick('已终止')}>已终止</Button>
                      <Button size="small" type={activeStatus === '已结束' ? 'primary' : 'default'} onClick={() => handleStatusClick('已结束')}>已结束</Button>
                    </Space>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <Space size="small">
                      <Button size="small" type="primary">查询</Button>
                      <Button size="small">重置</Button>
                      <Button size="small" type="primary" style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }} onClick={handleCreateActivity}>新增活动</Button>
                      <Button size="small" danger>终止</Button>
                    </Space>
                  </div>
                  
                  <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontSize: '12px' }}>
                    <span style={{ marginRight: '4px' }}>活动ID：</span>
                    <Input size="small" placeholder="请输入活动ID" style={{ width: 150, marginRight: '12px' }} />
                    
                    <span style={{ marginRight: '4px' }}>活动名称：</span>
                    <Input size="small" placeholder="请输入活动名称" style={{ width: 150, marginRight: '12px' }} />
                    
                    <span style={{ marginRight: '4px' }}>创建时间：</span>
                    <DatePicker size="small" style={{ marginRight: '12px' }} />
                    
                    <span style={{ marginRight: '4px' }}>活动时间：</span>
                    <RangePicker size="small" style={{ marginRight: '12px' }} />
                  </div>
                </div>
                
                <Table
                  columns={columns}
                  dataSource={activityData}
                  pagination={false}
                  bordered
                  size="small"
                />
                
                <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>
                  <span style={{ marginRight: '16px' }}>共 1 条</span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ marginRight: '8px', border: '1px solid #d9d9d9', background: '#fff', padding: '2px 8px', cursor: 'pointer' }} disabled>&lt;</button>
                    <button style={{ marginRight: '8px', border: '1px solid #1890ff', background: '#1890ff', color: '#fff', padding: '2px 8px', cursor: 'pointer' }}>1</button>
                    <button style={{ marginRight: '8px', border: '1px solid #d9d9d9', background: '#fff', padding: '2px 8px', cursor: 'pointer' }} disabled>&gt;</button>
                  </div>
                </div>
                
                <div style={{ marginTop: '24px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
                  Copyright©万家科技有限公司
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

// 主应用组件
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ActivityList />} />
        <Route path="/create-activity" element={<CreateActivity />} />
      </Routes>
    </Router>
  );
}

export default App;