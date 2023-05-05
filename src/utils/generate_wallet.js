//
//
//

// node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json

import * as arweave_module from "arweave";

require("arweave")
    .init({})
    .wallets
    .generate()
