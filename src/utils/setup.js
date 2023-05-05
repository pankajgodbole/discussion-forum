//
//
//

import { Exm } from "@execution-machine/sdk";

const API_KEY = process.env.EXM_API_KEY;
console.log(":setup.js :api-key " + API_KEY);
export const exm_instance = new Exm({ token : API_KEY});
