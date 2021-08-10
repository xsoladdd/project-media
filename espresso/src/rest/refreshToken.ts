import { router } from "../app";

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log("Time: ", Date.now());
//   next();
// });
// define the home page route
router.get("/", function (_, res) {
  res.send("Birds home page");
});

export default router;
