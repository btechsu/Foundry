import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withFirestore } from 'react-redux-firebase';
import slugg from 'slugg';
import { Notice } from 'src/components/listItems/style';
import { throttle } from 'src/helpers/utils';
import { addToastWithTimeout } from 'src/actions/toasts';
import { CLUB_SLUG_DENY_LIST } from 'shared/slug-deny-lists';
import { PrimaryOutlineButton } from 'src/components/button';
import {
  whiteSpaceRegex,
  oddHyphenRegex,
} from 'src/views/viewHelpers/textValidationHelper';
import Icon from 'src/components/icon';
import { StyledLabel } from 'src/components/formElements/style';
import {
  Input,
  UnderlineInput,
  TextArea,
  PhotoInput,
  CoverInput,
  Error,
  Checkbox,
} from 'src/components/formElements';
import {
  ImageInputWrapper,
  Spacer,
  DeleteCoverWrapper,
  DeleteCoverButton,
  MetaWrapper,
  RequiredSelector,
} from './style';
import { FormContainer, Form, Actions } from '../../style';

class SubmitClubForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name || '',
      slug: '',
      description: '',
      room: '',
      credits: '',
      days: '',
      time: '',
      type: '',
      image: '',
      coverPhoto: '',
      file: null,
      coverFile: null,
      slugTaken: false,
      slugError: false,
      descriptionError: false,
      creditsError: false,
      timeError: false,
      nameError: false,
      createError: false,
      agreeCoC: false,
      photoSizeError: false,
    };

    this.checkSlug = throttle(this.checkSlug, 3000);
  }

  changeName = (e) => {
    const name = e.target.value;
    // replace any non alpha-num characters to prevent bad club slugs
    // (/[\W_]/g, "-") => replace non-alphanum with hyphens
    // (/-{2,}/g, '-') => replace multiple hyphens in a row with one hyphen
    let lowercaseName = name
      .toLowerCase()
      .trim()
      .replace(/[\W_]/g, '-')
      .replace(/-{2,}/g, '-');
    let slug = slugg(lowercaseName);

    let hasInvalidChars = name.search(whiteSpaceRegex) >= 0;
    let hasOddHyphens = name.search(oddHyphenRegex) >= 0;
    if (hasInvalidChars || hasOddHyphens || name.length > 20) {
      this.setState({
        nameError: true,
      });

      return;
    }

    if (CLUB_SLUG_DENY_LIST.indexOf(slug) > -1) {
      this.setState({
        name,
        slug,
        slugTaken: true,
      });
    } else {
      this.setState({
        name,
        slug,
        nameError: false,
        slugTaken: false,
      });

      // $FlowIssue
      this.checkSlug(slug);
    }
  };

  changeSlug = (e) => {
    let slug = e.target.value;
    // replace any non alpha-num characters to prevent bad community slugs
    // (/[\W_]/g, "-") => replace non-alphanum with hyphens
    // (/-{2,}/g, '-') => replace multiple hyphens in a row with one hyphen
    let lowercaseSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[\W_]/g, '-')
      .replace(/-{2,}/g, '-');
    slug = slugg(lowercaseSlug);

    if (slug.length >= 24) {
      this.setState({
        slug,
        slugError: true,
      });

      return;
    }

    if (CLUB_SLUG_DENY_LIST.indexOf(slug) > -1) {
      this.setState({
        slug,
        slugTaken: true,
      });
    } else {
      this.setState({
        slug,
        slugError: false,
        slugTaken: false,
      });

      this.checkSlug(slug);
    }
  };

  checkSlug = async (slug) => {
    // check the db to see if this channel slug exists
    if (slug === '') return null;
    try {
      const doc = await this.props.firestore.get({
        collection: 'clubs',
        doc: slug,
      });
      const secondDoc = await this.props.firestore.get({
        collection: 'clubSubmissions',
        doc: slug,
      });

      if (CLUB_SLUG_DENY_LIST.indexOf(this.state.slug) > -1) {
        return this.setState({ slugTaken: true });
      }

      if (doc.exists || secondDoc.exists) {
        return this.setState({ slugTaken: true });
      } else {
        return this.setState({ slugTaken: false });
      }
    } catch (err) {
      return this.props.dispatch(addToastWithTimeout('success', err.message));
    }
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

  changeCoC = () => {
    const value = this.state.agreeCoC;
    this.setState({
      agreeCoC: !value,
    });
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

  setClubPhoto = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (!file) return;

    if (file.size > 3000000) {
      return this.setState({
        photoSizeError: true,
      });
    }

    reader.onloadend = () => {
      this.setState({
        file: file,
        // $FlowFixMe
        image: reader.result,
        photoSizeError: false,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  setClubCover = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (!file) return;

    if (file.size > 3000000) {
      return this.setState({
        photoSizeError: true,
      });
    }

    reader.onloadend = () => {
      this.setState({
        coverFile: file,
        // $FlowFixMe
        coverPhoto: reader.result,
        photoSizeError: false,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  deleteCoverPhoto = (e) => {
    e.preventDefault();
    this.setState({ coverPhoto: '', coverFile: null });
  };

  create = (e) => {
    e.preventDefault();
    const {
      name,
      days,
      room,
      credits,
      time,
      type,
      slugTaken,
      slugError,
      nameError,
      creditsError,
      timeError,
      descriptionError,
      photoSizeError,
      createError,
      agreeCoC,
    } = this.state;

    // if an error is present, ensure the client cant submit the form
    if (
      slugTaken ||
      slugError ||
      nameError ||
      createError ||
      descriptionError ||
      timeError ||
      creditsError ||
      photoSizeError ||
      !room ||
      !days ||
      !time ||
      !type ||
      !name ||
      !credits ||
      !agreeCoC
    ) {
      this.setState({
        createError: true,
      });

      return;
    }

    // clientside checks have passed
    this.setState({
      createError: false,
    });

    // next step
    return this.props.clubCreated(this.state);
  };

  render() {
    const {
      name,
      slug,
      description,
      room,
      credits,
      days,
      time,
      type,
      image,
      coverPhoto,
      slugTaken,
      slugError,
      descriptionError,
      creditsError,
      timeError,
      nameError,
      createError,
      agreeCoC,
      photoSizeError,
    } = this.state;

    return (
      <FormContainer>
        <Form>
          <ImageInputWrapper>
            {coverPhoto && !/default_images/.test(coverPhoto) && (
              <DeleteCoverWrapper>
                <DeleteCoverButton onClick={(e) => this.deleteCoverPhoto(e)}>
                  <Icon glyph="view-close-small" size={'16'} />
                </DeleteCoverButton>
              </DeleteCoverWrapper>
            )}
            <CoverInput
              onChange={this.setClubCover}
              defaultValue={coverPhoto}
              preview={true}
              allowGif
            />

            <PhotoInput
              type={'club'}
              onChange={this.setClubPhoto}
              defaultValue={image}
            />
          </ImageInputWrapper>

          {photoSizeError && (
            <Notice style={{ marginTop: '32px' }}>
              Photo uploads should be less than 3mb
            </Notice>
          )}

          <Spacer height={8} />

          <Input
            defaultValue={name}
            onChange={this.changeName}
            autoFocus={!(window.innerWidth < 768)}
            dataCy="club-name-input"
          >
            What is your club called?
          </Input>

          {nameError && (
            <Error>
              Club name has to be between 1 and 20 characters long and can`t
              have invalid characters.
            </Error>
          )}

          <UnderlineInput
            defaultValue={slug}
            onChange={this.changeSlug}
            dataCy="club-slug-input"
          >
            bths.social/
          </UnderlineInput>

          {slugTaken && (
            <Error>
              This url is already taken - feel free to change it if you’re set
              on the name {name}!
            </Error>
          )}

          {slugError && <Error>Slugs can be up to 24 characters long.</Error>}

          <TextArea
            defaultValue={description}
            onChange={this.changeDescription}
            dataCy="club-description-input"
          >
            Describe it in 140 characters or less
          </TextArea>

          {descriptionError && (
            <Error>
              Oops, there may be some invalid characters or the text is too big
              (max: 140 characters) - try trimming that up.
            </Error>
          )}

          <MetaWrapper>
            <Input
              onChange={(e) => this.setState({ room: e.target.value })}
              defaultValue={room}
              dataCy="club-room-input"
            >
              Room
            </Input>
            <Input
              onChange={(e) => this.setState({ days: e.target.value })}
              defaultValue={days}
              dataCy="club-days-input"
            >
              Meeting Days
            </Input>
            <Input
              type="number"
              onBlur={this.changeTime}
              defaultValue={time}
              dataCy="club-room-input"
            >
              Meeting Time
            </Input>
            <Input
              onChange={this.changeCredits}
              defaultValue={credits}
              dataCy="club-credits-input"
            >
              Credits (per semester)
            </Input>
            <StyledLabel>
              Club Type
              <RequiredSelector
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
          </MetaWrapper>
          {creditsError && <Error>Amount of credits must be a number.</Error>}
          {timeError && <Error>Please specify a valid time.</Error>}

          <Checkbox
            id="isPrivate"
            checked={agreeCoC}
            onChange={this.changeCoC}
            dataCy="club-coc-input"
          >
            <span>
              I have read the{' '}
              <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                Foundry Privacy Policy
              </Link>{' '}
              and agree to enforce it.
            </span>
          </Checkbox>
          {createError && (
            <Error>Please fix any errors above before you can continue.</Error>
          )}
        </Form>

        <Actions>
          <div />
          <PrimaryOutlineButton
            onClick={this.create}
            disabled={
              slugTaken ||
              slugError ||
              nameError ||
              createError ||
              descriptionError ||
              timeError ||
              creditsError ||
              !room ||
              !days ||
              !time ||
              !type ||
              !name ||
              !credits ||
              !agreeCoC
            }
            data-cy="club-create-button"
          >
            Continue to next step
          </PrimaryOutlineButton>
        </Actions>
      </FormContainer>
    );
  }
}

export default compose(
  withFirestore,
  connect((state) => ({
    clubs: state.firestore.ordered.clubs,
  })),
)(SubmitClubForm);
