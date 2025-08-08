import type { DataModel } from '../../convex/_generated/dataModel';

export type User = DataModel['users']['document'];

export type Membership = DataModel['memberships']['document'];

export type Organisation = DataModel['organisations']['document'];
