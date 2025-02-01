import { OpenAPIObject } from '@nestjs/swagger';

const pathMethods = ['get', 'post', 'put', 'delete', 'patch'];

const generalResponses = {
  400: { description: 'Bad Request' },
  422: { description: 'Unprocessable Entity' },
  500: { description: 'Internal Server Error' },
};

const authResponses = {
  401: { description: 'Unauthorized' },
  403: { description: 'Forbidden' },
};

const deleteResponses = {
  204: { description: 'No Content' },
};

export class SwaggerHelper {
  static setDefaultResponses(document: OpenAPIObject): void {
    for (const key of Object.keys(document.paths)) {
      for (const method of pathMethods) {
        const router = document.paths[key]?.[method];
        if (router) {
          Object.assign(router.responses, generalResponses);
          if (router.security) {
            Object.assign(router.responses, authResponses);
          }
          if (method === 'delete') {
            delete router.responses[200];
            Object.assign(router.responses, deleteResponses);
          }
        }
      }
    }
  }
}
