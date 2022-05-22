import { View } from 'react-native';
import React, { useState } from 'react'
import { Button, Text } from 'galio-framework';
import _DatePicker from 'react-native-date-picker'
import colors from '../themes/colors';


const DatePicker: React.FC<any> = () => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (
        <View>
            <Text bold>Seyehat Başlangıç Tarihi Seçiniz</Text>
            <Button
                borderless
                style={{ width: '100%' }}
                placeholder={date.toLocaleDateString()}
                placeholderTextColor={colors.MUTED}
            />
            <_DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    )
}

export default DatePicker