import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { post} from '../../../fetchData';
const FormItem = Form.Item;
@Form.create()
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      hintInfo:'',
    };
  }
  componentDidMount = () => {
  };
  signIn = (formData) => {
    post('/users/signIn', formData, data => {
      if (data.retCode === 1) {
        this.props.isLogin();
      } else {
        this.setState({ hintInfo: data.retMsg });
      }
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.signIn(values);
      }
    });
  }
  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { hintInfo} = this.state;
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
        <div>{hintInfo}</div>
        <Button htmlType="submit" style={{ width: '100%' }}>登录</Button>
      </Form>
    );
  }
}
export default LoginForm;