const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const ethers = require("ethers");

const txHandler = require("./txHandler");
const config = require("./config");
// TODO: Replace with correct contact
const contractArtifact = require("../app/src/contracts/ComplexStorage.json");

const app = new Koa();
const router = new Router();

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

console.log(`Signer started on port ${config.port}`);

let cache = {
  currentAddress: ZERO_ADDRESS,
  correctBottles: 0,
  incorrectBottles: 0,
};

// Set up ethers
// const provider = txHandler.getProvider(config.jsonRpcUrl);
// const signer = txHandler.getSigner(config.privateKey, provider);
// const contract = txHandler.getContract(
//   contractArtifact.networks["8995"].address,
//   contractArtifact.abi,
//   signer
// );

router
  .post("/start", ctx => {
    if (ctx.request.body) {
      const { address } = ctx.request.body;
      if (ethers.utils.isHexString(address)) {
        cache.currentAddress = address;
        cache.correctBottles = 0;
        cache.incorrectBottles = 0;
        console.log(
          `Address ${address} starts interaction...\n`,
        );
        ctx.status = 200;
      } else {
        ctx.body = "No address given";
        ctx.status = 500;
      }
    } else {
      ctx.body = "No body given";
      ctx.status = 500;
    }
  })
  .post('/bottle', ctx => {
    if (ctx.request.body) {
      const { bottleColor, isCorrectColor } = ctx.request.body;
      if (typeof bottleColor === "string" && typeof isCorrectColor === "boolean") {
        if (cache.currentAddress !== ZERO_ADDRESS) {
          cache[isCorrectColor ? "correctBottles" : "incorrectBottles"]++;
          console.log(
            ` =================================================================================\n`,
            `${bottleColor.toUpperCase()} bottle thrown in by address ${cache.currentAddress}.\n`,
            `---------------------------------------------------------------------------------\n`,
            `Correct bottles:   ${cache.correctBottles} \n`,
            `Incorrect bottles: ${cache.incorrectBottles} \n`,
            `Total bottles:     ${cache.correctBottles + cache.incorrectBottles} \n`,
            `=================================================================================\n`,
          );
          ctx.status = 200;
        } else {
          ctx.body = "No address logged in";
          ctx.status = 500;
        }
      } else {
        ctx.body = "Incorrect payload given";
        ctx.status = 500;
      }
    } else {
      ctx.body = "No body given";
      ctx.status = 500;
    }
  })
  .post("/end", ctx => {
    if (ctx.request.body) {
      const { address } = ctx.request.body;
      if (ethers.utils.isHexString(address)) {
        cache.currentAddress = ZERO_ADDRESS;
        cache.correctBottles = 0;
        cache.incorrectBottles = 0;
        console.log(
          `Address ${address} ends interaction...\n`,
        );
        ctx.status = 200;
      } else {
        ctx.body = "No address given";
        ctx.status = 500;
      }
    } else {
      ctx.body = "No body given";
      ctx.status = 500;
    }
  });

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port);
