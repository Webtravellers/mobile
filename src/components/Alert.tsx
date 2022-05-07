import { Alert } from "react-native"
import i18n from '../assets/languages/i18n'
type AlertProps = {
    text: string,
    onPress?: () => void
}

export const SuccessAlert = (props: AlertProps) => {
    Alert.alert(i18n.t("success"), props.text, [
        {
            text: i18n.t("ok"),
            onPress: props.onPress, 
        }
    ])
}

export const ErrorAlert = (props: AlertProps) => {
    Alert.alert(i18n.t("error"), props.text, [
        {
            text: i18n.t("ok"),
            onPress: props.onPress, 
        }
    ])
}