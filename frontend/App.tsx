import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, DocumentData } from "firebase/firestore";
import axios from "axios";

import CreateUserScreen from "./screens/CreateUserScreen"

const App: React.FC = () => {
  // useEffect(() => {
  //   const run = async (): Promise<void> => {
  //     try {
  //       await addDoc(collection(db, "users"), {
  //         name: "Phat",
  //         age: 20,
  //       });

  //       const querySnapshot = await getDocs(collection(db, "users"));
  //       querySnapshot.forEach((doc) => {
  //         const data: DocumentData = doc.data();
  //         console.log(doc.id, "=>", data);
  //       });
  //     } catch (error) {
  //       console.error("Firestore error:", error);
  //     }
  //   };



  //   run();
  // }, []);
  const [data, setData] = useState("");
  const getAPI = async () => {
    const response = await axios.get("http://10.0.2.2:5000/users")
    setData(response.data.message);
  }
  useEffect(() => {
    getAPI();
  }, [])

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "flex-start",
        // alignItems: "center",
        flexDirection: "row",
        backgroundColor: "red",
      }}
    >
      <Text >{data}</Text>
      <Text >Hello</Text>
      <Text >Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});


export default App;
