import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import axios from "axios";

class NewsStore {
  //observable
  newsData = [];
  newsDataLength = 0;

  constructor() {
    makeObservable(this, {
      newsData: observable,
      newsDataLength: observable,
      newsDataForTable: computed,
      fetchNewsData: action,
    });
  }

  //computed value
  get newsDataForTable() {
    if (!this.newsData) return;

    return this.newsData.map((data) => {
      return {
        publishDate: data.PublishTime.split("T")[0],
        category: data.NewsCategory,
        title: data.Title,
        url: data.NewsUrl,
        id: data.NewsID,
      };
    });
  }

  //action
  fetchNewsData(skipNum) {
    axios
      .get(
        `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/News?%24select=NewsID%2C%20NewsCategory%2C%20Title%2C%20NewsUrl%20%2C%20PublishTime&%24orderby=PublishTime%20desc&%24top=5&%24skip=${skipNum}&%24format=JSON`
      )
      .then((data) => {
        runInAction(() => {
          this.newsData = data.data;
        });
      })
      .catch((err) => console.log(err));
  }

  fetchNewsDataLength() {
    axios
      .get(
        "https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/News?%24select=NewsID&%24format=JSON"
      )
      .then((data) => {
        runInAction(() => {
          this.newsDataLength = data.data.length;
        });
      })
      .catch((err) => console.log(err));
  }
}

export default NewsStore;
