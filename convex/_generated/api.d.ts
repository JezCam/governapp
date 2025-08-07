/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as schemas_organisationSchemas from "../schemas/organisationSchemas.js";
import type * as services_invitations from "../services/invitations.js";
import type * as services_memberships from "../services/memberships.js";
import type * as services_organisation from "../services/organisation.js";
import type * as services_users from "../services/users.js";
import type * as utils_files from "../utils/files.js";
import type * as utils_memberships from "../utils/memberships.js";
import type * as utils_organisation from "../utils/organisation.js";
import type * as utils_users from "../utils/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  http: typeof http;
  "schemas/organisationSchemas": typeof schemas_organisationSchemas;
  "services/invitations": typeof services_invitations;
  "services/memberships": typeof services_memberships;
  "services/organisation": typeof services_organisation;
  "services/users": typeof services_users;
  "utils/files": typeof utils_files;
  "utils/memberships": typeof utils_memberships;
  "utils/organisation": typeof utils_organisation;
  "utils/users": typeof utils_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
