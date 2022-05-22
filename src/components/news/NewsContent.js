import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    htmlFontSize: 9,
  },
  palette: {
    pjColor: {
      main: "#efd3b4",
    },
  },
});

const NewsContent = observer(({ newsStore }) => {
  const [page, setPage] = useState(1);

  const handleChangePage = (event, page) => {
    setPage(page);
    newsStore.fetchNewsData((page - 1) * 5);
  };

  useEffect(() => {
    newsStore.fetchNewsData(0);
    newsStore.fetchNewsDataLength();
  }, []);

  return (
    <div className="news-content">
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">發布日期</TableCell>
                <TableCell align="center">消息分類</TableCell>
                <TableCell align="center">標題</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newsStore.newsDataForTable &&
                newsStore.newsDataForTable.map((data) => (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" sx={{ width: 150 }}>
                      {data.publishDate}
                    </TableCell>
                    <TableCell align="center" sx={{ width: 150 }}>
                      {data.category}
                    </TableCell>
                    <TableCell align="left">
                      <a
                        href={data.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {data.title}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="news-page">
          <Pagination
            count={newsStore.newsDataLength && newsStore.newsDataLength / 5}
            page={page}
            onChange={handleChangePage}
            color="pjColor"
          />
        </div>
      </ThemeProvider>
    </div>
  );
});

export default NewsContent;
