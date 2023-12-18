import React from "react";

class commUtil extends React.Component {
  static isEmpty(value) {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      (value != null &&
        typeof value === "object" &&
        !Object.keys(value).length) ||
      (value != null && Array.isArray(value) && value.length)
    ) {
      return true;
    }
    return false;
  }
  static isNotEmpty(value) {
    return !this.isEmpty(value);
  }
}
export default commUtil;
