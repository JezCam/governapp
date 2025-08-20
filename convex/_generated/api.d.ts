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
import type * as data_invitations from "../data/invitations.js";
import type * as data_memberships from "../data/memberships.js";
import type * as data_organisations from "../data/organisations.js";
import type * as data_storage from "../data/storage.js";
import type * as data_users from "../data/users.js";
import type * as errors from "../errors.js";
import type * as http from "../http.js";
import type * as schemas_organisations from "../schemas/organisations.js";
import type * as services_invitations from "../services/invitations.js";
import type * as services_memberships from "../services/memberships.js";
import type * as services_organisations from "../services/organisations.js";
import type * as services_storage from "../services/storage.js";
import type * as services_users from "../services/users.js";

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
  "data/invitations": typeof data_invitations;
  "data/memberships": typeof data_memberships;
  "data/organisations": typeof data_organisations;
  "data/storage": typeof data_storage;
  "data/users": typeof data_users;
  errors: typeof errors;
  http: typeof http;
  "schemas/organisations": typeof schemas_organisations;
  "services/invitations": typeof services_invitations;
  "services/memberships": typeof services_memberships;
  "services/organisations": typeof services_organisations;
  "services/storage": typeof services_storage;
  "services/users": typeof services_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
