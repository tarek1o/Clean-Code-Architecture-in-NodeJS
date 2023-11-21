import { Request, request } from "express"

export abstract class RequestManager {
  private static skipItems = 0;
  private static takeItems = 2;

  private static select = (request: Request) => {
    const {select} = request.body;
    return select;
  };

  private static include = (request: Request) => {
    const {include} = request.body;
    return include;
  };

  private static where = (request: Request) => {
    const {where} = request.body;
    return where;
  };

  private static distinct = (request: Request) => {
    const {distinct} = request.body;
    return distinct;
  };

  private static orderBy = (request: Request) => {
    const {order} = request.body;
    return order
  };

  private static skip = (request: Request) => {
    return request.body.skip || this.skipItems;
  };

  private static take = (request: Request) => {
    return request.body.take || this.takeItems;
  };

  static findOptionsWrapper = (request: Request) => {
    return {
      where: this.where(request),
      select: this.select(request),
      include: this.include(request),
      orderBy: this.orderBy(request),
      skip: this.skip(request),
      take: this.take(request),
    }
  }
}

