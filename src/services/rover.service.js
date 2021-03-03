import rovers from "../content/rovers.json";
import _ from "lodash";

export const RoverService = {
  query() {
    return rovers;
  },
  get(id) {
    return _.find(rovers, { id });
  }
};
