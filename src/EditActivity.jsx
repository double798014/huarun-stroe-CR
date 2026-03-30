import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Layout,
  Breadcrumb,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Upload,
  message,
  Tabs,
  InputNumber,
  Radio,
  Space,
  Menu
} from 'antd';
import { UploadOutlined, ArrowLeftOutlined, ShopOutlined, HomeOutlined, DollarOutlined, CalendarOutlined, FileTextOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

// 模拟活动数据
const mockActivityData = {
  id: '601',
  activityName: '首单活动3m',
  activityType: 'newMember',
  timeType: 'orderTime',
  activityTime: ['2026-03-04 15:14:44', '2026-05-31 15:41:45'],
  registerTime: ['2026-03-01 00:00:00', '2026-05-31 23:59:59'],
  minOrderAmount: '99',
  rewardAmount: '1.58',
  miniAppName: '首单奖励活动',
  activityImage: '',
  newMemberPlayType: 'ladder',
  ladderRules: [
    { id: 1, min: 1, max: 3, reward: 1 },
    { id: 2, min: 4, max: 10, reward: 2 },
    { id: 3, min: 11, max: null, reward: 3 }
  ],
  customRules: [
    { id: 1, days: 1, amount: 69, reward: 2 },
    { id: 2, days: 3, amount: 129, reward: 1 }
  ]
};

function EditActivity() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');
  const [step, setStep] = useState(1);
  const [ladderRules, setLadderRules] = useState([
    { id: 1, min: 1, max: 3, reward: 1 },
    { id: 2, min: 4, max: 10, reward: 2 },
    { id: 3, min: 11, max: null, reward: 3 }
  ]);
  const [customRules, setCustomRules] = useState([
    { id: 1, days: 1, amount: 69, reward: 2 },
    { id: 2, days: 3, amount: 129, reward: 1 }
  ]);

  // 加载活动数据
  useEffect(() => {
    // 模拟从API获取数据
    setTimeout(() => {
      form.setFieldsValue({
        activityName: mockActivityData.activityName,
        activityType: mockActivityData.activityType,
        timeType: mockActivityData.timeType,
        activityTime: [],
        registerTime: [],
        minOrderAmount: mockActivityData.minOrderAmount,
        rewardAmount: mockActivityData.rewardAmount,
        miniAppName: mockActivityData.miniAppName,
        newMemberPlayType: mockActivityData.newMemberPlayType
      });
      setLadderRules(mockActivityData.ladderRules);
      setCustomRules(mockActivityData.customRules);
    }, 500);
  }, [form, id]);

  // 处理上传
  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  // 处理阶梯奖励规则变化
  const handleLadderRuleChange = (index, field, value) => {
    const newRules = [...ladderRules];
    newRules[index][field] = value;
    setLadderRules(newRules);
  };

  // 添加阶梯奖励规则
  const addLadderRule = () => {
    const newId = ladderRules.length + 1;
    setLadderRules([...ladderRules, { id: newId, min: null, max: null, reward: 0 }]);
  };

  // 删除阶梯奖励规则
  const removeLadderRule = (id) => {
    setLadderRules(ladderRules.filter(rule => rule.id !== id));
  };

  // 处理自定义档位规则变化
  const handleCustomRuleChange = (index, field, value) => {
    const newRules = [...customRules];
    newRules[index][field] = value;
    setCustomRules(newRules);
  };

  // 添加自定义档位规则
  const addCustomRule = () => {
    const newId = customRules.length + 1;
    setCustomRules([...customRules, { id: newId, days: 0, amount: 0, reward: 0 }]);
  };

  // 删除自定义档位规则
  const removeCustomRule = (id) => {
    setCustomRules(customRules.filter(rule => rule.id !== id));
  };

  // 处理表单提交
  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log('表单数据:', values);
      message.success('活动编辑成功');
      // 提交成功后返回列表页面
      navigate('/');
    }).catch(error => {
      console.log('表单验证失败:', error);
    });
  };

  // 处理下一步
  const handleNext = () => {
    setStep(step + 1);
  };

  // 处理上一步
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // 处理返回上一页
  const handleBack = () => {
    navigate('/');
  };

  // 处理菜单点击
  const handleMenuClick = (e) => {
    console.log('clicked key:', e.key);
    if (e.key === '4-2') {
      navigate('/');
    }
  };

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
                title: '编辑首单活动',
              },
            ]}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px' }}>苏曼</span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <Menu
            mode="inline"
            selectedKeys={['4-2']}
            style={{ height: '100%', borderRight: 0, background: '#fff' }}
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
            <div style={{ marginBottom: '24px' }}>
              <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack}>返回上一页</Button>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              {step === 1 && (
                <div>
                  <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 'bold' }}>活动信息</h3>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <Form.Item
                      label="活动名称"
                      name="activityName"
                      rules={[{ required: true, message: '请输入活动名称' }]}
                      style={{ width: '48%', marginRight: '4%', marginBottom: '16px' }}
                    >
                      <Input placeholder="请输入活动名称" maxLength={50} />
                    </Form.Item>

                    <Form.Item
                      label="活动类型"
                      name="activityType"
                      rules={[{ required: true, message: '请选择活动类型' }]}
                      style={{ width: '48%', marginBottom: '16px' }}
                    >
                      <Select placeholder="请选择活动类型">
                        <Option value="newMember">根据新会员首单奖励</Option>
                        <Option value="newDistributor">根据新分销员首单奖励</Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <Form.Item
                      label="时间口径"
                      name="timeType"
                      rules={[{ required: true, message: '请选择时间口径' }]}
                      style={{ marginBottom: '16px' }}
                    >
                      <Radio.Group>
                        <Radio value="orderTime">下单时间</Radio>
                        <Radio value="registerTime">注册时间</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <Form.Item
                      label="活动时间"
                      name="activityTime"
                      rules={[{ required: true, message: '请选择活动时间' }]}
                      style={{ width: '48%', marginRight: '4%', marginBottom: '16px' }}
                    >
                      <RangePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                      label="注册时间范围"
                      name="registerTime"
                      style={{ width: '48%', marginBottom: '16px' }}
                    >
                      <RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <Form.Item
                      label="有效订单金额"
                      name="minOrderAmount"
                      rules={[{ required: true, message: '请输入有效订单金额' }]}
                      style={{ width: '48%', marginRight: '4%', marginBottom: '16px' }}
                    >
                      <Input addonAfter="元" placeholder="请输入有效订单金额" />
                      <div style={{ marginTop: 4, fontSize: 12, color: '#666' }}>大于等于有效金额的订单才会发放佣金</div>
                    </Form.Item>

                    <Form.Item
                      label="奖励佣金"
                      name="rewardAmount"
                      rules={[{ required: true, message: '请输入奖励佣金' }]}
                      style={{ width: '48%', marginBottom: '16px' }}
                    >
                      <Input addonAfter="元" placeholder="请输入奖励佣金" />
                    </Form.Item>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <Form.Item
                      label="小程序展示名称"
                      name="miniAppName"
                      rules={[{ required: true, message: '请输入小程序展示名称' }]}
                      style={{ width: '48%', marginRight: '4%', marginBottom: '16px' }}
                    >
                      <Input placeholder="请输入小程序展示名称" maxLength={50} />
                    </Form.Item>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <Form.Item
                      label="活动封面图"
                      name="activityImage"
                      rules={[{ required: true, message: '请上传活动封面图' }]}
                      style={{ marginBottom: '16px' }}
                    >
                      <Upload
                        name="file"
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        onChange={handleUpload}
                        listType="picture"
                        maxCount={1}
                      >
                        <div style={{ width: 120, height: 120, border: '1px dashed #d9d9d9', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <div style={{ textAlign: 'center' }}>
                            <UploadOutlined style={{ fontSize: 24, color: '#999' }} />
                            <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>上传</div>
                          </div>
                        </div>
                      </Upload>
                      <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>推荐尺寸：702*320</div>
                    </Form.Item>
                  </div>

                  <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <Button type="primary" onClick={handleNext}>下一步</Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 'bold' }}>奖励规则</h3>
                  
                  <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                      {
                        key: '1',
                        label: '新会员首单奖励',
                        children: (
                          <>
                            <Form.Item
                              label="玩法选择"
                              name="newMemberPlayType"
                              rules={[{ required: true, message: '请选择玩法' }]}
                              style={{ marginBottom: '16px' }}
                            >
                              <Select placeholder="请选择玩法">
                                <Option value="ladder">首单阶梯奖励</Option>
                                <Option value="repurchase">激励复购</Option>
                                <Option value="ranking">新顾客邀请排位赛</Option>
                              </Select>
                            </Form.Item>

                            {activeTab === '1' && (
                              <div>
                                <h4 style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 'bold' }}>首单阶梯奖励规则</h4>
                                <div style={{ marginBottom: '16px' }}>
                                  {ladderRules.map((rule, index) => (
                                    <div key={rule.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                      <InputNumber
                                        style={{ width: 80, marginRight: 8 }}
                                        placeholder="最小单数"
                                        value={rule.min}
                                        onChange={(value) => handleLadderRuleChange(index, 'min', value)}
                                      />
                                      <span style={{ marginRight: 8 }}>-</span>
                                      <InputNumber
                                        style={{ width: 80, marginRight: 8 }}
                                        placeholder="最大单数"
                                        value={rule.max}
                                        onChange={(value) => handleLadderRuleChange(index, 'max', value)}
                                      />
                                      <span style={{ marginRight: 8 }}>单</span>
                                      <span style={{ marginRight: 8 }}>奖励</span>
                                      <InputNumber
                                        style={{ width: 80, marginRight: 8 }}
                                        placeholder="奖励金额"
                                        value={rule.reward}
                                        onChange={(value) => handleLadderRuleChange(index, 'reward', value)}
                                      />
                                      <span style={{ marginRight: 8 }}>元/单</span>
                                      <Button
                                        type="text"
                                        danger
                                        onClick={() => removeLadderRule(rule.id)}
                                        style={{ marginLeft: 8 }}
                                      >
                                        删除
                                      </Button>
                                    </div>
                                  ))}
                                  <Button type="dashed" onClick={addLadderRule} style={{ marginTop: 8 }}>
                                    添加阶梯规则
                                  </Button>
                                </div>
                              </div>
                            )}
                          </>
                        )
                      },
                      {
                        key: '2',
                        label: '新分销员奖励',
                        children: (
                          <>
                            <Form.Item
                              label="玩法选择"
                              name="newDistributorPlayType"
                              rules={[{ required: true, message: '请选择玩法' }]}
                              style={{ marginBottom: '16px' }}
                            >
                              <Select placeholder="请选择玩法">
                                <Option value="custom">自定义档位配置</Option>
                                <Option value="ranking">新分销员排位赛</Option>
                              </Select>
                            </Form.Item>

                            {activeTab === '2' && (
                              <div>
                                <h4 style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 'bold' }}>自定义档位配置</h4>
                                <div style={{ marginBottom: '16px' }}>
                                  {customRules.map((rule, index) => (
                                    <div key={rule.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                      <span style={{ marginRight: 8 }}>新分销员在注册</span>
                                      <InputNumber
                                        style={{ width: 60, marginRight: 8 }}
                                        placeholder="天数"
                                        value={rule.days}
                                        onChange={(value) => handleCustomRuleChange(index, 'days', value)}
                                      />
                                      <span style={{ marginRight: 8 }}>天内完成</span>
                                      <InputNumber
                                        style={{ width: 80, marginRight: 8 }}
                                        placeholder="订单金额"
                                        value={rule.amount}
                                        onChange={(value) => handleCustomRuleChange(index, 'amount', value)}
                                      />
                                      <span style={{ marginRight: 8 }}>元推广订单，可获得</span>
                                      <InputNumber
                                        style={{ width: 80, marginRight: 8 }}
                                        placeholder="奖励金额"
                                        value={rule.reward}
                                        onChange={(value) => handleCustomRuleChange(index, 'reward', value)}
                                      />
                                      <span style={{ marginRight: 8 }}>元</span>
                                      <Button
                                        type="text"
                                        danger
                                        onClick={() => removeCustomRule(rule.id)}
                                        style={{ marginLeft: 8 }}
                                      >
                                        删除
                                      </Button>
                                    </div>
                                  ))}
                                  <Button type="dashed" onClick={addCustomRule} style={{ marginTop: 8 }}>
                                    添加档位配置
                                  </Button>
                                </div>
                              </div>
                            )}
                          </>
                        )
                      },
                    ]}
                  />

                  <div style={{ marginTop: '24px', textAlign: 'right' }}>
                    <Button onClick={handlePrevious} style={{ marginRight: 8 }}>上一步</Button>
                    <Button type="primary" htmlType="submit">提交</Button>
                  </div>
                </div>
              )}
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default EditActivity;