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
  Avatar,
  ConfigProvider
} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { UserOutlined, BellOutlined, DownOutlined, ShopOutlined, HomeOutlined, DollarOutlined, CalendarOutlined, FileTextOutlined, SettingOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import CreateActivity from './CreateActivity';
import EditActivity from './EditActivity';

const { Header, Sider, Content } = Layout;

// 模拟数据
const activityData = [
  {
    key: '1',
    activityId: '601',
    orderNo: 'A1D26S0304001000005',
    activityName: '首单活动3m',
    activityType: '根据新会员首单奖励',
    timeType: '下单时间',
    activityTime: '2026-03-04 15:14:44 → 2026-05-31 15:41...',
    minOrderAmount: '¥99',
    reward: '¥1.58',
    miniAppName: '首单奖励活动',
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
    if (e.key === '4-2') {
      navigate('/');
    }
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

  // 处理编辑活动
  const handleEditActivity = (id) => {
    navigate(`/edit-activity/${id}`);
  };

  // 表格列定义
  const columns = [
    {
      title: <input type="checkbox" data-prd-comment="PRD: 表格 - 选择框，用于批量操作" />,
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 40,
      render: () => <input type="checkbox" data-prd-comment="PRD: 表格 - 选择框，用于选择单个活动" />
    },
    {
      title: '活动名称',
      dataIndex: 'activityName',
      key: 'activityName',
      width: 120,
      render: (text) => <span data-prd-comment="PRD: 表格列 - 活动的名称">{text}</span>
    },
    {
      title: '活动类型',
      dataIndex: 'activityType',
      key: 'activityType',
      width: 120,
      render: (text) => <span data-prd-comment="PRD: 表格列 - 活动的类型，枚举值：新会员首单奖励、新分销员奖励">{text}</span>
    },
    {
      title: '时间口径',
      dataIndex: 'timeType',
      key: 'timeType',
      width: 80,
      render: (text) => <span data-prd-comment="PRD: 表格列 - 时间口径，如下单时间">{text}</span>
    },
    {
      title: '活动时间',
      dataIndex: 'activityTime',
      key: 'activityTime',
      width: 200,
      render: (text) => <span data-prd-comment="PRD: 表格列 - 活动的时间范围">{text}</span>
    },
    {
      title: '有效订单金额',
      dataIndex: 'minOrderAmount',
      key: 'minOrderAmount',
      width: 100,
      render: (text) => <span data-prd-comment="PRD: 表格列 - 大于等于此金额的订单才会发放佣金">{text}</span>
    },
    {
      title: '奖励佣金',
      dataIndex: 'reward',
      key: 'reward',
      width: 80,
      render: (text) => <span data-prd-comment="PRD: 表格列 - 首单奖励的佣金金额">{text}</span>
    },
    {
      title: '小程序展示名称',
      dataIndex: 'miniAppName',
      key: 'miniAppName',
      width: 120,
      render: (text) => <span data-prd-comment="PRD: 表格列 - 在小程序中展示的活动名称">{text}</span>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
      render: (text) => <span data-prd-comment="PRD: 表格列 - 活动的创建时间">{text}</span>
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <a onClick={() => handleEditActivity(record.activityId)} data-prd-comment="PRD: 操作 - 编辑活动，点击后跳转到编辑首单活动页面">编辑</a>
          <a data-prd-comment="PRD: 操作 - 终止佣金规则，点击后需要二次确认弹窗">终止佣金规则</a>
          <a data-prd-comment="PRD: 操作 - 规则说明，点击后查看活动的规则说明">规则说明</a>
          <a data-prd-comment="PRD: 操作 - 配置导出，点击后导出活动的配置信息">配置导出</a>
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
          <Breadcrumb
            items={[
              {
                title: '活动',
              },
              {
                title: '首单活动',
              },
            ]}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Badge count={5} style={{ marginRight: '16px' }}>
            <BellOutlined style={{ fontSize: '18px', color: '#666' }} />
          </Badge>
          <Dropdown menu={userMenu} trigger={['click']}>
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
            selectedKeys={['4-2']}
            style={{ height: '100%', borderRight: 0, background: '#fff' }}
            onClick={handleMenuClick}
            theme="light"
            openKeys={['4']}
            items={[
              {
                key: '1',
                icon: <ShopOutlined />,
                label: '商品',
                children: [
                  {
                    key: '1-1',
                    label: '商品列表',
                  },
                ],
              },
              {
                key: '2',
                icon: <HomeOutlined />,
                label: '门店',
                children: [
                  {
                    key: '2-1',
                    label: '门店列表',
                  },
                ],
              },
              {
                key: '3',
                icon: <DollarOutlined />,
                label: '佣金',
                children: [
                  {
                    key: '3-1',
                    label: '佣金列表',
                  },
                ],
              },
              {
                key: '4',
                icon: <CalendarOutlined />,
                label: '活动',
                children: [
                  {
                    key: '4-1',
                    label: '拉新活动',
                  },
                  {
                    key: '4-2',
                    label: '首单活动',
                  },
                  {
                    key: '4-3',
                    label: '万家商城活动',
                  },
                  {
                    key: '4-4',
                    label: '地推拉新活动',
                  },
                ],
              },
              {
                key: '5',
                icon: <FileTextOutlined />,
                label: '任务',
                children: [
                  {
                    key: '5-1',
                    label: '任务列表',
                  },
                ],
              },
              {
                key: '6',
                icon: <FileTextOutlined />,
                label: '报表',
                children: [
                  {
                    key: '6-1',
                    label: '报表列表',
                  },
                ],
              },
              {
                key: '7',
                icon: <SettingOutlined />,
                label: '系统设置',
                children: [
                  {
                    key: '7-1',
                    label: '设置项1',
                  },
                ],
              },
            ]}
          />
        </Sider>
        <Content style={{ padding: '24px', background: '#f0f2f5', minHeight: 280 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}>
            <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              items={[
                {
                  key: '1',
                  label: '门店列表',
                  children: <p>门店列表内容</p>,
                },
                {
                  key: '2',
                  label: '拉新活动',
                  children: <p>拉新活动内容</p>,
                },
                {
                  key: '3',
                  label: '首单活动',
                  children: (
                    <>
                      <div style={{ marginBottom: '12px' }}>
                        <h3 style={{ marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>首单奖励活动</h3>
                        <p style={{ color: '#666', marginBottom: '12px', fontSize: '12px' }}>若万家超市下单用户为新用户，则给与对应引导新用户下单的促销员首单奖励</p>
                        
                        <div style={{ marginBottom: '12px' }}>
                          <Space size="small">
                            <Button size="small" type={activeStatus === '待提交' ? 'primary' : 'default'} onClick={() => handleStatusClick('待提交')} data-prd-comment="PRD: 筛选模块 - 按活动状态筛选，选项：待提交">待提交</Button>
                            <Button size="small" type={activeStatus === '审核中' ? 'primary' : 'default'} onClick={() => handleStatusClick('审核中')} data-prd-comment="PRD: 筛选模块 - 按活动状态筛选，选项：审核中">审核中</Button>
                            <Button size="small" type={activeStatus === '审核不通过' ? 'primary' : 'default'} onClick={() => handleStatusClick('审核不通过')} data-prd-comment="PRD: 筛选模块 - 按活动状态筛选，选项：审核不通过">审核不通过</Button>
                            <Button size="small" type={activeStatus === '未开始' ? 'primary' : 'default'} onClick={() => handleStatusClick('未开始')} data-prd-comment="PRD: 筛选模块 - 按活动状态筛选，选项：未开始">未开始</Button>
                            <Button size="small" type={activeStatus === '进行中' ? 'primary' : 'default'} onClick={() => handleStatusClick('进行中')} data-prd-comment="PRD: 筛选模块 - 按活动状态筛选，选项：进行中">进行中</Button>
                            <Button size="small" type={activeStatus === '已终止' ? 'primary' : 'default'} onClick={() => handleStatusClick('已终止')} data-prd-comment="PRD: 筛选模块 - 按活动状态筛选，选项：已终止">已终止</Button>
                            <Button size="small" type={activeStatus === '已结束' ? 'primary' : 'default'} onClick={() => handleStatusClick('已结束')} data-prd-comment="PRD: 筛选模块 - 按活动状态筛选，选项：已结束">已结束</Button>
                          </Space>
                        </div>
                        
                        <div style={{ marginBottom: '12px' }}>
                          <Space size="small">
                            <Button size="small" type="primary" data-prd-comment="PRD: 操作 - 点击查询按钮，根据筛选条件查询活动">查询</Button>
                            <Button size="small" data-prd-comment="PRD: 操作 - 点击重置按钮，清空筛选条件">重置</Button>
                            <Button size="small" type="primary" style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }} onClick={handleCreateActivity} data-prd-comment="PRD: 操作 - 点击新增活动按钮，跳转到新增首单活动页面">新增活动</Button>
                            <Button size="small" danger data-prd-comment="PRD: 操作 - 点击终止按钮，终止选中的活动">终止</Button>
                          </Space>
                        </div>
                        
                        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontSize: '12px' }}>
                          <span style={{ marginRight: '4px' }}>活动ID：</span>
                          <Input size="small" placeholder="请输入活动ID" style={{ width: 150, marginRight: '12px' }} data-prd-comment="PRD: 筛选模块 - 按活动ID模糊搜索" />
                          
                          <span style={{ marginRight: '4px' }}>活动名称：</span>
                          <Input size="small" placeholder="请输入活动名称" style={{ width: 150, marginRight: '12px' }} data-prd-comment="PRD: 筛选模块 - 按活动名称模糊搜索" />
                          
                          <span style={{ marginRight: '4px' }}>创建时间：</span>
                          <DatePicker size="small" style={{ marginRight: '12px' }} data-prd-comment="PRD: 筛选模块 - 按创建时间筛选" />
                          
                          <span style={{ marginRight: '4px' }}>活动时间：</span>
                          <DatePicker.RangePicker size="small" style={{ marginRight: '12px' }} data-prd-comment="PRD: 筛选模块 - 按活动时间范围筛选" />
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
                    </>
                  )
                }
              ]}
            />
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
        <Route path="/edit-activity/:id" element={<EditActivity />} />
      </Routes>
    </Router>
  );
}

export default App;