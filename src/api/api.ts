/* tslint:disable */
/* eslint-disable */
/**
 * Resume Management
 * Resume data management app
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface WeatherForecast
 */
export interface WeatherForecast {
    /**
     * 
     * @type {string}
     * @memberof WeatherForecast
     */
    'date'?: string;
    /**
     * 
     * @type {number}
     * @memberof WeatherForecast
     */
    'temperatureC'?: number;
    /**
     * 
     * @type {string}
     * @memberof WeatherForecast
     */
    'summary'?: string | null;
}

/**
 * WeatherForecastApi - axios parameter creator
 * @export
 */
export const WeatherForecastApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiv10WeatherForecastGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/WeatherForecast`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication oauth2 required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "oauth2", ["resume-management-api"], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * WeatherForecastApi - functional programming interface
 * @export
 */
export const WeatherForecastApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = WeatherForecastApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiv10WeatherForecastGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<WeatherForecast>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiv10WeatherForecastGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * WeatherForecastApi - factory interface
 * @export
 */
export const WeatherForecastApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = WeatherForecastApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiv10WeatherForecastGet(options?: any): AxiosPromise<Array<WeatherForecast>> {
            return localVarFp.apiv10WeatherForecastGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * WeatherForecastApi - object-oriented interface
 * @export
 * @class WeatherForecastApi
 * @extends {BaseAPI}
 */
export class WeatherForecastApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WeatherForecastApi
     */
    public apiv10WeatherForecastGet(options?: AxiosRequestConfig) {
        return WeatherForecastApiFp(this.configuration).apiv10WeatherForecastGet(options).then((request) => request(this.axios, this.basePath));
    }
}


