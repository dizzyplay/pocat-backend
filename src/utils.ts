import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";
import * as sgTransport from "nodemailer-sendgrid-transport";
import { adjectives, nouns } from "src/word";
import * as jwt from "jsonwebtoken";

export const genHash = async (param: string): Promise<string> => {
  const saltRound: number = 10;
  try {
    return await bcrypt.hash(param, saltRound);
  } catch {
    throw Error("hash generating failed");
  }
};

export const checkPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = email => {
  let options = {
    auth: {
      api_user: process.env.SENDMAIL_USERNAME,
      api_key: process.env.SENDMAIL_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "kingcat@healthpocat.com",
    to: address,
    subject: "로그인 인증 번호입니다.",
    html: ` <h1>안녕하세요</h1> <br/> 하단의 코드를 복사 붙여넣기 해주세요 <br/><strong>${secret}</strong>`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

export const isAuthenticated = user => {
  if (!user) {
    throw Error("Needs authenticated...");
  }
};
