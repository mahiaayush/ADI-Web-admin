import React from "react";
import PropTypes from "prop-types";
import { AsyncPaginate } from "react-select-async-paginate";
import { debounceDelay } from "src/utils/constants";

const SelectAsyncPaginate = ({
  rowsPerPage,
  onChange,
  value,
  placeHolder,
  className,
  styles,
  classNamePrefix,
  labelKey,
  valueKey,
  getOptionsListData
}) => {
  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const { data, count } = await getOptionsListData(page, rowsPerPage, searchQuery);
    return {
      options: data,
      hasMore: Math.ceil(+count / rowsPerPage) > page,
      additional: {
        page: page + 1,
      },
    };
  };

  const onChangeHandle = (option) => {
    if (typeof onChange === "function") {
      onChange(option);
    }
  };

  return (
    <AsyncPaginate
      debounceTimeout={debounceDelay}
      styles={styles}
      className={className}
      classNamePrefix={classNamePrefix}
      value={value || ""}
      loadOptions={loadOptions}
      getOptionValue={(option) => option[labelKey]}
      getOptionLabel={(option) => option[valueKey]}
      onChange={onChangeHandle}
      // isSearchable={false}
      placeholder={placeHolder || "Select Option"}
      additional={{
        page: 1,
      }}
    />
  );
};
SelectAsyncPaginate.defaultProps = {
  rowsPerPage: 10,
  className: "",
  labelKey: "value",
  valueKey: "label"
};

SelectAsyncPaginate.propTypes = {
  rowsPerPage: PropTypes.number,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  placeHolder: PropTypes.string,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  styles: PropTypes.object,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  getOptionsListData: PropTypes.func.isRequired
};

export default SelectAsyncPaginate;
