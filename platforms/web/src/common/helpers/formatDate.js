// @flow
import parse from "date-fns/parse";
import format from "date-fns/format";

export const formatDate = (date: Date | string | number) => {
  const now = parse(date);
  return format(now, "MMMM D YYYY").toUpperCase();
};

export default formatDate;
