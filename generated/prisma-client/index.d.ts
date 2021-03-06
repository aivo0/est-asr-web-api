// Code generated by Prisma (prisma@1.31.1). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export interface Exists {
  file: (where?: FileWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  file: (where: FileWhereUniqueInput) => FilePromise;
  files: (args?: {
    where?: FileWhereInput;
    orderBy?: FileOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<File>;
  filesConnection: (args?: {
    where?: FileWhereInput;
    orderBy?: FileOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FileConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserPromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createFile: (data: FileCreateInput) => FilePromise;
  updateFile: (args: {
    data: FileUpdateInput;
    where: FileWhereUniqueInput;
  }) => FilePromise;
  updateManyFiles: (args: {
    data: FileUpdateManyMutationInput;
    where?: FileWhereInput;
  }) => BatchPayloadPromise;
  upsertFile: (args: {
    where: FileWhereUniqueInput;
    create: FileCreateInput;
    update: FileUpdateInput;
  }) => FilePromise;
  deleteFile: (where: FileWhereUniqueInput) => FilePromise;
  deleteManyFiles: (where?: FileWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  file: (
    where?: FileSubscriptionWhereInput
  ) => FileSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type FileOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "state_ASC"
  | "state_DESC"
  | "text_ASC"
  | "text_DESC"
  | "path_ASC"
  | "path_DESC"
  | "filename_ASC"
  | "filename_DESC"
  | "duration_ASC"
  | "duration_DESC"
  | "uploadedAt_ASC"
  | "uploadedAt_DESC"
  | "mimetype_ASC"
  | "mimetype_DESC"
  | "encoding_ASC"
  | "encoding_DESC"
  | "externalId_ASC"
  | "externalId_DESC"
  | "textTitle_ASC"
  | "textTitle_DESC"
  | "initialTranscriptionPath_ASC"
  | "initialTranscriptionPath_DESC"
  | "initialTranscription_ASC"
  | "initialTranscription_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "email_ASC"
  | "email_DESC"
  | "name_ASC"
  | "name_DESC"
  | "password_ASC"
  | "password_DESC"
  | "resetToken_ASC"
  | "resetToken_DESC"
  | "resetTokenExpiry_ASC"
  | "resetTokenExpiry_DESC";

export type ProcessingState =
  | "READY"
  | "PROCESSING_ERROR"
  | "PROCESSING"
  | "UPLOADED";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface FileUpdateInput {
  state?: ProcessingState;
  text?: String;
  uploader?: UserUpdateOneWithoutFilesInput;
  path?: String;
  filename?: String;
  duration?: Float;
  uploadedAt?: DateTimeInput;
  mimetype?: String;
  encoding?: String;
  externalId?: String;
  textTitle?: String;
  initialTranscriptionPath?: String;
  initialTranscription?: String;
}

export type FileWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface FileUpdateManyWithoutUploaderInput {
  create?: FileCreateWithoutUploaderInput[] | FileCreateWithoutUploaderInput;
  delete?: FileWhereUniqueInput[] | FileWhereUniqueInput;
  connect?: FileWhereUniqueInput[] | FileWhereUniqueInput;
  set?: FileWhereUniqueInput[] | FileWhereUniqueInput;
  disconnect?: FileWhereUniqueInput[] | FileWhereUniqueInput;
  update?:
    | FileUpdateWithWhereUniqueWithoutUploaderInput[]
    | FileUpdateWithWhereUniqueWithoutUploaderInput;
  upsert?:
    | FileUpsertWithWhereUniqueWithoutUploaderInput[]
    | FileUpsertWithWhereUniqueWithoutUploaderInput;
  deleteMany?: FileScalarWhereInput[] | FileScalarWhereInput;
  updateMany?:
    | FileUpdateManyWithWhereNestedInput[]
    | FileUpdateManyWithWhereNestedInput;
}

export interface UserCreateInput {
  id?: ID_Input;
  email: String;
  name: String;
  password: String;
  resetToken?: String;
  resetTokenExpiry?: Float;
  files?: FileCreateManyWithoutUploaderInput;
}

export interface UserUpdateInput {
  email?: String;
  name?: String;
  password?: String;
  resetToken?: String;
  resetTokenExpiry?: Float;
  files?: FileUpdateManyWithoutUploaderInput;
}

export interface UserUpsertWithoutFilesInput {
  update: UserUpdateWithoutFilesDataInput;
  create: UserCreateWithoutFilesInput;
}

export interface FileCreateWithoutUploaderInput {
  id?: ID_Input;
  state?: ProcessingState;
  text?: String;
  path: String;
  filename: String;
  duration?: Float;
  uploadedAt?: DateTimeInput;
  mimetype: String;
  encoding: String;
  externalId: String;
  textTitle?: String;
  initialTranscriptionPath?: String;
  initialTranscription?: String;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: UserWhereInput;
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
}

export interface UserUpdateManyMutationInput {
  email?: String;
  name?: String;
  password?: String;
  resetToken?: String;
  resetTokenExpiry?: Float;
}

export interface FileUpdateManyWithWhereNestedInput {
  where: FileScalarWhereInput;
  data: FileUpdateManyDataInput;
}

export interface FileCreateInput {
  id?: ID_Input;
  state?: ProcessingState;
  text?: String;
  uploader?: UserCreateOneWithoutFilesInput;
  path: String;
  filename: String;
  duration?: Float;
  uploadedAt?: DateTimeInput;
  mimetype: String;
  encoding: String;
  externalId: String;
  textTitle?: String;
  initialTranscriptionPath?: String;
  initialTranscription?: String;
}

export interface FileUpsertWithWhereUniqueWithoutUploaderInput {
  where: FileWhereUniqueInput;
  update: FileUpdateWithoutUploaderDataInput;
  create: FileCreateWithoutUploaderInput;
}

export interface UserCreateOneWithoutFilesInput {
  create?: UserCreateWithoutFilesInput;
  connect?: UserWhereUniqueInput;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
  email?: String;
}>;

export interface UserCreateWithoutFilesInput {
  id?: ID_Input;
  email: String;
  name: String;
  password: String;
  resetToken?: String;
  resetTokenExpiry?: Float;
}

export interface UserWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  email?: String;
  email_not?: String;
  email_in?: String[] | String;
  email_not_in?: String[] | String;
  email_lt?: String;
  email_lte?: String;
  email_gt?: String;
  email_gte?: String;
  email_contains?: String;
  email_not_contains?: String;
  email_starts_with?: String;
  email_not_starts_with?: String;
  email_ends_with?: String;
  email_not_ends_with?: String;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  password?: String;
  password_not?: String;
  password_in?: String[] | String;
  password_not_in?: String[] | String;
  password_lt?: String;
  password_lte?: String;
  password_gt?: String;
  password_gte?: String;
  password_contains?: String;
  password_not_contains?: String;
  password_starts_with?: String;
  password_not_starts_with?: String;
  password_ends_with?: String;
  password_not_ends_with?: String;
  resetToken?: String;
  resetToken_not?: String;
  resetToken_in?: String[] | String;
  resetToken_not_in?: String[] | String;
  resetToken_lt?: String;
  resetToken_lte?: String;
  resetToken_gt?: String;
  resetToken_gte?: String;
  resetToken_contains?: String;
  resetToken_not_contains?: String;
  resetToken_starts_with?: String;
  resetToken_not_starts_with?: String;
  resetToken_ends_with?: String;
  resetToken_not_ends_with?: String;
  resetTokenExpiry?: Float;
  resetTokenExpiry_not?: Float;
  resetTokenExpiry_in?: Float[] | Float;
  resetTokenExpiry_not_in?: Float[] | Float;
  resetTokenExpiry_lt?: Float;
  resetTokenExpiry_lte?: Float;
  resetTokenExpiry_gt?: Float;
  resetTokenExpiry_gte?: Float;
  files_every?: FileWhereInput;
  files_some?: FileWhereInput;
  files_none?: FileWhereInput;
  AND?: UserWhereInput[] | UserWhereInput;
  OR?: UserWhereInput[] | UserWhereInput;
  NOT?: UserWhereInput[] | UserWhereInput;
}

export interface FileCreateManyWithoutUploaderInput {
  create?: FileCreateWithoutUploaderInput[] | FileCreateWithoutUploaderInput;
  connect?: FileWhereUniqueInput[] | FileWhereUniqueInput;
}

export interface FileUpdateManyDataInput {
  state?: ProcessingState;
  text?: String;
  path?: String;
  filename?: String;
  duration?: Float;
  uploadedAt?: DateTimeInput;
  mimetype?: String;
  encoding?: String;
  externalId?: String;
  textTitle?: String;
  initialTranscriptionPath?: String;
  initialTranscription?: String;
}

export interface FileUpdateManyMutationInput {
  state?: ProcessingState;
  text?: String;
  path?: String;
  filename?: String;
  duration?: Float;
  uploadedAt?: DateTimeInput;
  mimetype?: String;
  encoding?: String;
  externalId?: String;
  textTitle?: String;
  initialTranscriptionPath?: String;
  initialTranscription?: String;
}

export interface FileWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  state?: ProcessingState;
  state_not?: ProcessingState;
  state_in?: ProcessingState[] | ProcessingState;
  state_not_in?: ProcessingState[] | ProcessingState;
  text?: String;
  text_not?: String;
  text_in?: String[] | String;
  text_not_in?: String[] | String;
  text_lt?: String;
  text_lte?: String;
  text_gt?: String;
  text_gte?: String;
  text_contains?: String;
  text_not_contains?: String;
  text_starts_with?: String;
  text_not_starts_with?: String;
  text_ends_with?: String;
  text_not_ends_with?: String;
  uploader?: UserWhereInput;
  path?: String;
  path_not?: String;
  path_in?: String[] | String;
  path_not_in?: String[] | String;
  path_lt?: String;
  path_lte?: String;
  path_gt?: String;
  path_gte?: String;
  path_contains?: String;
  path_not_contains?: String;
  path_starts_with?: String;
  path_not_starts_with?: String;
  path_ends_with?: String;
  path_not_ends_with?: String;
  filename?: String;
  filename_not?: String;
  filename_in?: String[] | String;
  filename_not_in?: String[] | String;
  filename_lt?: String;
  filename_lte?: String;
  filename_gt?: String;
  filename_gte?: String;
  filename_contains?: String;
  filename_not_contains?: String;
  filename_starts_with?: String;
  filename_not_starts_with?: String;
  filename_ends_with?: String;
  filename_not_ends_with?: String;
  duration?: Float;
  duration_not?: Float;
  duration_in?: Float[] | Float;
  duration_not_in?: Float[] | Float;
  duration_lt?: Float;
  duration_lte?: Float;
  duration_gt?: Float;
  duration_gte?: Float;
  uploadedAt?: DateTimeInput;
  uploadedAt_not?: DateTimeInput;
  uploadedAt_in?: DateTimeInput[] | DateTimeInput;
  uploadedAt_not_in?: DateTimeInput[] | DateTimeInput;
  uploadedAt_lt?: DateTimeInput;
  uploadedAt_lte?: DateTimeInput;
  uploadedAt_gt?: DateTimeInput;
  uploadedAt_gte?: DateTimeInput;
  mimetype?: String;
  mimetype_not?: String;
  mimetype_in?: String[] | String;
  mimetype_not_in?: String[] | String;
  mimetype_lt?: String;
  mimetype_lte?: String;
  mimetype_gt?: String;
  mimetype_gte?: String;
  mimetype_contains?: String;
  mimetype_not_contains?: String;
  mimetype_starts_with?: String;
  mimetype_not_starts_with?: String;
  mimetype_ends_with?: String;
  mimetype_not_ends_with?: String;
  encoding?: String;
  encoding_not?: String;
  encoding_in?: String[] | String;
  encoding_not_in?: String[] | String;
  encoding_lt?: String;
  encoding_lte?: String;
  encoding_gt?: String;
  encoding_gte?: String;
  encoding_contains?: String;
  encoding_not_contains?: String;
  encoding_starts_with?: String;
  encoding_not_starts_with?: String;
  encoding_ends_with?: String;
  encoding_not_ends_with?: String;
  externalId?: String;
  externalId_not?: String;
  externalId_in?: String[] | String;
  externalId_not_in?: String[] | String;
  externalId_lt?: String;
  externalId_lte?: String;
  externalId_gt?: String;
  externalId_gte?: String;
  externalId_contains?: String;
  externalId_not_contains?: String;
  externalId_starts_with?: String;
  externalId_not_starts_with?: String;
  externalId_ends_with?: String;
  externalId_not_ends_with?: String;
  textTitle?: String;
  textTitle_not?: String;
  textTitle_in?: String[] | String;
  textTitle_not_in?: String[] | String;
  textTitle_lt?: String;
  textTitle_lte?: String;
  textTitle_gt?: String;
  textTitle_gte?: String;
  textTitle_contains?: String;
  textTitle_not_contains?: String;
  textTitle_starts_with?: String;
  textTitle_not_starts_with?: String;
  textTitle_ends_with?: String;
  textTitle_not_ends_with?: String;
  initialTranscriptionPath?: String;
  initialTranscriptionPath_not?: String;
  initialTranscriptionPath_in?: String[] | String;
  initialTranscriptionPath_not_in?: String[] | String;
  initialTranscriptionPath_lt?: String;
  initialTranscriptionPath_lte?: String;
  initialTranscriptionPath_gt?: String;
  initialTranscriptionPath_gte?: String;
  initialTranscriptionPath_contains?: String;
  initialTranscriptionPath_not_contains?: String;
  initialTranscriptionPath_starts_with?: String;
  initialTranscriptionPath_not_starts_with?: String;
  initialTranscriptionPath_ends_with?: String;
  initialTranscriptionPath_not_ends_with?: String;
  initialTranscription?: String;
  initialTranscription_not?: String;
  initialTranscription_in?: String[] | String;
  initialTranscription_not_in?: String[] | String;
  initialTranscription_lt?: String;
  initialTranscription_lte?: String;
  initialTranscription_gt?: String;
  initialTranscription_gte?: String;
  initialTranscription_contains?: String;
  initialTranscription_not_contains?: String;
  initialTranscription_starts_with?: String;
  initialTranscription_not_starts_with?: String;
  initialTranscription_ends_with?: String;
  initialTranscription_not_ends_with?: String;
  AND?: FileWhereInput[] | FileWhereInput;
  OR?: FileWhereInput[] | FileWhereInput;
  NOT?: FileWhereInput[] | FileWhereInput;
}

export interface UserUpdateWithoutFilesDataInput {
  email?: String;
  name?: String;
  password?: String;
  resetToken?: String;
  resetTokenExpiry?: Float;
}

export interface UserUpdateOneWithoutFilesInput {
  create?: UserCreateWithoutFilesInput;
  update?: UserUpdateWithoutFilesDataInput;
  upsert?: UserUpsertWithoutFilesInput;
  delete?: Boolean;
  disconnect?: Boolean;
  connect?: UserWhereUniqueInput;
}

export interface FileScalarWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  state?: ProcessingState;
  state_not?: ProcessingState;
  state_in?: ProcessingState[] | ProcessingState;
  state_not_in?: ProcessingState[] | ProcessingState;
  text?: String;
  text_not?: String;
  text_in?: String[] | String;
  text_not_in?: String[] | String;
  text_lt?: String;
  text_lte?: String;
  text_gt?: String;
  text_gte?: String;
  text_contains?: String;
  text_not_contains?: String;
  text_starts_with?: String;
  text_not_starts_with?: String;
  text_ends_with?: String;
  text_not_ends_with?: String;
  path?: String;
  path_not?: String;
  path_in?: String[] | String;
  path_not_in?: String[] | String;
  path_lt?: String;
  path_lte?: String;
  path_gt?: String;
  path_gte?: String;
  path_contains?: String;
  path_not_contains?: String;
  path_starts_with?: String;
  path_not_starts_with?: String;
  path_ends_with?: String;
  path_not_ends_with?: String;
  filename?: String;
  filename_not?: String;
  filename_in?: String[] | String;
  filename_not_in?: String[] | String;
  filename_lt?: String;
  filename_lte?: String;
  filename_gt?: String;
  filename_gte?: String;
  filename_contains?: String;
  filename_not_contains?: String;
  filename_starts_with?: String;
  filename_not_starts_with?: String;
  filename_ends_with?: String;
  filename_not_ends_with?: String;
  duration?: Float;
  duration_not?: Float;
  duration_in?: Float[] | Float;
  duration_not_in?: Float[] | Float;
  duration_lt?: Float;
  duration_lte?: Float;
  duration_gt?: Float;
  duration_gte?: Float;
  uploadedAt?: DateTimeInput;
  uploadedAt_not?: DateTimeInput;
  uploadedAt_in?: DateTimeInput[] | DateTimeInput;
  uploadedAt_not_in?: DateTimeInput[] | DateTimeInput;
  uploadedAt_lt?: DateTimeInput;
  uploadedAt_lte?: DateTimeInput;
  uploadedAt_gt?: DateTimeInput;
  uploadedAt_gte?: DateTimeInput;
  mimetype?: String;
  mimetype_not?: String;
  mimetype_in?: String[] | String;
  mimetype_not_in?: String[] | String;
  mimetype_lt?: String;
  mimetype_lte?: String;
  mimetype_gt?: String;
  mimetype_gte?: String;
  mimetype_contains?: String;
  mimetype_not_contains?: String;
  mimetype_starts_with?: String;
  mimetype_not_starts_with?: String;
  mimetype_ends_with?: String;
  mimetype_not_ends_with?: String;
  encoding?: String;
  encoding_not?: String;
  encoding_in?: String[] | String;
  encoding_not_in?: String[] | String;
  encoding_lt?: String;
  encoding_lte?: String;
  encoding_gt?: String;
  encoding_gte?: String;
  encoding_contains?: String;
  encoding_not_contains?: String;
  encoding_starts_with?: String;
  encoding_not_starts_with?: String;
  encoding_ends_with?: String;
  encoding_not_ends_with?: String;
  externalId?: String;
  externalId_not?: String;
  externalId_in?: String[] | String;
  externalId_not_in?: String[] | String;
  externalId_lt?: String;
  externalId_lte?: String;
  externalId_gt?: String;
  externalId_gte?: String;
  externalId_contains?: String;
  externalId_not_contains?: String;
  externalId_starts_with?: String;
  externalId_not_starts_with?: String;
  externalId_ends_with?: String;
  externalId_not_ends_with?: String;
  textTitle?: String;
  textTitle_not?: String;
  textTitle_in?: String[] | String;
  textTitle_not_in?: String[] | String;
  textTitle_lt?: String;
  textTitle_lte?: String;
  textTitle_gt?: String;
  textTitle_gte?: String;
  textTitle_contains?: String;
  textTitle_not_contains?: String;
  textTitle_starts_with?: String;
  textTitle_not_starts_with?: String;
  textTitle_ends_with?: String;
  textTitle_not_ends_with?: String;
  initialTranscriptionPath?: String;
  initialTranscriptionPath_not?: String;
  initialTranscriptionPath_in?: String[] | String;
  initialTranscriptionPath_not_in?: String[] | String;
  initialTranscriptionPath_lt?: String;
  initialTranscriptionPath_lte?: String;
  initialTranscriptionPath_gt?: String;
  initialTranscriptionPath_gte?: String;
  initialTranscriptionPath_contains?: String;
  initialTranscriptionPath_not_contains?: String;
  initialTranscriptionPath_starts_with?: String;
  initialTranscriptionPath_not_starts_with?: String;
  initialTranscriptionPath_ends_with?: String;
  initialTranscriptionPath_not_ends_with?: String;
  initialTranscription?: String;
  initialTranscription_not?: String;
  initialTranscription_in?: String[] | String;
  initialTranscription_not_in?: String[] | String;
  initialTranscription_lt?: String;
  initialTranscription_lte?: String;
  initialTranscription_gt?: String;
  initialTranscription_gte?: String;
  initialTranscription_contains?: String;
  initialTranscription_not_contains?: String;
  initialTranscription_starts_with?: String;
  initialTranscription_not_starts_with?: String;
  initialTranscription_ends_with?: String;
  initialTranscription_not_ends_with?: String;
  AND?: FileScalarWhereInput[] | FileScalarWhereInput;
  OR?: FileScalarWhereInput[] | FileScalarWhereInput;
  NOT?: FileScalarWhereInput[] | FileScalarWhereInput;
}

export interface FileSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: FileWhereInput;
  AND?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput;
  OR?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput;
  NOT?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput;
}

export interface FileUpdateWithWhereUniqueWithoutUploaderInput {
  where: FileWhereUniqueInput;
  data: FileUpdateWithoutUploaderDataInput;
}

export interface FileUpdateWithoutUploaderDataInput {
  state?: ProcessingState;
  text?: String;
  path?: String;
  filename?: String;
  duration?: Float;
  uploadedAt?: DateTimeInput;
  mimetype?: String;
  encoding?: String;
  externalId?: String;
  textTitle?: String;
  initialTranscriptionPath?: String;
  initialTranscription?: String;
}

export interface NodeNode {
  id: ID_Output;
}

export interface UserPreviousValues {
  id: ID_Output;
  email: String;
  name: String;
  password: String;
  resetToken?: String;
  resetTokenExpiry?: Float;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  email: () => Promise<String>;
  name: () => Promise<String>;
  password: () => Promise<String>;
  resetToken: () => Promise<String>;
  resetTokenExpiry: () => Promise<Float>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  email: () => Promise<AsyncIterator<String>>;
  name: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  resetToken: () => Promise<AsyncIterator<String>>;
  resetTokenExpiry: () => Promise<AsyncIterator<Float>>;
}

export interface AggregateFile {
  count: Int;
}

export interface AggregateFilePromise
  extends Promise<AggregateFile>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateFileSubscription
  extends Promise<AsyncIterator<AggregateFile>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface User {
  id: ID_Output;
  email: String;
  name: String;
  password: String;
  resetToken?: String;
  resetTokenExpiry?: Float;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  email: () => Promise<String>;
  name: () => Promise<String>;
  password: () => Promise<String>;
  resetToken: () => Promise<String>;
  resetTokenExpiry: () => Promise<Float>;
  files: <T = FragmentableArray<File>>(args?: {
    where?: FileWhereInput;
    orderBy?: FileOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  email: () => Promise<AsyncIterator<String>>;
  name: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  resetToken: () => Promise<AsyncIterator<String>>;
  resetTokenExpiry: () => Promise<AsyncIterator<Float>>;
  files: <T = Promise<AsyncIterator<FileSubscription>>>(args?: {
    where?: FileWhereInput;
    orderBy?: FileOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface FileEdge {
  node: File;
  cursor: String;
}

export interface FileEdgePromise extends Promise<FileEdge>, Fragmentable {
  node: <T = FilePromise>() => T;
  cursor: () => Promise<String>;
}

export interface FileEdgeSubscription
  extends Promise<AsyncIterator<FileEdge>>,
    Fragmentable {
  node: <T = FileSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface File {
  id: ID_Output;
  state: ProcessingState;
  text?: String;
  path: String;
  filename: String;
  duration?: Float;
  uploadedAt?: DateTimeOutput;
  mimetype: String;
  encoding: String;
  externalId: String;
  textTitle?: String;
  initialTranscriptionPath?: String;
  initialTranscription?: String;
}

export interface FilePromise extends Promise<File>, Fragmentable {
  id: () => Promise<ID_Output>;
  state: () => Promise<ProcessingState>;
  text: () => Promise<String>;
  uploader: <T = UserPromise>() => T;
  path: () => Promise<String>;
  filename: () => Promise<String>;
  duration: () => Promise<Float>;
  uploadedAt: () => Promise<DateTimeOutput>;
  mimetype: () => Promise<String>;
  encoding: () => Promise<String>;
  externalId: () => Promise<String>;
  textTitle: () => Promise<String>;
  initialTranscriptionPath: () => Promise<String>;
  initialTranscription: () => Promise<String>;
}

export interface FileSubscription
  extends Promise<AsyncIterator<File>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  state: () => Promise<AsyncIterator<ProcessingState>>;
  text: () => Promise<AsyncIterator<String>>;
  uploader: <T = UserSubscription>() => T;
  path: () => Promise<AsyncIterator<String>>;
  filename: () => Promise<AsyncIterator<String>>;
  duration: () => Promise<AsyncIterator<Float>>;
  uploadedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  mimetype: () => Promise<AsyncIterator<String>>;
  encoding: () => Promise<AsyncIterator<String>>;
  externalId: () => Promise<AsyncIterator<String>>;
  textTitle: () => Promise<AsyncIterator<String>>;
  initialTranscriptionPath: () => Promise<AsyncIterator<String>>;
  initialTranscription: () => Promise<AsyncIterator<String>>;
}

export interface FileConnection {
  pageInfo: PageInfo;
  edges: FileEdge[];
}

export interface FileConnectionPromise
  extends Promise<FileConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<FileEdge>>() => T;
  aggregate: <T = AggregateFilePromise>() => T;
}

export interface FileConnectionSubscription
  extends Promise<AsyncIterator<FileConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<FileEdgeSubscription>>>() => T;
  aggregate: <T = AggregateFileSubscription>() => T;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface FileSubscriptionPayload {
  mutation: MutationType;
  node: File;
  updatedFields: String[];
  previousValues: FilePreviousValues;
}

export interface FileSubscriptionPayloadPromise
  extends Promise<FileSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = FilePromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = FilePreviousValuesPromise>() => T;
}

export interface FileSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<FileSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = FileSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = FilePreviousValuesSubscription>() => T;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface FilePreviousValues {
  id: ID_Output;
  state: ProcessingState;
  text?: String;
  path: String;
  filename: String;
  duration?: Float;
  uploadedAt?: DateTimeOutput;
  mimetype: String;
  encoding: String;
  externalId: String;
  textTitle?: String;
  initialTranscriptionPath?: String;
  initialTranscription?: String;
}

export interface FilePreviousValuesPromise
  extends Promise<FilePreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  state: () => Promise<ProcessingState>;
  text: () => Promise<String>;
  path: () => Promise<String>;
  filename: () => Promise<String>;
  duration: () => Promise<Float>;
  uploadedAt: () => Promise<DateTimeOutput>;
  mimetype: () => Promise<String>;
  encoding: () => Promise<String>;
  externalId: () => Promise<String>;
  textTitle: () => Promise<String>;
  initialTranscriptionPath: () => Promise<String>;
  initialTranscription: () => Promise<String>;
}

export interface FilePreviousValuesSubscription
  extends Promise<AsyncIterator<FilePreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  state: () => Promise<AsyncIterator<ProcessingState>>;
  text: () => Promise<AsyncIterator<String>>;
  path: () => Promise<AsyncIterator<String>>;
  filename: () => Promise<AsyncIterator<String>>;
  duration: () => Promise<AsyncIterator<Float>>;
  uploadedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  mimetype: () => Promise<AsyncIterator<String>>;
  encoding: () => Promise<AsyncIterator<String>>;
  externalId: () => Promise<AsyncIterator<String>>;
  textTitle: () => Promise<AsyncIterator<String>>;
  initialTranscriptionPath: () => Promise<AsyncIterator<String>>;
  initialTranscription: () => Promise<AsyncIterator<String>>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number;

export type Long = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "Permission",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "ProcessingState",
    embedded: false
  },
  {
    name: "File",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;
