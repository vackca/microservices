import Cookie from '@lomray/cookie';
import cookiesConf from '@config/cookies';
import type { IJwtConfig } from '@config/jwt';
import Jwt from '@services/tokens/jwt';

/**
 * Common logic from identity and renew services
 */
abstract class BaseAuthToken {
  /**
   * @private
   */
  protected readonly jwtConfig: IJwtConfig;

  /**
   * JWT service instance
   * @private
   */
  private jwtService: Jwt;

  /**
   * @constructor
   */
  protected constructor(jwtConfig: IJwtConfig) {
    this.jwtConfig = jwtConfig;
  }

  /**
   * Get authorization token from headers
   * @private
   */
  private static getHeaderAuth(headers?: Record<string, any>): string | undefined {
    const token = headers?.Authorization ?? headers?.authorization;

    if (token) {
      return token.split('Bearer ')?.[1];
    }

    return undefined;
  }

  /**
   * Get auth token from cookies
   * @private
   */
  private async getCookieAuth(headers?: Record<string, any>): Promise<string | undefined> {
    const cookies: string | undefined = headers?.cookie;
    const origin: string | undefined = headers?.origin;

    if (!cookies) {
      return undefined;
    }

    const parsedCookies = Cookie.parse(cookies, { multiValuedCookies: true });
    const tokens = parsedCookies?.['jwt-access'] ?? [];

    // try to find right token by compare audience
    if (tokens.length > 1) {
      const service = await this.getJwtService();

      return service.findMostSuitableToken(tokens, origin);
    }

    return tokens[0];
  }

  /**
   * Create JWT service
   */
  protected async getJwtService(): Promise<Jwt> {
    if (!this.jwtService) {
      const { secretKey, ...jwtOptions } = this.jwtConfig;

      const { domain } = await cookiesConf();

      this.jwtService = new Jwt(secretKey, {
        ...jwtOptions,
        options: {
          ...(jwtOptions?.options ?? {}),
          ...Jwt.getAudience([domain], jwtOptions?.options),
        },
      });
    }

    return this.jwtService;
  }

  /**
   * Find auth token in headers
   * @protected
   */
  protected getToken(headers?: Record<string, any>): Promise<string | undefined> | string {
    return BaseAuthToken.getHeaderAuth(headers) ?? this.getCookieAuth(headers);
  }
}

export default BaseAuthToken;
