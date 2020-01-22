//CJToast.js
import React from 'react';
import Toast from "react-native-root-toast";

class CJToast {
    /**
     * 弹出显示信息
     *
     * @param message   信息内容
     */
    static showMessage(message) {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }
}

export default CJToast;
