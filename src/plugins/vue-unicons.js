import Vue from "vue";
import Unicon from "vue-unicons";
import {
  uniCrosshair,
  uniMapMarker,
  uniArrowCircleUp
} from "vue-unicons/src/icons";

Unicon.add([uniCrosshair, uniMapMarker, uniArrowCircleUp]);
Vue.use(Unicon);
