import React from 'react';
import { OutlineButton, PrimaryButton } from 'src/components/button';
import { Emoji, Heading, Description, ActionsRow, Card } from './style';
import { ViewGrid, CenteredGrid } from 'src/components/layout';

export const ErrorView = (props) => {
  const {
    emoji = '😣',
    heading = 'We ran into trouble loading this page',
    subheading = 'You may be trying to view something that is deleted, or Foundry is just having a hiccup. If you think something has gone wrong, please contact us.',
    ...rest
  } = props;

  return (
    <ViewGrid {...rest}>
      <CenteredGrid>
        <Card>
          <Emoji role="img" aria-label="Oops">
            {emoji}
          </Emoji>
          <Heading>{heading}</Heading>
          <Description>{subheading}</Description>
          <ActionsRow>
            <OutlineButton href={'mailto:help@bths.live'}>
              Contact us
            </OutlineButton>
            <PrimaryButton to={'/'}>Go home</PrimaryButton>
          </ActionsRow>
        </Card>
      </CenteredGrid>
    </ViewGrid>
  );
};
