// @flow
import React, { PureComponent } from 'react';
import DatePickerComponent from 'react-native-datepicker';
import moment from 'moment';
import theme from '../../../core/themes/defaultTheme';

type Props = {
  onChange: (date: string) => void,
  date: string | Date,
  mode?: 'date' | 'datetime' | 'time',
  disabled?: boolean,
  format?: string,
  hideText?: boolean,
  minDate?: string | Date,
  maxDate?: string | Date,
  showIcon?: boolean,
  placeholder?: string,
  onOpen?: () => void,
  onClose?: () => void,
  confirmBtnText?: string,
  cancelBtnText?: string,
};

class DatePicker extends PureComponent {
  props: Props;

  static defaultProps = {
    disabled: false,
  };

  componentDidMount() {
    // Trigger onChange so redux-form gets the field
    // when date is not set (i.e default to current date).
    if (!this.props.date) {
      const format =
        this.props.mode === 'datetime'
          ? undefined // default format
          : 'YYYY-MM-DD';

      this.props.onChange(moment().format(format));
    }
  }

  datePicker = null;

  open() {
    if (this.datePicker) {
      this.datePicker.onPressDate();
    }
  }

  close() {
    if (this.datePicker) {
      this.datePicker.onPressCancel();
    }
  }

  render() {
    const {
      date,
      onChange,
      disabled,
      format = 'YYYY-MM-DD',
      mode = 'date',
      hideText = false,
      showIcon = false,
      minDate,
      maxDate,
      placeholder = '',
      onOpen,
      onClose,
      confirmBtnText = 'Confirm',
      cancelBtnText = 'Cancel',
    } = this.props;

    return (
      <DatePickerComponent
        ref={ref => {
          this.datePicker = ref;
        }}
        style={{ flex: 1, width: null }}
        disabled={disabled}
        date={date}
        mode={mode}
        format={format}
        minDate={minDate}
        maxDate={maxDate}
        hideText={hideText}
        showIcon={showIcon}
        placeholder={placeholder}
        onDateChange={onChange}
        onOpenModal={onOpen}
        onCloseModal={onClose}
        confirmBtnText={confirmBtnText}
        cancelBtnText={cancelBtnText}
        customStyles={styles.datepicker}
      />
    );
  }
}

const styles = {
  datepicker: {
    dateInput: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      borderWidth: 0,
    },
    placeholderText: {
      color: '#4e555f',
      fontSize: 16,
    },
    dateText: {
      color: '#4e555f',
      fontSize: 16,
    },
    btnTextConfirm: {
      color: theme.colors.primary,
    },
    disabled: {
      backgroundColor: 'transparent',
      opacity: 1,
    },
  },
};

export default DatePicker;
