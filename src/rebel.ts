import { Transfer as TransferEvent } from "../generated/rebel/rebel";
import { Token,  User } from "../generated/schema";

import { json, Bytes, dataSource, log } from "@graphprotocol/graph-ts";

const url = "https://media.satoshiverse.io/legionnaires/"
export function handleTransfer(event: TransferEvent): void {
  let token = Token.load(event.params.tokenId.toString());

  if (!token) {
    token = new Token(event.params.tokenId.toString());
    token.owner = event.params.to.toHexString();
    token.tokenID = event.params.tokenId;
    token.tokenURI = event.params.tokenId.toString();
    token.imageURI = url + event.params.tokenId.toString() + ".png";
    token.animationURI = url + event.params.tokenId.toString() + ".mp4";

  }
  token.updatedAtTimestamp = event.block.timestamp;
  token.save();

  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
