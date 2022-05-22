import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import InquiryBack from "./InquiryBack";
import InquiryForward from "./InquiryForward";
import InquiryStore from "../mobx/InquiryStore";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d79538",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "1.8rem",
          color: "#d79538",
        },
      },
    },
  },
});

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Inquiry = () => {
  //控制查詢section的tabs
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //傳到InquiryBack及InquiryForward的store
  const inquiryStore = new InquiryStore();

  return (
    <div className="inquiry">
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              TabIndicatorProps={{ style: { background: "#d79538" } }}
              // centered
            >
              <Tab label="從乘車日期推算開賣日" {...a11yProps(0)} />
              <Tab label="查詢特定日期可購買之日期區間" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <InquiryBack inquiryStore={inquiryStore} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <InquiryForward inquiryStore={inquiryStore} />
          </TabPanel>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Inquiry;
