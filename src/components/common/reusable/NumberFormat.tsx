import type { FC } from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

interface NumberProps {
    Amount?: number;
    renderWithoutSpan?: boolean;
    currencySymbol?: string;
    decimalScale?: number;
  }

const NumberFormatUtil: FC<NumberProps> = ({ Amount, renderWithoutSpan, currencySymbol, decimalScale }) => {
    if (renderWithoutSpan) {
        return <NumericFormat value={Amount} displayType="text" thousandSeparator={true} prefix={currencySymbol} renderText={(value) => value} decimalScale={decimalScale} />
    }

    return <NumericFormat value={Amount} displayType="text" thousandSeparator={true} prefix={currencySymbol} decimalScale={decimalScale} />
}

NumberFormatUtil.defaultProps = {
    renderWithoutSpan: true,
    currencySymbol: "₹ ",
    decimalScale: 0,
  };

NumberFormatUtil.propTypes = {
    Amount: PropTypes.number.isRequired,
    renderWithoutSpan: PropTypes.bool,
    currencySymbol: PropTypes.string,
    decimalScale: PropTypes.number,
  };
export default NumberFormatUtil;