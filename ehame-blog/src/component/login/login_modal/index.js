import React, { Component } from 'react';
import { Form, Input, Button, Card } from 'antd';
import {get,post} from '../../../fetchData';
const FormItem = Form.Item;
// import { bindActionCreators } from 'redux';
@Form.create()
class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state={
      hintInfo:'',
    };
  }
  componentDidMount = () => {
    this.isLogin();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.signIn(values);
      }
    });
  }
  isLogin =()=>{
    get('/users/isLogin',data=>{
      if (data.retCode===1) {
        window.location.hash = '/home';     
      }    
    });
  }
  signIn = (formData)=>{
    post('/users/signIn',formData,data=>{
      if (data.retCode===1) {
        this.props.loginModalVisible({ visible: false, type: '' });
        window.location.hash='/home';
      }else{
        this.setState({hintInfo:data.retMsg});
      }
    });
  }
  render() {
    const { form: { getFieldDecorator }, loginType } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Card 
        key={loginType}
        hoverable
        className={this.props.loginVisible ? 'login-modal-main-active' :'login-modal-main'}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="用户名:"
          >
            {getFieldDecorator('userName')(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码:"
          >
            {getFieldDecorator('password')(<Input />)}
          </FormItem>
          <div>{this.state.hintInfo}</div>
          <Button htmlType="submit" style={{width:'100%'}}>登录</Button>
        </Form>
      </Card>
    );
  }
}
export default LoginModal;

