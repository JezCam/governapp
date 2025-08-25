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
import type * as data_domains from "../data/domains.js";
import type * as data_frameworks from "../data/frameworks.js";
import type * as data_invitations from "../data/invitations.js";
import type * as data_memberships from "../data/memberships.js";
import type * as data_organisations from "../data/organisations.js";
import type * as data_questionResponses from "../data/questionResponses.js";
import type * as data_questions from "../data/questions.js";
import type * as data_responseOptions from "../data/responseOptions.js";
import type * as data_sections from "../data/sections.js";
import type * as data_storage from "../data/storage.js";
import type * as data_subscriptions from "../data/subscriptions.js";
import type * as data_userAssessments from "../data/userAssessments.js";
import type * as data_users from "../data/users.js";
import type * as errors from "../errors.js";
import type * as http from "../http.js";
import type * as schemas_actions from "../schemas/actions.js";
import type * as schemas_assessments from "../schemas/assessments.js";
import type * as schemas_frameworks from "../schemas/frameworks.js";
import type * as schemas_organisations from "../schemas/organisations.js";
import type * as schemas_reports from "../schemas/reports.js";
import type * as services_assessments from "../services/assessments.js";
import type * as services_domains from "../services/domains.js";
import type * as services_frameworks from "../services/frameworks.js";
import type * as services_invitations from "../services/invitations.js";
import type * as services_memberships from "../services/memberships.js";
import type * as services_organisations from "../services/organisations.js";
import type * as services_questionResponses from "../services/questionResponses.js";
import type * as services_questions from "../services/questions.js";
import type * as services_sections from "../services/sections.js";
import type * as services_storage from "../services/storage.js";
import type * as services_subscriptions from "../services/subscriptions.js";
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
  "data/domains": typeof data_domains;
  "data/frameworks": typeof data_frameworks;
  "data/invitations": typeof data_invitations;
  "data/memberships": typeof data_memberships;
  "data/organisations": typeof data_organisations;
  "data/questionResponses": typeof data_questionResponses;
  "data/questions": typeof data_questions;
  "data/responseOptions": typeof data_responseOptions;
  "data/sections": typeof data_sections;
  "data/storage": typeof data_storage;
  "data/subscriptions": typeof data_subscriptions;
  "data/userAssessments": typeof data_userAssessments;
  "data/users": typeof data_users;
  errors: typeof errors;
  http: typeof http;
  "schemas/actions": typeof schemas_actions;
  "schemas/assessments": typeof schemas_assessments;
  "schemas/frameworks": typeof schemas_frameworks;
  "schemas/organisations": typeof schemas_organisations;
  "schemas/reports": typeof schemas_reports;
  "services/assessments": typeof services_assessments;
  "services/domains": typeof services_domains;
  "services/frameworks": typeof services_frameworks;
  "services/invitations": typeof services_invitations;
  "services/memberships": typeof services_memberships;
  "services/organisations": typeof services_organisations;
  "services/questionResponses": typeof services_questionResponses;
  "services/questions": typeof services_questions;
  "services/sections": typeof services_sections;
  "services/storage": typeof services_storage;
  "services/subscriptions": typeof services_subscriptions;
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
