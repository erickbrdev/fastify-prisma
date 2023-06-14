import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {};
    user: {
      [x: string]: any;
      sub: string;
    }; // user type is return type of `request.user` object
  }
}
