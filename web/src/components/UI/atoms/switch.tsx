import React from "react";
import styled from "styled-components";
import { Switch } from "@blueprintjs/core";

const Container = styled.div``;

type PropsType = {
  checked?: boolean;
  label: string;
  onChange?: (isChecked: boolean) => void;
};

export default function SwitchComponent(props: PropsType) {
  const { checked, label, onChange } = props;

  return (
    <Container>
      <Switch
        checked={checked}
        label={label}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange && onChange(event.target.checked)
        }
      />
    </Container>
  );
}
