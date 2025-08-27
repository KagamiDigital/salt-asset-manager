import { signer } from "./constants";
import { askForInput, printRectangle, rl } from "./helpers";
import {
  requestStatus,
  stake,
  unstake,
  withdraw,
} from "./strategy/chorus-one/chorus-one";
import { transaction } from "./transaction";

(async () => {
  const publicAddress = await signer.getAddress();
  printRectangle(`ASSET MANAGER ${publicAddress.toUpperCase()} CONNECTED`);

  let done = false;

  while (!done) {
    const input = await askForInput(
      "Do you wish to: \n [1] make a native currency transfer \n [2] execute a strategy \n [3] exit \n Please choose one of the options listed above: "
    );
    if (input === "1") {
      await transaction().catch((error) => {
        console.error("Error:", error);
      });
    } else if (input === "2") {
      const input = await askForInput(
        "Do you wish to: \n [1] stake \n [2] unstake \n [3] check your request status \n [4] withdraw \n [5] exit \n Please choose one of the options listed above: "
      );

      if (input === "1") {
        await stake().catch((error) => {
          console.error("Error:", error);
        });
      } else if (input === "2") {
        await unstake().catch((error) => {
          console.log("Error:", error);
        });
      } else if (input === "3") {
        await requestStatus().catch((error) => {
          console.log("Error:", error);
        });
      } else if (input === "4") {
        await withdraw().catch((error) => {
          console.log("Error:", error);
        });
      } else if (input === "5") {
        done = true;
      } else {
        console.log("Please enter a valid choice");
        console.log(
          "Do you wish to: \n [1] stake \n [2] unstake \n [3] check your request status \n [4] withdraw \n [5] exit \n Please choose one of the options listed above: "
        );
      }
    } else if (input === "3") {
      done = true;
    } else {
      console.log("Please enter a valid choice");
      console.log(
        "Do you wish to: \n [1] make a native currency transfer \n [2] setup the asset manager bot \n [3] exit \n Please choose one of the options listed above: "
      );
    }
  }
  rl.close();
})();
