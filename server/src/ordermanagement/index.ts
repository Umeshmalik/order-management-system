import { Router } from "express";

import controller from "./controller";
import authUser from "../../lib/authUser";

export default () => {
    const router = Router({mergeParams: true});
    router.use(authUser)

    router.route("/list").get(controller.list);
    router.route("/createOrder").put(controller.createOrder);

    return router;
}