import React, {memo, useMemo} from 'react';
import {SvgXml} from 'react-native-svg';
import {horizontalScale} from '@utils/responsive';
import theme from '@constants/theme';

const Icon = ({name, fill, width = 18, height = 18}) => {
  const xml = useMemo(() => {
    let icon;

    const defaultFill = fill ? fill : theme.blue1;

    if (name === 'check-success') {
      icon = `
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10.5" r="10" fill="#02BB11"/>
            <path d="M8.07573 14.7984L4.17573 10.8984C3.94142 10.6641 3.94142 10.2842 4.17573 10.0499L5.02424 9.20136C5.25854 8.96703 5.63846 8.96703 5.87277 9.20136L8.49999 11.8286L14.1272 6.20136C14.3615 5.96706 14.7414 5.96706 14.9758 6.20136L15.8243 7.04989C16.0586 7.2842 16.0586 7.6641 15.8243 7.89843L8.92426 14.7984C8.68993 15.0328 8.31003 15.0328 8.07573 14.7984Z" fill="white"/>
        </svg>
        `;
    } else if (name === 'check-danger') {
      icon = `
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10.5" r="10" fill="#DC3923"/>
            <g clip-path="url(#clip0_983_14090)">
                <path d="M11.875 14.625C11.875 15.6589 11.0339 16.5 10 16.5C8.96613 16.5 8.125 15.6589 8.125 14.625C8.125 13.5911 8.96613 12.75 10 12.75C11.0339 12.75 11.875 13.5911 11.875 14.625ZM8.34203 5.0906L8.66078 11.4656C8.67576 11.765 8.92284 12 9.22258 12H10.7774C11.0772 12 11.3242 11.765 11.3392 11.4656L11.658 5.0906C11.674 4.7693 11.4179 4.5 11.0962 4.5H8.90383C8.58213 4.5 8.32598 4.7693 8.34203 5.0906Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_983_14090">
                <rect width="12" height="12" fill="white" transform="translate(4 4.5)"/>
            </clipPath>
            </defs>
        </svg>
        `;
    } else if (name === 'eye') {
      icon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${defaultFill}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      `;
    } else if (name === 'eye-off') {
      icon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${defaultFill}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
      `;
    } else {
      icon = ``;
    }
    return icon;
  }, [name, fill]);

  return (
    <SvgXml
      xml={xml}
      width={horizontalScale(width)}
      height={horizontalScale(height)}
    />
  );
};

export default memo(Icon);
