import { Close } from "@mui/icons-material";
import { Box, IconButton, TextField, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useEffect } from "react";
import { ITextInputProps } from "./types";

const useStyles: any = makeStyles((_theme: Theme) => ({
  root: {
    //width:300,
    "&:hover $clearIndicatorDirty, & .Mui-focused $clearIndicatorDirty": {
      visibility: "visible",
    },
  },
  clearIndicatorDirty: {},
  clearIndicator: {
    visibility: "hidden",
  },
}));

const trimWildcards = (value: string, wildcard: string) => {
  if (value[0] === wildcard && value[value.length - 1] === wildcard) {
    value = value.substring(1, value.length - 1);
  }
  return value;
};

const TextInput: FC<ITextInputProps> = (props) => {
  const { label, placeholder, onEnter, dataField, onChange } = props;
  const classes: any = useStyles();
  const savedValue = props.savedValue
    ? trimWildcards(props.savedValue, "%")
    : "";
  const [value, setValue] = React.useState<string>(savedValue);

  useEffect(() => {
    // this useEffect is important to load selection collection filter values
    if (props.savedValue !== undefined && props.savedValue !== "-") {
      const savedValue = props.savedValue
        ? trimWildcards(props.savedValue, "%")
        : "";
      setValue(savedValue);
    } else setValue("");
  }, [props.savedValue]);

  const onPasteHandler = (event: any) => {
    // Paste handle for special character
    let newVal = "";
    const existingValue = event.target.value;
    const selectStart = event.target.selectionStart;
    const selectEnd = event.target.selectionEnd;
    const values = event.clipboardData.getData("Text").split("\n");
    if (values.length > 0) {
      newVal = values.map((value: string) => value.trim()).join(",");
    }

    const newText =
      existingValue.substring(0, selectStart) +
      newVal +
      existingValue.substring(selectEnd, existingValue.length);

    let processedValue =
      newText.includes("%") ||
      newText.includes(",") ||
      newText.indexOf("^") === 0 ||
      newText.indexOf("!") === 0
        ? newText
        : `%${newText}%`;

    // adding static value for now
    processedValue = newText;

    setValue(processedValue);
    onEnter(dataField, processedValue);
    event.preventDefault();
  };

  const onEnterHandler = (event: any) => {
    if (
      event.key === undefined ||
      (event.key === "Enter" && value !== undefined)
    ) {
      if (event.target) event.target.blur();
      let processedValue =
        value.includes("%") ||
        value.includes(",") ||
        value.indexOf("^") === 0 ||
        value.indexOf("!") === 0
          ? value
          : `%${value}%`;
      // adding static value for now
      processedValue = value;
      if (onEnter) {
        onEnter(dataField, processedValue);
      }
      setValue(trimWildcards(value, "%"));
      if (event.preventDefault) event.preventDefault();
    }
  };

  const onClearHandler = (event: any) => {
    setValue("");
    onEnter(dataField, "");
    event.preventDefault();
  };

  const handleChange = (event: any) => {
    setValue(event.target.value);
    if (!event.target.value) {
      if (onChange) {
        onChange(dataField, "");
      }
    } else {
      if (onChange) {
        onChange(dataField, event.target.value);
      }
    }
    event.preventDefault();
  };

  return (
    <Box>
      <TextField
        className={classes.root}
        name={dataField}
        label={label}
        fullWidth
        placeholder={placeholder}
        InputLabelProps={{
          shrink: true,
        }}
        value={value}
        onChange={(event: any) => handleChange(event)}
        onKeyPress={onEnterHandler}
        onBlur={onEnterHandler}
        onPaste={onPasteHandler}
        InputProps={{
          endAdornment: (
            <IconButton size="small" onClick={onClearHandler} tabIndex={-1}>
              {value.length > 0 ? <Close fontSize="small" /> : null}
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export default TextInput;
