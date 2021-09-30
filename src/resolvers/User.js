const User = {
  files(root, args, context) {
    return context.prisma
      .user({
        id: root.id
      })
      .files();
  }
};

module.exports = User;
