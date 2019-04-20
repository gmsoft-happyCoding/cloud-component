import React from "react";
import { Icon, Typography } from "antd";

const { Paragraph } = Typography;

/**
 * 创建加载失败显示的组件
 * @param {string} errorMessage - 错误信息
 */
const createError = (errorMessage: string) => ({
  default: () => (
    <div style={{ textAlign: "center" }}>
      <Icon
        type="frown"
        theme="twoTone"
        style={{ fontSize: 30, marginBottom: 15 }}
      />
      <Paragraph
        type="warning"
        ellipsis={{ rows: 3, expandable: true }}
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        {errorMessage}
      </Paragraph>
    </div>
  )
});

export default createError;
