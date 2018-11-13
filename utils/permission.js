import { Platform, PermissionsAndroid } from "react-native";

export async function requestMicrophone() {
  if (Platform.OS !== "android") {
    return false;
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Microphone Access",
        message:
          "The app needs access to the microphone to hear voice commands."
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
  }
}
