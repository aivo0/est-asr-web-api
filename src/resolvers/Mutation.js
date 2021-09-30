const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const shortid = require("shortid");
const { createWriteStream, createReadStream } = require("fs");
//const mkdirp = require("mkdirp");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const fs = require("fs");
require("dotenv").config();
const { sendMail /*, transport*/, createEmail } = require("../mail");
const uploadDir = process.env.AUDIO_UPLOAD_DIR;
const transcriptionsDir = process.env.TRANSCRIPTS_DIR;

const db = new lowdb(new FileSync("db.json"));

// Background process to ping the server for a result
const retrieveResult = (externalId, fileId, ctx, path, repeat = true) => {
  let done = false;
  const check = () => {
    const result = fetch(
      "http://bark.phon.ioc.ee/transcribe/v1/result?id=" + externalId,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(async function(resultFile) {
        if (resultFile.done) {
          console.log(`Transcription of ${fileId}`, resultFile.done);
          if (resultFile.error) {
            done = true;
            const updatePrisma = await ctx.prisma.updateFile({
              data: { state: "PROCESSING_ERROR" },
              where: {
                id: fileId
              }
            });
            console.log(
              `Failed to transcribe ${fileId}. Failed with code`,
              resultFile.error.code,
              resultFile.error.message
            );
            fs.unlinkSync(path);
          } else {
            const path = `${transcriptionsDir}/${fileId}.json`;
            const text = JSON.stringify(resultFile.result);
            if (!done) {
              const writeStream = fs.createWriteStream(path);
              done = true;
              writeStream.on("finish", async function() {
                console.log("file has been written");
                const updatePrisma = await ctx.prisma.updateFile({
                  data: {
                    initialTranscriptionPath: path,
                    state: "READY"
                  },
                  where: {
                    id: fileId
                  }
                });
              });
              writeStream.write(text);
              writeStream.end();
            }
          }
          return;
        }
      })
      .catch(error => console.log(error));
    if (repeat && !done) {
      setTimeout(() => {
        check();
      }, 20000);
    }
  };
  check();
};

const storeUpload = async ({ stream, filename }) => {
  const id = shortid.generate();
  const path = `${uploadDir}/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", reject)
  );
};

// The main function to handle file upload
const processUpload = async (upload, ctx) => {
  const { stream, filename, mimetype, encoding } = await upload;
  const { id, path } = await storeUpload({ stream, filename });
  const pathWithoutDir = path.replace(`${uploadDir}/`, "");
  console.log(path, pathWithoutDir);
  const { externalId, uploadedAt } = await uploadToTranscriber(
    path,
    mimetype,
    filename
  );
  //fs.unlinkSync(path); // this would delete the file
  /*const duration =   await mp3Duration(path);
  console.log(duration); */
  const file = await ctx.prisma.createFile({
    filename,
    mimetype,
    encoding,
    //duration,
    uploadedAt,
    path: pathWithoutDir,
    externalId,
    uploader: {
      connect: { id: ctx.request.userId }
    }
  });
  // Start an async process to ping the service to get the result
  retrieveResult(externalId, file.id, ctx, path);
  recordFile({
    id,
    filename,
    mimetype,
    encoding,
    path,
    externalId
  });
  return file;
};

const recordFile = file =>
  db
    .get("uploads")
    .push(file)
    .last()
    .write();

const uploadToTranscriber = async (pathString, mimetype, filename) => {
  const extension = filename
    .split(".")
    .pop()
    .toLowerCase();
  const stats = fs.statSync(pathString);
  const fileSizeInBytes = stats.size;
  const uploadedAt = stats.ctime;
  const content = fs.readFileSync(pathString);
  const result = await fetch(
    "http://bark.phon.ioc.ee/transcribe/v1/upload?extension=" + extension,
    {
      method: "PUT",
      headers: {
        "Content-length": fileSizeInBytes
      },
      body: content
    }
  );
  // request failed
  if (!result.headers.get("x-request-id")) {
    fs.unlinkSync(pathString);
    console.log("Upload failed, file size", fileSizeInBytes, result.status);
    throw new Error(
      "Faili edastamine transkribeerimiseks ebaõnnestus! Kas faili maht oli liiga suur või oli ajutine teenuse katkestus."
    );
  } else {
    return { externalId: result.headers.get("x-request-id"), uploadedAt };
  }
};

// Seed an empty DB
db.defaults({ uploads: [] }).write();

// Ensure upload directory exists
//mkdirp.sync(uploadDir);

const Mutation = {
  /* async uploadFile(root, args, ctx) {
    if (!ctx.request.userId) {
      throw new Error("Pead olema sisse logitud!");
    }

    return ctx.prisma.createFile({
      name: args.name,
      title: args.title,
      duration: args.duration,
      fileSizeInKB: args.fileSizeInKB,
      url: args.url,
      uploader: {
        connect: { id: ctx.request.userId }
      }
    });
  }, */
  // TODO
  updateFile(root, args, ctx, info) {
    return ctx.prisma.updateFile(
      {
        data: { title: args.title },
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async updateFileSpeakers(root, args, ctx) {
    // TODO: korralik kasutaja kontroll
    if (!ctx.request.userId) {
      return null;
    }

    const file = await ctx.prisma.updateFile({
      data: { speakers: { set: args.speakers } },
      where: {
        id: args.id
      }
    });
    return { message: "OK" };
  },
  singleUpload: (obj, { file }, ctx) => {
    if (!ctx.request.userId) {
      throw new Error("Pead olema sisse logitud!");
    }
    return processUpload(file, ctx);
  },
  deleteFile(parent, args, ctx) {
    return ctx.prisma.deleteFile({
      id: args.id
    });
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // Check whether email exists
    const checkUser = await ctx.prisma.user({ email: args.email });
    if (checkUser) {
      throw new Error(
        `E-posti aadressiga ${args.email} on juba konto loodud. Kasuta parooli lähtestamist kui oled parooli unustanud!`
      );
    }

    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.prisma.createUser({
      ...args,
      password
    });

    // Create JWT token for the users
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response

    /* const signupMailRes = transport.sendMail({
      from: "info@tekstiks.ee",
      to: user.email,
      subject: "Konto loodud",
      html: createEmail(`Konto e-posti aadressiga ${user.email} edukalt loodud! Peaksid olema ka kohe automaatselt sisse logitud.
      \n\n
      `)
    }); */
    const signupMailRes = await sendMail({
      to: user.email,
      subject: "Konto loodud",
      html: createEmail(`Konto e-posti aadressiga ${user.email} edukalt loodud! Peaksid olema ka kohe automaatselt sisse logitud.
      \n\n
      `)
    });

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.prisma.user({ email });
    if (!user) {
      throw new Error(`Kasutajat ei leitud e-posti aadressiga ${email}`);
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Vale parool!");
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 5. Return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Head aega!" };
  },
  async requestReset(parent, args, ctx, info) {
    // 1. Check if this is a real user
    const user = await ctx.prisma.user({ email: args.email });
    if (!user) {
      throw new Error(`Kasutajat ei leitud e-posti aadressiga ${args.email}`);
    }
    // 2. Set a reset token and expiry on that user
    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await randomBytesPromiseified(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    const res = await ctx.prisma.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });
    // 3. Email them that reset token
    const mailRes = await sendMail({
      to: user.email,
      subject: "Parooli lähtestamise link",
      html: createEmail(`Siin on tellitud parooli lähtestamise link! See aegub ühe tunni jooksul.
      \n\n
      <a href="https://tekstiks.ee/reset?resetToken=${resetToken}">Klõpsa siia, et lähtestada oma tekst.ee parool.</a>`)
    });

    // 4. Return the message
    return { message: "Tänud!!" };
  },
  async resetPassword(parent, args, ctx, info) {
    // 1. check if the passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error("Paroolid ei kattu!");
    }
    // 2. check if its a legit reset token
    // 3. Check if its expired
    const [user] = await ctx.prisma.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });
    if (!user) {
      throw new Error("Parooli lähtestamise võti on kas aegunud või vigane!");
    }
    // 4. Hash their new password
    const password = await bcrypt.hash(args.password, 10);
    // 5. Save the new password to the user and remove old resetToken fields
    const updatedUser = await ctx.prisma.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    // 6. Generate JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // 7. Set the JWT cookie
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 8. return the new user
    return updatedUser;
  }
};

module.exports = { Mutation, db, retrieveResult };
