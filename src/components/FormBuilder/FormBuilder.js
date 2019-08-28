import React from 'react';
import { Formik, Field, Form } from 'formik';
import {
  Grid,
  TextField,
  Checkbox,
  Typography,
  Button,
  TableCell,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';

const renderInput = (
  name,
  label,
  type,
  errors,
  field,
  content,
  defaultText,
  activeText,
  selectOptions,
  inputProps
) => {
  const fileUploadPlaceholder = () =>
    field.value ? activeText || 'Uploaded' : defaultText || 'Upload';

  const defaultInput = (
    <TextField
      id={name}
      label={label}
      error={errors[name]}
      helperText={errors[name]}
      type={type}
      {...field}
      {...inputProps}
    />
  );
  const selectInput = (
    <TextField
      id={name}
      label={label}
      error={errors[name]}
      helperText={errors[name]}
      type={type}
      select
      style={{ minWidth: '150px' }}
      InputLabelProps={{
        shrink: true,
      }}
      {...field}
      {...inputProps}
      SelectProps={{
        native: true,
      }}
    >
      {selectOptions &&
        selectOptions.map(keyVal => (
          <option key={keyVal[0]} value={keyVal[0]}>
            {keyVal[1]}
          </option>
        ))}
    </TextField>
  );
  const checkboxInput = (
    <>
      <Checkbox id={name} {...field} {...inputProps} />
      <Typography inline>{content}</Typography>
    </>
  );
  const fileUploadInput = (
    <label htmlFor={name}>
      <input id={name} type={type} style={{ display: 'none' }} {...field} />
      <Button
        variant="contained"
        color={field.value ? 'primary' : null}
        component="span"
      >
        {content}
        <Typography
          inline
          style={{
            marginLeft: '.5rem',
            color: field.value ? 'white' : 'black',
          }}
        >
          {fileUploadPlaceholder()}
        </Typography>
      </Button>
    </label>
  );

  switch (type) {
    case 'text':
      return defaultInput;
    case 'email':
      return defaultInput;
    case 'number':
      return defaultInput;
    case 'password':
      return defaultInput;
    case 'url':
      return defaultInput;
    case 'tel':
      return defaultInput;
    case 'checkbox':
      return checkboxInput;
    case 'file':
      return fileUploadInput;
    case 'select':
      return selectInput;
    default:
      return null;
  }
};

export const Input = ({
  label,
  name,
  type,
  size,
  content,
  defaultText,
  activeText,
  selectOptions,
  inputProps,
  submitErrors,
}) => (
  <Grid item {...size}>
    <Field
      name={name}
      render={({ form: { errors: validationErrors }, field }) => {
        const errors = submitErrors || validationErrors;
        return renderInput(
          name,
          label,
          type,
          errors,
          field,
          content,
          defaultText,
          activeText,
          selectOptions,
          inputProps
        );
      }}
    />
  </Grid>
);

export const InputCell = ({
  label,
  name,
  type,
  content,
  defaultText,
  activeText,
  selectOptions,
  inputProps,
}) => (
  <TableCell>
    <Field
      name={name}
      render={({ form: { errors }, field }) =>
        renderInput(
          name,
          label,
          type,
          errors,
          field,
          content,
          defaultText,
          activeText,
          selectOptions,
          inputProps
        )
      }
    />
  </TableCell>
);

const defaultFormGutsProps = {
  submitErrors: {},
  table: false,
  column: false,
  spacing: 3,
};

const FormGuts = props => (
  <>
    {props.submitErrors.non_field_errors && (
      <div>
        {props.submitErrors.non_field_errors.map(nonFieldError => (
          <Typography color="error">{nonFieldError}</Typography>
        ))}
      </div>
    )}
    {!props.table ? (
      <Grid
        direction={props.column ? 'column' : ''}
        container
        spacing={props.spacing}
      >
        {props.children}
      </Grid>
    ) : (
      props.children
    )}
  </>
);
FormGuts.defaultProps = defaultFormGutsProps;

export const FormBuilder = props => (
  <Formik
    {...props}
    render={({ errorObj, status, touched, isSubmitting }) => (
      <Form>
        <FormGuts
          submitErrors={props.submitErrors}
          table={props.table}
          column={props.column}
          spacing={props.spacing}
          children={props.children}
        />
      </Form>
    )}
  />
);

export const FormBuilderDialog = props => (
  <Formik
    {...props}
    render={({ errorObj, status, touched, isSubmitting }) => (
      <Dialog open={props.open} onClose={props.onClose} {...props.dialogProps}>
        <DialogTitle>{props.title}</DialogTitle>
        <Form style={{ padding: '24px 24px 0 24px' }}>
          <FormGuts
            submitErrors={props.submitErrors}
            table={props.table}
            column={props.column}
            spacing={props.spacing}
            children={props.children}
          />
          <DialogActions style={{ marginTop: '24px' }}>
            {/* <SaveDialogActions
              onClose={props.onClose}
              buttonProps={{
                color: 'primary',
                type: 'submit',
              }}
              buttonTitle={props.buttonTitle}
              loading={props.loading}
            /> */}
          </DialogActions>
        </Form>
      </Dialog>
    )}
  />
);
