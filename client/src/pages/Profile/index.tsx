import { UserOutlined } from "@ant-design/icons";
import { Avatar, Checkbox, Form, Input } from "antd";
import profil_img from "../../assets/img/profile-page.png";
import Header from "../../components/Header.tsx";
import "./profile.css";
import { useSelector } from "react-redux";
const Profile = () => {

  const {user}: {user: any} = useSelector(({user}:{user: any}) => user)
  return (
    <div className="profile-page">
      <Header />

      <div className="profile_wrapper">
        <div className="profile_modal">
          <div className="profile-left">
            <img src={profil_img} alt="profile-side-img" />
          </div>
          <div className="profile-right">
            <Avatar
              src={user?.picture}
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
              size={"large"}
            />
            <Form name="basic" layout="vertical" initialValues={user}>
              <Form.Item label="Name:" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Email:" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Premium Subscriber:" name="is_pro" valuePropName="checked">
                <Checkbox disabled />
              </Form.Item>
            </Form>

            <p className="profil-info">Editing User profile is disabled!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
