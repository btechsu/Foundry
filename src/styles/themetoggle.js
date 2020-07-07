import React from 'react';
import styled from 'styled-components';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

const Slider = styled.div`
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
  border-radius: 34px;

  :before {
    background-color: #fff;
    bottom: 4px;
    content: '';
    height: 26px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
    border-radius: 50%;
  }
`;
const ThemeSwitchWrapper = styled.div`
  display: inline-block;
  margin: 0;
  padding: 0;

  label {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;

    input {
      display: none;
    }

    input:checked + ${Slider} {
      background-color: var(--color-success);
    }

    input:checked + ${Slider}:before {
      transform: translateX(26px);
    }
  }
`;

class ThemeToggle extends React.Component {
  render() {
    return (
      <ThemeSwitchWrapper>
        <ThemeToggler>
          {({ theme, toggleTheme }) => (
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  toggleTheme(e.target.checked ? 'dark' : 'light')
                }
                checked={theme === 'dark'}
              />
              <Slider />
            </label>
          )}
        </ThemeToggler>
      </ThemeSwitchWrapper>
    );
  }
}

export default ThemeToggle;
