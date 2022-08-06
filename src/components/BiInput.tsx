import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'

interface CustomProps {
    bgColor?: string
}
const BiInput: React.FC<CustomProps & TextInputProps> = ({...props}) => {
    return (
        <TextInput style={{...styles.input, backgroundColor: props.bgColor ?? "#f3dec1"}} {...props} />
    )
}

export default BiInput

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#f3dec1",
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
    }
})