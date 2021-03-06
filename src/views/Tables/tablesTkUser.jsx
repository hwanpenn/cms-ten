import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Assignment from "@material-ui/icons/Assignment";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import {updatePasswordDataTkUser,getOtherTkUser,getDataTkUser,updateDataTkUser,deleteDataTkUser,createDataTkUser } from "actions/tablesTkUser";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Select ,Popover,Radio} from 'antd';
import { LocaleProvider } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;


class tablesTkUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleModify: false,
            recordAction:{},
            recordSelect:{},
            defaultSelectValue:'',
            current:1,
        };
    }
    params = {
        search:'',
        pageNo:1,
        pageSize:10,
        vip:''
    };
    componentWillMount(){
        this.getTableData('',1,10);
        this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    getTableData = (search,start,size) => {
        this.params.search=search
        this.params.pageNo=start
        this.params.pageSize=size
        this.setState({
            current:start
        })
        this.props.getDataTkUser(this.params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            pageNo:'1',
            pageSize:'999',
        };
        this.props.getOtherTkUser(params);
    }
    handleSearch = (value) => {
        this.params.search=value
        // this.getTableData()
        this.props.getDataTkUser(this.params);
    }
    handlePageChange = (value) => {
        this.params.pageNo=value
        this.getTableData()
    }
    handleSelect = (value) => {
        if(value==='all'){
            this.params.vip=''
        }else{
            this.params.vip=value
        }
        this.getTableData();
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record,_id:'' });
    }
    showModalCreate = () => {
        this.setState({ visible: true });
    }
    handleCancelModify = () => {
        this.setState({ visibleModify: false });
    }
    handleCancelCreate = () => {
        this.setState({ visible: false });
    }
    handleModify = () => {
        const form = this.formRefModifyData.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if(values.coachNameAndId!==undefined&&values.coachNameAndId!==''){
                let arr=values.coachNameAndId.split('-')
                values.coachId = arr[0]
                values.coachName = arr[1]
                // console.log(`coachId ${values.coachId}`);
                // console.log(`coachName ${values.coachName}`);
            }else{
                values.coachId = ''
                values.coachName = ''
            }
            values.id=this.state.recordAction._id
            this.props.updateDataTkUser(values);
            form.resetFields();
            this.setState({ visibleModify: false });
        });
    }
    handleCreate = () => {
        const form = this.formRefDataCreate.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if(values.isCoach==='coach'){
                values.role = 'coach'
            }else{
                values.role = 'user'
                if(values.coachNameAndId!==undefined&&values.coachNameAndId!==''){
                    let arr=values.coachNameAndId.split('-')
                    values.coachId = arr[0]
                    values.coachName = arr[1]
                    // console.log(`coachId ${values.coachId}`);
                    // console.log(`coachName ${values.coachName}`);
                }else{
                    values.coachId = ''
                    values.coachName = ''
                }
            }
            console.log(values)
            this.props.createDataTkUser(values)
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRefModify = (formRef) => {
        this.formRefModifyData = formRef;
    }
    saveFormRefCreate = (formRef) => {
        this.formRefDataCreate = formRef;
    }
    deleteConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.deleteDataTkUser(params)
    }
    handleBase = (record) => {
        const params = {
            id:record._id,
        }
        this.props.history.push("/mobile/basedatapage/"+record._id);
        // this.props.deleteDataTkUser(params)
    }
    handleList = (record) => {
        const params = {
            id:record._id,
        }
        this.props.history.push("/cms/home/tables/TkVipData?userID="+record._id+"&userName="+record._id);
        // this.props.deleteDataTkUser(params)
    }
    handleChart = (record) => {
        const params = {
            id:record._id,
        }
        this.props.history.push("/mobile/chartpage/"+record._id);
        // this.props.deleteDataTkUser(params)
    }
    handleVip = (record) => {
        const params = {
            id:record._id,
        }
        if(record.vip==="false"){
            let values ={}
            values.id=record._id
            values.vip="true"
            this.props.updateDataTkUser(values);
        }else{
            // this.props.history.push("/mobile/vipdatapage/"+record._id);
        }
        
        // this.props.deleteDataTkUser(params)
    }
    deleteConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.deleteDataTkUser(params)
    }
    resetConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.updatePasswordDataTkUser(params)
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
        let arr=value.split('-')
        // values.coachId = arr[0]
        // values.coachName = arr[1]
        this.params.coachName=arr[1]
        this.getTableData()
        // this.props.form.setFieldsValue({
        //     categoryId: value,
        // });
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '用户名',
            dataIndex: 'realName',
            key: 'realName',
            width: '10%',
            // fixed: 'left',
            render: text => <a >{text}</a>,
        }, {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
            // align: 'center'
            width: '13%',
        }, 
        {
            title: '会员状态',
            dataIndex: 'vip',
            key: 'vip',
            // align: 'center'
            width: '10%',
            render: text => {return text==="false"?'游客':"会员"},
        }, 
        {
            title: '教练名',
            dataIndex: 'coachName',
            key: 'coachName',
            // align: 'center'
            width: '10%',
            render: text => {return text?text:"无"},
        }, 
        {
            title: '描述',
            dataIndex: 'extra',
            key: 'extra',
            // align: 'center'
            width: '10%',
            // render: text => {return text.name},
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 170
                }}>{text}</span>
          </Popover>
        },  {
            title: '操作',
            key: 'action',
            width: '25%',
            // fixed: 'right',
            render: (text, record) => {
                    return (
                        <span>
                            {/* <a onClick={() => this.handleBase(record)} >基础</a>
                            <Divider type="vertical" /> */}
                            {/* <a onClick={() => this.handleList(record)} >{record.vip==="false"?"":"打卡数据"}</a>
                            <Divider type="vertical" /> */}
                            {/* <a onClick={() => this.handleChart(record)} >可视化</a>
                            <Divider type="vertical" /> */}
                            <a onClick={() => this.handleVip(record)} >{record.vip==="false"?"升级会员":""}</a>
                            <Divider type="vertical" />
                            <a onClick={() => this.showModifyModal(record)} >修改</a>
                            <Divider type="vertical" />
                            <Popconfirm cancelText="取消" okText="确定" title="确定重置?" onConfirm={() => this.resetConfirm(record)}>
                                <a>重置密码</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    )
            },
        }];
        let options = ''
        console.log(this.props.tablesTkUser.responseOtherTkUser.rows)
        if(this.props.tablesTkUser.responseOtherTkUser.rows!==undefined){
             options = this.props.tablesTkUser.responseOtherTkUser.rows.map((item,i) => {
                return <Option value={item._id+"-"+item.realName}>{item.realName}</Option>
            })
        }
        
        const CollectionCreateForm = Form.create()(
            class extends React.Component {
                state={
                    valueRadio:'user',
                    valueRadio01:'no'
                }
                handleChange = (value) => {
                    
                    this.props.form.setFieldsValue({
                        coachNameAndId: value,
                    });
                }
                onChangeRadio = (e) => {
                    console.log('radio checked', e.target.value);
                    this.setState({
                        valueRadio: e.target.value,
                    });
                  }
                onChangeRadio01 = (e) => {
                    console.log('radio checked', e.target.value);
                    this.setState({
                        valueRadio01: e.target.value,
                    });
                  }
                render() {
                    const thisTemp = this
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                        <Modal
                            visible={visible}
                            title="新增用户"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                            maskClosable={false}
                        >
                            <Form layout="vertical">
                                <FormItem label="用户名">
                                    {getFieldDecorator('realName', {
                                        rules: [{ required: true, message: '请输入新增用户名!' }],
                                    })(
                                        <Input placeholder="请使用数字和字符" />
                                    )}
                                </FormItem>
                                <FormItem label="手机号">
                                    {getFieldDecorator('mobile')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="密码">
                                    {getFieldDecorator('password')(<Input type="password" />)}
                                </FormItem>
                                {/* <FormItem label="所属俱乐部">
                                    {getFieldDecorator('club', {
                                        rules: [{ required: true, message: '请输入修改所属俱乐部!' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="请选择所属俱乐部"
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {options}
                                        </Select>
                                    )}
                                </FormItem> */}
                                <FormItem label="用户角色">
                                    {getFieldDecorator('isCoach', {
                                        initialValue:  thisTemp.state.valueRadio ,
                                        rules: [{ required: false, message: '请选择用户角色!' }],
                                    })(
                                        <RadioGroup onChange={this.onChangeRadio} >
                                            <Radio value={'user'}>学员</Radio>
                                            <Radio value={'coach'}>教练</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                                {this.state.valueRadio==='user'?<FormItem label="是否分配教练">
                                    {getFieldDecorator('whichCoach', {
                                        initialValue:  thisTemp.state.valueRadio01 ,
                                        rules: [{ required: false, message: '是否分配教练!' }],
                                    })(
                                        <RadioGroup onChange={this.onChangeRadio01} >
                                            <Radio value={'no'}>否</Radio>
                                            <Radio value={'yes'}>是</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>:''}
                                {this.state.valueRadio01==='yes'?<FormItem label="选择所属教练">
                                    {getFieldDecorator('coachNameAndId', {
                                        rules: [{ required: false, message: '请选择所属教练!' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="教练名称"
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {options}
                                        </Select>
                                    )}
                                </FormItem>:''}
                                <FormItem label="描述">
                                    {getFieldDecorator('extra', {
                                        rules: [{ required: false, message: '请输入新增用户描述!' }],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        const CollectionModifyForm = Form.create()(
            class extends React.Component {
                handleChange = (value) => {
                    console.log(`selected ${value}`);
                    this.props.form.setFieldsValue({
                        categoryId: value,
                    });
                }
                handleBlur = () => {
                console.log('blur');
                }
                handleFocus = () => {
                console.log('focus');
                }
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                        <Modal
                            visible={visible}
                            title="修改用户"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                            maskClosable={false}
                        >
                            <Form layout="vertical">
                                <FormItem label="用户名">
                                    {getFieldDecorator('realName', {
                                        initialValue:  thisTemp.state.recordAction.realName ,
                                        rules: [{ required: true, message: '请输入修改用户名!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="手机号">
                                    {getFieldDecorator('mobile', {
                                        initialValue:  thisTemp.state.recordAction.mobile ,
                                        rules: [{ required: true, message: '请输入修改用户别名!' }],
                                    })(<Input type="textarea" />)}
                                </FormItem>
                                {/* <FormItem label="所属俱乐部">
                                    {getFieldDecorator('club', {
                                        initialValue:  thisTemp.state._id ,
                                        rules: [{ required: true, message: '请输入修改所属俱乐部!' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="请选择所属俱乐部"
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {options}
                                        </Select>
                                    )}
                                </FormItem> */}
                                <FormItem label="选择所属教练">
                                    {getFieldDecorator('coachNameAndId', {
                                        initialValue:  thisTemp.state.recordAction.coachId+'-'+thisTemp.state.recordAction.coachName ,
                                        rules: [{ required: false, message: '请选择所属教练!' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="教练名称"
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value={''}>{'空'}</Option>
                                            {options}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label="描述">
                                    {getFieldDecorator('extra', {
                                        initialValue:  thisTemp.state.recordAction.extra ,
                                        rules: [{ required: false, message: '请输入新增用户描述!' }],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        return (
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <Grid container spacing={24}>
                                <Grid item xs={3}>
                                    <CardIcon color="rose">
                                        <Assignment />
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}> </h4>
                                </Grid>
                                <Grid style={{textAlign:'right',marginTop:10}} item xs={9}>
                                        <Select
                                            style={{    width: 200,paddingRight: 10}}
                                            showSearch
                                            placeholder="教练名称"
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value={''}>{'空'}</Option>
                                            {options}
                                        </Select>
                                 

                                        <Select
                                            style={{    width: 200,paddingRight: 10}}
                                            showSearch
                                            placeholder="是否会员"
                                            optionFilterProp="children"
                                            onChange={this.handleSelect}
                                            // onFocus={this.handleFocus}
                                            // onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value={'all'}>{'所有'}</Option>
                                            <Option value={'true'}>{'会员'}</Option>
                                            <Option value={'false'}>{'非会员'}</Option>
                                        </Select>

                                    <Search
                                        placeholder="名称搜索"
                                        onSearch={value => this.handleSearch(value)}
                                        style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                    />
                                    <Button onClick={this.showModalCreate} style={{ height: 30,marginRight:10 }} size={'small'}>增加</Button>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }} key={"tablesTkUser"} pagination={false} columns={columns} dataSource={this.props.tablesTkUser.tableDataTkUser} scroll={{x: 600, y: 360}} />
                            {/* <Pagination defaultCurrent={1} defaultPageSize={10} total={this.props.tablesTkUser.tableCountTkUser} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.handlePageChange(page)}/> */}
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesTkUser.tableCountTkUser} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
                            </LocaleProvider>
                        </CardBody>
                    </Card>
                </GridItem>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRefCreate}
                    visible={this.state.visible}
                    onCancel={this.handleCancelCreate}
                    onCreate={this.handleCreate}
                />
                <CollectionModifyForm
                    wrappedComponentRef={this.saveFormRefModify}
                    visible={this.state.visibleModify}
                    onCancel={this.handleCancelModify}
                    onCreate={this.handleModify}
                />
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        tablesTkUser: state.tablesTkUser,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataTkUser: (params) => {
            dispatch(getDataTkUser(params))
        },
        updateDataTkUser: (params) => {
            dispatch(updateDataTkUser(params))
        },
        deleteDataTkUser: (params) => {
            dispatch(deleteDataTkUser(params))
        },
        createDataTkUser: (params) => {
            dispatch(createDataTkUser(params))
        },
        getOtherTkUser: (params) => {
            dispatch(getOtherTkUser(params))
        },
        updatePasswordDataTkUser: (params) => {
            dispatch(updatePasswordDataTkUser(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesTkUser));
