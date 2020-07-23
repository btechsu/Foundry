import React, { useState, useEffect } from 'react';

// styles
import styled, { keyframes } from 'styled-components';

// https://tobiasahlin.com/spinkit/
const AnimWrapper = keyframes`
  100% { transform: rotate(360deg); } 
`;
const AnimDot = keyframes`
  80%, 100% { transform: rotate(360deg); } 
`;
const AnimDotBefore = keyframes`
  50% {
    transform: scale(0.4); 
  } 100%, 0% {
    transform: scale(1.0); 
  } 
`;
export const PageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoaderWrapper = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  animation: ${AnimWrapper} 2.5s infinite linear both;

  :focus {
    outline: none;
  }
`;
const LoadingDot = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: ${AnimDot} 2s infinite ease-in-out both;

  :before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: var(--color-text);
    border-radius: 100%;
    animation: ${AnimDotBefore} 2s infinite ease-in-out both;
  }

  :nth-child(1) {
    animation-delay: -1.1s;
  }
  :nth-child(2) {
    animation-delay: -1s;
  }
  :nth-child(3) {
    animation-delay: -0.9s;
  }
  :nth-child(4) {
    animation-delay: -0.8s;
  }
  :nth-child(5) {
    animation-delay: -0.7s;
  }
  :nth-child(6) {
    animation-delay: -0.6s;
  }
  :nth-child(1):before {
    animation-delay: -1.1s;
  }
  :nth-child(2):before {
    animation-delay: -1s;
  }
  :nth-child(3):before {
    animation-delay: -0.9s;
  }
  :nth-child(4):before {
    animation-delay: -0.8s;
  }
  :nth-child(5):before {
    animation-delay: -0.7s;
  }
  :nth-child(6):before {
    animation-delay: -0.6s;
  }
`;

export const Circles = () => {
  return (
    <LoaderWrapper>
      <LoadingDot />
      <LoadingDot />
      <LoadingDot />
      <LoadingDot />
      <LoadingDot />
      <LoadingDot />
    </LoaderWrapper>
  );
};

export default function Loader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <PageWrapper>
          <Circles />
        </PageWrapper>
      ) : (
        children
      )}
    </>
  );
}
