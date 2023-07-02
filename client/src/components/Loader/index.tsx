import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface Props {
  color?: string;
  fontSize?: string|number;
}
const Loader: React.FC<Props> = ({color, fontSize}) => <Spin style={{color: color}} indicator={
  <LoadingOutlined
    style={{
      fontSize: fontSize || 24,
    }}
    spin
  />
} />;
export default Loader;