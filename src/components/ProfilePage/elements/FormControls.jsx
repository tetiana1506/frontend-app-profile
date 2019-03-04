import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label, FormGroup } from 'reactstrap';
import { injectIntl, intlShape } from 'react-intl';

import messages from './FormControls.messages';

import AsyncActionButton from './AsyncActionButton';
import { VisibilitySelect } from './Visibility';

function FormControls({
  cancelHandler, changeHandler, visibility, visibilityId, saveState, intl,
}) {
  // Eliminate error/failed state for save button
  const buttonState = saveState === 'error' ? null : saveState;

  return (
    <React.Fragment>
      <FormGroup className="mb-4">
        <Label className="mb-1" size="sm" for={visibilityId}>
          {intl.formatMessage(messages['profile.formcontrols.who.can.see'])}
        </Label>
        <VisibilitySelect
          id={visibilityId}
          className="w-auto"
          type="select"
          name={visibilityId}
          value={visibility}
          onChange={changeHandler}
        />
      </FormGroup>
      <FormGroup>
        <AsyncActionButton
          type="submit"
          variant={buttonState}
          labels={{
            default: intl.formatMessage(messages['profile.formcontrols.button.save']),
            pending: intl.formatMessage(messages['profile.formcontrols.button.saving']),
            complete: intl.formatMessage(messages['profile.formcontrols.button.saved']),
          }}
        />
        <Button color="link" onClick={cancelHandler}>
          {intl.formatMessage(messages['profile.formcontrols.button.cancel'])}
        </Button>
      </FormGroup>
    </React.Fragment>
  );
}

export default injectIntl(FormControls);

FormControls.propTypes = {
  saveState: PropTypes.oneOf([null, 'pending', 'complete', 'error']),
  visibility: PropTypes.oneOf(['private', 'all_users']),
  visibilityId: PropTypes.string.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,

  // i18n
  intl: intlShape.isRequired,
};

FormControls.defaultProps = {
  visibility: 'private',
  saveState: null,
};
