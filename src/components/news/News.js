import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import NewsContent from "./NewsContent";
import NewsStore from "../mobx/NewsStore";

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

const News = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //作為probs傳入News
  const newsStore = new NewsStore();

  return (
    <div className="news">
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              TabIndicatorProps={{ style: { background: "#d79538" } }}
            >
              <Tab label="台灣高鐵最新消息" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <NewsContent newsStore={newsStore} />
          </TabPanel>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default News;
