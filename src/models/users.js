import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";
import bcryptjs from "bcryptjs";

const filePath = "/data/users.json"

export const getUsers = () => {
  return JSON.parse(fs.readFileSync(path.join(DIR_APP, filePath), {
    encoding: "utf-8",
  }))
};

export const postUsers = (newUser) => {
  let users = getUsers()
  users.push(newUser)
  const data = JSON.stringify(users, null, 2)
  fs.writeFile(
    path.join(DIR_APP, filePath),
    data,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("El usuario fue creado exitosamente");
      }
    }
  );
};

export const modifyUser = async (userPosition, key, value) => {
  let users = getUsers()
  let user = users[userPosition]
  if (key == "password"){
    value = await bcryptjs.hash(value, 10)
  }
  console.log(key)
  console.log(value)
  user[key] = value
  users = users.map(u => {
    if (u.username == user.username){
      return user
    }
    return u
  })
  const data = JSON.stringify(users, null, 2)
  fs.writeFileSync(
    path.join(DIR_APP, filePath),
    data,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("El usuario fue modificado exitosamente");
      }
    }
  )
}

export const deleteUser = (deleteUser) => {
  let users = getUsers()
  users = users.filter(user => user.username != deleteUser)
  const data = JSON.stringify(users, null, 2)
  fs.writeFileSync(
    path.join(DIR_APP, filePath),
    data,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("El usuario fue eliminado exitosamente");
      }
    }
  );
};