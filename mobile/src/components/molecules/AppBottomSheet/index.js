//import "react-native-gesture-handler";
import React, { forwardRef } from "react";
import {
  StyleSheet,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

const AppBottomSheet = forwardRef((props, ref) => {

  const {renderContent, onCloseEnd} = props;
  
  const sheetRef = ref;

  return (
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        initialSnap={2}
        borderRadius={40}
        renderContent={() => renderContent(props)}
        enabledGestureInteraction={true}
        enabledContentGestureInteraction={true}
        onCloseEnd={onCloseEnd}
      />
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    textAlign: "left",
    justifyContent: "flex-start",
    marginTop: 20,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#7879F1",
  },
  subheading: {
    fontSize: 15,
    textAlign: "left",
    justifyContent: "flex-start",
    color: "#7879F1",
    marginBottom: 10,
    fontWeight: "bold",
  },
  waitTime: {
    fontSize: 20,
    textAlign: "right",
    // justifyContent: "flex-end",
    alignSelf: "flex-end",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: "44%",
    fontWeight: "bold",
    color: "black",
  },
  rating: {
    fontSize: 15,
    textAlign: "right",
    justifyContent: "flex-end",
    color: "#7879F1",
    marginBottom: 10,
    marginLeft: "53%",
    fontWeight: "bold",
  },
  texts: {
    color: "#7879F1",
    width: "70%",
  },
  button: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 8,
    // paddingBottom: ,
    margin: "5%",
    borderColor: "#7879F1",
    alignItems: "center",
    width: "85%",
    height: "15%",
    alignContent: "flex-end",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#7879F1",
  },
  images: {
    width: "100%",
    height: "40%",
    marginTop: 5,
    borderRadius: 10,
  },
});

export default AppBottomSheet;