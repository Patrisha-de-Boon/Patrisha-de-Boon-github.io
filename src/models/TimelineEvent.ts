import { Moment } from "moment";

export type TimelineEvent = {
  title: string;
  company: string;
  description: string;
  imageSrc: string;
  start: Moment;
  end: Moment;
  cssClass: string;
  fullTime: boolean;
};
