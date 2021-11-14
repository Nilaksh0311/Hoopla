/*
 * This is a service class used across all the components
 *
 * this provides the url for server side applications to all the
 * http calls in the service classes
 *
 *
 */
export class UriService {
  /** HooplaWebServiceUri  properties */
  hooplaWebServiceUri = {
    protocol: 'http',
    host: 'localhost',
    port: '1111',
    applicationName: '',
  };

  /**
   * This function builds the uri required for accessing the various MicroServices
   */

  buildHooplaWebServiceUri() {
    return (
      this.hooplaWebServiceUri.protocol +
      '://' +
      this.hooplaWebServiceUri.host +
      ':' +
      this.hooplaWebServiceUri.port +
      '/' +
      this.hooplaWebServiceUri.applicationName
    );
  }
}
