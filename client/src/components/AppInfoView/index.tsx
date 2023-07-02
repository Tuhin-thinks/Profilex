import { message } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideMessage } from '../../redux/action/common.action';

const AppInfoView = () => {
  const {loading, error, displayMessage}: { loading: boolean, error: any | null, displayMessage: string } = useSelector(({common}:{common: any}) => common);  

  const dispatch: (arg0: any) => any = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token ) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(hideMessage());
    }
  }, [error]);


  useEffect(() => {
    if (displayMessage) {
      message.success(displayMessage);
      dispatch(hideMessage());
    }
  }, [displayMessage]);

  return <></>;
};

export default AppInfoView;
