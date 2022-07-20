import { IOClients } from "@vtex/api";
import { OMS } from "@vtex/clients";
import Bonus from "./bonus";
import { Profile } from "./profile";

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get bonus() {
    return this.getOrSet('bonus', Bonus)
  }
  public get order() {
    return this.getOrSet('order', OMS)
  }
  public get profile() {
    return this.getOrSet('profile', Profile)
  }
}
