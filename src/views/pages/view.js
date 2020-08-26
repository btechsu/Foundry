// @flow
import { theme } from '@shared/theme';
import React from 'react';
import styled from 'styled-components';
import { FlexCol } from '@components/globals';
import Section from '@components/themedSection';
import {
  PrimaryButton,
  WhiteOutlineButton,
  WhiteButton,
} from '@components/button';
import { Tagline, Copy, Content } from './style';
import { MEDIA_BREAK } from '@components/layout';

export const Overview = () => {
  const ThisContent = styled(Content)`
    max-width: 100vw;
    margin-top: 92px;
    margin-bottom: 80px;
    @media (max-width: 640px) {
      margin-bottom: 40px;
    }
  `;

  const Text = styled(FlexCol)`
    margin: 120px 32px 120px 32px;
    text-align: left;
    align-items: flex-start;
    z-index: 2;
    @media (max-width: ${MEDIA_BREAK}px) {
      margin-top: 0;
      margin-bottom: 16px;
      text-align: center;
      align-items: center;
    }
  `;

  const ThisCopy = styled(Copy)`
    line-height: 1.6;
    font-weight: 500;
    max-width: 580px;
    @media (max-width: ${MEDIA_BREAK}px) {
      text-align: center;
    }
  `;

  const ThisTagline = styled(Tagline)`
    margin-bottom: 16px;
    font-size: 40px;
    @media (max-width: ${MEDIA_BREAK}px) {
      font-size: 24px;
    }
  `;

  const Actions = styled.div`
    display: flex;
    margin-top: 48px;
    width: 100%;
    align-items: flex-start;
    @media (max-width: ${MEDIA_BREAK}px) {
      flex-direction: column;
      align-items: center;
    }
  `;

  const ThisSecondaryCTA = styled(WhiteOutlineButton)`
    margin-left: 16px;
    font-size: 16px;
    @media (max-width: ${MEDIA_BREAK}px) {
      margin-left: 0;
      margin-top: 16px;
    }
  `;

  const ThisText = styled(Text)`
    position: relative;
    right: 20vw;
    @media (max-width: 1400px) {
      right: 15vw;
    }
    @media (max-width: 1200px) {
      right: 0;
    }
  `;

  const ThisPrimaryCTA = styled(WhiteButton)`
    color: ${theme.brand.alt};
    &:hover {
      color: ${theme.brand.default};
    }
  `;

  const Img = styled.img`
    position: absolute;
    top: 32px;
    bottom: 0;
    left: calc(25vw + 480px);
    max-height: calc(100% - 32px);
    z-index: 0;
    @media (max-width: 1400px) {
      left: calc(20vw + 480px);
    }
    @media (max-width: 1200px) {
      display: none;
    }
    @media (max-width: ${MEDIA_BREAK}px) {
      display: none;
    }
  `;

  return (
    <Section background="primary" goop={2}>
      <ThisContent>
        <ThisText>
          <ThisTagline>Brooklyn Tech's first community platform.</ThisTagline>
          <ThisCopy>
            As the Brooklyn Tech community expands and more clubs are added
            every year, it gets harder and harder to manage your contributions
            and busy schedules.
          </ThisCopy>
          <ThisCopy>
            Foundry makes it easy to join and find new clubs, vote on pervasive
            issues in the Tech community, and stay up to date on current news.
          </ThisCopy>
          <Actions>
            <ThisPrimaryCTA to="/login">Join Foundry</ThisPrimaryCTA>
            <ThisSecondaryCTA to="/clubs">Explore clubs</ThisSecondaryCTA>
          </Actions>
        </ThisText>
        <Img src={'/img/diagram.svg'} alt="" />
      </ThisContent>
    </Section>
  );
};

export const Centralized = () => {
  const ThisContent = styled(Content)`
    overflow: hidden;
    margin: 40px 16px 80px;
    @media (max-width: ${MEDIA_BREAK}px) {
      margin-bottom: 40px;
    }
  `;

  const ThisCopy = styled(Copy)`
    font-weight: 400;
    margin-top: 16px;
  `;

  const ThisPrimaryCTA = styled(PrimaryButton)``;

  const Actions = styled.div`
    margin-top: 32px;
    @media (max-width: ${MEDIA_BREAK}px) {
      display: flex;
      justify-content: center;
    }
  `;

  const ThisTagline = styled(Tagline)`
    @media (max-width: ${MEDIA_BREAK}px) {
      margin-bottom: 0;
    }
  `;

  const DiscoverImage = styled.img`
    position: relative;
    left: -24px;
    max-width: 400px;
    height: auto;
    object-fit: contain;
    @media (max-width: ${MEDIA_BREAK}px) {
      left: auto;
      margin-top: 32px;
      max-width: 100%;
      min-width: 256px;
    }
  `;

  return (
    <Section goop={7} color={'bg.reverse'}>
      <ThisContent>
        <DiscoverImage src="/img/discover.svg" alt="" />
        <FlexCol>
          <ThisTagline>This is a really cool title</ThisTagline>
          <ThisCopy>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </ThisCopy>
          <ThisCopy>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </ThisCopy>

          <Actions>
            <ThisPrimaryCTA to="/clubs">Explore clubs</ThisPrimaryCTA>
          </Actions>
        </FlexCol>
      </ThisContent>
    </Section>
  );
};
