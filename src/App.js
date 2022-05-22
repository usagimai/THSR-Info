import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import "./App.css";
import Inquiry from "./components/inquiry/Inquiry";
import News from "./components/news/News";
import logo from "./img/logo.png";
import { remark, link } from "./data";

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container">
      <header>
        <img src={logo} alt="logo"></img>
        <h1>台灣高鐵對號座訂位開放時程查詢</h1>
      </header>
      <main>
        <div className="remark">
          <div>
            <h2>【說明】</h2>
            <div>
              <p>{remark.one}</p>
              <div className="rule">
                <p>{remark.rule}</p>
                <p className="special-color">{remark.exception}</p>
              </div>
            </div>
            <div>
              <p>{remark.two}</p>
            </div>
            <div className="hr"></div>
            <div className="link">
              <div>
                <div>
                  <p>相關連結&emsp;|&emsp; </p>
                </div>
                <div className="link-group">
                  <p>
                    <a
                      href={link.scheduleUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      2022年疏運日程表
                    </a>
                  </p>

                  <a
                    href={link.scheduleUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <ExitToAppIcon fontSize="large" />
                  </a>
                </div>
              </div>
              <div>
                <div>
                  <p>相關連結&emsp;|&emsp;</p>
                </div>
                <div className="link-group">
                  <p>
                    <a
                      href={link.thsrUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      台灣高鐵官方網站
                    </a>
                  </p>

                  <a
                    href={link.thsrUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <ExitToAppIcon fontSize="large" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Inquiry />
        <News />
      </main>
      <footer>
        <p>© {currentYear} Kotarin</p>
      </footer>
    </div>
  );
}

export default App;
