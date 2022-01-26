import React, { useCallback } from "react";
import styled from "styled-components";
import SelectComponent from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useMemo } from "react";
import CommonUtils from "../../../utils/common-utils";

const Container = styled.div``;

const StyledSelect = styled(SelectComponent)`
  width: 100%;
  font-size: 12px !important;

  & > .MuiSelect-select {
    padding: 7px 10px;
  }

  .MuiMenuItem-root {
    font-size: 12px !important;
  }
`;

type Option = {
  label: string;
  value: string;
};

type PropsType = {
  options: Array<Option | string>;
  selected?: Option | string;
  onChange?: (e: any) => void;
};

const getOption = (option: Option | string) => {
  if (typeof option === "string") {
    return {
      value: option,
      label: option,
    };
  } else {
    return option;
  }
};

export default function Select(props: PropsType) {
  const { options, selected, onChange } = props;

  const massagedOption = useMemo(
    () => options.map(getOption),
    [CommonUtils.hash(options)],
  );

  const onSelectChange = useCallback((e) => {
    onChange && onChange(e.target.value);
  }, []);

  return (
    <Container>
      <StyledSelect onChange={onSelectChange} value={selected}>
        {massagedOption.map((option: Option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </Container>
  );
}
