const { prisma } = require("../generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");
const cors = require("cors");
const { Mutation } = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const User = require("./resolvers/User");
const File = require("./resolvers/File");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const {
  Document,
  Paragraph,
  Packer,
  TextRun,
  Numbering,
  Indent,
  Hyperlink
} = require("docx");
require("dotenv").config();

/* const fs = require("fs");
const path = require("path");
const Loki = require("lokijs");
const del = require("del"); */
const Subscription = require("./resolvers/Subscription");

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Mutation,
    Query,
    Subscription,
    File,
    User
  },
  context: req => ({ ...req, prisma })
});
// JWT
server.express.use(cookieParser());
// Decode the JWT to get user Id on every request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

/* server.express.use(cors()); */
server.express.use(bodyParser.urlencoded({ extended: false, limit: "20mb" }));
server.express.use(bodyParser.json({ limit: "20mb" }));

const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  origin: true, // ["https://helitekstiks.aivoolev.now.sh", "http://localhost:7777"], //process.env.FRONTEND_PROD_URL
  preflightContinue: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"]
};
// Serve the audio file for playback
server.express
  .route("/uploads")
  .get(cors(corsOptions), function(req, res, next) {
    const filePath = process.env.AUDIO_UPLOAD_DIR + "/" + req.query.path;
    console.log("/uploads", filePath);
    fs.readFile(filePath, function(error, content) {
      if (error) {
        if (error.code == "ENOENT") {
          res.writeHead(404);
          res.end("Faili ei leitud\n");
        } else {
          res.writeHead(500);
          res.end("Süsteemi viga ..\n");
        }
      } else {
        // TODO: correct content type
        res.writeHead(200, { "Content-Type": "audio/mp3" });
        res.end(content, "utf-8");
      }
    });
  });

server.express.route("/callback").get(function(req, res, next) {
  /* const filePath = "./uploads/" + req.query.path;
  console.log(filePath);
  fs.readFile(filePath, function(error, content) {
    if (error) {
      if (error.code == "ENOENT") {
        res.writeHead(404);
        res.end("Faili ei leitud\n");
        res.end();
      } else {
        res.writeHead(500);
        res.end("System error..\n");
        res.end();
      }
    } else {
      res.writeHead(200, { "Content-Type": "audio/mp3" });
      res.end(content, "utf-8");
    }
  }); */
});

server.express
  .route("/transcript")
  .post(cors(corsOptions), function(req, res, next) {
    const filePath = process.env.TRANSCRIPTS_DIR + "/" + req.query.id + ".json";
    console.log(filePath);
    const writeStream = fs.createWriteStream(filePath);
    writeStream.on("error", err => {
      console.log(err, filePath);
      res.writeHead(404);
      res.end("Faili ei leitud\n");
      res.end();
    });
    writeStream.write(JSON.stringify(req.body), function(error, content) {
      if (error) {
        if (error.code == "ENOENT") {
          res.writeHead(404);
          res.end("Faili ei leitud\n");
          res.end();
        } else {
          res.writeHead(500);
          res.end("System error..\n");
          res.end();
        }
      } else {
        writeStream.end();
        res.writeHead(200, { "Content-Type": "audio/mp3" });
        res.end(content, "utf-8");
      }
    });
  });

server.express.route("/download").post(cors(corsOptions), function(req, res) {
  const author = req.query.author ? req.query.author : "";
  const title = req.query.title ? req.query.title : "";
  const doc = new Document({ creator: author, title });
  // To support numbered paragraphs
  const numbering = new Numbering();
  const abstractNum = numbering.createAbstractNumbering();
  abstractNum
    .createLevel(0, "upperRoman", "%1", "start")
    .addParagraphProperty(new Indent(720, 260));
  const concrete = numbering.createConcreteNumbering(abstractNum);
  // A temporary variable to hold onto multiple words before inserting
  let prg = new Paragraph();
  req.body.ops.forEach(op => {
    if (op.insert && typeof op.insert === "object" && op.insert.speaker) {
      doc.addParagraph(new Paragraph(""));
      doc
        .createParagraph()
        .createTextRun(op.insert.speaker + ":")
        .bold();
    } else if (
      op.insert &&
      typeof op.insert == "string" &&
      op.insert.includes("\n")
    ) {
      if (op.attributes && op.attributes.align) {
        switch (op.attributes.align) {
          case "right":
            prg.right();
            break;
          case "center":
            prg.center();
            break;
          case "justify":
            prg.justified();
            break;
        }
      }
      if (op.attributes && op.attributes.list) {
        if (op.attributes.list == "bullet") {
          prg.bullet();
        } else {
          prg.setNumbering(concrete, 0);
        }
      } else if (op.attributes && op.attributes.header) {
        switch (op.attributes.header) {
          case 1:
            prg.heading1();
            break;
          case 2:
            prg.heading2();
            break;
          case 3:
            prg.heading3();
            break;
        }
      }
      doc.addParagraph(prg);
      prg = new Paragraph();
    } else if (op.insert) {
      if (op.insert.image) {
        // The string has a pattern "data:image/png;base64,...
        fs.writeFileSync(
          "./temp-image.jpg",
          op.insert.image.replace(/^data:image\/\w+;base64,/, ""),
          {
            encoding: "base64"
          }
        );
        doc.createImage(fs.readFileSync("./temp-image.jpg"));
      } else if (op.attributes && op.attributes.link) {
        prg.addHyperLink(new Hyperlink(op.insert, 1, op.attributes.link));
      } else {
        const text = new TextRun(op.insert);
        if (op.attributes) {
          if (op.attributes.bold) text.bold();
          if (op.attributes.italic) text.italic();
          if (op.attributes.strike) text.strike();
          if (op.attributes.underline) text.underline();
          if (op.attributes.color) text.color(op.attributes.color);
          /* if (op.attributes.font) text.font(op.attributes.font); */
        }
        prg.addRun(text);
      }
    }
  });

  const packer = new Packer(doc, undefined, undefined, numbering);

  packer.toBase64String(doc).then(b64string => {
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=My Document.docx"
    );
    res.send(Buffer.from(b64string, "base64"));
  });
});

server.start(
  {
    cors: {
      credentials: true,
      origin: true, // ["https://helitekstiks.aivoolev.now.sh", "http://localhost:7777"], //process.env.FRONTEND_PROD_URL
      preflightContinue: true,
      optionsSuccessStatus: 204
    },
    uploads: {
      maxFileSize: 1024 * 1024 * 500, //500MB
      maxFiles: 1
    }
  },
  deets => {
    console.log(`Server is now running on port ${deets.port}`);
  }
);
