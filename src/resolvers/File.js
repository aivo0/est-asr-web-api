const File = {
  uploader(root, args, context) {
    return context.prisma
      .file({
        id: root.id
      })
      .uploader();
  }
};

module.exports = File;
