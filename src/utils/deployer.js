//
//
//

import { readFileSync , writeFileSync } from "fs";
import { Exm , ContractType } from "@execution-machine/sdk";
import { exm_instance } from "./setup.js";
import { initial_state } from "./initial_state.js";

const contract_source = readFileSync("./src/utils/handler.js");
const input = initial_state;
console.log(":vite-svelte-exm-forum :input " + JSON.stringify(input));

const deployment_result = await exm_instance.functions.deploy(contract_source , input , ContractType.JS);
console.log(":vite-svelte-exm-forum :deployment_result " + JSON.stringify(deployment_result));

// Save the id of the freshly deployed function contract
const fn_id = deployment_result.id;
console.log(":deployment.js :fn_id " + fn_id);
writeFileSync("./src/utils/function_id.js" , `export const function_id = "${fn_id}"`);


