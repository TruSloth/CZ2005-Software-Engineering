import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import { AppBottomSheet, QueueSheetContent } from "../../components/molecules/BottomSheet";

import { useMutation } from 'react-query';
import { joinQueue } from '../../services/queue/joinQueue';
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");
const height = (width * 100) / 90;

const images = [
  "https://reactjs.org/logo-og.png",
  "https://www.pngkey.com/png/detail/21-219723_hamburger-png-picture-burger-png-cartoon.png",
];
const StoreDetailedInfoScreen = () => {
  const joinQueueMutation = useMutation(joinQueue);

	const joinServiceProviderQueue = async (user, store) => {
		try {
			const response = await joinQueueMutation.mutateAsync({user: user, store: store});

			if (response.status === 200) {
				console.log('Joined a queue!')
			}
		} catch (e) {
			console.log(e)
		}
	
	};

  const sheetRef = useRef(null);

  const account = useSelector((state) => state.account)

	const openQueue = () => {
		sheetRef.current.snapTo(0);
	};

	const closeQueue = () => {
    sheetRef.current.snapTo(2);
		setQueuePax(0);
	};

	const queueIncrement = () => {
        setQueuePax(queuePax + 1);
    }
	const queueDecrement = () => {
		if (queuePax > 0) {
			setQueuePax(queuePax - 1);
		}
	};

  const onQueueConfirm = () => {
    joinServiceProviderQueue(account.userName, 'Temporary Store Name')
  }

	const [queuePax, setQueuePax] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: "#7879F1" }, { fontSize: 25 }]}>
        Location 2
      </Text>
      <ScrollView
        pagingEnabled
        horizontal={true}
        style={{ width, height }}
        showsHorizontalScrollIndicator={true}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>

      <Text style={styles.waitTimes}>
        Waiting time:
        <Text style={styles.imptInfo}> 25 mins</Text>
      </Text>

      <Text style={styles.desc}>
        There are
        <Text style={styles.imptInfo}>
          {" "}
          10 people
          <Text style={[styles.waitTimes, { fontSize: 20 }]}> in line </Text>
        </Text>
      </Text>
      <Text style={styles.storeDesc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis{" "}
      </Text>

      <TouchableOpacity style={styles.button} onPress={openQueue}>
        <Text style={{ color: "#EF5DA8", fontSize: 15, fontWeight: "bold" }}>
          Queue
        </Text>
      </TouchableOpacity>
      <AppBottomSheet
					ref={sheetRef}
					renderContent={QueueSheetContent}
					onCloseEnd={closeQueue}
					count={queuePax}
					onPressPlus={queueIncrement}
					onPressMinus={queueDecrement}
					onPressCancel={closeQueue}
          onPressConfirm={onQueueConfirm}
			></AppBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scroll: {
    width,
    height,
  },
  pagination: {
    flexDirection: "row", //align children from left to right
    position: "absolute",
    bottom: 340,
    alignSelf: "center",
  },

  waitTimes: {
    fontSize: 15,
    color: "#7879F1",
    fontWeight: "bold",
    textAlign: "left",
    width: "80%",
    margin: 20,
  },
  imptInfo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  storeDesc: {
    textAlign: "justify",
    margin: 20,
    width: "80%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#EF5DA8",
  },
  heading: {
    fontSize: 15,
    textAlign: "left",
    justifyContent: "flex-start",
    margin: 15,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7879F1",
    width: "80%",
    textAlign: "left",
    fontFamily: "",
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 50,
    margin: 20,
    borderColor: "#7879F1",
    alignItems: "center",
    borderRadius: 50,
  },
  image: {
    width,
    // height,
    //justifyContent: "space-around",
    //margin: 30,
    // marginBottom: 20,
    resizeMode: "cover",
  },
});

export default StoreDetailedInfoScreen;
