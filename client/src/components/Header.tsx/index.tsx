import React from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { Dropdown} from 'antd';
import type { MenuProps } from 'antd';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate()
  const handleLogout =(e) => {
    localStorage.clear();
    navigate('/login')
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to='/profile'>
          Profile
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <button  className='logout' onClick={handleLogout} >
          Logout
        </button>
      ),
    }
  ];
  const {user}: {user: any} = useSelector(({user}:{user: any}) => user)
  return (
    <div className="header">
      <Link to="/"><h2 style={{fontSize: "28px"}}>ProfileX</h2></Link>

      <div className="user-modal">
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Avatar src={user?.picture} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </div>
  )
}

export default Header