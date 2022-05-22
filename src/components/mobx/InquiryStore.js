import { action, computed, makeObservable, observable } from "mobx";
import { format, sub, add } from "date-fns";

class InquiryStore {
  //observable
  outputDateOriginal = null;

  constructor() {
    makeObservable(this, {
      outputDateOriginal: observable,
      handleBackOutput: action,
      handleForwardOutput: action,
      outputDate: computed,
      outputWeekday: computed,
    });
  }

  //computed value
  get outputDate() {
    return format(this.outputDateOriginal, "yyyy/MM/dd");
  }

  get outputWeekday() {
    return ["日", "一", "二", "三", "四", "五", "六"][
      this.outputDateOriginal.getDay()
    ];
  }

  //action
  //從乘車日推算開賣日(InquiryBack)
  handleBackOutput(newDate) {
    const dateMap = {
      0: 30,
      6: 29,
    };
    this.outputDateOriginal = sub(newDate, {
      days: dateMap[newDate.getDay()] || 28,
    });
  }

  //查詢特定日期可購買之日期區間(InquiryForward)
  handleForwardOutput(newDate) {
    const dateMap = {
      5: 30,
      6: 29,
    };
    this.outputDateOriginal = add(newDate, {
      days: dateMap[newDate.getDay()] || 28,
    });
  }
}

export default InquiryStore;
