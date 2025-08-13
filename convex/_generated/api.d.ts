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
import type * as services_files from "../services/files.js";
import type * as services_invitations from "../services/invitations.js";
import type * as services_memberships from "../services/memberships.js";
import type * as services_organisations from "../services/organisations.js";
import type * as services_users from "../services/users.js";
import type * as utils_invitations from "../utils/invitations.js";
import type * as utils_memberships from "../utils/memberships.js";
import type * as utils_organisations from "../utils/organisations.js";
import type * as utils_storage from "../utils/storage.js";
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
  "services/files": typeof services_files;
  "services/invitations": typeof services_invitations;
  "services/memberships": typeof services_memberships;
  "services/organisations": typeof services_organisations;
  "services/users": typeof services_users;
  "utils/invitations": typeof utils_invitations;
  "utils/memberships": typeof utils_memberships;
  "utils/organisations": typeof utils_organisations;
  "utils/storage": typeof utils_storage;
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
