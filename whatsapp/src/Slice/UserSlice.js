import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { store, auth } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// create user signup - auth
const signUpUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = {
    email: userCredential.user.email,
    displayName: userCredential.user.displayName,
    image: userCredential.user.photoURL,
  }; // email,displayName,profile
  return user;
};
// todo authenticate user signin - auth
// const signInUser = async (email, password) => {
//   const userCredential = await signInWithEmailAndPassword(email, password);
//   return userCredential.user;
// };

export const signInUser = createAsyncThunk(
  "users/signIn",
  async ({ email, password }) => {
    console.log("check - 2");
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("check - 3");
    const user = {
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      image: userCredential.user.photoURL,
    };
    return user;
  }
);

// auth --> done --> email
// store --> email

// fetch users
// syntax - mainState/processName
// ex. users/fetchProducts
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const querySnapshot = await getDocs(collection(store, "users"));
  const users = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id
    }
  });
  return users;
});

// add users --> firestore
export const addUser = createAsyncThunk(
  "users/addUser",
  async ({ email, password, name }) => {
    console.log("---- test 1");
    const user = signUpUser(email, password);
    if (user) {
      console.log("---- test 2");
      const docRef = await addDoc(collection(store, "users"), {
        email: email,
        password: password,
        name: name,
      });
      return { id: docRef.id, name: name, email: email, password: password };
    }
    return null;
  }
);

// todo update users
export const updateUser = () => { };
// delete users
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await deleteDoc(doc(store, "users", id));
  return id;
});

const initialState = {
  // past, presence, future
  // pending,fullfilled,rejected
  currentUser: {}, // for handle current user
  users: [], // users stored in firestore
  isLoading: true, // to handle data delay
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}, // syncronous process
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = "Cant fetch users !!";
      state.isLoading = false;
    });
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      // const { id, user } = action.payload;
      console.log("---------");
      const user = action.payload;
      console.log(user);
      state.currentUser = user;
      console.log(state.currentUser);
      state.users.push(user);
      state.isLoading = false;
    });
    builder.addCase(addUser.rejected, (state) => {
      state.error = "geting error while add user !";
      state.isLoading = false;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id != id);
      state.isLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.error = "geting error white deleting user...";
      state.isLoading = false;
    });
    builder.addCase(signInUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      console.log("check - 3");
      const user = action.payload;
      state.currentUser = state.users.find(
        (value) => value.email == user.email
      );
      state.isLoading = false;
      // for (let i = 0; i < state.users.length; i++) {
      //   if (state.users[i].email == user.email) {
      //     state.currentUser = state.users[i];
      //   }
      // }
    });
    builder.addCase(signInUser.rejected, (state) => {
      state.error = "user not found !!";
      state.isLoading = false;
    });
  }, // asyncronous process
});

export default userSlice.reducer;

// firestore -->
// signin - fetch,check
// signup - add data i firestore