import { setProvider } from "@tiki.vn/redux-miniprogram-bindings";

import store from "./store/index";

setProvider({
  component2: true,
  store,
  namespace: "",
});

App({
  onLaunch(options) {},
  onShow(options) {},
});
