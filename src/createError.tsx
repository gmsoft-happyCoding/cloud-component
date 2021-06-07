import React from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Typography } from '@material-ui/core';

/**
 * 创建加载失败显示的组件
 * @param {string} errorMessage - 错误信息
 */
const createError = (errorMessage: string) => ({
  default: () => (
    <div style={{ textAlign: 'center' }}>
      <SentimentVeryDissatisfiedIcon style={{ fontSize: 30, marginBottom: 15 }} />
      <Typography paragraph noWrap style={{ maxWidth: 600, margin: '0 auto' }}>
        {errorMessage}
      </Typography>
    </div>
  ),
});

export default createError;
