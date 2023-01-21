import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestTimeMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const t0 = performance.now();
    next();
    const t1 = performance.now();
    response.setHeader('X-Request-Time', (t1 - t0).toFixed(2));
  }
}
