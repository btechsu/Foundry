import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { addToastWithTimeout } from 'src/actions/toasts';
import Icon from 'src/components/icon';
import isEmail from 'validator/lib/isEmail';
import { OutlineButton } from 'src/components/button';
import { Error } from '../formElements';
import { SectionCardFooter } from 'src/components/settingsViews/style';
import { isAdmin } from 'src/components/entities/profileCards/components/clubActions';
import { firestoreConnect } from 'react-redux-firebase';
import { EmailInviteForm, EmailInviteInput, Action, RemoveRow } from './style';

class EmailInvitationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      contacts: [
        {
          email: '',
          error: false,
        },
        {
          email: '',
          error: false,
        },
        {
          email: '',
          error: false,
        },
      ],
      inputValue: '',
    };
  }

  getUniqueEmails = (array) => array.filter((x, i, a) => a.indexOf(x) === i);

  sendInvitations = () => {
    const { contacts } = this.state;
    const { dispatch, club, id, auth, firestore } = this.props;

    this.setState({ isLoading: true });

    let validContacts = contacts
      .filter((contact) => !contact.error)
      .filter((contact) => contact.email !== auth.email)
      .filter((contact) => contact.email.length > 0)
      .filter((contact) =>
        isEmail(contact.email, {
          domain_specific_validation: true,
          allow_ip_domain: false,
        }),
      )
      .filter((contact) => contact.email.endsWith('@bths.edu'))
      .map(({ error, ...contact }) => {
        return { ...contact };
      });

    // make sure to uniqify the emails so you can't enter on email multiple times
    validContacts = this.getUniqueEmails(validContacts);

    if (validContacts.length === 0) {
      this.setState({
        isLoading: false,
      });

      return dispatch(
        addToastWithTimeout('error', 'No emails entered - try again!'),
      );
    }

    validContacts.forEach((element) => {
      firestore
        .collection('users')
        .where('email', '==', element.email)
        .limit(1)
        .get()
        .then((userDoc) => {
          if (userDoc.empty) {
            this.setState({
              isLoading: false,
            });
            throw new Error(
              `Could not find a user with the email ${element.email}`,
            );
          }

          if (isAdmin(club, userDoc.docs[0].id)) {
            throw new Error(`${element.email} is already an admin!`);
          }

          return firestore
            .collection('clubs')
            .doc(id)
            .update({
              admins: firestore.FieldValue.arrayUnion(
                firestore.collection('users').doc(userDoc.docs[0].id),
              ),
            });
        })
        .then(() => {
          this.setState({
            isLoading: false,
            contacts: [
              {
                email: '',
                error: false,
              },
              {
                email: '',
                error: false,
              },
              {
                email: '',
                error: false,
              },
            ],
          });

          return dispatch(
            addToastWithTimeout(
              'success',
              `You have added ${
                validContacts.length > 1
                  ? `${validContacts.length} admins`
                  : `${validContacts.length} admin`
              }!`,
            ),
          );
        })
        .catch((err) => {
          this.setState({
            isLoading: false,
          });
          dispatch(
            addToastWithTimeout('error', err.message ? err.messsage : err),
          );
        });
    });
  };

  handleChange = (e, i, key) => {
    const { contacts } = this.state;
    contacts[i][key] = e.target.value;

    this.setState({
      ...this.state,
      contacts,
    });
  };

  addRow = () => {
    const { contacts } = this.state;
    contacts.push({
      email: '',
      firstName: '',
      lastName: '',
      error: false,
    });

    this.setState({
      ...this.state,
      contacts,
    });
  };

  removeRow = (index) => {
    const { contacts } = this.state;
    contacts.splice(index, 1);
    this.setState({
      ...this.state,
      contacts,
    });
  };

  validate = (e, i) => {
    const { contacts } = this.state;
    if (!isEmail(e.target.value)) {
      contacts[i].error = true;
    } else {
      contacts[i].error = false;
    }

    this.setState({
      ...this.state,
      contacts,
    });
  };

  handleCustomMessageChange = (e) => {
    const customMessageString = e.target.value;
    if (customMessageString.length > 500) {
      this.setState({
        customMessageString,
        customMessageError: true,
      });
    } else {
      this.setState({
        customMessageString,
        customMessageError: false,
      });
    }
  };

  toggleCustomMessage = () => {
    const { hasCustomMessage } = this.state;
    this.setState({
      hasCustomMessage: !hasCustomMessage,
    });
  };

  render() {
    const { contacts, isLoading, importError } = this.state;

    return (
      <div>
        {importError && <Error>{importError}</Error>}
        {contacts.map((contact, i) => {
          return (
            <EmailInviteForm key={i}>
              <EmailInviteInput
                error={contact.error}
                type="email"
                onBlur={(e) => this.validate(e, i)}
                placeholder="Email address"
                value={contact.email}
                onChange={(e) => this.handleChange(e, i, 'email')}
              />
              <RemoveRow onClick={() => this.removeRow(i)}>
                <Icon glyph="view-close" size="16" />
              </RemoveRow>
            </EmailInviteForm>
          );
        })}

        <Action onClick={this.addRow}>
          <Icon glyph="plus" size={20} /> Add row
        </Action>

        <SectionCardFooter>
          <OutlineButton loading={isLoading} onClick={this.sendInvitations}>
            {isLoading ? 'Adding...' : 'Add admins'}
          </OutlineButton>
        </SectionCardFooter>
      </div>
    );
  }
}

export const ClubInvitationForm = compose(
  firestoreConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
)(EmailInvitationForm);
