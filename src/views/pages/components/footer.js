import * as React from 'react';
import {
  Footer,
  FooterGrid,
  Masthead,
  Support,
  Apps,
  Safety,
  SocialLinks,
} from '../style';
import { Link } from 'react-router-dom';
import Icon from 'src/components/icon';
import { Logo } from 'src/components/logo';

export default () => {
  return (
    <Footer>
      <FooterGrid>
        <Masthead>
          <Link to="/">
            <Logo />
          </Link>
          <SocialLinks>
            <a
              href="https://github.com/btechsu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon glyph="github" hoverColor={'text.reverse'} />
            </a>
            <a
              href="https://twitter.com/btechsu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon glyph="twitter" hoverColor={'text.reverse'} />
            </a>
          </SocialLinks>
        </Masthead>
        <Apps>
          <span>Credits</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://kyryloorlov.com/?utm_source=foundry&utm_medium=footer&utm_campaign=link"
          >
            Kyrylo Orlov
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://mattbilik.tech/"
          >
            Matthew Bilik
          </a>
        </Apps>
        <Support>
          <span>Support</span>
          <Link to={`/clubs`}>Community</Link>
          <a href="mailto:brooklyntechfoundry@gmail.com">Email support</a>
        </Support>
        <Safety>
          <span>Safety</span>
          <Link to={`/privacy`}>Privacy Statement</Link>
          <Link to={`/terms`}>Terms of Service</Link>
        </Safety>
      </FooterGrid>
    </Footer>
  );
};
