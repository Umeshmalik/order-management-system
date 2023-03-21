import { Router } from "express";

import controller from "./controller";

export default () => {
    const router = Router({mergeParams: true});

    router.route("/signup").put(controller.signup);
    router.route("/signin").post(controller.signin);

    return router;
}