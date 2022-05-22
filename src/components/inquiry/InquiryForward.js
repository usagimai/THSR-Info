import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { format } from "date-fns";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";

const theme = createTheme({
  typography: {
    htmlFontSize: 9,
  },
  palette: {
    primary: {
      main: "#d79538",
      dark: "#d79538",
    },
  },
});

const InquiryForward = observer(({ inquiryStore }) => {
  const [value, setValue] = useState(null);
  const [dateChanged, setDateChanged] = useState(false);
  const [startDate, setStartDate] = useState([]);

  const handleChange = (newValue) => {
    setValue(newValue);
    setDateChanged(true);
  };

  const handleClick = () => {
    setDateChanged(false);
    inquiryStore.handleForwardOutput(value);
  };

  useEffect(() => {
    if (!value) return;

    const date = format(value, "yyyy/MM/dd");
    const day = ["日", "一", "二", "三", "四", "五", "六"][value.getDay()];
    setStartDate([date, day]);
  }, [value]);

  return (
    <>
      <div className="inquiry-back">
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="查詢基準日"
              mask="____/__/__"
              inputFormat="yyyy/MM/dd"
              value={value}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: "20rem",
                    svg: { fontSize: "large" },
                    input: {
                      fontSize: "1.8rem",
                      paddingTop: "0.8rem",
                      paddingBottom: "0.8rem",
                    },
                    label: {
                      fontSize: "1.6rem",
                      top: "-0.5rem",
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            size="large"
            sx={{
              color: "white",
              background: "#d79538",
              fontSize: "1.6rem",
              paddingTop: "0.6rem",
              paddingBottom: "0.6rem",
              ":hover": {
                background: "#dcb276",
              },
            }}
            onClick={handleClick}
          >
            查購買區間
          </Button>
        </ThemeProvider>
      </div>

      {inquiryStore.outputDateOriginal && !dateChanged && (
        <div className="inquiry-back-output">
          <div>
            <p className="inquiry-forward-p">可購買區間</p>
            <p>
              {startDate[0]} ({startDate[1]}) ~ {inquiryStore.outputDate} (
              {inquiryStore.outputWeekday})
            </p>
          </div>
        </div>
      )}
    </>
  );
});

export default InquiryForward;
