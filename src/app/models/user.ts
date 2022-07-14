export class User {
  user: Client;
  authorisation: Authorisation;
}

class Authorisation {
  token: string;
  type: string;
}
class Client {
  name: string;
  email: string;
  id: number;
}
