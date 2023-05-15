import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const Spinner = styled.div`
  & {
    width: 22px;
    height: 22px;
    animation: spinner-animation 2s infinite ease;
    transform-style: preserve-3d;
  }

  & > div {
    background-color: rgba(0, 77, 255, 0.2);
    height: 100%;
    position: absolute;
    width: 100%;
    border: 1px solid #004dff;
  }

  & div:nth-of-type(1) {
    transform: translateZ(-11px) rotateY(180deg);
  }

  & div:nth-of-type(2) {
    transform: rotateY(-270deg) translateX(50%);
    transform-origin: top right;
  }

  & div:nth-of-type(3) {
    transform: rotateY(270deg) translateX(-50%);
    transform-origin: center left;
  }

  & div:nth-of-type(4) {
    transform: rotateX(90deg) translateY(-50%);
    transform-origin: top center;
  }

  & div:nth-of-type(5) {
    transform: rotateX(-90deg) translateY(50%);
    transform-origin: bottom center;
  }

  & div:nth-of-type(6) {
    transform: translateZ(11px);
  }

  @keyframes spinner-animation {
    0% {
      transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
    }

    50% {
      transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
    }

    100% {
      transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
    }
  }
`;

const Text = styled.span`
  margin-left: 20px;
  color: var(--textColor, #666666);
`;

const Loading = () => (
  <Wrap>
    <Spinner>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </Spinner>
    <Text>加载中...</Text>
  </Wrap>
);

export default Loading;
