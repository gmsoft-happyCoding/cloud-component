import React, { useContext } from 'react';
import { Icon, Typography } from 'antd';
import { ConfigContext } from './context';

const { Paragraph } = Typography;

interface Props {
  errorMessage: string;
}

const Error = ({ errorMessage }: Props) => {
  const { ErrorComponent } = useContext(ConfigContext);

  if (ErrorComponent) return <ErrorComponent errorMessage={errorMessage} />;

  return (
    <div style={{ textAlign: 'center' }}>
      <Icon type="frown" theme="twoTone" style={{ fontSize: 30, marginBottom: 15 }} />
      <Paragraph
        type="warning"
        ellipsis={{ rows: 3, expandable: true }}
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        {errorMessage}
      </Paragraph>
    </div>
  );
};

/**
 * 创建加载失败显示的组件
 * @param {string} errorMessage - 错误信息
 */
const createError = (errorMessage: string) => ({
  default: () => <Error errorMessage={errorMessage} />,
});

export default createError;
