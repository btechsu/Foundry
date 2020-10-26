import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { openModal } from 'src/actions/modals';
import Tooltip from 'src/components/tooltip';
import { firestoreConnect } from 'react-redux-firebase';
import { addToastWithTimeout } from 'src/actions/toasts';
import { PrimaryOutlineButton } from 'src/components/button';
import { StyledLabel } from 'src/components/formElements/style';
import {
  whiteSpaceRegex,
  oddHyphenRegex,
} from 'src/views/viewHelpers/textValidationHelper';
import { Notice } from 'src/components/listItems/style';
import Icon from 'src/components/icon';
import {
  Input,
  UnderlineInput,
  TextArea,
  PhotoInput,
  Error,
  CoverInput,
} from 'src/components/formElements';
import {
  Form,
  FormTitle,
  Description,
  Actions,
  TertiaryActionContainer,
  ImageInputWrapper,
  DeleteCoverWrapper,
  DeleteCoverButton,
} from 'src/components/editForm/style';
import { RequiredSelector } from 'src/views/newClub/components/submitClubForm/style';
import { SectionCard, SectionTitle } from 'src/components/settingsViews/style';

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    const { club, id } = this.props;
    this.state = {
      name: club.name,
      slug: id,
      description: club.description,
      room: club.room,
      credits: club.credits,
      days: club.days,
      time: club.time,
      type: club.type,
      pfp: club.pfp,
      cover: club.cover,
      pfpError: false,
      coverError: false,
      descriptionError: false,
      creditsError: false,
      timeError: false,
      nameError: false,
      createError: false,
      isLoading: false,
    };
  }

  changeName = (e) => {
    const name = e.target.value;

    if (name.length > 20) {
      this.setState({
        name,
        nameError: true,
      });

      return;
    }

    this.setState({
      name,
      nameError: false,
    });
  };

  changeDescription = (e) => {
    const description = e.target.value;

    let hasInvalidChars = description.search(whiteSpaceRegex) >= 0;
    let hasOddHyphens = description.search(oddHyphenRegex) >= 0;
    if (hasInvalidChars || hasOddHyphens || description.length >= 140) {
      this.setState({
        descriptionError: true,
      });
      return;
    }

    this.setState({
      description,
      descriptionError: false,
    });
  };

  changePfp = (e) => {
    const url = e.target.value;

    const urlRegex = /(?:(?:https?:\/\/))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/=]*(\.jpg|\.png|\.jpeg))/g;
    const isValid = urlRegex.test(url);

    if (isValid) return this.setState({ pfpError: false, pfp: url });
    else return this.setState({ pfpError: true });
  };

  changeCover = (e) => {
    const url = e.target.value;

    const urlRegex = /(?:(?:https?:\/\/))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/=]*(\.jpg|\.png|\.jpeg))/g;
    const isValid = urlRegex.test(url);

    if (isValid) return this.setState({ coverError: false, cover: url });
    else return this.setState({ coverError: true });
  };

  changeTime = (e) => {
    const time = e.target.value;

    if (time.length >= 8) {
      this.setState({ timeError: true });
      return;
    }
    if (time.length === 0) {
      this.setState({ timeError: false });
      return;
    }

    const timeRegex = /(0?[1-9]|1[0-2]):?([0-5][0-9]|[AP]M)?:?([0-5][0-9]|[AP]M)?\s?([AP]M)/gi;
    const isValid = timeRegex.test(time);

    if (isValid) return this.setState({ timeError: false, time: time });
    else return this.setState({ timeError: true });
  };

  changeCredits = (e) => {
    const credits = e.target.value;

    if (credits.length === 0) {
      this.setState({ creditsError: false });
      return;
    }

    //eslint-disable-next-line
    const creditsRegex = /^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/gm;
    const isValid = creditsRegex.test(credits);

    if (isValid) this.setState({ creditsError: false, credits: credits });
    else return this.setState({ creditsError: true });
  };

  save = (e) => {
    e.preventDefault();
    const {
      pfp,
      cover,
      description,
      name,
      days,
      room,
      credits,
      time,
      type,
    } = this.state;
    const { id, firestore } = this.props;

    this.setState({
      isLoading: true,
    });

    firestore
      .collection('clubs')
      .doc(id)
      .update({
        name: name,
        description: description,
        room: room,
        days: days,
        time: time,
        type: type,
        credits: credits,
        cover: cover,
        pfp: pfp,
      })
      .then(() => {
        this.setState({
          isLoading: false,
        });

        this.props.dispatch(addToastWithTimeout('success', 'Club saved!'));
        return;
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
        });

        this.props.dispatch(addToastWithTimeout('error', err.message));
      });
  };

  triggerDeleteClub = (e, clubId) => {
    e.preventDefault();
    const { community } = this.props;
    const { name, communityData } = this.state;
    const message = (
      <div>
        <p>
          Are you sure you want to delete your community, <b>{name}</b>?
        </p>{' '}
        <p>
          <b>{communityData.metaData.members} members</b> will be removed from
          the community and the channels you’ve created will be deleted.
        </p>
        <p>
          All threads, messages, reactions, and media shared in your community
          will be deleted.
        </p>
        <p>This cannot be undone.</p>
      </div>
    );

    return this.props.dispatch(
      openModal('DELETE_DOUBLE_CHECK_MODAL', {
        id: communityId,
        entity: 'community',
        message,
      }),
    );
  };

  deleteCoverPhoto = (e) => {
    e.preventDefault();
    this.setState({ coverPhoto: '', coverFile: null });
  };

  render() {
    const {
      name,
      slug,
      description,
      room,
      time,
      days,
      credits,
      pfp,
      cover,
      type,
      pfpError,
      coverError,
      timeError,
      creditsError,
      nameError,
      descriptionError,
      isLoading,
    } = this.state;
    const { club, id } = this.props;

    if (!club) {
      return (
        <SectionCard>
          <FormTitle>This club doesn’t exist yet.</FormTitle>
          <Description>Want to make it?</Description>
          <Actions>
            <PrimaryOutlineButton>Create</PrimaryOutlineButton>
          </Actions>
        </SectionCard>
      );
    }

    return (
      <SectionCard>
        <SectionTitle>Club Settings</SectionTitle>
        <Form onSubmit={this.save}>
          <Input
            dataCy="club-settings-pfp-input"
            defaultValue={pfp}
            onChange={this.changePfp}
          >
            Club picture
          </Input>

          {pfpError && <Error>Invalid club picture URL</Error>}

          <Input
            dataCy="club-settings-cover-input"
            defaultValue={cover}
            onChange={this.changeCover}
          >
            Cover picture
          </Input>

          {coverError && <Error>Invalid cover picture URL</Error>}

          <Input
            dataCy="club-settings-name-input"
            defaultValue={name}
            onChange={this.changeName}
          >
            Name
          </Input>
          <UnderlineInput defaultValue={slug} disabled>
            bths.social/
          </UnderlineInput>

          {nameError && (
            <Error>Community names can be up to 20 characters long.</Error>
          )}

          <TextArea
            defaultValue={description}
            onChange={this.changeDescription}
            dataCy="community-settings-description-input"
          >
            Description
          </TextArea>

          {descriptionError && (
            <Error>
              Oops, there may be some invalid characters or the text is too big
              (max: 140 characters) - try trimming that up.
            </Error>
          )}

          <Input
            dataCy="club-settings-days-input"
            defaultValue={days}
            onChange={(e) => this.setState({ days: e.target.value })}
          >
            Days
          </Input>

          <Input
            dataCy="club-settings-room-input"
            defaultValue={room}
            onChange={(e) => this.setState({ room: e.target.value })}
          >
            Room
          </Input>

          <Input
            dataCy="club-settings-time-input"
            defaultValue={time}
            onChange={this.changeTime}
          >
            Time
          </Input>

          {timeError && <Error>Invalid time</Error>}

          <Input
            dataCy="club-settings-credits-input"
            defaultValue={credits}
            onChange={this.changeCredits}
          >
            Credits
          </Input>

          {creditsError && <Error>Invalid credits</Error>}

          <StyledLabel>
            Club Type
            <RequiredSelector
              defaultValue={type}
              onChange={(e) => this.setState({ type: e.currentTarget.value })}
            >
              <option value={''}>Choose club type</option>
              <option value={'social'}>Social</option>
              <option value={'volunteering'}>Volunteering</option>
              <option value={'stem'}>STEM</option>
              <option value={'academic'}>Academic</option>
              <option value={'publications'}>Publications</option>
              <option value={'sports'}>Sports</option>
            </RequiredSelector>
          </StyledLabel>

          <Actions>
            <PrimaryOutlineButton
              loading={isLoading}
              onClick={this.save}
              disabled={
                nameError || descriptionError || timeError || creditsError
              }
              type="submit"
              data-cy="club-settings-edit-save-button"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </PrimaryOutlineButton>
            {/* <TertiaryActionContainer>
              {community.communityPermissions.isOwner && (
                <Tooltip content={`Delete ${name}`}>
                  <span>
                    <Icon
                      glyph="delete"
                      color="text.placeholder"
                      hoverColor={'warn.alt'}
                      onClick={(e) =>
                        this.triggerDeleteCommunity(e, community.id)
                      }
                    />
                  </span>
                </Tooltip>
              )}
            </TertiaryActionContainer> */}
          </Actions>
        </Form>
      </SectionCard>
    );
  }
}

export default compose(firestoreConnect(), connect(), withRouter)(EditForm);
