// redis-bull.module.ts
import { Module } from '@nestjs/common';
import { createClient } from 'redis';


@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({
          url: 'redis://default:n6jxLNxlnUZH70WswRDpT642zfMZnqFC@redis-13838.c257.us-east-1-3.ec2.redns.redis-cloud.com:13838',
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [
    'REDIS_CLIENT',
  ],
})
export class RedisModule { }
