const { forwardTo } = require("prisma-binding");
const { db, retrieveResult } = require("./Mutation");
const fs = require("fs");
//const { hasPermission } = require('../utils');

const Query = {
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.prisma.user({
      id: ctx.request.userId
    });
  },
  uploads: () => db.get("uploads").value(),
  async filesByUser(root, args, context) {
    if (!context.request.userId) {
      throw new Error("Pead olema sisse logitud!");
    }
    //console.log(context.request.userId);
    const files = await context.prisma
      .user({
        id: context.request.userId
      })
      .files();
    files.forEach(file => {
      if (file.state === "UPLOADED" && file.externalId) {
        retrieveResult(file.externalId, file.id, context, file.path, false);
      }
    });
    return files;
  },
  async demo(root, args, context) {
    file = await context.prisma.file({ id: "cjucc0eem000f0781vr1wpo3d" });
    /* if (file.uploader.id !== context.request.userId) {
      throw new Error("Ligipääs keelatud!");
    } */
    if (file.initialTranscriptionPath) {
      file.initialTranscription = fs
        .readFileSync(file.initialTranscriptionPath)
        .toString();
    }
    return file;
  },
  async file(root, args, context) {
    if (!context.request.userId) {
      throw new Error("Pead olema sisse logitud!");
    }
    file = await context.prisma.file({ id: args.fileId });
    /* if (file.uploader.id !== context.request.userId) {
      throw new Error("Ligipääs keelatud!");
    } */
    if (file.initialTranscriptionPath) {
      file.initialTranscription = fs
        .readFileSync(file.initialTranscriptionPath)
        .toString();
    }
    return file;
  }
};

module.exports = Query;
