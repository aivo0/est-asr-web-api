function updateFileSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.file({ mutation_in: ["CREATED"] }).node();
}

const updatedFile = {
  subscribe: updateFileSubscribe,
  resolve: payload => {
    return payload;
  }
};

module.exports = {
  updatedFile
};
