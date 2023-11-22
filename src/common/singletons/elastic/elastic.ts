import { Client } from '@elastic/elasticsearch';

export default (function (): { getClient() } {
  let client;

  function createInstance(): object {
    return new Client({
      node: process.env.ELASTIC || 'http://localhost:9200',
      maxRetries: 5,
      requestTimeout: 60000,
      sniffOnStart: true,
    });
  }

  return {
    getClient(): object {
      if (!client) {
        client = createInstance();

        client.cluster.health({}, (_err, resp, _status) => {
          console.log(resp);
        });

        client.ping(
          {},
          {
            // ping usually has a 3000ms timeout
            requestTimeout: 10000,
          },
          (error) => {
            if (error) {
              console.log('elasticsearch cluster is DOWN!');
              console.log(error);
            } else {
              console.log('elasticsearch cluster is OK!');
            }
          },
        );
      }

      return client;
    },
  };
})();
