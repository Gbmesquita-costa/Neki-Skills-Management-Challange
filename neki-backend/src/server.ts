import { env } from "./env";
import { app } from "./http";

const port = env.PORT || 3333;

app.listen(port, () => {
  console.log(`⚡ Server is running on localhost: ${port}`);
});
